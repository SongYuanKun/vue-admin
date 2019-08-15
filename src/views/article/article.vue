<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input placeholder="标题" v-model="filters.title" clearable="clearable"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAppoint">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" min-width="10%">
                </el-table-column>
                <el-table-column prop="id" label="编号" sortable="sortable">
                </el-table-column>
                <el-table-column prop="userName" label="姓名" sortable="sortable">
                </el-table-column>
                <el-table-column prop="phone" label="电话" sortable="sortable">
                </el-table-column>
                <el-table-column prop="day" label="日期" sortable="sortable">
                </el-table-column>
                <el-table-column prop="timeValue" label="时间段" sortable="sortable">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatStatus" sortable="sortable">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" v-if="scope.row.status!==1&&scope.row.status!==2"
                                   @click="changeStatus(scope.row.id,1)">签到
                        </el-button>
                        <el-button size="small" v-if="scope.row.status!==1&&scope.row.status!==2"
                                   @click="changeStatus(scope.row.id,2)">取消
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                               :total="total" style="float:right;">
                </el-pagination>
            </el-col>
        </template>

    </section>
</template>
<script>
    import {getArticleList} from '../../api/api';

    export default {
        data() {
            return {
                total: 0,
                filters: {
                    pageNumber: 1,
                    pageSize: 10,
                    title: ''
                },
                loading: false,
                list: []
            }
        },
        methods: {
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
                //NProgress.start();
                getArticleList(this.filters).then((res) => {
                    this.list = res.data.content;
                    this.total = res.data.totalElements;
                    this.loading = false;
                    //NProgress.done();
                });
            },
            handleCurrentChange(val) {
                this.filters.pageNumber = val;
                this.getAppoint();
            }
        },
        mounted() {
            this.getAppoint();

        }
    };

</script>

<style scoped>

</style>
