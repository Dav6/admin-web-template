/*
  @Author: 戴伟
  @Date: 2023-04-15 10:24:42
  @FilePath: src\stores\modules\util\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/


import { defineStore } from "pinia";
import {swapKeysAndValues} from "@/utils/tools";

const utilsFiles:any = import.meta.glob(["@/utils/**/index.ts"], { eager: true });
const utils:{[name:string]:any} = {}
Object.keys(utilsFiles)?.map((filePath:any) => {
  const _filePath = filePath;
  Object.keys(utilsFiles?.[filePath])?.map((key:any) => {
    const _key = key;
    if(_key && _key !== 'default'){
      utils[_key] = utilsFiles?.[_filePath]?.[_key]
    }

  })
})
// const _globalKeyMap = swapKeysAndValues(this.XXXStore.globalKeyMap)
// console.log('utils',utils)
// 是否全局导出
// 如果全局导出 必须下面 名称格式为 useXXXXStore
export const isGlobal = true;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useUtilStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "util",
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  actions: {
    ...utils,
    setDataByKeyMap(data:({[n:string]:any}|any[]),keyMap:{[n:string]:any}){
      const _data:any = data;
      const _keyMap:{[n:string]:any} = keyMap;
      const _swapKeyMap:{[n:string]:any} = this.swapKeysAndValues(_keyMap);
      // console.log('utilStore-this',this)
      // console.log('_data',_data)
      // console.log('_keyMap',_keyMap)
      // console.log('_swapKeyMap',_swapKeyMap)

      if (this.isArray(_data)) {
        // console.log('数组')
        _data?.map((item:any)=>{
          if (this.isObject(item)) {
            // console.log('对象')
            Object.keys(item)?.map((key:string)=>{
              const _key:string = key;
              const _mapKey:string = _keyMap[_key]
              const _swapMapKey:string = _swapKeyMap[_key]
              // console.log('_mapKey',_mapKey)
              // console.log('_swapMapKey',_swapMapKey)
              if(_mapKey){
                item[_mapKey] = item[_key];
              }
              if(_swapMapKey){
                item[_swapMapKey] = item[_key];
              }

            })


          }
        })

      }
      if (this.isObject(_data)) {
        Object.keys(_data)?.map((key:string)=>{
          const _key:string = key;
          const _mapKey:string = _keyMap[_key]
          const _swapMapKey:string = _swapKeyMap[_key]
          if(_mapKey){
            _data[_mapKey] = _data[_key];
          }
          if(_swapMapKey){
            _data[_swapMapKey] = _data[_key];
          }

        })
      }

      return _data;

    },
  },
});
