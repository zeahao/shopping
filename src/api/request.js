import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

// 创建一个axios接口
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

requests.interceptors.request.use(config => {
    nProgress.start();
    // 在请求头里面加入用户令牌
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

requests.interceptors.response.use(res => {
    nProgress.done();
    return res.data;
})

export default requests;