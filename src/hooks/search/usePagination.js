export default (searchParams) => {
// 根据当前页面并更新数据回调
    const getPage = (pageNo) => {
        searchParams.pageNo = pageNo;
    }
    return {
        getPage
    }
}