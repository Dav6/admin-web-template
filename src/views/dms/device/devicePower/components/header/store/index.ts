/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\devicePower\components\header\store\index.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import {defineStore} from "pinia";
import {
    listQueryFormList,
    listQueryButtonList
} from "./config";

// addEditDialog 批量创建 防止id重复
const header: string = 'devicePowerHeader'
// import {} from "../api";
// import { randomNum } from "@/utils/tools";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// 命名规范将返回的函数命名为 use devicePower Store 是跨可组合项的约定,
// id 命名为 devicePower
export const useHeaderStore = defineStore({
    // @ts-ignore
    // id: 必须的，在所有 Store 中唯一
    id: header,
    // state: 返回对象的函数
    state: () => ({
        // 列表查询数据
        queryData: {
            ref: "",
            formList: JSON.parse(JSON.stringify(listQueryFormList)),
            formData:undefined,
            buttonList: listQueryButtonList,
            listQuery: {
                page: 1,
                pageSize: 20,
            },
        },
    }),
    getters: {

        //  table 列表中 需要转换的选项值
        globalOption: (state: any) => {
            const _optionKeyMap: { [name: string]: any } = {

                "option1": [
                    {
                        label: "测试1",
                        value: 1,
                    },
                    {
                        label: "测试2",
                        value: 2,
                    }
                ],

                // 人员类型
                personType: "personnelType",
                // 证件类型
                idType: "idType",
            }

            const _option: { [name: string]: any } = state.optionsStore?.getMapOptionsByKey(_optionKeyMap, 'options')
            return _option
        }
    },
    actions: {
        init() {
            // this.getList();
            this.resetListQuery();
        },
        setListQueryFormRef(el: any) {
            this.queryData.ref = el;


        },
        resetListQuery(){
            this.queryData.formData = {};
        },


        setListQuery(key: string) {
            const _key: string = key;
            if (_key == "reset") {
                // headerListQueryFormRef.value?.resetFields();
                // devicePowerStore.$resetState();
                // 清空 直接查询列表
                this.queryData.ref?.resetFields()
            }
            if (_key == "search") {

            }
            const _data: any = this.queryData.ref?.getFormData() || {};
            const _listQuery = this.queryData.listQuery;
            this.queryData.listQuery = {
                ..._listQuery,
                ..._data
            }

            console.log('_data', _data)
            this.devicePowerStore.getList(true)
        },


        openDialog(key: string, data: any) {
            const _key: string = key;
            const _data: any = data || {};
            console.log('this',this);


            if(key === 'tree'){
                this.devicePowerStore.treeDialogStore.openCloseDialog(true,'add',_data)
            }

            if(key === 'addEdit'){
                this.devicePowerStore.addEditDialogStore.openCloseDialog(true,'add',_data)
            }


        },





        goToPage() {
            this.globalStore.goToPage('')

        },


    },

});
