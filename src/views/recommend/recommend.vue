<template>
    <div class="mod-config">
        <el-form :inline="true" :model="filter" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="filter.title" placeholder="标题" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="dataList"
                border
                v-loading="dataListLoading"
                style="width: 100%;">
            <el-table-column
                    prop="title"
                    header-align="center"
                    align="center"
                    label="推荐标题">
            </el-table-column>
            <el-table-column
                    prop="type"
                    header-align="center"
                    align="center"
                    label="推荐类型">
                <template slot-scope="scope">
                    {{getValue(scope.row.type,typeList)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="orderNum"
                    header-align="center"
                    align="center"
                    label="顺序">
            </el-table-column>
            <el-table-column
                    prop="recommend"
                    header-align="center"
                    align="center"
                    label="置顶">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="点击置顶" v-if="!scope.row.top" placement="top">
                        <el-button type="info" size="mini" @click="updateTop(scope.row.id)">未置顶</el-button>
                    </el-tooltip>
                    <el-button type="success" size="mini" v-if="scope.row.top">已置顶</el-button>
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
    import AddOrUpdate from './recommend-add-or-update'
    import {deleteById, getRecommendList, updateTop} from "../../api/recommendApi";
    import {getValueByKey} from "../../util/myUtil";

    export default {
        data() {
            return {
                filter: {
                    pageNumber: 1,
                    pageSize: 10,
                    title: "",
                    type: ""
                },
                typeList: [{
                    parKey: 0,
                    parValue: "文章"
                }],
                total: 0,
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false
            }
        },
        components: {
            AddOrUpdate
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            // 获取数据列表
            getDataList() {
                this.loading = true;
                //NProgress.start();
                getRecommendList(this.filter).then(({data}) => {
                    console.info(data);
                    if (data && data.code === 0) {
                        this.dataList = data.data.content;
                        this.total = data.data.totalElements;
                    }
                    this.loading = false;
                });
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
                deleteById(id).then(({data}) => {
                    if (data && data.code === 0) {
                        this.getDataList();
                    } else {
                        alert(data.message);
                    }
                })
            },
            // 更新文章推荐状态
            updateTop(id) {
                updateTop(id).then(({data}) => {
                    if (data && data.code === 0) {
                        this.getDataList();
                    } else {
                        alert(data.message);
                    }
                })
            },

            getValue(key, valueTextArr) {
                return getValueByKey(key, valueTextArr);
            }
        }
    }
</script>
