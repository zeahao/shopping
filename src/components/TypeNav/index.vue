<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派给父元素 -->
      <div @mouseleave="leaveKey" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级分类 -->
            <div class="item" v-for="item in categoryList" :key="item.categoryId"
                 :class="{crr:currentKey === item.categoryId}">
              <h3 @mouseenter="changeKey(item.categoryId)">
                <a :data-categoryName="item.categoryName"
                   :data-category1Id="item.categoryId">{{ item.categoryName }}</a>
              </h3>
              <!-- 二级分类 -->
              <!-- 动态展示二三级目录script写法 -->
              <div class="item-list clearfix" :style="{display:currentKey === item.categoryId?'block':'none'}">
                <div class="subitem" v-for="item1 in item.categoryChild" :key="item1.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="item1.categoryName"
                         :data-category2Id="item1.categoryId">{{ item1.categoryName }}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                        <a :data-categoryName="item2.categoryName"
                           :data-category3Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="#" @click="$cue">服装城</a>
        <a href="#" @click="$cue">美妆馆</a>
        <a href="#" @click="$cue">尚品汇超市</a>
        <a href="#" @click="$cue">全球购</a>
        <a href="#" @click="$cue">闪购</a>
        <a href="#" @click="$cue">团购</a>
        <a href="#" @click="$cue">有趣</a>
        <a href="#" @click="$cue">秒杀</a>
      </nav>

    </div>
  </div>

</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import throttle from "lodash/throttle";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();

let categoryList = computed(() => {
  return store.state.home.categoryList
})

const show = ref(true);

const currentKey = ref(-1);

// 鼠标停留一级分类回调
const changeKey = throttle(function (key) {
  currentKey.value = key;
}, 50);

// 鼠标离开一级分类回调
function leaveKey() {
  currentKey.value = -1;
  if (route.path.search('/home') === -1) {
    show.value = false;
  }
}

// search下鼠标停留展示目录
function enterShow() {
  show.value = true;
}

// 路由跳转
function goSearch(e) {
  // 获取自定义属性
  let {categoryname, category1id, category2id, category3id} = e.target.dataset;
  if (categoryname) {
    // 准备路由参数
    let location = {
      name: 'search',
      query: {
        categoryName: categoryname
      }
    }
    if (category1id) {
      location.query.category1Id = category1id;
    } else if (category2id) {
      location.query.category2Id = category2id;
    } else {
      location.query.category3Id = category3id;
    }
    // 路由,组合参数
    if (route.params) {
      location.params = route.params;
      router.push(location);
    }
  }
}

onMounted(() => {
  // 只要当前路由不是home页，就默认不显示二级目录
  if (route.path.search('/home') === -1) {
    show.value = false;
  }
})
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          a {
            cursor: pointer;
          }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 动态展示二三级目录css写法
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        // 鼠标停留样式
        .crr {
          background-color: #85abc3;
        }

        // 鼠标停留切换背景颜色的css写法
        // .item:hover {
        //   background-color: #85abc3;
        // }
      }
    }
  }
}
</style>