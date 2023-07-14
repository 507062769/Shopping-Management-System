<template>
    <div class="root">
        <div class="login_header">
            <img src="../assets/tblogo.png" alt="">
        </div>
        <div class="main_context">
            <div class="juzhong">
                <div class="card">
                    <form action="">
                        <div class="card_input">
                            <input type="text" name="account" id="account" placeholder="账号名">
                            <input type="password" name="password" id="password" placeholder="请输入登录密码">
                            <input type="submit" id="login" value="登录">
                        </div>
                    </form>
                    <p class="card_more">
                        <span>忘记密码</span>
                        <span>免费注册</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "tbLogin",
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

<style scoped lang="less">
.root {
    width: 100%;
    background-color: #fff;
}

.center {
    width: 80%;
    margin: 0 auto;
}

.login_header {
    height: 80px;
    .center();

    img {
        width: 72px;
        height: 45px;
        margin: 17px 0;
    }
}

.main_context {
    height: 610px;
    width: 100%;
    background: url("https://gtms01.alicdn.com/tps/i1/TB1GTCYLXXXXXcHXpXXcoeQ2VXX-2500-600.jpg");
    background-position: center;

    .juzhong {
        .center();
        position: relative;

        .card {
            height: 300px;
            width: 300px;
            border-radius: 20px;
            border: 1px solid #ff4400;
            background-color: #fff;
            position: absolute;
            top: 200px;
            right: 0;

            .card_input {
                position: relative;
                height: 230px;
                width: 100%;

                input[name="account"],
                input[name="password"],
                input[type="submit"] {
                    height: 42px;
                    position: absolute;
                    left: 53px;
                }

                input[name="account"] {
                    padding-left: 10px;
                    width: 180px;
                    top: 35px;
                }

                input[name="password"] {
                    padding-left: 10px;
                    width: 180px;
                    top: 100px;
                }

                input[type="submit"] {
                    width: 190px;
                    top: 160px;
                    background-color: #ff4400;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }
            }

            .card_more {
                height: 70px;
                margin-right: 53px;
                line-height: 70px;
                text-align: right;

                span {
                    color: #aaa;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }




        }
    }
}
</style>