<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAppoint">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <template>
            <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
                <el-table-column type="index" width="60">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="day" label="日期" width="200" sortable="sortable">
                </el-table-column>
                <el-table-column prop="timePoint.value" label="时间段" width="220" sortable="sortable">
                </el-table-column>
            </el-table>
        </template>

    </section>
</template>
<script>
    import {getAppointmentList} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                loading: false,
                users: []
            }
        },
        methods: {
            //获取用户列表
            getAppoint: function () {
                let queryParams = new FormData();

                this.loading = true;
                //NProgress.start();
                getAppointmentList(queryParams).then((res) => {
                    this.users = res.data.content;
                    this.loading = false;
                    //NProgress.done();
                });
            }
        },
        mounted() {
            this.getAppoint();
        }
    };

</script>

<style scoped>

</style>