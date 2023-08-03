/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\rms\releaseReview\components\treeDialog\store\index.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import { defineStore } from "pinia";
import {
  treeDialogFormList,
} from "./config";

// import {useReleaseReviewStore} from '../../../store'
// const releaseReviewStore = useReleaseReviewStore();
import {randomNum, swapKeysAndValues} from "@/utils/tools";


const releaseReviewStore:any = {}
// treeDialog 批量创建 防止id重复
const treeDialog = 'releaseReviewTreeDialog'
import {
  createData as createDataAPI,
  editData as editDataAPI,
  getDataById as getDataByIdAPI,
} from "../../../api";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// 命名规范将返回的函数命名为 use releaseReview Store 是跨可组合项的约定,
// id 命名为 releaseReview
export const useTreeDialogStore = defineStore({
  // @ts-ignore
  // id: 必须的，在所有 Store 中唯一
  id: treeDialog,
  // state: 返回对象的函数
  state: () => ({

    treeDialogData: {
      ref:"",
      isLoading: false,
      isShow: false,
      title: "设置",
    },

    treeConfig:{
      // 是否显示搜索
      isFilter:false,
      // 显示左边侧边栏树结构 数据根据type切换
      treeType: 1,
      // 是否在点击节点的时候展开或者收缩节点，
      // 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
      expandOnClickNode:false,
      // 树默认点击的   默认第一个 index 为字符串
      treeCurrent: '0',
      // 树默认展开的  默认以index为准
      treeDefaultExpandedKeys: ['0'],
      treeNodeKey:"index",

    },






  }),
  getters: {
    treeList:(state:any)=>{
      let _treeList:any[] = [];
      _treeList = state.optionsStore?.treeMap?.[state.treeConfig.treeType] || [];


      // console.log('pageContainerStore-treeList', _treeList)
      // console.log('this.treeData.ref',state.treeData.ref?.getStore?.().getCurrentKey())


      return _treeList;
    }

  },
  actions: {
    init() {
      // this.getList();
    },

    // section 设置弹框 formRef
    setTreeDialogFormRef(el:any) {
      console.log(el)
      this.treeDialogData.ref = el;
    },

    // section 打开关闭弹框
    openCloseDialog(isShow:boolean,type:string,data = {}){
      this.treeDialogData.isShow = isShow;
      console.log(isShow,type,data)

      if(isShow){



        // 打开的时候设置 默认点击显示 ，模拟接口请求设置
        setTimeout(()=>{
          this.treeConfig.treeCurrent = `0-${randomNum(0,3)}`
          console.log('this.treeConfig.treeCurrent',this.treeConfig.treeCurrent)
        },500)

        this.optionsStore.deviceGroupTree()


      }

    },

    onTreeCurrentChange(data:any){
      const _data = data;

    },


    editData( ) {
      this.treeDialogData.isShow = false;
    },

    addData(data: any) {
      // console.log("添加",data);
      // // releaseReviewStore.getList()
      // // this.treeDialogData.isShow = false;
      // const _data: any = data;
      // //  具体使用 看 src\stores\modules\API\index.ts
      // this.APIStore.setDataAPI(createDataAPI, _data, '', this.treeDialogData, this.releaseReviewStore.getList).then((res: any) => {
      //   // console.log('res',res);
      // })
    },





  },

});
