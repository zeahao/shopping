import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000,
});

requests.interceptors.request.use(config => {
    nProgress.start();
    return config;
}, error => {
    return Promise.error(error);
})

requests.interceptors.response.use(res => {
    nProgress.done();
    return res.data;
})

export default requests;