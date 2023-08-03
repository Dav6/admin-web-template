import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import "@/styles/index.less"
import App from './App.vue'
import router from './router'
import installPlugins from "./plugins/index"
import appInit from "@/appInit";
import piniaGlobal from "@/store/plugins/piniaGlobal/index"


const app = createApp(App)
const pinia = createPinia()

// console.log('router',router)
const appCreate = async ()=>{
    app.use(pinia)
    app.use(router)
    app.use(installPlugins, { router ,pinia})
    app.use(appInit,{router,pinia})


}



appCreate().then();



// app.mount('#app')
