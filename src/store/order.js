import {reqOrderList, reqPayment, reqPayStatus} from "@/api";

export default {
    namespaced: true,
    state: {
        payment: {},
        orderList: {}
    },
    actions: {
        // 获取支付信息
        async getPayment(context, orderId) {
            let result = await reqPayment(orderId)
            if (result.code === 200) {
                context.commit('GetPayment', result.data);
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        // 查询支付状态
        async getPayStatus(contest, orderId) {
            let result = await reqPayStatus(orderId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async getOrderList(context, {page, limit}) {
            let result = await reqOrderList(page, limit);
            if (result.code === 200) {
                context.commit('GetOrderList', result.data);
            } else {
                return Promise.reject(new Error(result.message));
            }
        }
    },
    mutations: {
        GetPayment(state, val) {
            state.payment = val;
        },
        GetOrderList(state, val) {
            state.orderList = val;
        }
    },
    getters: {
        payment(state) {
            return state.payment || {};
        },
        orderList(state){
            return state.orderList || {};
        }
    },
}