<!--
  @Author: 戴伟
  @Date: 2023-04-03 08:57:49
 * @FilePath: \intelligent-cloud-platform\src\components\pageContainer\index.vue
 * @LastEditTime: 2023-05-15 10:24:45
 * @LastEditors: 吴志远
  @Description:
       带底部分页的盒子
-->
<template>
  <div class="page-main">
    <div class="page-header">
      <template v-if="title">
        <div class="page-header-title">
          <template v-if="isShowBack">
            <div class="zr-iconfont zr-back" @click="goTo('goToPage','back')"></div>
          </template>
          {{ title }}
        </div>
      </template>




      <slot name="header"></slot>

    </div>

    <div class="page-container-box">
      <template v-if="isShowAside">
        <div class="page-aside">
          <template v-if="aside">
            <slot name="aside"></slot>
          </template>
          <template v-else>

            <g-tree
                :ref="el=>pageContainerStore.setTreeRef(el)"
                class="aside-tree"
                :treeList="pageContainerStore.treeList"
                :treeProps="treeProps"
                :treeNodeKey="treeNodeKey"
                :treeCurrent="treeCurrent"
                :expandOnClickNode="expandOnClickNode"
                :isTreeLoading="pageContainerStore.treeData.isLoading"
                :isFilter="isFilter"
                :isEdit="isTreeEdit"
                :isShowCheckbox="isShowCheckbox"
                :isHighlightCurrent="isHighlightCurrent"
                :treeDefaultExpandedKeys="treeDefaultExpandedKeys"
                @onClick="(data:any) => goTo('onTreeClick', data)"
                @onCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
                @onCheck="(data:any) => goTo('onTreeCheck', data)"
            ></g-tree>
          </template>
        </div>
      </template>

      <div class="page-container">
        <div class="page-container-top">
          <slot name="container-header"></slot>
        </div>
        <div class="page-container-center">
          <slot></slot>
        </div>
        <div v-if="isShowPaging" class="page-container-bottom D-flex D-flex-align-center D-flex-justify-end">
          <page-container-pagination
              :pageData="pageData"
              @onPageCurrentChange="(data:any) => goTo('onPageCurrentChange', data)"
              @onPageSizeChange="(data:any) => goTo('onPageSizeChange', data)"
          ></page-container-pagination>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
    name: "page-container",
    isGlobal: true,
});


import {useSlots, ref, watch, computed, reactive, nextTick, toRefs} from "vue";
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {useRoute} from "vue-router";

// import pageContainerAsideTree from "./asideTree/index.vue"
import pageContainerPagination from "./pagination/index.vue"

// import AsideTree from "./asideTree/asideTree.vue";
// import Pagination from "./pagination.vue";

//判断<slot/>是否有传值
// const slotDefault = !!useSlots().default;
//判断<slot name="test"/>是否有传值
// const slotTest = !!useSlots().test;

import {useGlobalStore} from "@/store/modules/global"
import {usePageContainerStore} from "./store/index";

const globalStore = useGlobalStore()
const pageContainerStore = usePageContainerStore()

// const asideTreeStore = useAsideTreeStore()
// console.log('useSlots',useSlots(),!!useSlots().aside,)
const aside = !!useSlots().aside;

const props = defineProps({
    isShowBack: {
        type: [Boolean]
    },
    backIntercept: {
        type: [Function]
    },
    title: {
        type: [String, Number]
    },
    pageData: {
        type: Object,
    },

    isShowPaging: {
        type: [Boolean],
        default: true,
    },

    isShowAside: {
        type: [String, Boolean],
    },
    treeType: {
        type: [Number],
    },
    treeNodeKey: {
        type: [String],
        default: "index",

    },

    treeCurrent: {
        type: [String, Number],
    },
    // 是否在点击节点的时候展开或者收缩节点，
    // 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandOnClickNode:{
        type:[Boolean],
    },
    //  treeCurrent 设置后 才会触发 emits("onCurrentChange", {data: _data})
    treeDefaultExpandedKeys: {
        type: [Array],
    },
    treeProps: {
        type: [Object],
    },
    treeList: {
        type: [Array],
    },
    isTreeLoading: {
        type: [Boolean],
    },
    isFilter: {
        type: [Boolean],
    },
    isTreeEdit:{
        type:[Boolean],
        default:true
    },
    isShowCheckbox: {
        type: [Boolean],
    },
    isHighlightCurrent: {
        type: [Boolean],
        default: true,
    },
});


const emits = defineEmits([
    "onPageSizeChange",
    "onPageCurrentChange",
    "onTreeClick",
    "onTreeCurrentChange",
    "onTreeCheck",
]);

const route = useRoute();


// watch(() => route, async (route, preRoute) => {
//     // console.log('route变化',route);
//     asideTreeStore.onRouteChange(route)
//     // getTreeList();
//
//
// }, {
//     deep: true,
//     immediate: true
// })
watch(() => props.isTreeLoading, (isTreeLoading) => {
    pageContainerStore.treeData.isLoading = isTreeLoading ? isTreeLoading : false;
}, {
    deep: true
});
watch(()=>props.treeCurrent ,(treeCurrent)=>{
    pageContainerStore.treeData.treeCurrent = treeCurrent as any;
},{
    deep:true
})





// 接口请求方法放这
const init = () => {
    //getList();
    pageContainerStore.init(props)
}

// 统一执行初始化方法
init();




const goTo = (key: string, data: any) => {
    // data = JSON.parse(JSON.stringify(data));
    if (key == "onPageCurrentChange") {
        console.log(key, data);
        emits("onPageCurrentChange", data);
    }

    if (key == "onPageSizeChange") {
        emits("onPageSizeChange", data);
    }

    if (key == "onTreeClick") {
        emits("onTreeClick", data);
    }
    if (key == "onTreeCurrentChange") {
        // console.log(key, data);
        // // pageContainerStore.treeData.treeCurrent = data?.data?.index;
        //
        // console.log('pageContainerStore.treeData.lastTreeCurrent',pageContainerStore.treeData.lastTreeCurrent)

        emits("onTreeCurrentChange", data);

    }
    if (key == "onTreeCheck") {
        emits("onTreeCheck", data);
    }

    // if (key == 'showAsideTreeAddEditDialog') {
    //     asideTreeStore.showAsideTreeAddEditDialog('add')
    // }

    if (key == 'goToPage') {


        if (data == 'back') {
            let _backIntercept = props.backIntercept;
            if (_backIntercept) {
                return _backIntercept()
            }
            globalStore.goToPage(-1)

        }

    }

};
</script>

<style scoped lang="less">


.page-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  line-height: 1;

  .page-header {
    width: 100%;
    padding-bottom: 24px;

    .page-header-title {
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #6C6E73;
      height: 24px;
      display: flex;
      align-items: center;
      //--680586f7-hoverColor:var(--el-color-primary);


      .zr-back {
        font-size: 28px;
        color: #6C6E73;
        cursor: pointer;
        margin-right: 12px;
        transition: color 0.22s ease-in-out;

        &:hover {
          color: var(--el-color-primary);
        }
      }


    }

    .page-header-org {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0 18px;

      .org-btn {
        display: block;
      }
    }


  }

  .page-container-box {
    flex: 1;
    display: flex;
    overflow: hidden;
  }


}

.aside-tree-page-container {
  width: 100%;
  height: 100%;
}

.page-aside {
  //border-radius: 16px 24px 24px 24px;
  display: flex;
  margin-right: 16px;
  overflow: hidden;

  .aside-tree{
    width:240px;
    border-radius: 8px;
    border: 2px solid #EBEDF4;
    padding-top: 24px;
  }


}

.page-container {
  //border-radius: 16px 24px 24px 24px;

  box-sizing: border-box;
  //width: 100%;
  flex: 1;
  height: 100%;
  position: relative;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  //padding-bottom: 60px;
  .page-container-center {
    height: 0;
    flex: 1;
    //overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .page-container-bottom {
    padding-right: 24px;
    height: 60px;
    ////width:100%;
    //position:absolute;
    left: 0;
    right: 0;
    bottom: 0;
    align-self: flex-end;
    display: flex;
    align-items: center;
  }


}
</style>
