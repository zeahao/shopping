<template>
  <TypeNav/>
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <!--面包屑-->
        <ul class="fl sui-tag">
          <!--分类名字-->
          <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
              @click="removeCategoryName">×</i></li>
          <!--品牌名字-->
          <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
              @click="removeTradeMark">×</i></li>
          <!--关键字-->
          <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
          <!--平台售卖属性-->
          <li class="with-x" v-for="attr in searchParams.props" :key="attr.split(':')[1]">{{ attr.split(":")[1] }}<i
              @click="removeAttr(attr)">×</i></li>
        </ul>
      </div>

      <!--selector-->
      <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

      <!--details-->
      <div class="details clearfix">
        <!--            排序结构-->
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:orderFlag === '1'}" @click="changeOrder('1')">
                <a>综合 <span v-show="orderFlag === '1'">{{ order }}</span></a>
              </li>
              <li :class="{active:orderFlag === '2'}" @click="changeOrder('2')">
                <a>价格 <span v-show="orderFlag === '2'">{{ order }}</span></a>
              </li>
            </ul>
          </div>
        </div>
        <!--        商品列表-->
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <!--                  添加路由跳转-->
                  <router-link :to="{name:'detail',query:{skuId:good.id}}">
                    <img v-lazy="good.defaultImg"/>
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥ </em>
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <router-link :to="{name:'detail',query:{skuId:good.id}}"
                               :title="good.title">{{ good.title }}
                  </router-link>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a @click="addCart(good.id,1)" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!--        分页器-->
        <Pagination
            :pageNo="page.pageNo"
            :pageSize="page.pageSize"
            :total="page.total"
            :continues="5"
            @getPage="getPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchSelector from './SearchSelector'
import {useStore} from "vuex";
import {computed, onMounted, reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import useSuiTag from "@/hooks/search/useSuiTag";
import useOrder from "@/hooks/search/useOrder";
import usePagination from "@/hooks/search/usePagination";

const router = useRouter();
const route = useRoute();
const store = useStore();

// 页面商品数据
const goodsList = computed(() => {
  return store.getters["search/goodsList"];
})

// searchList请求参数
const searchParams = reactive({
  props: [],
  order: '1:desc',
  pageNo: 1,
  pageSize: 10
});

// 更新/获取vuex里search组件数据
function getData() {
  // 更新vuex仓库里searchList数据
  store.dispatch('search/getSearchList', searchParams);
}

// 分页器数据
const page = computed(() => {
  return store.getters["search/page"];
})

// 面包屑模块
const {
  removeCategoryName,
  removeKeyword,
  removeTradeMark,
  trademarkInfo,
  attrInfo,
  removeAttr
} = useSuiTag(searchParams);

// 加入购物车
const addCart = async (skuId, skuNum) => {
  try {
    await store.dispatch('detail/addOrUpdateCartSuccess', {skuId, skuNum});
    // 获取商品数据并利用会话存储把数据传到AddCartSuccess组件
    await store.dispatch('detail/getGood', skuId);
    sessionStorage.setItem("SKUINFO", JSON.stringify(store.getters["detail/skuInfo"]));
    await router.push({
      name: 'addCartSuccess', query: {
        skuNum: skuNum,
      }
    })
  } catch (e) {
    console.log(e)
  }

}

// 排序模块
const {orderFlag, order, changeOrder} = useOrder(searchParams);

// 分页器模块
const {getPage} = usePagination(searchParams);

// 监视route属性更新页面信息
watch(route, () => {
  // 监听searchParams的变化并重新发请求
  searchParams.category1Id = undefined;
  searchParams.category2Id = undefined;
  searchParams.category3Id = undefined;
  searchParams.categoryName = undefined;
  searchParams.keyword = undefined;
  Object.assign(searchParams, route.query, route.params);
})

// 监视searchParams用于随时更新页面数据
watch(searchParams, () => {
  getData();
})

onMounted(() => {
  Object.assign(searchParams, route.query, route.params);
  // 初始化数据
  getData(searchParams);
})
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>