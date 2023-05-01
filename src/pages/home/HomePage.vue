<!--
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-04 22:34:03
 * @LastEditors: zyy
 * @LastEditTime: 2023-02-15 17:09:55
 * @Description: file content
-->
<template>
  <div>
    <button @click="change">aaa</button>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>

    <!-- 因为home路由组件需要多个不同的floor组件，因此需要v-for，且发请求只能在其父组件中发，
      利用props进行父传子 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import Floor from "@/pages/home/Floor/FloorPage.vue";
import Brand from "@/pages/home/Brand/index.vue";
import Rank from "@/pages/home/Rank/index.vue";
import Recommend from "@/pages/home/Recommend/index.vue";
import Like from "@/pages/home/Like/index";

import {mapState} from "vuex";

export default {
  // name:HomePage,
  components: { ListContainer, Floor,Brand,Rank,Like,Recommend},
  methods: {
    change(){
      this.floorList = []
    }
  },
  mounted(){
    this.$store.dispatch('getFloorList');
    this.$store.dispatch('getUserInfo');
  },
  computed:{
    ...mapState({
      floorList:(state)=> state.home.floorList,
    })
  }
};
</script>

<style lang="scss" scoped>
</style>