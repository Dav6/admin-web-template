/*
  @Author: 戴伟
  @Date: 2023-05-06 15:56:35
  @FilePath: src\stores\modules\API\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

import {defineStore} from "pinia";

// 是否全局导出
// 如果全局导出 必须下面 名称格式为 useXXXXStore
export const isGlobal = true;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAPIStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "API",
    // state: 返回对象的函数
    state: () => ({}),
    getters: {},
    actions: {




        // 统一处理的获取数据的接口
        // 第一个参数(必传) 获取数据的接口， 详情 列表 等接口
        // 第二个参数(非必传) 外部传入整个 queryData  必须是个对象
        //  queryData 中如果有 keyMap 字段 ，获取的 data 会根据 keyMap 正反字段都映射获取一遍
        // 第三个参数(非必传) 外部绑定数据，必须是个对象 且有 isLoading 和 data ，会自动修改 isLoading ，和接口返回时设置data
        // 四个个参数(非必传) isFirst 为true 且 queryData 中有 page 自动修改 queryData 的page为1
        // 如果 queryData 中有 page 会自动修改total
        // 分页传参有page  会 page 转 pageIndex
        getDataAPI(API: Function, queryData: { [key: (string | number | symbol)]: any }, data: {
            isLoading: boolean,
            data: any
        }, isFirst = false) {

            if (typeof (API) !== 'function') return console.error("getDataAPI第一个参数必须为方法")

            let _queryData: { [key: (string | number )]: any } = {
                ...queryData,
            }
            if (queryData?.page || queryData?.page == 0) {
                isFirst && (queryData.page = 1);
                _queryData = {
                    ...queryData,
                    pageIndex: queryData.page,
                    pageSize: queryData.pageSize,
                }
            }

            data.isLoading = true

            return new Promise((resolve, reject) => {
                API(_queryData).then((res: any) => {
                    // console.log(res)
                    if (res?.success || res?.code == '200') {
                        if (queryData && (queryData?.page || queryData?.page == 0)) {
                            queryData.total = res?.totalCount || 0;
                        }
                        const _keyMap:{[n:string]:any} = _queryData?.keyMap || {}
                        let _data:any = res.data;

                        if (this.utilStore.isObject(_keyMap) && Object.keys(_keyMap)?.length>0) {
                            _data = this.utilStore.setDataByKeyMap(_data,_keyMap)
                        }

                        res.data = _data;
                        data.data = _data;
                        resolve(res);
                    } else {

                        reject(res)
                    }

                }, (err: any) => {
                    reject(err)
                }).finally(() => {
                    setTimeout(() => {
                        data.isLoading = false;
                    }, 200)
                })
            })
        },


        // 统一处理弹框的 设置参数 如 添加 修改 的接口
        // 添加、修改的接口，
        // 第二个参数传入接口参数data
        // 第三个参数  message   默认为 添加成功，
        // message   默认为 添加成功，
        // options  外部完整的 一个对象， 如 dialogData  当接口成功时会根据 地址引用的原理 自动 修改外部 的 isShow 和 isLoading
        // callback 修改完后需要调用的回调
        // 会根据 options.type  add或者edit 自动修改 message
        // 接口成功 会 自动修改 options 的isShow 和 isLoading
        setDataAPI(API: Function, data: any, message: string = '添加成功', options: any = {}, callback?: Function) {
            if (typeof (API) !== 'function') return console.error("addEditAPI第一个参数必须为方法")
            const _data = data;
            let _message = message;
            const _options = options || {};
            if (_options?.type?.indexOf('add') > -1) {
                _message = '添加成功'
            }
            if (_options?.type?.indexOf('edit') > -1) {
                _message = '修改成功'
            }
            _options.isLoading = true;
            return new Promise((resolve, reject) => {
                API(_data).then((res: any) => {
                    if (res?.success || res?.code == '200') {
                        console.log('setDataAPI-API-res', res)
                        _message && this.globalStore.message(_message);
                        callback && callback(res);

                        if (_options.isShow == true) {
                            _options.isShow = false;
                        }
                        resolve(res);
                    } else {
                        reject(res)
                    }

                }, (err: any) => {
                    reject(err)
                }).finally(() => {
                    setTimeout(() => {
                        _options.isLoading = false;
                    }, 200)

                });
            })

        },


        // 统一处理 删除的接口，
        // 第一个参数
        // 第二个参数传入接口参数data
        // 第三个参数  messageBox   ，确认框的提示文字  默认为 是否删除当前
        // 第四个参数 message   ,删除完成后提示的参数 默认为 删除成功，
        // options  外部完整的 一个对象， 如 dialogData  当接口成功时会根据 地址引用的原理 自动 修改外部 的 isShow 和 isLoading
        // callback 修改完后需要调用的回调
        // 会根据 options.type  add或者edit 自动修改 message
        // 接口成功 会 自动修改 options 的isShow 和 isLoading
        deleteDataAPI(API: Function, data?: any, config: {
            [key: (string | number | symbol)]: any
        } = {boxMessage: '是否删除当前', message: '删除成功'}, callback?: Function) {
            if (typeof (API) !== 'function') return console.error("deleteDataAPI第一个参数必须为方法")

            const _config = config;
            // console.log('_config', _config)
            const _boxMessage = _config?.boxMessage || '是否删除当前'
            const _message = _config?.message || '删除成功'

            return new Promise((resolve, reject) => {
                this.globalStore.messageBoxConfirm(_boxMessage).then((res: any) => {
                    const _data = data;
                    API(_data).then((res: any) => {
                        console.log('res', res)
                        if (res?.success || res?.code == '200') {
                            callback && callback(res);
                            this.globalStore.message(_message);
                            resolve(res);
                        } else {
                            reject(res)
                        }
                    }, (err: any) => {
                        reject(err)
                    });
                }, (err: any) => {
                    reject(err)
                });
            })
        }


    },
});
