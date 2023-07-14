<template>
    <div>
        <el-header>
            <div class="left">
                <i class="el-icon-s-shop"></i>
                <span>后台管理系统</span>
            </div>
            <div class="right">
                <span>欢迎 {{ userName }} </span>
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-user"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="/center">个人中心</el-dropdown-item>
                        <el-dropdown-item command="/login">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>

<script>
import userStore from "@/store"
export default {
    name: "",
    components: {},
    data() {
        return {
        }
    },
    methods: {
        goCenter() {
            console.log("go");
            this.$router.push("/center").catch(() => {
                alert("出错啦！")
            })
        },
        handleCommand(command) {
            // 根据点击时传回的command做路径跳转
            this.$router.push(command).then((data) => {
                // 如果点的是退出
                if (data.fullPath === '/login') {
                    // 清除localStorage里的token，并提示成功
                    localStorage.removeItem("token")
                    userStore.commit("clearUserInfo")
                    this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
                }
            }).catch(() => {
                alert("出错啦！")
            })
        }
    },
    computed: {
        userName() {
            return userStore.state.userInfo.userName
        }
    }
}
</script>

<style lang="less" scoped>
.el-header {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: #fe9e4a;
    color: white;
    display: flex;
    justify-content: space-between;


    .left {

        span {
            font-size: 20px;
            margin-left: 10px;
        }
    }

    .right {
        .el-icon-user {
            margin-left: 10px;
            font-size: 20px;
            cursor: pointer;

        }
    }

}
</style>