<!--
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-03 21:33:23
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-24 13:24:15
 * @Description: file content
-->
<template>
  <div id="header">
    <div class="firstLine">
      <div class="firstWrap">
        <div class="firstLeft">
          <div>尚品汇欢迎您！</div>
          <div>
            <span>请</span>
            <router-link to="/login" class="login" v-if="!userName">登录</router-link>
            <router-link to="javascript:;" v-else class="login">{{userName}}</router-link>
            <router-link to="/register" v-if="!userName">注册</router-link>
            <a v-else @click="logOut()">退出登录</a>
          </div>
        </div>
        <div class="firstRight">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="javascript:;">我的尚品汇</a>
          <a href="javascript:;">尚品汇会员</a>
          <a href="javascript:;">企业采购</a>
          <a href="javascript:;">关注尚品汇</a>
          <a href="javascript:;">合作招商</a>
          <a href="javascript:;">商家后台</a>
        </div>
      </div>
    </div>
    <div class="secondLine">
      <div class="logo">
        <router-link to="/home" title="尚品汇">
          <img src="../assets/logo.png" alt="尚品汇Logo" />
        </router-link>
      </div>
      <div class="search">
        <form action="" class="searchForm">
          <input type="text" v-model="keyword" @keyup.enter="goSearch" />
          <button @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headerPart",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 编程式导航的对象写法必须配合name使用
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      location.query = this.$route.query;
      this.$router.push(location);
      // 其实这里还是有逻辑问题，要是我搜索电饭煲分类选手机……
    },
    // 点击退出登录
    logOut() {
      //退出登录需要做的事情
      //1:需要发请求，通知服务器退出登录【清除一些数据：token】
      //2:清除项目当中的数据【userInfo、token】

      try {
        this.$store.dispatch("logout");
        // 跳转到首页
        this.$router.push("/home");
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userInfo.name,
    }),
  },
  mounted() {
    // vue3已经不能用on off once了
    this.$bus.$on("clearkeyword", () => {
      this.keyword = "";
    });
    this.$store.dispatch('getUserInfo');
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.firstLine {
  background-color: #eaeaea;
  font-size: small;
  .firstWrap {
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    line-height: 30px;
    color: rgb(59, 58, 58);
    .firstLeft {
      float: left;
      div {
        float: left;
        margin-right: 10px;
        * {
          color: rgb(59, 58, 58);
        }
        .login {
          border-right: 1px solid #6c6a6a;
          padding: 0 5px;
          margin-right: 5px;
        }
      }
    }
    .firstRight {
      float: right;
      * {
        border-right: 1px solid #6c6a6a;
        padding: 0 10px;
        color: rgb(59, 58, 58);
      }
      a:last-child {
        border: none;
      }
    }
  }
}
.secondLine {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  overflow: hidden;
  .logo {
    float: left;
    margin-left: 50px;
  }
  .search {
    float: right;
    .searchForm {
      input {
        outline: none;
        width: 380px;
        height: 35px;
        border: 3px solid rgb(255, 103, 0);
        padding-left: 10px;
      }
      button {
        width: 72px;
        height: 35px;
        border: none;
        background-color: rgb(255, 103, 0);
        color: white;
      }
    }
  }
}
</style>
