/*
  @Author: 戴伟
  @Date: 2023-05-26 15:00:52
  @FilePath: src\plugins\permission\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

import NProgress from "nprogress";
import {useAppStore} from "@/store/modules/app";
// import { useAppStore } from "@/store/modules/app";
// import {JSONPath} from 'jsonpath-plus'
// import store from "@/store";

// console.log('permission',store.getters.token)

export default {
    install: async (app:any, { router, store }:any) => {
        // return false;
        // let currentRoute = router.options.history.location;
        // if(store.getters.token && currentRoute != '/login'){
        //   // 初始化时 有token 且不在登录 才会执行权限路由获取、添加，
        //   store.dispatch(`app/${GET_AUTH_ROUTES}`,)
        // }

        // router.replace('/')
        // if(authRoutes.value?.length>0){
        //   router.replace(authRoutes.value[0]['path'])
        // }else{
        //   router.replace('/login')
        // }
        // await store.dispatch(`app/${GET_AUTH_ROUTES}`,)

        router.beforeEach((to:any, from:any, next:any) => {
            NProgress.start();
            // console.log("router",router)
            console.log("to", to);
            const appStore:any = useAppStore();

            if(to.path === '/'){
                console.log('appStore',appStore.routes)
                const _path:string = appStore.routes[0]['path']
                return next(_path);
            }


            return next();

            // const _toPath = to?.path;
            // const appStore = useAppStore();
            // let _path = `$..[?(@ && @.url == '${_toPath}')]`;
            // let _mainRoutes = JSON.parse(JSON.stringify(appStore.mainRoutes));
            // // console.log('_path',_path);
            // // console.log('appStore.mainRoutes',_mainRoutes);
            // let _routers = JSONPath({json: _mainRoutes, path: _path });
            // // console.log('JSONPATH------------',_routers)
            //
            // if(_routers?.length > 0) {
            // }else{
            //     // console.log('_mainRoutes[0][\'path\']',_mainRoutes[0]['path'])
            //     let _path = _mainRoutes[0]['path']
            //     return next(_path);
            // }



 
        });
        router.afterEach(() => {
            // console.log('afterEach')
            NProgress.done();
        });
    },
};
