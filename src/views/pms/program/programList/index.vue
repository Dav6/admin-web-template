<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\pms\program\programList\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="programListStore.pageConfig.title"
      :isShowBack="programListStore.pageConfig.isShowBack"
      :isShowAside="programListStore.pageConfig.isShowAside"
      :treeType="programListStore.pageConfig.treeType"
      :isFilter="programListStore.pageConfig.isFilter"
      :isShowCheckbox="programListStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="programListStore.pageConfig.isHighlightCurrent"
      :treeCurrent="programListStore.pageConfig.treeCurrent"
      :expandOnClickNode="programListStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="programListStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="programListStore.pageConfig.isShowPaging"
      :pageData="programListStore.listQuery"
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

import {useProgramListStore} from "./store";

const programListStore = useProgramListStore();

// 接口请求方法放这
const init = () => {
  // getList();
  programListStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      programListStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      programListStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      programListStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
