import requests from "./request"
import mock from "./mockAxios"

// 获取分类列表
export const reqCategoryList = () => {
    return requests.get(`/product/getBaseCategoryList`);
}

// 获取主页轮播图片
export const mockBanners = () => {
    return mock.get('/banners');
}

// 获取floor数据
export const mockFloors = () => {
    return mock.get('/floors');
}

// 获取search页数据
export const reqSearchList = (params) => {
    return requests.post('/list', params)
}

// 获取商品（detail）详情页数据
export const reqDetail = (skuId) => {
    return requests.get(`/item/${skuId}`);
}

// 添加获修改购物车商品数量
export const reqAddOrUpdateCartSuccess = (skuId, skuNum) => {
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}

// 修改商品是否被选中
export const reqUpdateChecked = (skuId, isChecked) => {
    return requests.get(`/cart/checkCart/${skuId}/${isChecked}`)
}

// 删除购物车商品
export const reqDeleteCart = (skuId) => {
    return requests.delete(`/cart/deleteCart/${skuId}`);
}

// 获取购物车数据
export const reqShopCart = () => {
    return requests.get('/cart/cartList');
}

// 获取验证码
export const reqSendCode = (phone) => {
    return requests.get(`/user/passport/sendCode/${phone}`);
}

// 注册
export const reqRegister = (data) => {
    return requests.post('/user/passport/register', data);
    // return requests({
    //     url:'/user/passport/register',
    //     method:'post',
    //     data
    // })
}

// 登录
export const reqLogin = (data) => {
    return requests.post('/user/passport/login', data);
}

// 退出登录
export const reqLogout = () => {
    return requests.get('/user/passport/logout');
}

// 获取用户信息
export const reqUserInfo = () => {
    return requests.get('/user/passport/auth/getUserInfo');
}

// 获取订单信息
export const reqOrder = () => {
    return requests.get('/order/auth/trade');
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests.post(`order/auth/submitOrder?tradeNo=${tradeNo}`, data);
}

// 查询订单支付信息
export const reqPayment = (orderId)=>{
    return requests.get(`/payment/weixin/createNative/${orderId}`);
}

// 获取订单支付状态
export const reqPayStatus = (orderId)=>{
    return requests.get(`/payment/weixin/queryPayStatus/${orderId}`);
}

// 获取订单列表
export const reqOrderList = (page,limit)=>{
    return requests.get(`/order/auth/${page}/${limit}`);
}