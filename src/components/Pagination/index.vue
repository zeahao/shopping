<template>
  <!--        分页器-->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li :class="{prev:pageNo===1, disabled:pageNo === 1}"
            @click="getPage(pageNo-1)">
          <a>«上一页</a>
        </li>
        <li v-show="pageNoList[0] !== 1" @click="getPage(1)">
          <a>1</a>
        </li>
        <li class="dotted" v-show="pageNoList[0] > 2">
          <span>...</span>
        </li>

        <!--        中间部分-->
        <li v-for="no in pageNoList"
            :class="{active:pageNo === no}"
            @click="getPage(no)">
          <a>{{ no }}</a>
        </li>

        <li class="dotted"
            v-show="pageNoList[pageNoList.length-1] < totalPage-1"
        >
          <span>...</span>
        </li>
        <li v-show="pageNoList[pageNoList.length-1] < totalPage"
            @click="getPage(totalPage)"
        >
          <a>{{ totalPage }}</a>
        </li>
        <li class="next"
            :class="{prev:pageNo===totalPage, disabled:pageNo === totalPage}"
            @click="getPage(pageNo+1)"
        >
          <a>下一页»</a>
        </li>
      </ul>
      <div><span>共{{ total }}条数据</span></div>
    </div>
  </div>
</template>

<script setup name="pagination">
import {computed} from "vue";

const emit = defineEmits(['get-page'])
const props = defineProps(['pageNo', 'pageSize', 'total', 'continues']);
const totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
})

// 修改当前页
function getPage(index) {
  if (index < 1 || index > totalPage.value) {
    return;
  }
  emit('get-page', index);
}

// 分页器页码数组
const pageNoList = computed(() => {
  let start = 0;
  let end = 0;
  if (props.continues > totalPage.value) {
    start = 1;
    end = totalPage.value;
  } else {
    start = props.pageNo - parseInt(props.continues >> 1);
    end = props.pageNo + parseInt(props.continues >> 1);
    if (start < 1) {
      start = 1;
      end = props.continues;
    }
    if (end > totalPage.value) {
      end = totalPage.value;
      start = end - props.continues + 1;

    }
  }
  let list = [];
  while (start <= end) {
    list.push(start++);
  }
  return list;
})
</script>

<style scoped lang="less">
.page {
  width: 860px;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 600px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;
        cursor: pointer;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #2de1c7;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      margin-top: 10px;
      color: #333;
      font-size: 14px;
      float: left;
      width: 241px;
    }
  }
}
</style>