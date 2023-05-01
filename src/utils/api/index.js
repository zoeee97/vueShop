/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-08 21:55:35
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-23 17:16:28
 * @Description: file content
 */
// 当前这个模块：API进行统一管理
// 引入封装的axios
import requests from "./request";
import mockRequest from "./mockAJAX";

//三级联动接口
// /api/product/getBasecategoryList get 无参数
//发请求：axios发请求返回结果Promise对象
// axios既可以作为函数使用发送请求,也可以作为对象去调用方法发送请求
// 获取首页三级菜单数据
export const reqCategoryList = () => requests.get("/product/getBaseCategoryList");
// 获取首屏大轮播图数据
export const reqGetBannerList = () => mockRequest.get("/banner");
// 获取首页小轮播图组件数据
export const reqGetFloorList = () => mockRequest.get("/floor");
// 获取搜索页搜索结果详情
export const reqGetSearchInfo = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params,//当前这个接口给服务器传递参数params，至少是一个空对象
  });
// 获取产品详情信息的接口url: /api/item/{skuId} 
export const reqGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'get',
  });
//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
//获取购物车列表数据接口
//URL:/api/cart/cartList method:get
export const reqCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "get",
  });
//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
//注册
//url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });
//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });
//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });
//退出登录
//URL:/api/user/passport/logout  get
export const reqlogout = () => requests({ url: "/user/passport/logout", method: "get" });
//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList/", method: "get" });
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "get" });
//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" });
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
