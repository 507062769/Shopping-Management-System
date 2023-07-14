<template>
    <div>
        <div class="search_flexd">
            <img src="../assets/tblogo.png" alt="" />
            <div class="search_flexd_father">
                <input type="text" placeholder="T恤" />
                <button>搜索</button>
            </div>
        </div>
        <div class="container">
            <!-- 搜索栏 -->
            <div class="tb_searchBanner">
                <img src="../assets/tblogo.png" alt="" />
                <div class="tb_search">
                    <div class="tb_search_father">
                        <input type="text" placeholder="关键字" />
                        <button>搜索</button>
                    </div>
                    <span>热词 衣服 包包 裤子</span>
                </div>
                <div style="width: 120px"></div>
            </div>
            <!-- 首屏 -->
            <div class="tb_first-screen">
                <!-- 分类类名与广告 -->
                <div class="first-screen_classify">
                    <!-- 分类的类名 -->
                    <div class="first-screen_classify_left">
                        <p class="classify_title">分类</p>
                        <!-- 详细类名 -->
                        <div class="classify">
                            <a href="#">
                                <span>居家生活</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>女装/女鞋/女士精品</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>男装/男鞋/男士精品 </span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>箱包/配饰</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>运动户外</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>3C数码/手机/智能设备</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>笔记本/网络服务</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>模玩/动漫/周边</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>玩具/母婴用品</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>汽车/虚拟</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>家电/影音</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>美妆洗护</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>零食饮料</span>
                                <span> > </span>
                            </a>
                            <a href="#">
                                <span>医药健康</span>
                                <span> > </span>
                            </a>
                        </div>
                        <!-- 类名的产品 -->
                        <div class="classify_list">
                            <div class="list_module">
                                <div class="list_module_title">
                                    <a href="#">
                                        <span>女装</span>
                                    </a>
                                </div>
                                <div class="list_module_allList">
                                    <a href="">连衣裙</a>
                                    <a href="">T恤</a>
                                    <a href="">衬衫</a>
                                    <a href="">裤子</a>
                                    <a href="">套装</a>
                                    <a href="">毛针织衫</a>
                                    <a href="">牛仔裤</a>
                                    <a href="">半身裙</a>
                                    <a href="">卫衣</a>
                                    <a href="">绒衫</a>
                                    <a href="">毛衣</a>
                                </div>
                            </div>
                            <div class="list_module">
                                <div class="list_module_title">
                                    <a href="#">
                                        <span>女鞋</span>
                                    </a>
                                </div>
                                <div class="list_module_allList">
                                    <a href="">低帮鞋</a>
                                    <a href="">靴子</a>
                                    <a href="">凉鞋</a>
                                    <a href="">拖鞋</a>
                                    <a href="">帆布鞋</a>
                                </div>
                            </div>
                            <div class="list_module">
                                <div class="list_module_title">
                                    <a href="#">
                                        <span>家居服</span>
                                    </a>
                                </div>
                                <div class="list_module_allList">
                                    <a href="">文胸</a>
                                    <a href="">短袜/打底袜/丝袜</a>
                                    <a href="">睡裙</a>
                                    <a href="">文胸套装</a>
                                    <a href="">吊带/背心/T恤</a>
                                </div>
                            </div>
                            <div class="list_module">
                                <div class="list_module_title">
                                    <a href="#">
                                        <span>饰品</span>
                                    </a>
                                </div>
                                <div class="list_module_allList">
                                    <a href="">DIY配件</a>
                                    <a href="">耳饰</a>
                                    <a href="">手链</a>
                                    <a href="">首饰收纳</a>
                                    <a href="">项链</a>
                                    <a href="">发饰</a>
                                    <a href="">戒指/指环</a>
                                </div>
                            </div>
                        </div>
                        <!-- 显示更多按钮 -->
                        <div class="show-more">
                            <p>
                                查看更多
                                <img src="../assets/down.png" alt="" />
                            </p>
                        </div>
                    </div>
                    <!-- 广告 -->
                    <div class="first-screen_classify_mid">
                        <!-- 广告标题 -->
                        <div class="classify_mid_title">
                            <span>天猫</span>
                            <span>聚划算</span>
                        </div>
                        <!-- 天天特卖模块 -->
                        <div class="dailySale">
                            <!-- 模块名 -->
                            <div class="dailySale_title">
                                <span>天天特卖</span>
                                <img src="../assets/cztm.png" alt="" />
                            </div>
                            <!-- 所属商品 -->
                            <div class="dailySale_goods">
                                <a href="#">
                                    <img src="../../public/img/goods/sp1.jpg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../../public/img/goods/sp2.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                        <!-- iFashion模块 -->
                        <div class="iFashion">
                            <!-- 模块名 -->
                            <div class="iFashion_title">
                                <span>iFashion</span>
                                <img src="../assets/sscd.png" alt="" />
                            </div>
                            <!-- 所属商品 -->
                            <div class="iFashion_goods">
                                <a href="#">
                                    <img src="../../public/img/goods/sp3.jpg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../../public/img/goods/sp4.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                        <!-- 有好货模块 -->
                        <div class="greatGoods">
                            <!-- 模块名 -->
                            <div class="greatGoods_title">
                                <span>有好货</span>
                                <img src="../assets/qmkb.png" alt="" />
                            </div>
                            <!-- 所属商品 -->
                            <div class="greatGoods_goods">
                                <a href="#">
                                    <img src="../../public/img/goods/sp5.jpg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../../public/img/goods/sp6.jpg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../../public/img/goods/sp7.jpg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../../public/img/goods/sp8.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 首屏右手用户信息 -->
                <div class="first-screen_userInfo">
                    <!-- 用户信息 -->
                    <div class="first-screen_userInfo_info">
                        <!-- 用户头像 -->
                        <div class="userInfo_info_top">
                            <a href="#" class="userInfo_info_avatar">
                                <img src="../assets/userInfo_info_avatar.jpg" alt="" />
                            </a>
                            <span>Hi！你好~</span>
                        </div>
                        <!-- 登录注册按钮 -->
                        <div class="userInfo_top_btn">
                            <a href="#" class="userInfo_top_btn_login">登录</a>
                            <a href="#" class="userInfo_top_btn_register">
                                <div>
                                    <img src="../assets/红包.png" alt="" />
                                    <span>注册领红包</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <p class="first-screen_title">专属会员服务</p>

                    <!-- 会员服务模块 -->
                    <div class="first-screen_userInfo_services">
                        <a href="#">
                            <img src="../assets/hyfw1.png" alt="" />
                            <p>官方物流</p>
                        </a>
                        <a href="#">
                            <img src="../assets/hyfw2.png" alt="" />
                            <p>外币支付</p>
                        </a>
                        <a href="#">
                            <img src="../assets/hyfw3.png" alt="" />
                            <p>新人攻略</p>
                        </a>
                        <a href="#">
                            <img src="../assets/hyfw4.png" alt="" />
                            <p>买家保障</p>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 商品List模块 -->
            <div class="goods_Lists" id="goods_Lists">
                <!-- 模块名 -->
                <div class="goods_Lists_title">
                    <span>猜你喜欢</span>
                    <img src="../assets/gxtj.png" alt="" />
                </div>
                <!-- 显示商品 -->
                <div class="goods_Lists_show">
                    <!-- 单个商品显示 -->
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                    <div class="goods_info">
                        <img src="../../public/img/goods/sp9.jpg" alt="" class="info_img" />
                        <p class="info_desc">
                            2023年新款时尚真丝桑蚕丝女装连衣裙子夏装醋酸面料法式国际大牌
                        </p>
                        <p class="info_bottom">
                            <span class="info_price">￥68.0</span>
                            <span class="info_bought">&nbsp;168人付款</span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 侧边栏模块 -->
            <div class="tb_sidebar">
                <a href="#goods_Lists" class="active">
                    <span>喜欢</span>
                </a>
                <a href="#">
                    <span>反馈</span>
                </a>
                <a href="#">
                    <span>客服</span>
                </a>
                <a href="#tb_header">
                    <span>顶部</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "tbHome",
    components: {},
    data() {
        return {
        }
    },
    create() { },
    mounted() {
        this.init()
    },
    watch: {},
    computed: {},
    methods: {
        init() {
            // 搜索栏
            const search = document.querySelector(".search_flexd");
            // 电梯
            const sidebar = document.querySelector(".tb_sidebar");

            window.onscroll = function () {
                const scrollHeight =
                    document.body.scrollTop || document.documentElement.scrollTop;
                console.log(scrollHeight);
                // 搜索栏的判断
                if (scrollHeight >= 100) {
                    search.style.opacity = 1;
                    search.style.zIndex = 10;
                } else {
                    search.style.opacity = 0;
                    search.style.zIndex = -10;
                }
                // 电梯的判断
                if (scrollHeight >= 544) {
                    sidebar.style.position = "fixed";
                    sidebar.style.top = "60px";
                    sidebar.style.right = "82px";
                } else {
                    sidebar.style.position = "absolute";
                    sidebar.style.top = "570px";
                    sidebar.style.right = "-70px";
                }
            };
        }
    },
}
</script>

<style scoped lang="less">
@bgColor: #e7e3e4;
@color: #ff5500;
@radius: 20px;

.container {
    width: 80%;
    margin: 0 auto;
    position: relative;
}

.search_flexd {
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    opacity: 0;
    z-index: -10;

    img {
        width: 56px;
        height: 35px;
        display: inline-block;
        margin-left: 150px;
    }

    .search_flexd_father {
        display: inline-block;
        position: relative;
        margin-left: 240px;

        input {
            width: 590px;
            height: 40px;
            border-radius: @radius;
            border: 1px solid @color;
            font-size: 16px;
            padding-left: 10px;
        }

        button {
            width: 60px;
            height: 35px;
            position: absolute;
            font-size: 18px;
            border-radius: 50px;
            border: none;
            background-color: @color;
            color: #fff;
            text-align: center;
            right: 4px;
            top: 4px;
            cursor: pointer;
        }
    }
}

.tb_searchBanner {
    height: 100px;
    display: flex;
    justify-content: center;
    padding-top: 20px;

    img {
        height: 80px;
        width: 100px;
        margin-right: 20px;
    }

    .tb_search {
        height: 80px;
        width: 630px;
        display: flex;
        flex-direction: column;

        .tb_search_father {
            position: relative;

            input {
                width: 590px;
                height: 40px;
                margin-top: 5px;
                border-radius: 50px;
                border: none;
                padding: 0 20px;
                font-size: 16px;
            }

            button {
                position: absolute;
                font-size: 18px;
                width: 70px;
                height: 30px;
                border-radius: 50px;
                border: none;
                background-color: @color;
                color: #fff;
                text-align: center;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }
        }

        span {
            margin-top: 10px;
            padding-left: 20px;
            font-size: 12px;
        }
    }
}

.tb_first-screen {
    height: 430px;
    width: 100%;

    .first-screen_classify {
        height: 100%;
        width: 888px;
        float: left;
        border-radius: @radius;
        display: flex;
        background-color: #fff;

        .first-screen_classify_left {
            width: 230px;
            height: 100%;
            border-radius: @radius;
            overflow: hidden;
            position: relative;
            background-color: #fff;
            display: inline-block;

            .classify_title {
                height: 40px;
                width: 180px;
                font-size: 20px;
                line-height: 40px;
                margin-left: 20px;
            }

            .classify {
                background-color: #fff;
                border-radius: @radius;

                a {
                    display: block;
                    height: 32px;
                    line-height: 32px;
                    margin-left: 20px;

                    :nth-child(1) {
                        font-size: 14px;
                    }

                    :nth-child(2) {
                        float: right;
                        color: #bbb;
                        margin-right: 10px;
                    }
                }

                :hover {
                    background-color: #ffdccc;
                }
            }

            .classify_list {
                position: absolute;
                top: 0;
                left: 230px;
                width: 670px;
                height: 500px;
                background-color: #fff;
                border: 1px solid @color;
                display: none;
                // overflow: scroll;
                // overflow-x: hidden;
                z-index: 1;

                .list_module {
                    height: 80px;
                    width: 630px;
                    margin: 20px;

                    .list_module_title {
                        margin-bottom: 15px;

                        a {
                            color: #000;
                            font-size: 20px;
                        }
                    }

                    .list_module_allList a {
                        color: #bbb;
                        font-size: 14px;
                        margin-right: 15px;
                    }
                }
            }

            .show-more {
                font-size: 12px;
                position: absolute;
                top: 408px;
                left: 50px;
                border: 1px solid #bbb;
                background-color: #fff;

                p {
                    height: 20px;
                    width: 100px;
                    color: #bbb;
                    text-align: center;

                    img {
                        width: 12px;
                        height: 12px;
                    }
                }
            }
        }

        .first-screen_classify_left:hover {
            overflow: visible;
        }

        :hover .show-more {
            display: none;
        }

        :hover .classify_list {
            display: inline-block;
        }

        .first-screen_classify_mid {
            height: 100%;
            width: 658px;
            border-radius: @radius;
            position: relative;

            .classify_mid_title {
                height: 40px;
                width: 680px;
                line-height: 40px;
                font-size: larger;

                :first-child {
                    margin-left: 25px;
                    cursor: pointer;
                    color: #ff0136;
                }

                :last-child {
                    margin-left: 40px;
                    cursor: pointer;
                    color: #e22715;
                }
            }

            .dailySale,
            .iFashion {
                height: 170px;
                width: 295px;
                top: 45px;
            }

            .dailySale,
            .iFashion,
            .greatGoods {
                position: absolute;
                border-radius: @radius;
                background-color: #f4f4f4;
                left: 20px;

                .dailySale_title,
                .iFashion_title,
                .greatGoods_title {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    margin: 5px 0 5px 20px;

                    img {
                        height: 20px;
                        width: 65px;
                        margin-left: 10px;
                    }
                }

                .dailySale_goods,
                .iFashion_goods,
                .greatGoods_goods {
                    display: flex;
                    justify-content: space-around;

                    img {
                        height: 115px;
                        width: 120px;
                        border-radius: @radius;
                    }
                }
            }

            .iFashion {
                left: 345px;
            }

            .greatGoods {
                height: 170px;
                width: 618px;
                top: 240px;
                left: 20px;
            }
        }
    }

    .first-screen_userInfo {
        height: 100%;
        width: 310px;
        background-color: #fff;
        border-radius: @radius;
        float: right;

        .first-screen_userInfo_info {
            height: 240px;

            .userInfo_info_top {
                height: 200px;
                width: 310px;
                margin: 0 auto;
                position: relative;
                background: url("../assets/userInfo_info_bg.png");

                .userInfo_info_avatar {
                    position: absolute;
                    top: 40px;
                    left: 130px;

                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50px;
                    }
                }

                span {
                    font-size: 12px;
                    position: absolute;
                    top: 100px;
                    left: 130px;
                }
            }

            .userInfo_top_btn {
                width: 100%;
                height: 35px;
                display: flex;
                justify-content: space-around;

                a {
                    display: inline-block;
                    height: 35px;
                    text-align: center;
                    line-height: 34px;
                    border-radius: 10px;
                    font-size: 14px;
                }

                .userInfo_top_btn_login {
                    width: 90px;
                    background-color: @color;
                    color: #fff;
                }

                .userInfo_top_btn_register {
                    width: 120px;
                    height: 33.4px;
                    background-color: #fff;
                    color: @color;
                    border: 1px solid @color;

                    div {
                        position: relative;

                        img {
                            position: absolute;
                            top: 0;
                            left: 5px;
                            width: 33px;
                            height: 32px;
                            margin-top: 1px;
                            background-color: #fff;
                            color: #fff;
                        }

                        span {
                            width: 70px;
                            position: absolute;
                            border: none;
                            top: 0;
                            left: 40px;
                        }
                    }
                }
            }
        }

        .first-screen_title {
            height: 100px;
            font-size: larger;
            margin-left: 8px;
            line-height: 100px;
        }

        .first-screen_userInfo_services {
            display: flex;
            justify-content: space-around;

            a {
                display: inline-block;
                height: 60px;
                width: 64px;

                img {
                    height: 32px;
                    width: 32px;
                    margin: 0 16px;
                }

                p {
                    font-size: 14px;
                    text-align: center;
                }
            }
        }
    }
}

.goods_Lists {
    height: 1000px;
    width: 100%;
    margin-top: 20px;
    border-radius: @radius;
    background-color: #fff;

    .goods_Lists_title {
        height: 52px;
        font-size: 24px;
        line-height: 52px;

        span {
            margin-left: 20px;
        }

        img {
            height: 20px;
            width: 65px;
        }
    }

    .goods_Lists_show {
        width: 100%;

        .goods_info {
            width: 230px;
            height: 325px;
            border-radius: @radius;
            display: inline-block;
            margin: 0 0 15px 6px;

            .info_img {
                height: 215px;
                width: 215px;
                border-radius: @radius;
                margin: 7px;
            }

            .info_desc {
                height: 50px;
                font-size: 17px;
                padding: 0 7px;
                line-height: 25px;
                overflow: hidden;
            }

            .info_bottom {
                padding: 0 7px;
                height: 44px;
                line-height: 44px;

                .info_price {
                    color: red;
                    font-size: 20px;
                }

                .info_bought {
                    color: #aaa;
                    font-size: 14px;
                }
            }
        }

        .goods_info:hover {
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        }
    }
}

.tb_sidebar {
    height: 200px;
    width: 60px;
    border-radius: @radius;
    position: absolute;
    top: 570px;
    right: -70px;
    background-color: #fff;

    .active {
        background-color: #ff5a00;
        color: #fff;
    }

    a {
        color: #666;
        display: inline-block;
        height: 49px;
        width: 60px;
        text-align: center;

        span {
            font-size: 16px;
            line-height: 50px;
            display: flex;
            height: 49px;
            justify-content: center;
        }
    }

    :nth-child(3) {
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
    }

    a :hover {
        .active();
    }
}
</style>