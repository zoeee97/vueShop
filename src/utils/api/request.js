/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-08 20:05:24
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-23 09:40:29
 * @Description: file content
 */
// 对axios二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css';
//在当前模块中引入store
import store from '@/store/index';

// 1.利用axios的create创建一个axios实例,request就是axios，但是要配置一下
const requests = axios.create({
  baseURL: '/api',//基础路径，发请求时路径自带/api
  timeout: 5000,//超时时间5s
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些处理
requests.interceptors.request.use((config) => {
  // config：配置对象，对象里面有一个属性很重要，headers请求头
  // 进度条开始
  if (localStorage.getItem('UUIDTOKEN'))
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = localStorage.getItem('UUIDTOKEN');
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  (res) => {
    nprogress.done();//进度条结束
    return res.data;
  },
  (error) => {
    return Promise.reject(error);//响应失败的回调函数 终止promise链
  }
);
export default requests;