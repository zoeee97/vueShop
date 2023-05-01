/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-08-15 17:08:38
 * @LastEditors: zyy
 * @LastEditTime: 2022-11-13 15:23:03
 * @Description: file content
 */
// 引入Vue构造函数
import Vue from 'vue'
// 引入所有组件的父亲或者叫外壳组件App
import App from './App.vue'
import store from '@/store';
import router from '@/router';
import '@/assets/style/reset.css'
// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav/index.vue";
import Pagination from "@/components/pagnation/index";
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from "@/utils/api";
//引入MockServer.js----mock数据
import "@/mock/mockServe";
// 引入swiper样式 因为其他组件也用了轮播图且样式一致 因此直接在入口文件引入
// 而且样式也没有对外暴露 因此也没有import...from.. 直接引入即可
import "swiper/css/swiper.css";
// 第一个参数组件的名字,第二个参数哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.config.productionTip = false;

// 引入图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3, // 表示lazyload元素距离底部距离百分比
  // error: 'dist/error.png',// 图片加载失败时显示的图片路径
  // loading: 'dist/loading.gif',// 正在加载时显示的图片路径
  attempt: 1// 图片加载失败后重试次数，默认3
})

// 测试
// import {reqCategoryList} from '@/utils/api';
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由，KV一致省略V
  // 注册路由信息，当这里书写router时，组件身上都拥有$route和$router属性
  beforeCreate() {
    Vue.prototype.$bus = this;//配置全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库
  store
}).$mount('#app')
