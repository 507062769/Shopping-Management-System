<template>
    <div id="tb_header">
        <div class="tb_container">
            <span class="left">
                <router-link to="/login">亲，请登录</router-link>
                <a href="#">免费注册</a>
            </span>
            <span class="right">
                <a href="#">我的淘宝</a>
                <a href="#">购物车</a>
                <a href="#">收藏夹</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "tbHeader",
    components: {},
    data() {
        return {
        }
    },
    create() { },
    mounted() { },
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style lang="less" scoped>
@bgColor: #e7e3e4;
@color: #ff5500;
@radius: 20px;

#tb_header {
    height: 35px;
    line-height: 35px;
    background-color: #f5f5f5;

    .container {
        width: 80%;
        margin: 0 auto;
        position: relative;
    }

    .tb_container {
        .container();

        .left {
            float: left;
        }

        .right {
            float: right;
        }

        a {
            color: #666;
            margin: 0 10px;
        }

        a:hover {
            color: @color;
        }
    }
}
</style>