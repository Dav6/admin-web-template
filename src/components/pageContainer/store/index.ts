/*
  @Author: 戴伟
  @Date: 2023-06-15 14:45:55
  @FilePath: src\components\pageContainer\store\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

import {defineStore} from "pinia";

// import {
//
// } from "./config";

// import {tableListTemplate} from "@/views/tms/test/store/config";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const usePageContainerStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "pageContainer",
    // state: 返回对象的函数
    state: () => ({
        isLoading: true,

        treeData:{
            ref:"",
            isLoading:true,
            treeType:"",
            treeNodeKey: "",
            treeCurrent: "",
            lastTreeCurrent:"",
        },


        props:{},

    }),
    getters: {
        treeList:(state:any)=>{
            let _treeList:any[] = [];
            if(state.treeData.treeType >0){
                if(state.treeData.treeType == 1){
                    _treeList = state.optionsStore?.treeMap?.[state.treeData.treeType] || [];

                }
            }else{
                _treeList = state.props.treeList

            }
            // console.log('%c pageContainer-_treeList','color:#f92',_treeList)

            // console.log('pageContainerStore-treeList', _treeList)
            // console.log('this.treeData.ref',state.treeData.ref?.getStore?.().getCurrentKey())






            return _treeList;
        }
    },
    actions: {
        init(props: any) {
            console.log('pageContainerStore-init', props, '-------------------');
            this.setConfig(props)
            //
            this.getTreeList()
            // setTimeout(() =>{
            //     console.log('重新获取')
            //     this.optionsStore.deviceGroupTree()
            // },10)
        },






        setConfig(props: any) {
            const _treeType: string | number | undefined = props.treeType || undefined;
            const _treeCurrent: (string | number) = props.treeCurrent;
            const _treeNodeKey: string | number = props.treeNodeKey;
            const _props = props
            this.treeData.props = _props;
            this.treeData.treeType = _treeType;
            this.treeData.treeNodeKey = _treeNodeKey;
            this.treeData.treeCurrent = _treeCurrent;

        },
        setTreeRef(el: any) {
            this.treeData.ref = el;
        },
        getTreeList(list: (Array<any>) = []) {
            // console.log('treeType',this.treeType)
            this.treeData.isLoading = true;
            const _treeType: number = Number(this.treeData.treeType)
            if (_treeType == 1) {
                this.optionsStore.deviceGroupTree().then((res:any) => {
                    // console.log('deviceGroupTree-res',this.treeCurrent, res)
                    this.treeData.isLoading = false;

                    // const _data = this.getCurrentData()
                    // console.log('data-----------',_data)

                })


            }
        },


    },
});
