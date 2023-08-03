<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\mms\material\materialList\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="materialListStore.pageConfig.title"
      :isShowBack="materialListStore.pageConfig.isShowBack"
      :isShowAside="materialListStore.pageConfig.isShowAside"
      :treeType="materialListStore.pageConfig.treeType"
      :isFilter="materialListStore.pageConfig.isFilter"
      :isShowCheckbox="materialListStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="materialListStore.pageConfig.isHighlightCurrent"
      :treeCurrent="materialListStore.pageConfig.treeCurrent"
      :expandOnClickNode="materialListStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="materialListStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="materialListStore.pageConfig.isShowPaging"
      :pageData="materialListStore.listQuery"
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

import {useMaterialListStore} from "./store";

const materialListStore = useMaterialListStore();

// 接口请求方法放这
const init = () => {
  // getList();
  materialListStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      materialListStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      materialListStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      materialListStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
