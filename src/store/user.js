import {reqLogin, reqLogout, reqRegister, reqSendCode, reqUserInfo} from "@/api";
import {getToken, removeToken, setToken} from "@/utils/token";

export default {
    // 配置命名空间
    namespaced: true,
    // 存数据
    state: {
        userInfo: {}, token: getToken(),
    },
    // 写业务逻辑并调用mutations
    actions: {
        // 获取验证码
        async getSendCode(context, phone) {
            let result = await reqSendCode(phone);
            if (result.code === 200) {
                return result.data;
            } else {
                return Promise.reject(new Error('手机号错误'))
            }
        },
        // 注册
        async register(context, data) {
            let result = await reqRegister(data);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 登录
        async login(context, data) {
            let result = await reqLogin(data);
            if (result.code === 200) {
                context.commit('Login', result.data.token);
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 退出登录
        async logout(context) {
            let result = await reqLogout();
            if (result.code === 200) {
                context.commit('Logout');
            } else {
                return Promise.reject(new Error('失败'));
            }
        },
        // 获取用户信息
        async getUserInfo(context) {
            let result = await reqUserInfo();
            if (result.code === 200) {
                context.commit('GetUserInfo', result.data);
            } else {
                // token过期了，退出登录并清除数据
                await context.dispatch('logout');
                return Promise.reject(new Error('token过期了,请重新登陆'));
            }
        }
    },
    // 执行状态修改
    mutations: {
        GetUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }, Login(state, token) {
            state.token = token;
            // 将token保存到本地存储
            setToken(token);
        }, Logout(state) {
            state.userInfo = {};
            state.token = '';
            // 清除掉本地存储的token
            removeToken()
        }
    },
    // 简化获取数据操作
    getters: {
        userInfo(state) {
            return state.userInfo;
        }
    }
}