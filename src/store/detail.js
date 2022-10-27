import {reqAddOrUpdateCartSuccess, reqDetail} from "@/api";
import {getToken} from "@/utils/token";

export default {
    // 配置命名空间
    namespaced: true,
    // 存数据
    state: {
        good: {},
    },
    // 写业务逻辑并调用mutations
    actions: {
        async getGood(context, skuId) {
            let result = await reqDetail(skuId);
            if (result.code === 200) {
                context.commit('GetGood', result.data);
            }
        },
        async addOrUpdateCartSuccess(context, {skuId, skuNum}) {
            let result = await reqAddOrUpdateCartSuccess(skuId, skuNum);
            if (result.code === 200) {
                return true;
            } else {
                return Promise.reject(new Error('false'));
            }
        }
    },
    // 执行状态修改
    mutations: {
        GetGood(state, val) {
            state.good = val;
        },
    },
    getters: {
        categoryView(state) {
            return state.good.categoryView || {};
        },
        skuInfo(state) {
            return state.good.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.good.spuSaleAttrList || [];
        },
        valuesSkuJson(state) {
            return state.good.valuesStuJson || {};
        }
    }
}