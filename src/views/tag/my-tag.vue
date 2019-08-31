<template>
    <div class="mod-config">
        <el-form :inline="true" :model="filter" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="filter.name" clearable placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增
                </el-button>
            </el-form-item>
        </el-form>
        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column
                    prop="id"
                    header-align="center"
                    align="center"
                    label="编号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="name"
                    header-align="center"
                    align="center"
                    label="标签名称">
            </el-table-column>
            <el-table-column
                    prop="type"
                    header-align="center"
                    align="center"
                    label="所属类别">
                <template slot-scope="scope">
                    {{getValue(scope.row.type,typeList)}}
                </template>
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
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>
<script>
    import AddOrUpdate from './tag-add-or-update'
    import {deleteTag, getTagList} from "../../api/tagApi";
    import {getValueByKey} from "../../util/myUtil";

    export default {
        data() {
            return {
                filter: {
                    pageNumber: 1,
                    pageSize: 10,
                    name: ""
                },
                typeList: [{
                    parKey: 0,
                    parValue: "文章"
                }],
                loading: false,
                list: [],
                total: 0,
                addOrUpdateVisible: false
            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
            this.getDataList()
        },
        methods: {
            getValue: function (key, valueTextArr) {
                return getValueByKey(key, valueTextArr);
            },
            // 获取数据列表
            getDataList() {
                this.loading = true;
                getTagList(this.filter).then(({data}) => {
                    if (data && data.code === 0) {
                        this.list = data.data.content;
                        this.total = data.data.totalElements;
                    } else {
                        this.list = [];
                        this.total = 0;
                    }
                    this.loading = false
                })
            },
            handleCurrentChange(val) {
                this.filter.pageNumber = val;
                this.getDataList();
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true;
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            deleteHandle(id) {
                deleteTag(id);
                this.getDataList();
            }
        }
    }
</script>
