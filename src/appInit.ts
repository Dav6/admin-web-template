/**
 @name: appInit
 @author: 戴伟
 @date: 010 2022/10/10 11:02:16
 @file: src
 @description：应用初始化的时候执行
 */

import { useAppStore } from "@/store/modules/app";
import { useGlobalStore } from "@/store/modules/global/index";
import { pick } from "lodash-es";
import permission from "@/plugins/permission";
import router from "@/router";


export default {
  install: (app:any,{pinia,router}:any ) => {
    // console.log("appInit-install");
    // console.log(appStore);
    // console.log(appStore.test);

    const appStore:any = useAppStore();

    // const files = import.meta.glob('./**/store/**/**.js', { import: 'setup' })
    // console.log(files);
    // Object.keys(files)?.map(item=>{
    //   // console.log(files[item]())
    //   // console.log(files[item])
    //   if (import.meta.hot) {
    //     import.meta.hot.accept(acceptHMRUpdate(files[item], import.meta.hot))
    //   }
    //
    // })

    // app.$aaaa= 123123;
    // globalThis.$ccc= 5;
    // console.log('this',globalThis)
    // console.log('app',app)

    appStore.appInit().then((res:any) => {
      // console.log("appInit-install-res", res);
      if (res?.isOk) {
        // app.use(router)
        //
        //    app.use(permission, {router,})
        // app.use(permission, { router });

        app.mount("#app");
      }
    });

    // console.log(window.location)
    // console.log(JSON.parse(JSON.stringify(router)))
    // console.log(router.currentRoute);
    // console.log('window.location.search',window.location.search.split('?'))
    //

    // let obj = {
    //   userAccount:123,
    //   password:1111,
    // }
    //
    // let _str = '123456'
    // console.log(_str)
    // console.log(Base64.encode(_str))
    // console.log(Base64.decode(Base64.encode(_str)))

    // store.dispatch(`app/${APP_INIT}`)

    //
  },
};
