<template>
    <div id="login">
        <el-card class="box-card">
            <h1>淘宝后台管理系统</h1>
            <el-form :model="LoginForm" status-icon :rules="rules" ref="LoginFormRef" label-width="80px"
                class="demo-ruleForm">
                <el-form-item label="账户名" prop="userName">
                    <el-input v-model="LoginForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input type="password" v-model="LoginForm.passWord" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('LoginFormRef')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
import userStore from '@/store';
export default {
    name: "Login",
    components: {},
    data() {
        return {
            LoginForm: {
                userName: "",
                passWord: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入账号名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    create() { },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
        submitForm(formName) {
            // 校验表单
            this.$refs[formName].validate((valid) => {
                // 当校验通过时
                if (valid) {
                    this.$axios.post("/adminAPI/user/login", this.LoginForm).then(res => {
                        if (res.data.code === '200') {
                            userStore.commit("changeUserInfo", res.data.data)
                            userStore.commit("changeFirstRouter", true);
                            // 跳转页面
                            this.$router.push("index")
                                .then((value) => {
                                    this.$message({
                                        message: "登录成功",
                                        type: 'success'
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        } else {
                            this.$message({
                                message: "用户名密码不匹配",
                                type: 'error'
                            });
                        }

                    }).catch(err => {
                        console.log(err);
                    })

                } else return false;
            });
        },
    },
}
</script>

<style scoped lang="less">
#login {
    width: 550px;
    height: 200px;
    margin: 160px auto;

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    ::v-deep .el-button {

        margin: 0 130px;
    }
}
</style>