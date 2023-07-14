<template>
    <div id="">
        <el-page-header content="首页" title="后台管理系统"></el-page-header>
        <el-card class="box-card">
            <el-row>
                <el-col :span="3">
                    <el-avatar :size="100" :src="imgURL"></el-avatar>
                </el-col>
                <el-col :span="21">
                    <h2>欢迎 {{ userName }} 回来，喝杯咖啡提提神吧！</h2>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>
import userStore from "@/store/index"
export default {
    name: "",
    components: {},
    data() {
        return {
        }
    },
    create() { },
    mounted() {
    },
    watch: {},
    computed: {
        userName() {
            return userStore.state.userInfo.userName
        },
        imgURL() {
            return userStore.state.userInfo.avatar ? 'http://localhost:3000' + userStore.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
    methods: {},
}
</script>

<style scoped>
.box-card {
    margin: 40px 0;
}

h2 {
    line-height: 100px;
}
</style>