const axios = require("axios");
// 创建axios的实例对象instance
const instance = axios.create({ timeout: 1000 * 12 });

// 给instance绑定在请求前的拦截器
instance.interceptors.request.use(
  function (config) {
    // 请求前先获取localStorage里的token
    const token = localStorage.getItem("token");
    // 获取到token后 将他保存到config里
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 给instance绑定在响应前的拦截器
instance.interceptors.response.use(
  function (response) {
    // 解构response里的请求头authorization
    const { authorization } = response.headers;
    // 当authorization与localStorage里的token一致时
    authorization && localStorage.setItem("token", authorization);
    return response;
  },
  function (error) {
    // 获取状态码
    const { status } = error.response;
    if (status === 401) {
      // token过期，移除存在的token
      localStorage.removeItem("token");
      // 如果状态码等于401，说明token过期，跳转到login页
      window.location.href = "#/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
