/**
 @name: app
 @author: 戴伟
 @date: 023 2022/12/23 14:23:14
 @file: src/store
 @description： do.....
 */

import {defineStore} from "pinia";
import {GET_SYSTEM_CONFIG} from "./type";

import routes from "@/router/main/index";

import appConfig from "@/config";

import localStorage from "@/utils/localStorage";



// 是否全局导出
// 如果全局导出 必须下面 名称格式为 useXXXXStore
export const isGlobal = true;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAppStore = defineStore("app", {
  state: () => {
    return {
      appConfig: appConfig,


      routesData:routes,



    };
  },
  getters: {

    token: (state:any) => {
      let _token = localStorage.getUserToken();
      // this.wuJieStore.isHaveWuJie = window?.__POWERED_BY_WUJIE__ ? true : false;
      const _isHaveWuJie = state?.wuJieStore.isHaveWuJie;
      if(_isHaveWuJie){
        const _wuJieToken = state?.wuJieStore.token;
        _token = _wuJieToken
        localStorage.setUserToken(_wuJieToken);
      }

      return _token
    },

    routes:(state:any)=>{

      // console.log('getRoutes',state.routesData)
      const _routes = state.routesData;



      return _routes;
    }

  },
  actions: {
    appInit() {

      return new Promise((resolve, reject) => {
        // console.log("useAppStore-appInit", this);




        // let _token = this.token;
        // let _location = getWindowLocation();
        // let _params = _location.params;
        // console.log('router',mainRoutes)

        // console.log('window.$wujie', window)
        // console.log('window.$wujie', window?.__POWERED_BY_WUJIE__)


        // localStorage.setUserToken('123123')



        // await this.getSystemConfig();
        // console.log("getSystemConfig");
        // console.log(_location);

        // 第三方 url 带loginType=1  参数直接登录
        // {type:1, userAccount:admin,password:123456}

        resolve({isOk: true})


        // return {isOk: true};
      })


    },




    isHaveRole(role:(any[] | string)){
      let _isHave = false
      const _role = role;
      // v-permission="['base-admin']"
      const _data = localStorage.getStorage('user');
      const _baseRoles = _data?.baseRoles || []

      _baseRoles?.map((item:string)=> {
        // console.log(item)
        if(typeof(_role) == 'string'){
          if(_role == item){
            _isHave = true;
          }
        }
        if(Array.isArray(_role)){
          _role?.map(cItem=>{
            if(item == cItem){
              _isHave = true;
            }
          })


        }
      })

      return _isHave;
    },




  },
});
