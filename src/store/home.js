import {reqCategoryList, mockBanners, mockFloors} from "@/api";

export default {
    // 配置命名空间
    namespaced: true,
    // 存数据
    state: {
        // 所有分类数据
        categoryList: [],
        // 广告位轮播图数据
        banners: [],
        // 所有楼层数据
        floors: [],
    },
    // 写业务逻辑并调用mutations
    actions: {
        async getCategoryList(context) {
            let result = await reqCategoryList();
            if (result.code === 200) {
                context.commit('GetCategoryList', result.data);
            }
        },
        async getBanners(context) {
            let result = await mockBanners();
            if (result.code === 200) {
                context.commit('GetBanners', result.data);
            }
        },
        async getFloors(context) {
            let result = await mockFloors();
            if (result.code === 200) {
                context.commit('GetFloors', result.data);
            }
        },
    },
    // 执行状态修改
    mutations: {
        GetCategoryList(state, val) {
            state.categoryList = val;
        },
        GetBanners(state, val) {
            state.banners = val;
        },
        GetFloors(state, val) {
            state.floors = val;
        }
    },
}