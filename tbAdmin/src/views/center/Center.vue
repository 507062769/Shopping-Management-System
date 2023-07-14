<template>
    <div id="">
        <el-page-header content="个人中心" title="后台管理系统"></el-page-header>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarURL"></el-avatar>
                    <h2> {{ userName }}</h2>
                    <h3>{{ role }}</h3>
                </el-card>
            </el-col>

            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <el-form :model="userInfo" :rules="userInfoRule" ref="userInfoRuleRef" label-width="100px"
                        class="demo-ruleForm">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model="userInfo.userName"></el-input>
                        </el-form-item>

                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="userInfo.sex">
                                <el-radio :label="0">保密</el-radio>
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false" :on-change="UploadAvatar" :auto-upload="false">
                                <img v-if="userInfo.avatar" :src="uploadAvatarURL" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitUserInfoForm('userInfoRuleRef')">更新</el-button>
                        </el-form-item>

                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import userStore from "@/store/index"
import upload from '@/util/upload'
export default {
    name: "",
    components: {},
    data() {
        return {
            userInfo: {
                avatarFile: null,
            },
            // 用户信息的规则
            userInfoRule: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 20, message: '长度在20个字符', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                avatar: [
                    { required: true, message: '请上传头像', trigger: 'blur' },
                ]
            }

        }
    },
    mounted() {
        // 页面加载完，初始化用户信息
        this.userInfo = { ...userStore.state.userInfo }
    },
    computed: {
        userName() {
            // 返回vuex中的用户名
            return userStore.state.userInfo.userName
        },
        role() {
            // 根据vuex中的权限，选择对应的值
            switch (userStore.state.userInfo.role) {
                case 1:
                    return "管理员"
                default:
                    return "其他"
            }
        },
        avatarURL() {
            // 判断vuex中是否存在头像，存在就取出存放的地址并拼接上后台的地址，不存在就用默认头像
            return userStore.state.userInfo.avatar ? 'http://localhost:3000' + userStore.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
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
        // 更新的回调函数
        submitUserInfoForm(formName) {
            // 判断规则
            this.$refs[formName].validate(async (valid) => {
                if (valid) { //符合规则
                    // 调用自己封装的upload方法，所有上传按钮都能调用upload方法，第一个参数为地址，第二个参数为表单值
                    const result = await upload('/adminAPI/user/upload', this.userInfo)
                    // 返回200就更新localStore里的用户信息，并提醒用户更新成功
                    if (result.code === '200') {
                        userStore.commit("changeUserInfo", result.data)
                        this.$message({
                            message: "更新成功",
                            type: 'success'
                        });
                    }
                } else {
                    console.log('不符合更新规则！');
                    return false;
                }
            });
        }
    },
}
</script>

<style scoped>
.el-row {
    margin: 40px 0;
}

.box-card {
    text-align: center;
}

.clearfix {
    text-align: left;
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