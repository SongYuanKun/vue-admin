<template>
    <div class="mod-config">
        <el-form :inline="true" :model="filter" @keyup.enter.native="getAppoint()">
            <el-form-item>
                <el-select clearable value="">
                    <el-option v-for="type in typeList"
                               :key="type.parKey"
                               :value="type.parKey"
                               :label="type.parValue"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="filter.name" clearable placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getAppoint()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增
                </el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
            <table-tree-column
                    prop="name"
                    header-align="center"
                    width="150"
                    label="名称">
            </table-tree-column>
            <el-table-column
                    prop="type"
                    header-align="center"
                    align="center"
                    label="类型">
                <template slot-scope="scope">
                    {{getValue(scope.row.type,typeList)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="rank"
                    header-align="center"
                    align="center"
                    label="级别">
                <template slot-scope="scope">
                    {{getValue(scope.row.rank,rankList)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="parentName"
                    header-align="center"
                    align="center"
                    label="上级级别">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    header-align="center"
                    align="center"
                    width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getAppoint"></add-or-update>
    </div>
</template>

<script>
    import {deleteCategory, getCategoryList} from "../../api/categoryApi";
    import {getValueByKey, treeDataTranslate} from "../../util/myUtil";
    import AddOrUpdate from './category-add-or-update.vue'
    import TableTreeColumn from './table-tree-column'

    export default {
        data() {
            return {
                total: 0,
                filter: {
                    pageNumber: 1,
                    pageSize: 10,
                    name: "",
                    type: ""
                },
                loading: false,
                list: [],
                addOrUpdateVisible: false,
                typeList: [{
                    parKey: 0,
                    parValue: "文章"
                }],
                rankList: [{
                    parKey: 0,
                    parValue: "一级"
                }, {
                    parKey: 1,
                    parValue: "二级"
                }, {
                    parKey: 2,
                    parValue: "三级"
                }]
            }
        },
        components: {
            AddOrUpdate,
            treeDataTranslate,
            TableTreeColumn
        },
        methods: {
            getValue: function (key, valueTextArr) {
                return getValueByKey(key, valueTextArr);
            },
            formatStatus: function (row) {
                let status = "--";
                switch (row.status) {
                    case 0:
                        status = "预约成功";
                        break;
                    case 1:
                        status = "已到店";
                        break;
                    case 2:
                        status = "已取消";
                        break;
                }
                return status;
            },

            getAppoint: function () {
                this.loading = true;
                getCategoryList(this.filter).then((res) => {
                    this.list = treeDataTranslate(res.data.content);
                    this.total = res.data.totalElements;
                    this.loading = false;
                });
            },
            handleCurrentChange(val) {
                this.filter.pageNumber = val;
                this.getAppoint();
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true;
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            deleteHandle(id) {
                deleteCategory(id);
                this.getAppoint();
            }
        },
        mounted() {
            this.getAppoint();

        }
    };
</script>
