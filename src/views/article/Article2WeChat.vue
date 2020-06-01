<template>
    <section>

        <el-form label-width="80px" ref="articleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="已选博文">
                        <el-select
                                @change=""
                                allow-create
                                default-first-option
                                filterable
                                multiple
                                placeholder="请选择文章"
                                style="width: 100%" v-model="selectIds">
                        </el-select>
                        <el-form-item>
                            <el-button @click="send2WeChatByIds" type="primary">推送</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input clearable="clearable" placeholder="标题" v-model="filters.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getDataList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="dataList" highlight-current-row style="width: 100%;" v-loading="loading">
            <el-table-column min-width="10%" type="index">
            </el-table-column>
            <el-table-column label="编号" prop="id">
            </el-table-column>
            <el-table-column label="博文标题" prop="title">
            </el-table-column>
            <el-table-column label="分类" prop="categoryListStr">
            </el-table-column>
            <el-table-column label="标签" prop="tagList">
                <template slot-scope="scope">
                    <el-row>
                        <el-button :key="tag.id" size="mini" v-for="tag in scope.row.tagList">{{tag.name}}
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column
                    align="center"
                    header-align="center"
                    label="选择"
                    prop="recommend">
                <template slot-scope="scope">
                    <el-tooltip class="item" content="选择" effect="dark" placement="top"
                                v-if="selectIds.includes(scope.row.id)"
                    >
                        <el-button @click="unSend2WeChat(scope.row.id)" size="mini" type="info">选择</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" content="未选择" effect="dark" placement="top" v-else
                    >
                        <el-button @click="send2WeChat(scope.row.id)" size="mini" type="false">未选择
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>

        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination :page-size="10" :total="total" @current-change="handleCurrentChange"
                           layout="prev, pager, next" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>
<script>
    import {getArticleList, send2WeChatByIds} from '../../api/articleApi';

    export default {
        data() {
            return {
                total: 0,
                filters: {
                    mediaId: '',
                    pageNumber: 1,
                    pageSize: 10,
                    title: ''
                },
                tagList: [],
                loading: false,
                dataList: [],
                selectIds: []
            }
        },
        methods: {
            getDataList: function () {
                this.loading = true;
                //NProgress.start();
                getArticleList(this.filters).then(({data}) => {
                    this.dataList = data.data.content;
                    this.total = data.data.totalElements;
                    this.loading = false;
                })
            },
            send2WeChatByIds: function () {
                this.loading = true;
                send2WeChatByIds(this.selectIds).then(() => {
                    this.loading = false;
                })
            },
            handleCurrentChange(val) {
                this.filters.pageNumber = val;
                this.getDataList();
            },
            // 推送到微信
            send2WeChat(id) {
                this.selectIds.push(id);

            },

            unSend2WeChat(id) {
                let index = this.selectIds.indexOf(id);
                this.selectIds.splice(0, index + 1);

            }
        },
        mounted() {
            this.getDataList();

        }
    };

</script>

<style scoped>

</style>
