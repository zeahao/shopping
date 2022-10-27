import {reqDeleteCart, reqShopCart, reqUpdateChecked} from "@/api";

export default {
    // 配置命名空间
    namespaced: true, // 存数据
    state: {
        CartList: [],
    },

    // 写业务逻辑并调用mutations
    actions: {
        // 获取个人购物车数据
        async getCartList(context) {
            let result = await reqShopCart();
            if (result.code === 200) {
                context.commit('GetCartList', result.data);
            } else {
                console.log('失败了');
            }
        },
        // 修改商品可选状态
        async updateChecked(context, {skuId, isChecked}) {
            let result = await reqUpdateChecked(skuId, isChecked);
            if (result.code === 200) {
                return true;
            } else {
                return Promise.reject(new Error('false'));
            }
        },
        // 修改所有商品状态
        async changeAllChecked(context, isChecked) {
            let list = context.getters.CartList.cartInfoList;
            let PromiseAll = [];
            list.forEach((item) => {
                if (item.isChecked !== isChecked) {
                    let promise = context.dispatch('updateChecked', {
                        skuId: item.skuId,
                        isChecked
                    });
                    PromiseAll.push(promise);
                }
            })
            // 只要所有都成功那就成功，否则失败
            return Promise.all(PromiseAll);
        },
        // 删除商品
        async deleteCart(context, skuId) {
            let result = await reqDeleteCart(skuId);
            if (result.code === 200) {
                return true;
            } else {
                return Promise.reject(new Error('false'));
            }
        },
        // 删除购物车所有选中的商品
        deleteAllCheckedCart(context) {
            let list = context.getters.CartList.cartInfoList;
            let PromiseAll = [];
            list.forEach((item) => {
                if (item.isChecked) {
                    let promise = context.dispatch('deleteCart', item.skuId);
                    PromiseAll.push(promise);
                }
            })
            // 只要所有都成功那就成功，否则失败
            return Promise.all(PromiseAll);
        },

    },

    // 执行状态修改
    mutations: {
        GetCartList(state, val) {
            state.CartList = val;
        }
    },

    // 简化数据
    getters: {
        CartList(state) {
            return state.CartList[0] || {};
        }
    }
}