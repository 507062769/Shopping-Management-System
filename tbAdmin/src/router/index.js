import Vue from "vue";
import VueRouter from "vue-router";
import RoutersConfig from "./config";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    name: "MainBox",
    path: "/mainBox",
    component: () => import("../views/MainBox.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    redirect: "/index",
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 当进入login时不拦截，直接放行
  if (to.name === "Login") {
    next();
  } else {
    // 否则判定是否含有token，若不含token，则跳到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      if (store.state.isFirstRouter) {
        // routes.forEach((value, index, array) => {
        //   if (value.name === "MainBox") {
        //     array.splice(index, 1);
        //   }
        // });
        //若含token 则调用方法
        configRoute();
        // 并跳到对应页
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

// foreach 循环将RoutersConfig中的子路由添加到MainBox中
const configRoute = () => {
  RoutersConfig.forEach((item) => {
    //  checkAuth(item)&& router.addRoute("MainBox", item);
    router.addRoute("MainBox", item);
  });
  // 触发vuex中mutation的changeFirstRouter方法，来修改isFirstRouter的值
  store.commit("changeFirstRouter", false);
};

const checkAuth = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1;
  }
  return true;
};

export default router;
