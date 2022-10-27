<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list"
                   :checked="cart.isChecked === 1"
                   @click="changeChecked(cart.skuId,cart.isChecked^1)">
          </li>
          <li class="cart-list-con2" @click="router.push({name:'detail',query:{skuId:cart.skuId}})">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con4">
            <a @click="updateCart('mins',cart,-1)" class="mins">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum"
                   @change="updateCart('change',cart,$event.target.value*1)"
                   minnum="1" class="itxt">
            <a @click="updateCart('plus',cart,1)" class="plus">+</a>
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con6">
            <a class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox"
               :checked="isAllChecked"
               @click="changeAllChecked($event.target.checked)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a href="#">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ checkedNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="#" @click.prevent="router.push('trade')" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="ShopCart">
import {useStore} from "vuex";
import {computed, nextTick, onMounted} from "vue";
import {useRouter} from "vue-router";
import throttle from "lodash/throttle";

const store = useStore();
const router = useRouter();

// 从服务器获取购物车数据
const getData = () => {
  store.dispatch('shopCart/getCartList');
}
// 获取购物车商品数据
const cartList = computed(() => {
  return store.getters["shopCart/CartList"].cartInfoList || [];
})

// 购买商品的总价
const totalPrice = computed(() => {
  let sum = 0;
  cartList.value.forEach((item) => {
    if (item.isChecked) {
      sum += item.skuPrice * item.skuNum;
    }
  })
  return sum;
})

// 是否全选
const isAllChecked = computed(() => {
  // 判断是否所有商品都被勾选
  return cartList.value.every(item => item.isChecked === 1) && cartList.value.length > 0
})

// 修改单个商品选中状态
const changeChecked = async (skuId, isChecked) => {
  try {
    await store.dispatch('shopCart/updateChecked', {
      skuId,
      isChecked
    })
    getData()
  } catch (e) {
    console.log(e.messages);
  }
}

// 修改全部商品选中状态
const changeAllChecked = async (checked) => {
  let isChecked = checked ? 1 : 0;
  try {
    await store.dispatch('shopCart/changeAllChecked', isChecked);
    getData();
  } catch (e) {
    console.log(e.messages);
  }
}

// 修改商品数量,(throttle)节流，防止用户操作过快
const updateCart = throttle(async (type, cart, disNum) => {
  switch (type) {
    case "plus":
      disNum = 1;
      break;
    case "mins":
      disNum = -1;
      // 当数量小于1，就直接删除商品
      if (cart.skuNum <= 1) {
        await deleteCart(cart.skuId);
        return;
      }
      break;
    case "change":
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0;
      } else {
        disNum = parseInt(disNum) - cart.skuNum;
      }
      break;
  }
  try {
    await store.dispatch('detail/addOrUpdateCartSuccess', {skuId: cart.skuId, skuNum: disNum});
    // 修改成功
    // 重新获取购物车数据
    getData()
  } catch (e) {
    console.log(e.messages);
  }
}, 500)

// 选中商品的数量
const checkedNum = computed(() => {
  let num = 0;
  cartList.value.forEach((item) => {
    if (item.isChecked) {
      num++;
    }
  });
  return num;
})

// 删除选中的所有商品
const deleteAllCheckedCart = async () => {
  try {
    await store.dispatch('shopCart/deleteAllCheckedCart');
    getData();
  } catch (e) {
    console.log(e.messages);
  }
}

// 删除商品
const deleteCart = async (skuId) => {
  try {
    await store.dispatch('shopCart/deleteCart', skuId);
    getData();
  } catch (e) {
    console.log(e.messages);
  }
}

onMounted(() => {
  getData();
})
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;
          cursor: pointer;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

        }

        .cart-list-con4 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: default;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: default;
          }
        }

        .cart-list-con5 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sindelet {
            cursor: pointer;
          }

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>