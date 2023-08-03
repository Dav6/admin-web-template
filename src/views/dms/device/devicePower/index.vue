<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\devicePower\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="devicePowerStore.pageConfig.title"
      :isShowBack="devicePowerStore.pageConfig.isShowBack"
      :isShowAside="devicePowerStore.pageConfig.isShowAside"
      :treeType="devicePowerStore.pageConfig.treeType"
      :isFilter="devicePowerStore.pageConfig.isFilter"
      :isShowCheckbox="devicePowerStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="devicePowerStore.pageConfig.isHighlightCurrent"
      :treeCurrent="devicePowerStore.pageConfig.treeCurrent"
      :expandOnClickNode="devicePowerStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="devicePowerStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="devicePowerStore.pageConfig.isShowPaging"
      :pageData="devicePowerStore.listQuery"
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

import {useDevicePowerStore} from "./store";

const devicePowerStore = useDevicePowerStore();

// 接口请求方法放这
const init = () => {
  // getList();
  devicePowerStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      devicePowerStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      devicePowerStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      devicePowerStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
