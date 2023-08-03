<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\deviceEdit\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="deviceEditStore.pageConfig.title"
      :isShowBack="deviceEditStore.pageConfig.isShowBack"
      :isShowAside="deviceEditStore.pageConfig.isShowAside"
      :treeType="deviceEditStore.pageConfig.treeType"
      :isFilter="deviceEditStore.pageConfig.isFilter"
      :isShowCheckbox="deviceEditStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="deviceEditStore.pageConfig.isHighlightCurrent"
      :treeCurrent="deviceEditStore.pageConfig.treeCurrent"
      :expandOnClickNode="deviceEditStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="deviceEditStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="deviceEditStore.pageConfig.isShowPaging"
      :pageData="deviceEditStore.listQuery"
      @onPageSizeChange="(data:any) => goTo('onPageSizeChange', data)"
      @onPageCurrentChange="(data:any) => goTo('onPageCurrentChange', data)"
  >
    <template #header>
<!--      <header-container></header-container>-->
    </template>
    <template #container-header>
      <header-container></header-container>
    </template>

    <container></container>

    <add-edit-dialog></add-edit-dialog>
    <tree-dialog></tree-dialog>
  </page-container>
</template>

<script setup lang="ts">
import {ref, reactive, computed, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

// 不能直接设置为 Header 特殊字段 标签读取不到
import HeaderContainer from "./components/header/index.vue";
import Container from "./components/container/index.vue";
import AddEditDialog from "./components/addEditDialog/index.vue";
import TreeDialog from "./components/treeDialog/index.vue"

const route:any = useRoute();
const router:any = useRouter();

import {useDeviceEditStore} from "./store";

const deviceEditStore = useDeviceEditStore();

// 接口请求方法放这
const init = () => {
  // getList();
  deviceEditStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      deviceEditStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      deviceEditStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      deviceEditStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
