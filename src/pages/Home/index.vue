<template>
  <TypeNav/>
  <ListContainer/>
  <TodayRecommend/>
  <Rank/>
  <Like/>
  <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
  <Brand/>
</template>

<script setup>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";

const store = useStore();
const route = useRoute()

const floors = computed(() => {
  return store.state.home.floors;
})

onMounted(() => {
  // 获取Floor组件数据
  store.dispatch('home/getFloors');
})
</script>
