<template>
    <div id="parent">
        <el-aside width="200px">
            <el-menu :default-active="this.$route.fullPath" class="el-menu-vertical-demo" router>

                <el-menu-item index="/index">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>

                <el-menu-item index="/center">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">个人中心</span>
                </el-menu-item>

                <el-submenu index="/user-manage" v-role>
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/userAdd">添加用户</el-menu-item>
                    <el-menu-item index="/userList">用户列表</el-menu-item>
                </el-submenu>

                <el-menu-item index="/classification">
                    <i class="el-icon-s-opportunity"></i>
                    <span slot="title">分类管理</span>
                </el-menu-item>

                <el-submenu index="/goods-manage">
                    <template slot="title">
                        <i class="el-icon-s-goods"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="/goodsAdd">添加商品</el-menu-item>
                    <el-menu-item index="/goodsList">商品列表</el-menu-item>
                </el-submenu>

                <el-menu-item index="/transaction">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>


            </el-menu>
        </el-aside>
    </div>
</template>

<script>
import UserStore from "@/store/index"
export default {
    name: "",
    data() {
        return {

        }
    },
    methods: {
    },
    directives: {
        role: {
            inserted(el) {
                if (UserStore.state.userInfo.role !== 1) {
                    el.parentNode.removeChild(el);
                }
            }
        }
    }
}
</script>

<style scoped>
.el-aside {
    height: 100vh;
}

.el-menu-vertical-demo {
    height: 100vh;
}
</style>