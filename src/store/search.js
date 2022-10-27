import {reqSearchList} from "@/api";

export default {
    // 配置命名空间
    namespaced: true,
    // 存数据
    state: {
        searchList: {}
    },
    // 写业务逻辑并调用mutations
    actions: {
        async getSearchList(context, params) {
            let result = await reqSearchList(params);
            if (result.code === 200) {
                context.commit('GetSearchList', result.data);
            }
        },
    },
    // 执行状态修改
    mutations: {
        GetSearchList(state, val) {
            state.searchList = val;
        },
    },
    // 简化获取数据操作
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || [];
        },
        attrsList(state) {
            return state.searchList.attrsList || [];
        },
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        },
        page(state) {
            return {
                pageNo: state.searchList.pageNo,
                pageSize: state.searchList.pageSize,
                total: state.searchList.total,
            }
        }
    }
}