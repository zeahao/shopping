<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>校园购欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            {{ userName }}
            <a class="logout" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="#">我的校园购</a>
          <a href="#">校园购会员</a>
          <a href="#">企业采购</a>
          <a href="#">关注校园购</a>
          <a href="#">合作招商</a>
          <a href="#">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="#" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" @click="toSearch" type="button">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import {useRouter, useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import emitter from "@/mitt/emitter";
import {useStore} from "vuex";

const router = useRouter()
const route = useRoute();
const keyword = ref('');
const store = useStore();

// 获取用户登录信息
const userName = computed(() => {
  return store.getters["user/userInfo"].name;
})

// 退出登录
const logout = async () => {
  try {
    await store.dispatch('user/logout');
    await router.push('login')
  } catch (e) {
    console.log('e.message');
  }
}

// 路由
function toSearch() {
  let location = {
    name: 'search',
    params: {
      keyword: keyword.value
    }
  };
  if (route.query) {
    location.query = route.query;
  }
  router.push(location);
}

onMounted(() => {
  // 定义事件总线
  emitter.on('removeKeyword', () => {
    keyword.value = '';
  })
})
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }

        .logout {
          cursor: pointer;
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>