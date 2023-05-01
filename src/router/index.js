/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-04 22:28:28
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-23 15:36:08
 * @Description: file content
 */
// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
// 使用插件
Vue.use(VueRouter);

// 重写push和replace 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
// 配置路由
const router = new VueRouter({
    routes,//参数必须是一个符合routes选项要求的数组
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部 现在的文档是vue3的用的{top:0},vue2的要用{y:0}
        return { y: 0 }
    },
})
//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        // console.log("change");
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == "/register") {
            next("/home");
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    //获取用户信息
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token失效从新登录
                    //清除token
                    await store.dispatch("logout");
                    // 回到登录页
                    this.$router.push("/login");
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.includes("/trade") || toPath.includes("/pay") || toPath.includes("/center")) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next("/login?redirect=" + toPath);
            // console.log(toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
});
export default router;