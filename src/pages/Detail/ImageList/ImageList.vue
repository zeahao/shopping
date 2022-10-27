<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(item,index) in imgList" :key="item.id"
           @click="getIndex(index)"
           :class="{active:index===nowImg}">
        <img :src="item.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import emitter from "@/mitt/emitter";

const props = defineProps(['skuImageList']);

// 图片列表
const imgList = computed(() => {
  return props.skuImageList || [{}];
})

const nowImg = ref(0);

// 选中图片
function getIndex(index) {
  emitter.emit('getIndex', index);
  nowImg.value = index;
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
  .active {
    img{
      height: 90%;
      width: 90%;
      border: 2px solid #f60;
      padding: 1px;
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>