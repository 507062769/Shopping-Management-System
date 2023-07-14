<template>
  <div id="app">
    <tbHeader></tbHeader>
    <!-- 路由组件 -->
    <router-view></router-view>
    <tbFooter></tbFooter>
  </div>
</template>

<script>
import tbHeader from './components/tbHeader.vue';
import tbFooter from './components/tbFooter.vue';
export default {
  name: 'App',
  components: { tbHeader, tbFooter }
}
</script>

<style lang="less">
@bgColor: #e7e3e4;
@color: #ff5500;
@radius: 20px;

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
}

html {
  scroll-behavior: smooth;
}

#app {
  background-color: @bgColor;
}

.container {
  width: 80%;
  margin: 0 auto;
  position: relative;
}
</style>
