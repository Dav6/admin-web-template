import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


// import {serverCode} from "@/config"
import {serverCode,title} from "./src/config"
import setHtmlTitle from "./plugins/vite-plugin-setHtmlTitle";

import createFileByRouter from "./plugins/vite-plugin-create-file-by-router";

console.log('serverCode',serverCode)

const _htmlTitle:string = title;
const _serverCode = serverCode;
const _base = `/${_serverCode}`
const _outDir =  `dist/${_serverCode}`
console.log('_outDir',_outDir)
// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {

    const _mode: string = mode
    const _env: any = loadEnv(_mode, process.cwd());
    const _plugins: any[] = [];

    if (_mode === 'development') {
        _plugins.push(createFileByRouter())
    }


    return {
        base: _base,
        plugins: [
            vue(),
            setHtmlTitle({
                title:_htmlTitle
            }),
            ..._plugins
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 21333,

        },
        build: {
            outDir: _outDir, //指定输出路径
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            const arr = id.toString().split("node_modules/")[1].split("/");
                            switch (arr[0]) {
                                case "@naturefw": // 自然框架
                                case "@popperjs":
                                case "@vue":
                                case "element-plus": // UI 库
                                case "@element-plus": // 图标
                                    return "_" + arr[0];
                                    break;
                                default:
                                    return "__vendor";
                                    break;
                            }
                        }
                    },
                    chunkFileNames: "static/js1/[name]-[hash].js",
                    entryFileNames: "static/js2/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name]-[hash].[ext]",
                },
                brotliSize: false, // 不统计
                target: "esnext",
                minify: "esbuild", // 混淆器，terser构建后文件体积更小
            },
        }
    }
})
