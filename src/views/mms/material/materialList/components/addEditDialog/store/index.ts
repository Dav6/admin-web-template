/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\mms\material\materialList\components\addEditDialog\store\index.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import { defineStore } from "pinia";
import {
  addEditDialogFormList,
} from "./config";

// import {useMaterialListStore} from '../../../store'
// const materialListStore = useMaterialListStore();
import {swapKeysAndValues} from "@/utils/tools";


const materialListStore:any = {}
// addEditDialog 批量创建 防止id重复
const addEditDialog = 'materialListAddEditDialog'
import {
  createData as createDataAPI,
  editData as editDataAPI,
  getDataById as getDataByIdAPI,
} from "../../../api";
// import { randomNum } from "@/utils/tools";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// 命名规范将返回的函数命名为 use materialList Store 是跨可组合项的约定,
// id 命名为 materialList
export const useAddEditDialogStore = defineStore({
  // @ts-ignore
  // id: 必须的，在所有 Store 中唯一
  id: addEditDialog,
  // state: 返回对象的函数
  state: () => ({

    addEditDialogData: {
      ref:"",
      isLoading: false,
      isShow: false,
      title: "",
      type: "",
      data: {},
      formList: addEditDialogFormList,
    },

  }),
  getters: {
    mapOptions: (state: any) => {
      // console.log(state.optionsStore);
      const _organizationServer = state.optionsStore?.organization?.options || []

      const _mapOptionsServer = state?.optionsStore?.mapOptions || {}

      // console.log('addEditDialog-_mapOptionsServer', _mapOptionsServer)
      const _globalMapOptions:any = state.materialListStore.globalMapOptions;

      const _optionKeyMap:{[name:string]:any} = {

        gender:[ ],

        ..._globalMapOptions.options




        // orgId: _organizationServer,

      }
      const _option:{[name:string]:any} = state.optionsStore?.getMapOptionsByKey(_optionKeyMap,'options')

      // console.log('_option', _option)

      return _option
    },

  },
  actions: {
    init() {
      // this.getList();
    },

    // section 设置弹框 formRef
    setAddEditDialogFormRef(el:any) {
      console.log(el)
      this.addEditDialogData.ref = el;
    },

    // section 打开关闭弹框
    openCloseDialog(isShow:boolean,type:string,data = {}){
      this.addEditDialogData.isShow = isShow;
      console.log(isShow,type,data)

      if(isShow){
        setTimeout(() => {
          // 打开回到顶部
          this.addEditDialogData.ref?.scrollToField('0.value')
        }, 50)
        this.addEditDialogData.type = type;

        if(type == 'add'){
          this.dataFormat(data)
        }
        if(type == 'edit'){
          this.getEditDialogData(data);
        }

      }else {
        this.addEditDialogData.ref?.clearValidate();



      }

    },



    dataFormat(data :any) {
      const _data = data || {};
      this.addEditDialogData.isLoading = true;
      // console.log("this.addEditDialogData.type", this.addEditDialogData.type);
      const _globalKeyMap = swapKeysAndValues(this.materialListStore.globalKeyMap)

      if (this.addEditDialogData.type === "add") {
        this.addEditDialogData.title = "添加";
        // 默认参数
        _data.type = 1


      }

      if (this.addEditDialogData.type === "edit") {
        this.addEditDialogData.title = "编辑";
      }

      console.log('dataFormat-data', _data)

      const _imageUrl = _data.imageUrl;

      if(this.utilStore.isArray(_imageUrl)){
        _data.image = _imageUrl?.map((item:any)=>{
          const _item = item;
          const _obj = {
            key:_item,
            url:_item,
          }
          return _obj;


        })
        _data.imageUrl = _data.image
      }



      this.addEditDialogData.data = {};
      setTimeout(()=>{
        this.addEditDialogData.data = _data;

        console.log('this.addEditDialogData.data',this.addEditDialogData.data)
      },10)
        // console.log(data);
      // this.addEditDialogData.formList.map((item:any) => {
      //   //
      //   item.disabled = false;
      //   // // 为true 的时候隐藏
      //   // item.isHidden = false;
      //   // // 为true 的时候 为文本状态
      //   // item.isText = false;
      //   // // 为true 的时候 rule 失效
      //   // item.isHiddenRulers = false;
      //   // // form列表赋值
      //   // let value = data[keyMap[item.key]];
      //
      //   // console.log(_data[item.key]);
      //   // item.value = _data[item.key] || (( item.value == 0) ? item.value : '');
      //
      //   return item;
      // });

      this.addEditDialogData.isLoading = false;
      // console.log(this.addEditDialogData.formList);
    },


    getEditDialogData(data: any) {
      console.log('data', data)
      const _data = data;
      const _id = _data?.id;
      const _globalKeyMap = JSON.parse(JSON.stringify(this.materialListStore.globalKeyMap))
      // 图片字段特殊处理 ，
      // 先删除字段防止 自动赋值报错。
       _globalKeyMap.image = ""

      const _queryData:{[n:string]:any} = {
        id: _id,
        keyMap: _globalKeyMap,
      }
      //  具体使用 看 src\stores\modules\API\index.ts
      this.APIStore.getDataAPI(getDataByIdAPI, _queryData, this.addEditDialogData).then((res: any) => {
        console.log('详情数据', res);
        // 有特殊image字段处理 ，需要先赋值为空
        this.addEditDialogData.data = {};
        this.dataFormat(res?.data);

      }, (err: any) => {
        // this.listData.isLoading = false;

      })
    },




    getSendData() {
      const _formData = this.addEditDialogData.ref?.getFormData()
      const _globalKeyMap = this.materialListStore.globalKeyMap

      // console.log('_formData',_formData)
      // console.log('globalKeyMap',_globalKeyMap)
      const _sendData:{[n:string]:any}  = this.utilStore.setDataByKeyMap(_formData,_globalKeyMap)


      const _imageUrl = _sendData.imageUrl;
      // 图片字段特殊处理 ，
      if(this.utilStore.isArray(_imageUrl)){
        _sendData.image = _imageUrl?.map((item:any)=>item.url)
        _sendData.imageUrl = _sendData.image
      }



      console.log('_sendData',_sendData)
      return _sendData;
    },


    addEditData( ) {
      // console.log(this.addEditDialogData.ref?.getFormData());
      // addEditDialogStore.addEditDialogData.isShow = false;
      this.addEditDialogData.ref?.validate((valid:boolean) => {
        console.log("valid", valid);
        if(valid){
          const _sendData:any = this.getSendData()
          if (this.addEditDialogData.type === "add") {
            // this.addData(_sendData);
          }
          if (this.addEditDialogData.type === "edit") {
            _sendData.id = this.addEditDialogData.data.id;
            // this.editData(_sendData);
          }
        }


      });

    },

    addData(data: any) {
      console.log("添加",data);
      // materialListStore.getList()
      // this.addEditDialogData.isShow = false;
      const _data: any = data;
      //  具体使用 看 src\stores\modules\API\index.ts
      this.APIStore.setDataAPI(createDataAPI, _data, '', this.addEditDialogData, this.materialListStore.getList).then((res: any) => {
        // console.log('res',res);
      })
    },
    editData(data: any) {
      console.log("修改");
      // materialListStore.getList()
      // this.addEditDialogData.isShow = false;
      const _data: any = data;
      const _API = async () => Object({success: true, message: '修改成功'})
      const _addEditDialogStore = this.addEditDialogStore

      console.log('_addEditDialogStore',_addEditDialogStore)
      //  具体使用 看 src\stores\modules\API\index.ts
      this.APIStore.setDataAPI(editDataAPI, _data, '', this.addEditDialogData, this.materialListStore.getList).then((res: any) => {
        // console.log('res',res);
      })
    },





  },

});
