/// <reference types="vite/client" />


declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
declare module 'zr-component'
declare module 'element-plus'
declare module 'element-plus/*'
declare module 'nprogress'

interface Window {
    $wujie:any;
    __POWERED_BY_WUJIE__:any;
}