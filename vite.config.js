import {fileURLToPath, URL} from 'node:url'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 配置自动引入elementUI
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
// 设置路由
        proxy: {
            // // 字符串简写方式
            // '/api': 'http://gmall-h5-api.atguigu.cn'
            // 选项写法
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // rewrite: path => path.replace(/^\/api/, ''),
                changeOrigin: true,
            }
        },
        // 设置地址和端口
        host: '0.0.0.0',
        open: true
    },

})
