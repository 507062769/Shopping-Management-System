<template>
    <div id="">
        <el-page-header content="添加用户" title="用户管理"></el-page-header>

        <el-form :model="userInfo" :rules="userInfoRule" ref="userInfoRuleRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="passWord">
                <el-input v-model="userInfo.passWord" show-password></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="userInfo.sex">
                    <el-radio :label="0">保密</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="角色" prop="role">
                <el-select v-model="userInfo.role" placeholder="请选择">
                    <el-option v-for="r in roles" :key="r.rid" :label="r.roleName" :value="r.rid">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="UploadAvatar"
                    :auto-upload="false">
                    <img v-if="userInfo.avatar" :src="uploadAvatarURL" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitUserInfoForm('userInfoRuleRef')">添加用户</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
import upload from '@/util/upload'

export default {
    name: "",
    components: {},
    data() {
        return {
            userInfo: {
                avatar: '',
                avatarFile: '',
            },
            // 用户信息的规则
            userInfoRule: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 20, message: '长度在20个字符', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { max: 20, message: '长度在10个字符', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'blur' },
                ],
                avatar: [
                    { required: false, message: '请上传头像', trigger: 'blur' },
                ]
            },
            roles: [
                {
                    rid: 1,
                    roleName: '管理员'
                }, {
                    rid: 2,
                    roleName: '商家'
                }, {
                    rid: 3,
                    roleName: '观察者'
                },
            ]
        }
    },
    create() { },
    mounted() { },
    watch: {},
    computed: {
        uploadAvatarURL() {
            // 当点了上传头像按钮，判断当前表单内的头像的值是否包含blob，
            return this.userInfo.avatar.includes("blob") ? this.userInfo.avatar : 'http://localhost:3000' + this.userInfo.avatar
        }
    },
    methods: {
        // 当用户点了上传按钮时,即头像发送改变时，调用这个函数
        UploadAvatar(file) {
            //把选中的图片修改成URL.createObjectURL(file.raw)这个格式，用于展示
            this.userInfo.avatar = URL.createObjectURL(file.raw)
            // 将二进制格式的图片地址放在avatarFile中，存储到数据库内
            this.userInfo.avatarFile = file.raw
        },
        submitUserInfoForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) { //符合规则
                    // 调用自己封装的upload方法，所有上传按钮都能调用upload方法，第一个参数为地址，第二个参数为表单值
                    const result = await upload('/adminAPI/user/add', this.userInfo)
                    // 返回200就更新localStore里的用户信息，并提醒用户更新成功
                    if (result.code === '200') {
                        this.$message({
                            message: "添加成功",
                            type: 'success'
                        });
                        this.userInfo = {}
                        this.$router.push("/userList")
                    }
                }
            })
        }

    },
}
</script>

<style scoped>
.demo-ruleForm {
    margin: 40px 0;
}


.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    height: 178px;
    width: 178px;
}
</style>