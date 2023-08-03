/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\rms\release\releaseList\components\container\store\index.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import { defineStore } from "pinia";
import {
  tableKeyList,
  sectionButtonsConfig,
  tableSettingsConfig,
  tableShowConfig
} from "./config";


// addEditDialog 批量创建 防止id重复
const container = 'releaseListContainer'
import {
  deleteData as deleteDataAPI,
} from "../../../api";
// import { randomNum } from "@/utils/tools";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// 命名规范将返回的函数命名为 use releaseList Store 是跨可组合项的约定,
// id 命名为 releaseList
export const useContainerStore = defineStore({
  // @ts-ignore
  // id: 必须的，在所有 Store 中唯一
  id: container,
  // state: 返回对象的函数
  state: () => ({
    // 列表的配置数据
    tableConfig: {
      showConfig: tableShowConfig,
      keyList: tableKeyList,
      settingsConfig: tableSettingsConfig,
      sectionButtons:sectionButtonsConfig,
    },
    //  列表数据
    listData: {
      isLoading: true,
      data: [],
    },
  }),
  getters: {
    listQuery:(state:any)=>{
      // console.log('state',state)
      const _listQuery = state.releaseListStore.listQuery;
      return _listQuery;

    },


    // table 上全局的过滤选项 根据 key去区分
    // table 显示过滤 需要先设置 _filterKeyMap 中需要的 key
    globalFiltersOption: (state: any) => {

      const _filterKeyMap: { [name: string]: any } = {
        "name": [
          {
            label: "测试1",
            value: 1,
          },
          {
            label: "测试2",
            value: 2,
          }
        ],
        // _mapOptionsServer 里的key 做映射
        // 人员类型
        // personType:"personnelType",
        // // 证件类型
        // idType:"idType",
      }

      const _filters: { [name: string]: any } = state.optionsStore?.getMapOptionsByKey(_filterKeyMap, 'options')
      return _filters

    },
    //  table 列表中 需要转换的选项值
    //  keyList 里 type 为 option 的
    globalOption: (state: any) => {
      const _organizationServer = state.optionsStore?.organization?.options || []

      const _mapOptionsServer = state?.optionsStore?.mapOptions || {}

      // console.log('addEditDialog-_mapOptionsServer', _mapOptionsServer)
      const _globalMapOptions:any = state.releaseListStore.globalMapOptions;

      const _optionKeyMap:{[name:string]:any} = {

        gender:[ ],

        ..._globalMapOptions.options




        // orgId: _organizationServer,

      }
      const _option:{[name:string]:any} = state.optionsStore?.getMapOptionsByKey(_optionKeyMap,'options')

      // console.log('_option', _option)

      return _option
    }
  },
  actions: {
    init() {
      // this.getList();
      // console.log('container-this',this)



    },



    openDialog(key: string, data: any) {
      const _key: string = key;
      const _data: any = data || {};
      this.releaseListStore.addEditDialogStore.openCloseDialog(true, 'edit', _data)

    },



    beforeSwitchChange(data:any){
      return new Promise((resolve, reject) => {
        console.log('data',data)
        // 返回resolve 会正常切换switch
        // resolve('111')
      })
    },



    onSection(data: any) {
      console.log('onSection')
    },
    sortChange(data: any) {
      console.log('sortChange')
    },

    filterChange(data: any) {
      console.log('filterChange')
    },





    deleteData(data: any, type?: string) {
      console.log(data);
      const _data = data;
      const _ids:any[] = [];
      let _boxMessage: string = ``
      if (type == 'multiple') {
        const _selection = _data?.data;
        _boxMessage = `批量删除`
        const _names: any[] = []
        _selection?.map((item: any) => {
          _boxMessage = `${_boxMessage}  `
          _names.push(item?.name)
          _ids.push(item.id);
        })
        _boxMessage = `${_boxMessage} ${_names.join(',')}`

      } else {
        const _id = _data?.id;
        const _name = _data?.name;
        _boxMessage = `是否删除 ${_name}`

        _ids.push(_id);
      }

      const _config = {
        boxMessage: _boxMessage, // 不填默认为 是否删除当前
        // message : '删除成功'  // 不填默认为删除成功
      }

      console.log(_ids)

      // const _API = async () => Object({success: true, message: '删除成功'})
      this.APIStore.deleteDataAPI(deleteDataAPI, _ids, _config, this.releaseListStore.getList)

    },





  },

});
