/*
  @Author: 戴伟
  @Date: 2023-03-31 14:56:17
  @FilePath: src\stores\plugins\piniaGlobal.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/


// import {useAppStore} from '@/stores/modules/app'
// import {useAPIStore} from '@/stores/modules/API'
// import {useGlobalStore} from '@/stores/modules/global'
// import {useOptionsStore} from '@/stores/modules/options'
// import type {PiniaPluginContext} from "pinia";
// import type {App} from "vue";

const storesFiles: any = import.meta.glob(["@/store/modules/**/index.ts"], {eager: true});
// console.log('storesFiles------------',storesFiles)

export default {
  install: (app:any, {pinia}:any) => {
    const _piniaIds:Set<any> = new Set();

    // 全局的 store
    const globalStores:Array<any> = [];
    Object.keys(storesFiles)?.map((file: any) => {
      const _isGlobal = storesFiles?.[file]?.isGlobal == true;
      if (_isGlobal) {
        Object.keys(storesFiles?.[file])?.map((key: any) => {
          const _lastStr = key?.slice(-5)
          if (key.indexOf('use') === 0 && _lastStr == 'Store') {
            if (storesFiles?.[file]?.[key]) {
              const _store = storesFiles?.[file]?.[key];
              const _id= _store.$id;
              const _isHaveStore:boolean = _piniaIds.has(_id);
              if(_isHaveStore){
                console.error(`%c store-Id: ${_id} 重复`,'font-weight:600;padding:0 10px')
              }else{
                _piniaIds.add(_id)
              }

              const _name = `${_id}Store`
              // 代理
              globalStores.push(_store())
            }
          }
        })
      }
    })

    globalStores?.map(item => {
      globalStores?.map(cItem => {
        if (item.$id != cItem.$id) {
          const _key:string = `${cItem.$id}Store`
          // item.$state[_key] = cItem;
          // item[_key] = cItem;
          // 全局的store 通过代理的方式给其他store 使用，防止 深拷贝报错
          Object.defineProperties(item.$state,{
            [_key]:{get:()=>cItem}
          })
          Object.defineProperties(item,{
            [_key]:{get:()=>cItem}
          })
        }
      })
    })

    // console.log('globalStores', globalStores)



    pinia.use(({options, store,app,pinia}:any) => {
      // 为每个pinia 都添加全局的globalStore app



      const _options = options;


      globalStores?.map(item => {
        // console.log(store,item)
        if (store.$id != item.$id) {
          const _key:string = `${item.$id}Store`
          // console.log('key',_key);
          // store.$state[_key] = item;
          // store= item;
          // 全局的store 通过代理的方式给其他store 使用，防止 深拷贝报错
          Object.defineProperties(store.$state,{
            [_key]:{get:()=>item}
          })
          Object.defineProperties(store,{
            [_key]:{get:()=>item}
          })

        }
      })

      // console.log('Object.keys(options.state())',Object.keys(options.state()))
      // if(_options.persist){
      //   // @ts-ignore
      //   if(!_options?.persist?.paths?.length>0){
      //     _options.persist = {
      //       // @ts-ignore
      //       ...options.persist,
      //       // @ts-ignore
      //
      //       paths:Object.keys(options.state())
      //     };
      //     options.persist = _options.persist
      //   }
      //
      //
      // }

      // console.log('store------', store)

      if (import.meta.env.NODE_ENV == "development") {
        // 添加你在 store 中设置的键值
        globalStores?.map(item => {
          const _key:string = `${item.$id}Store`
          store._customProperties.add(_key);
        })

        // store._customProperties.add("$resetState");
      }
    })

  },
};
