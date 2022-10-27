/**
 * 提示用户功能未开发
 */
export default {
    install(vue) {
        vue.config.globalProperties.$cue = () => {
            alert('抱歉，该功能暂未开发完善，不提供体验');
        }
    }
}