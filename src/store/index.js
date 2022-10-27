import {createStore} from "vuex";
import home from "./home";
import search from "@/store/search";
import detail from "@/store/detail";
import shopCart from "@/store/shopCart";
import user from "@/store/user";
import trade from "@/store/trade";
import order from "@/store/order";

export default createStore({
    // 创建vuex模块
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade,
        order
    }
})