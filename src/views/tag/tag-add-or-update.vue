<template>
    <el-dialog
            :title="!dataForm.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="120px">
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="dataForm.name" placeholder="标签名字"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="type">
                <el-select v-model="dataForm.type">
                    <el-option
                            v-for="type in typeList"
                            :key="type.parKey"
                            :value="type.parKey"
                            :label="type.parValue"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="confirmButtonDisabled">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import {saveOrUpdateTag} from "../../api/tagApi";

    export default {
        data() {
            return {
                visible: false,
                confirmButtonDisabled: false,
                dataForm: {
                    type: ''
                },
                dataRule: {
                    name: [{required: true, message: '标签名称不能为空', trigger: 'blur'}],
                    type: [{required: true, message: '所属类别不能为空', trigger: 'blur'}]
                },
                typeList: [{
                    parKey: 0,
                    parValue: "文章"
                }].filter(type => {
                    if (type.parKey !== 2) {
                        return type
                    }
                })
            }
        },
        methods: {
            init(id) {
                this.dataForm.id = id || ''
                this.visible = true
                this.confirmButtonDisabled = false
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                    if (this.dataForm.id) {
                        this.$http({
                            url: this.$http.adornUrl(`/admin/operation/tag/info/${this.dataForm.id}`),
                            method: 'get',
                            params: this.$http.adornParams()
                        }).then(({data}) => {
                            if (data && data.code === 200) {
                                this.dataForm = data.tag
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
                        saveOrUpdateTag(this.dataForm).then(({data}) => {
                            if (data && data.code === 0) {
                                alert("成功");
                                this.visible = false;
                                this.$emit('refreshDataList')
                            } else {
                                alert(data.msg)
                            }
                        });
                    }
                })
            }
        }
    }
</script>
