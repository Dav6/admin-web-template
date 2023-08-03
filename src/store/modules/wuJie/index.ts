/*
  author: 戴伟
  date: 2023-01-07 09:49:11 
  file: src\store\modules\global\index.js
  fileName:index
  des:
    do.....
*/

import { defineStore } from "pinia";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useWuJieStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "wuJie",
  // state: 返回对象的函数
  state: () => ({
    // 是否存在无界

    // 注入对象
    bus: {},
    shadowRoot:{},
    location:{},
  }),
  getters: {
    app:(state:any) => {
      const _appStore:any = {}
      const _isHaveWuJie = state.isHaveWuJie
      if(_isHaveWuJie){
        console.log('window?.$wujie?',window?.$wujie)
        // window.$wujie.props.optionsStore.mapOptions.push({})
        // state.props.appStore = null



      }

      return _appStore;
    },

    isHaveWuJie:(state:any)=>{

      const _isHaveWuJie = window?.__POWERED_BY_WUJIE__ ? true : false;
      return _isHaveWuJie;

    },
    props:(state:any) => {


      let _props =  {}
      const _isHaveWuJie = state.isHaveWuJie
      if(_isHaveWuJie){
        _props = window?.$wujie?.props || {};
      }



      return _props;
    },


    token:(state:any)=>{
      let _token = '';
      const _isHaveWuJie = state.isHaveWuJie
      if(_isHaveWuJie){
        _token = state?.props?.systemInfo?.token;
      }

      return _token;
    },


    logOut:(state:any)=>{
      const _isHaveWuJie = state.isHaveWuJie
      if(_isHaveWuJie){
        state?.props?.logout && state?.props?.logout()
      }
    }


  },
  actions: {
    init(){

    }
  },
});
