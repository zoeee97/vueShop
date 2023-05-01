<!--
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-08-15 17:08:38
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-13 16:29:36
 * @Description: file content
-->
<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/headerPart.vue";
import Footer from "./components/footerPart.vue";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
