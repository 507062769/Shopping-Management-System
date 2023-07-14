import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/home",
      name: "tbHome",
      component: () => import("../views/tbHome.vue"),
    },
    {
      path: "/login",
      name: "tbLogin",
      component: () => import("../views/tbLogin.vue"),
    },
    // 重定向
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
