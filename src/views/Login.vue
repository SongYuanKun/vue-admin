<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
            <el-row :gutter="20">
                <el-col :span="14">
                    <el-input v-model="ruleForm2.captcha" placeholder="验证码">
                    </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                    <img width="100%" :src="captchaPath" @click="getCaptcha()" alt="">
                </el-col>
            </el-row>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="login">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {getBase, requestLogin, resetHeader} from '../api/api';
    import {getUserInfo} from '../api/userApi';
    import {getUUID} from "../util/myUtil";

    export default {
        data() {
            return {
                login: false,
                captchaPath: "",
                ruleForm2: {
                    captcha: "",
                    uuid: "",
                    account: '18201153450',
                    checkPass: '123456'
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ]
                },
                checked: true
            };
        },
        created() {
            this.getCaptcha()
        },
        methods: {
            handleSubmit2() {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.login = true;
                        let loginParams = new FormData();
                        loginParams.append('phone', this.ruleForm2.account);
                        loginParams.append('password', this.ruleForm2.checkPass);
                        loginParams.append('uuid', this.ruleForm2.uuid);
                        loginParams.append('captcha', this.ruleForm2.captcha);

                        requestLogin(loginParams).then(result => {
                            this.login = false;
                            //NProgress.done();
                            let {message, code, data} = result;
                            if (code !== 0) {
                                this.$message({
                                    message: message,
                                    type: 'error'
                                });
                                this.getCaptcha()
                            } else {
                                sessionStorage.setItem('token', data);
                                resetHeader();
                                getUserInfo().then((res) => {
                                    sessionStorage.setItem("user", JSON.stringify(res.data));
                                    this.$router.push({path: '/user'});
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCaptcha: function () {
                let uuid = getUUID();
                this.ruleForm2.uuid = uuid;
                this.captchaPath = getBase() + "/captcha.jpg?uuid=" + uuid
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0 0 35px 0;
        }
    }
</style>
