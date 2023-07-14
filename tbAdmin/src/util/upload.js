import Vue from "vue";
// 实例化vue，用于我们调用$axios，因为axios的拦截器绑定在了vue原型上的$axios
const vm = new Vue();

function upload(path, dataForm) {
  const params = new FormData();
  for (let i in dataForm) {
    params.append(i, dataForm[i]);
  }
  return vm.$axios
    .post(path, dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export default upload;
