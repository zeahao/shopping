import {createApp} from 'vue';
import App from './App.vue';
import {router} from "@/router";
import Store from "./store";
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import "@/mock/mockServe"
import VueLazyload from "vue-lazyload";
import load from '@/assets/images/load.gif'
import 'element-plus/dist/index.css'
import myPlugins from "@/plugins/myPlugins";

// 创建实例
const app = createApp(App);
// 注册路由
app.use(router);
// 注册vuex
app.use(Store);

// 加载自定义插件
app.use(myPlugins);

// 图片懒加载
app.use(VueLazyload, {
    preLoad: 1.3, loading: load, attempt: 1
})

/**
 * @注册全局组件
 * TypeNav 商品分类列表
 * Carousel 轮播图
 * Pagination 分页器
 */
app.component('TypeNav', TypeNav).component('Carousel', Carousel).component('Pagination', Pagination);
// 挂载容器
app.mount('#app')