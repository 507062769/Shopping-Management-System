import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

Vue.config.productionTip = false;

console.log(router);
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
