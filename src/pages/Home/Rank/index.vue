<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
      <div class="tab-tit clearfix">
        <a href="javascript:" @click.prevent="router.push({name:'rankOne'})" :class="{on:route.name==='rankOne'}">
          <p class="img">
            <i></i>
          </p>
          <p class="text">热卖排行</p>
        </a>
        <a href="javascript:" @click.prevent="router.push({name:'rankTwo'})" :class="{on:route.name==='rankTwo'}">
          <p class="img">
            <i></i>
          </p>
          <p class="text" >特价排行</p>
        </a>
        <a href="javascript:" @click.prevent="router.push({name:'rankThree'})" :class="{on:route.name==='rankThree'}">
          <p class="img">
            <i></i>
          </p>
          <p class="text">新品排行</p>
        </a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

</script>
<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;

      a {
        display: block;
        padding: 0 18px;
        float: left;
        text-decoration: none;
        font-size: 16px;
        color: #999;

        p {
          margin: 5px 0;
        }

        .img {
          i {
            width: 35px;
            height: 35px;
            display: block;
            background: url(images/bg0.png);
            margin-left: 10px;
          }
        }

        .text {
          line-height: 28px;
        }
      }

      .on {
        color: #e60012;

        .img {
          i {
            background-position: -35px 0;
          }
        }
      }
    }
  }

}

</style>