import {reqOrder, reqSubmitOrder} from "@/api";

export default {
    namespaced: true,
    state: {
        order: {},
    },
    actions: {
        // 获取订单信息
        async getOrder(context) {
            let result = await reqOrder();
            if (result.code === 200) {
                context.commit('GetOrder', result.data);
            }
        },
        // 提交订单
        async submitOrder(context, {tradeNo,data}){
            let result = await reqSubmitOrder(tradeNo,data);
            if (result.code === 200){
                return result.data;
            }else {
                Promise.reject(new Error('失败'));
            }
        }
    },
    mutations: {
        GetOrder(state, val) {
            state.order = val;
        }
    },
    getters: {
        // 收货地址
        addressList(state) {
            return state.order.userAddressList || [];
        },
        // 交易页信息
        order(state) {
            return state.order || {};
        }
    },
}