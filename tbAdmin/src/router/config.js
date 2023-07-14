const routes = [
  {
    name: "Center",
    path: "/center",
    component: () => import("../views/center/Center.vue"),
  },
  {
    name: "Index",
    path: "/index",
    component: () => import("../views/home/Home.vue"),
  },
  {
    name: "GoodsAdd",
    path: "/goodsAdd",
    component: () => import("../views/goods-manage/GoodsAdd.vue"),
  },
  {
    name: "GoodsList",
    path: "/goodsList",
    component: () => import("../views/goods-manage/GoodsList.vue"),
  },
  {
    name: "UserAdd",
    path: "/userAdd",
    component: () => import("../views/user-manage/userAdd.vue"),
    requireAdmin: true,
  },
  {
    name: "UserList",
    path: "/userList",
    component: () => import("../views/user-manage/userList.vue"),
    requireAdmin: true,
  },
  {
    name: "Transaction",
    path: "/transaction",
    component: () => import("../views/transaction-manage/Transaction.vue"),
  },
  {
    name: "Classification",
    path: "/classification",
    component: () => import("../views/classification/Classification.vue"),
  },
  {
    name: "NotFound",
    path: "/:pathMath(.*)*",
    component: () => import("../views/notFound/notFound.vue"),
  },
];

export default routes;
