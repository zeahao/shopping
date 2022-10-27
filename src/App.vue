<template>
  <Header/>
  <router-view></router-view>
  <Footer v-if="$route.meta.show"/>
</template>

<script setup>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useStore} from "vuex";
import {onMounted} from "vue"

const store = useStore();

onMounted(() => {
  // 获取三界商品列表数据
  store.dispatch('home/getCategoryList');
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 300px;
  text-align: center;
  background: #4cb9fc;
}
</style>
