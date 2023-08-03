<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\rms\release\releaseDetails\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="releaseDetailsStore.pageConfig.title"
      :isShowBack="releaseDetailsStore.pageConfig.isShowBack"
      :isShowAside="releaseDetailsStore.pageConfig.isShowAside"
      :treeType="releaseDetailsStore.pageConfig.treeType"
      :isFilter="releaseDetailsStore.pageConfig.isFilter"
      :isShowCheckbox="releaseDetailsStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="releaseDetailsStore.pageConfig.isHighlightCurrent"
      :treeCurrent="releaseDetailsStore.pageConfig.treeCurrent"
      :expandOnClickNode="releaseDetailsStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="releaseDetailsStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="releaseDetailsStore.pageConfig.isShowPaging"
      :pageData="releaseDetailsStore.listQuery"
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

import {useReleaseDetailsStore} from "./store";

const releaseDetailsStore = useReleaseDetailsStore();

// 接口请求方法放这
const init = () => {
  // getList();
  releaseDetailsStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      releaseDetailsStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      releaseDetailsStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      releaseDetailsStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
