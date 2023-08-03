<!--
  @Author: 戴伟
  @Date: 2023-02-09 15:23:52
  @FilePath: src\views\tms\test\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
  <page-container
      :title="XXXStore.pageConfig.title"
      :isShowBack="XXXStore.pageConfig.isShowBack"
      :isShowAside="XXXStore.pageConfig.isShowAside"
      :treeType="XXXStore.pageConfig.treeType"
      :isFilter="XXXStore.pageConfig.isFilter"
      :isShowCheckbox="XXXStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="XXXStore.pageConfig.isHighlightCurrent"
      :treeCurrent="XXXStore.pageConfig.treeCurrent"
      :expandOnClickNode="XXXStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="XXXStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="XXXStore.pageConfig.isShowPaging"
      :pageData="XXXStore.listQuery"
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

import {useXXXStore} from "./store";

const XXXStore = useXXXStore();

// 接口请求方法放这
const init = () => {
  // getList();
  XXXStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      XXXStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      XXXStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      XXXStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
