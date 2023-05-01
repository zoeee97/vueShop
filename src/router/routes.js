/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-20 13:42:12
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-25 20:59:34
 * @Description: file content
 */
// 引入路由组件
// 配置路由
// routes的参数形式必须是数组，所以对外暴露一个数组
export default (
  [
    {
      path: '/home',
      /* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
      如果我们能把不同路由对应的组件分割成不同的代码块，
      然后当路由被访问的时候才加载对应组件，这样就会更加高效 */
      
      // 这么写就是路由懒加载，开箱即用的动态导入
      // 你也可以在文件头部直接全部引入，但是静态导入会让加载速度慢
      component: () => import("@/pages/home/HomePage"),
      // 路由元信息
      meta: {
        show: true
      }
    },
    {
      path: '/search/:keyword?',//带问号才是params参数可有可没有
      component: () => import('@/pages/search/SearchPage'),
      name: 'search',
      meta: {
        show: true
      }
    },
    {
      path: '/detail/:skuId',
      component: () => import('@/pages/Detail/index'),
      meta: {
        show: true
      }
    },
    {
      path: '/login',
      component: () => import("@/pages/Login/index"),
    },
    {
      path: '/addCartSuccess',
      name: 'addcartsuccess',
      component: () => import('@/pages/AddCartSuccess'),
      meta: {
        show: true
      }
    },
    {
      path: "/shopcart",
      component: () => import("@/pages/ShopCart"),
      name: "ShopCart",
      meta: {
        show: true,
      },
    },
    {
      path: "/register",
      component: () => import("@/pages/Register/index"),
    },
    {
      path: "/trade",
      component: () =>
        import("@/pages/Trade"),
      meta: {
        show: true,
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: "/paySuccess",
      component: () =>
        import("@/pages/PaySuccess"),
      meta: {
        show: true,
      },
    },
    {
      path: "/pay",
      component: () =>
        import("@/pages/Pay"),
      meta: {
        show: true,
      },
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },

    // 重定向
    {
      path: '*',
      redirect: '/home',
    }
  ]
)
