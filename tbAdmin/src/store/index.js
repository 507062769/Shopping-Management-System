import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否为第一次进入
    isFirstRouter: true,
    // 用户信息
    userInfo: {},
  },
  getters: {},
  mutations: {
    changeFirstRouter(state, value) {
      state.isFirstRouter = value;
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      };
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ["userInfo"], //控制是否持久化
    }),
  ],
});
