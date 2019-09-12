<template>
    <el-dialog
            :title="!dataForm.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="120px">
            <el-form-item>
                <el-popover v-show="recommendListShow"
                            placement="right"
                            width="500"
                            trigger="click">
                    <el-form :inline="true" @keyup.enter.native="listRecommend()">
                        <el-form-item>
                            <el-select v-model="listParams.type" value="">
                                <el-option v-for="type in typeList" :key="type.parKey" :value="type.parKey"
                                           :label="type.parValue"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="listParams.title" placeholder="文章标题" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="listRecommend()">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="recommendList" style="height: 500px;overflow: auto">
                        <el-table-column property="title" label="文章标题"></el-table-column>
                        <el-table-column property="type" label="文章类型">
                            <template slot-scope="scope">
                                {{getValue(scope.row.type,typeList)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                header-align="center"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="success" size="small" @click="selectRecommend(scope.row)">选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button slot="reference" @click="showListRecommend()">请选择推荐文章</el-button>
                </el-popover>
            </el-form-item>
            <el-form-item label="推荐文章">
                {{dataForm.title}}
            </el-form-item>
            <el-form-item label="推荐类型">
                {{getValue(dataForm.type,typeList)}}
            </el-form-item>
            <el-form-item label="顺序">
                <el-input v-model="dataForm.orderNum" type="number" placeholder="顺序"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="confirmButtonDisabled">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import {getRecommendInfo, saveOrUpdateRecommend} from "../../api/recommendApi";
    import {getArticleList, getPublicArticleList} from "../../api/articleApi";
    import {getValueByKey} from "../../util/myUtil";

    export default {
        data() {
            return {
                visible: false,
                confirmButtonDisabled: false,
                dataForm: {},
                dataRule: {
                    linkId: [{required: true, message: '推荐的文章Id不能为空', trigger: 'blur'}],
                    type: [{required: true, message: '推荐类型不能为空', trigger: 'blur'}]
                },
                recommendListShow: true,
                recommendList: [],
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
                }],
                listParams: {
                    pageNumber: 1,
                    pageSize: 10,
                    title: ""
                }
            }
        },
        methods: {
            init(id) {
                this.dataForm.id = id || '';
                this.visible = true;
                this.confirmButtonDisabled = false;
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();
                    if (this.dataForm.id) {
                        getRecommendInfo(this.dataForm.id).then(({data}) => {
                            if (data && data.code === 0) {
                                this.dataForm = data.data
                            }
                        })
                    } else {
                        this.dataForm = {}
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        saveOrUpdateRecommend(this.dataForm).then(({data}) => {
                            this.confirmButtonDisabled = true;
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1000,
                                    onClose: () => {
                                        this.visible = false;
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                alert(data.message)
                            }
                        })
                    }
                })
            },
            showListRecommend() {
                this.recommendListShow = true;
                this.listRecommend();
            },
            listRecommend() {
                getPublicArticleList(this.listParams).then(({data}) => {
                    this.recommendList = data.data.content
                });
            },
            selectRecommend(recommend) {
                this.dataForm.linkId = recommend.id;
                this.dataForm.title = recommend.title;
                this.dataForm.type = recommend.type | 0;
                this.recommendListShow = false
            },
            getValue(key, valueTextArr) {
                return getValueByKey(key, valueTextArr);
            }
        }
    }
</script>
