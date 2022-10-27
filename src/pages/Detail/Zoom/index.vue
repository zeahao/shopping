<template>
  <div class="spec-preview">
    <img :src="list[ImgIndex].imgUrl"/>
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :style="big" :src="list[ImgIndex].imgUrl"/>
    </div>
    <div class="mask" :style="mask"></div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import emitter from "@/mitt/emitter";

const props = defineProps(['skuImageList']);

const list = computed(() => {
  return props.skuImageList || [{}];
})

// 选中图片的下标
const ImgIndex = ref(0);
const mask = reactive({
  top: '0px',
  left: '0px',
});

const big = reactive({
  top: '0px',
  left: '0px',
})

// 修改放大位置
function handler(e) {
  let top = e.pageY - 210 - 100;
  let left = e.pageX - 460 - 100;
  if (top < 0)
    top = '0px';
  if (left < 0)
    left = '0px';
  if (top > 200)
    top = '200px';
  if (left > 200)
    left = '200px';
  mask.top = `${top}px`;
  mask.left = `${left}px`;
  big.top = `${-top * 2}px`;
  big.left = `${-left * 2}px`;
}

onMounted(() => {
  emitter.on('getIndex', (index) => {
    ImgIndex.value = index;
  })
})
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>