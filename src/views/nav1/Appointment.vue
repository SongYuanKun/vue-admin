<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item label="预约人姓名">
                    <el-input v-model="filters.userName" placeholder="预约人姓名"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col>
                        <el-date-picker placeholder="选择日期" v-model="filters.day" format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAppoint">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="id" label="编号" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="userName" label="姓名" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="day" label="日期" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="timePoint.value" label="时间段" width="120" sortable="sortable">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" sortable="sortable">
                </el-table-column>
                <el-table-column label="操作" width="150">
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
        </template>

    </section>
</template>
<script>
    import moment from 'moment'
    import {getAppointmentList, changeStatus} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    pageNumber: 1,
                    pageSize: 10,
                    userName: '',
                    day: ''
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
                getAppointmentList(this.filters).then((res) => {
                    this.list = res.data.content;
                    this.loading = false;
                    //NProgress.done();
                });
            },
            changeStatus: function (id, status) {
                this.loading = true;
                console.info(id + "==" + status);
                let queryParams = {"id": id, "status": status};
                changeStatus(queryParams).then((res) => {
                    console.info(res.data);
                    this.getAppoint();
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.filters.day = new Date();
            this.getAppoint();

        }
    };

</script>

<style scoped>

</style>