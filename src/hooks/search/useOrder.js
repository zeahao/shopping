import {computed} from "vue";

const useOrder = (searchParams) => {
// 排序id
    const orderFlag = computed({
        get() {
            return searchParams.order.split(':')[0];
        },
        set(newValue) {
            searchParams.order = `${newValue}:${order.value}`;
        }
    })

// 是否升序
    const order = computed({
        get() {
            return searchParams.order.split(':')[1] === 'asc' ? '↑' : '↓';
        },
        set(newOrder) {
            searchParams.order = `${orderFlag.value}:${newOrder === '↑' ? 'asc' : 'desc'}`;
        }
    })

// 排序方法
    const changeOrder = (flag) => {
        // flag:综合：'1',价格：'2'
        if (flag === orderFlag.value) {
            order.value = order.value === '↑' ? '↓' : '↑';
        } else {
            orderFlag.value = flag;
            order.value = '↓';
        }
    }

    return {
        orderFlag,
        order,
        changeOrder
    }
}

export default useOrder