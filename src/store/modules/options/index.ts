/*
  @Author: 戴伟
  @Date: 2023-03-02 13:52:38
  @FilePath: src\store\modules\options\index.js
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

import {defineStore} from "pinia";
import {randomNum} from "@/utils/tools";


// 自动生成 假的tree 数据 用于调试 ，
// 等对接后可以删了
const setList = (list:any[], parent?:any, level: (number ) = 1) => {
    const _level = level;
    // console.log('level',level)
    if (_level > 4) {
        return [];
    }
    const _list:any[] = list?.map((item, index) => {
        const _item:{[n:string]:any} = {}

        _item.title = parent?.index ? `测试 ${parent.index}-${index}` : `测试 ${index}`;
        _item.label = _item.title;
        _item.name = _item.label;
        _item.index = parent?.index ? `${parent.index}-${index}` : `${index}`;
        _item.value = _item.index;
        _item.children = []
        _item.children = setList(Array(randomNum(1,5)).fill({}), _item, _level + 1)

        // if (index == 3 || index == 4) {
        //     _item.children = setList(Array(1).fill({}), _item, _level + 1)
        // }

        return _item;
    })

    return _list
}

// 是否全局导出
// 如果全局导出 必须下面 名称格式为 useXXXXStore
export const isGlobal = true;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// @ts-ignore
export const useOptionsStore :any = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "options",
    // state: 返回对象的函数
    state: ():{[n:string]:any} => ({
        listQuery: {
            pageIndex: 1,
            pageSize: 999,
        },
        // 是否
        isAfresh: true,



        treeMap:{
            // 键名与 g-tree 的 treeType 相同
            1:[],
        },


        _mapOptions: {},









    }),
    getters: {
        mapOptions: (state) => {
            // console.log('options-mapOptions---',state)
            const _mapOptions = state._mapOptions;
            // console.log('options-mapOptions---',_mapOptions)

            return _mapOptions
        },
    },
    actions: {

        init() {
        },
        initOptions(key: string) {
            // (!key || key == 'deviceType') && this._getDeviceTypeOptions().then();
        },



        deviceGroupTree(lisQuery:any){
            return new Promise((resolve, reject) => {
                const _lisQuery: object = {}

                // 与 g-tree 的 treeType 相同
                const _type:number = 1;
                const _treeList:any[] = setList(Array(1).fill({}))


                //  模拟接口 延迟获取 ，不能直接获取
                setTimeout(()=>{
                    this.treeMap[_type] = _treeList;
                },10)




                //     // 不管接口成功失败都用 resolve 返回到上一层
                resolve({code: "200", success: true, data: this.treeMap});

                // resolve({code: "error", success: false, data: []});

            })


        },


























        // section 部门树列表 选项options
        _getOrgListOptionsServer() {
            return new Promise((resolve, reject) => {
                const _lisQuery: object = {}

                // getOrgOptionsAPI(_lisQuery).then(res => {
                //     // console.log('组织tree列表', JSON.parse(JSON.stringify(res.data)));
                //
                //     let _list: any = res.data ? [res.data] : [];
                //     // const _path = `$..childs[:]`;
                //     const _path = `$..[?(@property == "childs")]`
                //     _list = {name: "", label: "", value: "", id: "", childs: _list}
                //     JSONPath({
                //         json: _list, path: _path, resultType: "all",
                //         callback(item: any) {
                //             const _parent = item.parent;
                //             const _childrens = item.value;
                //             _childrens?.map((cItem: any, cIndex: number) => {
                //                 const _index = _parent.index ? `${_parent.index}-${cIndex}` : `${cIndex}`;
                //                 cItem.index = _index;
                //
                //                 cItem.name = cItem?.orgName;
                //                 cItem.label = cItem?.orgName;
                //                 cItem.value = cItem?.id;
                //
                //
                //                 cItem.parentOrgId = _parent?.id;
                //                 cItem.parentOrgName = _parent?.name;
                //                 cItem.parentName = _parent?.name;
                //                 cItem.parentId = _parent?.id;
                //                 cItem?.childs?.length > 0 && (cItem.children = cItem.childs)
                //
                //             })
                //         }
                //     });
                //
                //
                //     _list = _list.childs;
                //     console.log('_list',_list);
                //     this.organization.options = _list;
                //     // 不管接口成功失败都用 resolve 返回到上一层
                    resolve({code: "200", success: true, data: this.organization});
                // }, err => {
                //     this.organization.options = [];
                //     // 不管接口成功失败都用 resolve 返回到上一层
                //     resolve({code: "error", success: false, data: []});
                // })

            })
        },

        async getOrgListOptions(isAfresh: boolean = this.isAfresh) {
            // console.log('getOrgListOptions')
            if (this.organization.options?.length > 0) {
                isAfresh && await this._getOrgListOptionsServer();
            } else {
                await this._getOrgListOptionsServer();
            }

            return this.organization;
        },


        setMapOptions(list: any[] = []) {
            const _list = list;
            this._mapOptions = {};
            // console.log('字典数据 -_list',_list)
            _list.map((item: any) => {
                const _code = item?.code;
                const _options = item?.options || []
                const _newOptions: any[] = []
                const _newMap: any = {}
                if (_options?.length > 0) {
                    _options?.map((optionItem: any) => {
                        const _label = optionItem?.label || "";
                        const _value = optionItem?.value || "";
                        const _language = optionItem?.language || "";
                        const _option = {
                            label: _label,
                            value: _value,
                            language: _language
                        }
                        _newMap[_value] = _option;
                        _newOptions.push(_option)
                    })
                }
                if (_code) {
                    this._mapOptions[_code] = {
                        options: _newOptions,
                        map: _newMap
                    }
                    // this._mapOptions[_code] = _newOptions
                }
            })
        },

        // section 字典数据解析成本地option
        _getMapOptionsServer() {
            // const _queryData = queryData;
            return new Promise((resolve, reject) => {
                // getMapOptionsListAPI({}).then(res => {
                //     const _list: any[] = res.data?.length > 0 ? res.data : [];
                //     this.setMapOptions(_list);
                //     // console.log('this._mapOptions',this._mapOptions)
                //     resolve({code: "200", success: true, data: this._mapOptions});
                // }, err => {
                //     // this.organization.options = [];
                //     // 不管接口成功失败都用 resolve 返回到上一层
                //     resolve({code: "error", success: false, data: {}});
                // })
            })
        },


        // queryData 获取指定的MapOptions
        // queryData
        //     1.为空 会取所有的选项
        //     2.为字符串 如 unit ， 会返回  unit的  选项  {unit:{map:{},options:[]}}
        //     3.为数组 如 ['unit','gender']  会返回 unit gender 的选项 {unit:{map:{},options:[]},gender:{map:{},options:[]}}
        //     4.为对象的时候 如 {unit1:'unit',gender1:'gender'}
        //       4.1 会返回 会取unit的选项然后返回 unit1 的键名  {unit1:{map:{},options:[]},gender1:{map:{},options:[]}}
        //       4.2 如果对象 {option1:[{  label:"测试1",  value:1,  }]}  中值  为数组 ，
        //           会以自带的数组返回 {option1:{ options: [{ label:"测试1", value:1}],  map: { label:"测试1", value:1} }}
        // type 参数  map || options ,
        //     1. 如果不填 会返回 如 {unit:{map:{},options:[]}}
        //     2. 如果为map  会返回 如 {unit:{}} 直接会把map 返回不带map
        //     3. 如果为options  会返回 如 {unit:[]} 直接会把options 返回不带options
        getMapOptionsByKey(queryData?: (string | string[] | { [name: (string | number)]: string }), type?: string) {
            let _mapOptions: any = {};
            const _mapOptionsAll = this._mapOptions;
            const _queryData: any = queryData;
            // console.log('queryData', queryData)
            if (_queryData && (this.utilStore.isString(_queryData) || this.utilStore.isArray(_queryData) || this.utilStore.isObject(_queryData))) {
                if (this.utilStore.isString(_queryData)) {
                    _mapOptions[_queryData] = _mapOptionsAll?.[_queryData] || {options: [], map: {}};
                }
                if (this.utilStore.isArray(_queryData)) {
                    _queryData?.map((cKey: (string | number)) => {
                        _mapOptions[cKey] = _mapOptionsAll?.[cKey] || {options: [], map: {}};
                    })
                }
                if (this.utilStore.isObject(_queryData)) {
                    Object.keys(_queryData)?.map((cKey: string) => {
                        _mapOptions[cKey] = {options: [], map: {}}
                        if (this.utilStore.isString(_queryData?.[cKey])) {
                            _mapOptions[cKey] = _mapOptionsAll?.[_queryData?.[cKey]] || {options: [], map: {}};
                        }
                        if (this.utilStore.isArray(_queryData?.[cKey])) {
                            // console.log('_queryData?.[cKey]', _queryData?.[cKey])
                            const _map: { [name: (string | number)]: any } = {}
                            const _options = _queryData?.[cKey]?.map((item: any) => {
                                const _label = item?.label;
                                const _value = item?.value;
                                const _item = {...item, label: _label, value: _value}
                                _map[_value] = _item;
                                return _item;
                            }) || []

                            _mapOptions[cKey] = {
                                options: _options,
                                map: _map,
                            }

                        }

                    })
                }

            } else {
                _mapOptions = this._mapOptions;
            }
            if (type == 'map' || type == 'options') {
                Object.keys(_mapOptions)?.map((key: string) => {
                    // console.log('_mapOptions', _mapOptions[key])
                    _mapOptions[key] = _mapOptions?.[key]?.[type]
                })
            }

            return _mapOptions
        },

        // 获取字典
        async getMapOptions(queryData?: any, isAfresh: boolean = this.isAfresh) {
            isAfresh && await this._getMapOptionsServer();
            const _mapOptions: { [name:string]:any } = this.getMapOptionsByKey(queryData);
            // console.log('_mapOptions',_mapOptions)
            return _mapOptions;
        },


        // section 路由切换
        onRouterChange(router: any) {
            const _router = router;
            // this.getMapOptions();
            // if(_router?.currentRoute?.value?.name == 'mapManagement'){
            //     console.log('当前路由-字典管理-不请求','')
            // }else{
            //
            // }

        }


    },
});
