import emitter from "@/mitt/emitter";
import {useRoute, useRouter} from "vue-router";

export default (searchParams) => {
    const router = useRouter();
    const route = useRoute();
    // 删除分类名字面包屑
    const removeCategoryName = () => {
        router.push({
            name: 'search',
            params: route.params
        })
    }

// 删除关键字面包屑
    const removeKeyword = () => {
        router.push({
            name: 'search',
            query: route.query || undefined,
            params: {
                keyword: undefined
            }
        })
        // 事件总线，清除header组件的keyword
        emitter.emit('removeKeyword');
    }

// 添加品牌面包屑的自定义事件回调
    const trademarkInfo = (trademark) => {
        searchParams.trademark = trademark;
    }

// 删除品牌面包屑的自定义事件回调
    const removeTradeMark = () => {
        searchParams.trademark = undefined;
    }

// 收集平台售卖面包屑的自定义事件回调
    const attrInfo = (attr) => {
        // 判断attr是否存在
        if (searchParams.props.indexOf(attr) !== -1) {
            return
        }
        searchParams.props.push(attr);
    }

// 删除平台售卖面包屑(filter)
    const removeAttr = (attr) => {
        // 利用过滤器删除attr
        searchParams.props = searchParams.props.filter(item => item !== attr);
    }
    return {
        removeCategoryName,
        removeKeyword,
        trademarkInfo,
        removeTradeMark,
        attrInfo,
        removeAttr
    }
}