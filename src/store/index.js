/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-09 10:22:31
 * @LastEditors: zyy
 * @LastEditTime: 2023-02-15 14:53:23
 * @Description: file content
 */
import Vue from "vue";
import Vuex from "vuex";
// 需要使用插件一次
Vue.use(Vuex);
// state：仓库存储数据的地方
// mutations：修改state的唯一手段
// actions:处理action,可以书写自己的业务逻辑，也可以处理异步
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// home组件的仓库
import {
  reqCategoryList,
  reqGetBannerList,
  reqGetFloorList
} from '@/utils/api/index';
const home = {
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
      state.categoryList.length = 16
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList
      // console.log('在修改仓库中的bannerList数据');
    },
    GETFlOORLIST(state, floorList) {
      state.floorList = floorList
    }
  },
  actions: {
    // 获取菜单导航内容
    async categoryList({ commit }) {
      // 调用接口后返回的是一个promise对象
      // 需要使用await接受成功返回的结果，await存在时必须要有async
      let result = await reqCategoryList();
      console.log(result);
      if (result.code == 200)
        commit("CATEGORYLIST", result.data);
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
      let result = await reqGetBannerList();
      if (result.code == 200)
        commit("GETBANNERLIST", result.data);
    },
    async getFloorList({ commit }) {
      let result = await reqGetFloorList();
      if (result.code == 200)
        commit("GETFlOORLIST", result.data);
    }
  }
}
import { reqGetSearchInfo } from '@/utils/api/index';
// search模块的仓库
const search = {
  state: {
    // 仓库初始状态
    searchList: {}
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    }
  },
  actions: {
    async getSearchList({ commit }, params = {}) {
      let result = await reqGetSearchInfo(params);
      if (result.code == 200)
        commit('GETSEARCHLIST', result.data);
    }
  },
  getters: {
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    // 因为如果没网会返回undefined，因此这里写个空数组保底
    goodsList(state) {
      return state.searchList.goodsList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    }
  }
}
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/utils/api/index";
// 封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import getUUID from "@/utils/uuid_token";
// Detail模块的仓库
const detail = {
  state: {
    goodIofo: {},
    uuid_token: getUUID(),
  },
  mutations: {
    GETGOODIOFO(state, goodIofo) {
      state.goodIofo = goodIofo;
    },
  },
  actions: {
    async getGoodIofo({ commit }, skuId) {
      let result = await reqGoodsInfo(skuId);
      if (result.code == 200) {
        commit("GETGOODIOFO", result.data);
      }
    },
    /* async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    }, */
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code == 200) {
        // console.log(result); object
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
  },
  getters: {
    categoryView(state) {
      //比如：state.goodInfo初始状态空对象，空对象的categoryview属性值undefined
      //当前计算出的categoryview属性值至少是一个空对象，假的报错不会有了。|
      return state.goodIofo.categoryView || {};
    },
    skuInfo(state) {
      return state.goodIofo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodIofo.spuSaleAttrList || [];
    },

  }
}
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/utils/api/index";
// shopcart模块的仓库
const shopcart = {
  state: {
    // 服务器返回的是一个数组，数组的第0项中保存的对象才是我们所需要的真正的数据
    // 因此这里cartList的初始值为数组，但是为了方便组件取数据，getters会直接返回该数组的第0项(是一个对象)
    // data[0]是cartList的值，data[0].carInfoList数组是购物车的数据，所以在对应组件里还要做相应处理
    cartList: [],
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    }
  },
  actions: {
    // 获取购物车列表数据
    async getCartList({ commit }) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit("GETCARTLIST", result.data);
      }
    },
    // 删除购物车的某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedByid(skuId, isChecked);
      // console.log(result);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    //删除全部勾选的产品 context是上下文 这里面用的解构赋值
    // 后端没有写删除多个产品，因此需要反复调用之前写的删除某一个产品的方法
    deleteAllCheckedCart({ dispatch, getters }) {
      //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
      let PromiseAll = [];
      //获取购物车中全部的产品（是一个数组）
      getters.cartList.cartInfoList.forEach((item) => {
        let Promise =
          item.isChecked == 1 ?
            dispatch("deleteCartListBySkuId", item.skuId) :
            "";
        //将每一次返回的Promise添加到数组当中
        PromiseAll.push(Promise);
      });
      //只要全部的p1|p2....都成功，返回结果即为成功
      //如果有一个失败，返回即为失败结果
      return Promise.all(PromiseAll);
    },
    //修改全部产品的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
      //数组
      let promiseAll = [];
      state.cartList[0].cartInfoList.forEach((item) => {
        let promise = dispatch("updateCheckedById", {
          skuId: item.skuId,
          isChecked,
        });
        promiseAll.push(promise);
      });
      //最终返回结果
      return Promise.all(promiseAll);
    },
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {};
    },
  },
}
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqlogout } from '@/utils/api/index';
import { setToken, getToken, removeToken } from '../utils/token';
const user = {
  state: {
    code: '',
    token: getToken(),
    userInfo: {},
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR(state) {
      //帮仓库中先关用户信息清空
      state.userInfo = {};
      state.token = '';
      //本地存储数据清空
      removeToken();
    },
  },
  actions: {
    //获取验证码
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      // console.log(result);
      if (result.code == 200) {
        commit('GETCODE', result.data);
      }
    },
    //注册
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      // console.log(result);
      if (result.code == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    //登录业务
    async reqUserLogin({ commit }, user) {
      let result = await reqUserLogin(user);
      // console.log(result);
      //服务器下发token，用户唯一标识符(uuid)
      //将来经常通过带token找服务器要用户信息进行展示
      if (result.code === 200) {
        commit('USERLOGIN', result.data.token);
        setToken(result.data.token); //持久化存储token
      }
    },
    //获取用户信息在首页展示【需要带着用户的token向服务器要用户信息】
    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      // console.log(result);
      if (result.code == 200) {
        commit('USERINFO', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error('fail'));
      }
    },
    // 退出登录
    async logout({ commit }) {
      //只是向服务器发起一次请求，通知服务器清除token
      let result = await reqlogout();
      // console.log(result);
      //action里面不能操作state，提交mutation修改state
      if (result.code == 200) {
        commit('CLEAR', result.data);
      } else {
        return Promise.reject(new Error('falie'));
      }
    },
  },
  getters: {}
}
import { reqAddressInfo, reqOrderInfo } from "@/utils/api/index";
const trade = {
  state: {
    address: [],
    orderInfo: {},
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    //获取用户地址信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo();
      // console.log(result);
      if (result.code == 200) {
        commit("GETUSERADDRESS", result.data);
      }
    },
    //获取商品清单数据
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
    },
  },
  getters: {}
}
// 对外暴露一个store类实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  }
});