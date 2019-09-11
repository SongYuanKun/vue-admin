<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input placeholder="标题" v-model="filters.title" clearable="clearable"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getDataList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column type="index" min-width="10%">
            </el-table-column>
            <el-table-column prop="id" label="编号">
            </el-table-column>
            <el-table-column prop="title" label="博文标题">
            </el-table-column>
            <el-table-column prop="categoryListStr" label="分类">
            </el-table-column>
            <el-table-column prop="tagList" label="标签">
                <template slot-scope="scope">
                    <el-row>
                        <el-button v-for="tag in scope.row.tagList" :key="tag.id" size="mini">{{tag.name}}
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="readNum" label="浏览">
            </el-table-column>
            <el-table-column prop="commentNum" label="评论">
            </el-table-column>
            <el-table-column prop="likeNum" label="喜欢">
            </el-table-column>
            <el-table-column prop="recommend" label="推荐">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.recommend"
                            active-color="#13ce66"
                            @change="updateRecommend(scope.row.id,scope.row.recommend)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="recommend"
                    header-align="center"
                    align="center"
                    label="置顶">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.top"
                            active-color="#13ce66"
                            @change="updateTop(scope.row.id,scope.row.top)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    prop="recommend"
                    header-align="center"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="点击发布" v-if="!scope.row.publish" placement="top">
                        <el-button type="info" size="mini" @click="updatePublish(scope.row.id, true)">未发布</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="点击下架" v-if="scope.row.publish" placement="top">
                        <el-button type="success" size="mini" @click="updatePublish(scope.row.id, false)"
                                   v-if="scope.row.publish === true">已发布
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
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
    </section>
</template>
<script>
    import {deleteById, getArticleList, updateStatus} from '../../api/articleApi';

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

            getDataList: function () {
                this.loading = true;
                //NProgress.start();
                getArticleList(this.filters).then((res) => {
                    this.list = res.data.content;
                    this.total = res.data.totalElements;
                    this.loading = false;
                });
            },
            handleCurrentChange(val) {
                this.filters.pageNumber = val;
                this.getDataList();
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.$router.push({path: 'article/article/update/' + id})
            },
            deleteHandle(id) {
                deleteById(id).then(({data}) => {
                    if (data && data.status === 0) {
                        this.getDataList();
                    } else {
                        alert(data.message);
                    }
                })
            },
            // 更新文章推荐状态
            updateRecommend(id, value) {
                let data = {
                    id: id,
                    recommend: value
                };
                this.updateStatus(data)
            },
            // 更新文章推荐状态
            updateTop(id, value) {
                let data = {
                    id: id,
                    top: value
                };
                this.updateStatus(data)
            },
            // 更新文章发布状态
            updatePublish(id, value) {
                let data = {
                    id: id,
                    publish: value
                };
                this.updateStatus(data)
            },
            // 更新文章
            updateStatus(data) {
                updateStatus(data).then(({data}) => {
                    if (data && data.code === 0) {
                        this.getDataList();
                    } else {
                        alert(data.message);
                    }
                })
            }
        },
        mounted() {
            this.getDataList();

        }
    };

</script>

<style scoped>

</style>
