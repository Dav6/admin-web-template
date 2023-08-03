<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\deviceVolume\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <page-container
      :title="deviceVolumeStore.pageConfig.title"
      :isShowBack="deviceVolumeStore.pageConfig.isShowBack"
      :isShowAside="deviceVolumeStore.pageConfig.isShowAside"
      :treeType="deviceVolumeStore.pageConfig.treeType"
      :isFilter="deviceVolumeStore.pageConfig.isFilter"
      :isShowCheckbox="deviceVolumeStore.pageConfig.isShowCheckbox"
      :isHighlightCurrent="deviceVolumeStore.pageConfig.isHighlightCurrent"
      :treeCurrent="deviceVolumeStore.pageConfig.treeCurrent"
      :expandOnClickNode="deviceVolumeStore.pageConfig.expandOnClickNode"
      :treeDefaultExpandedKeys="deviceVolumeStore.pageConfig.treeDefaultExpandedKeys"
      @onTreeCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
      :isShowPaging="deviceVolumeStore.pageConfig.isShowPaging"
      :pageData="deviceVolumeStore.listQuery"
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

import {useDeviceVolumeStore} from "./store";

const deviceVolumeStore = useDeviceVolumeStore();

// 接口请求方法放这
const init = () => {
  // getList();
  deviceVolumeStore.init(router,route);
};

// 统一执行初始化方法
init();

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key === "onTreeCurrentChange") {
      deviceVolumeStore.onTreeCurrentChange(data)
  }

  if (key === "onPageSizeChange") {
      deviceVolumeStore.onPageSizeChange(data)
  }
  if (key === "onPageCurrentChange") {
      deviceVolumeStore.onPageCurrentChange(data)
  }
};
</script>

<style scoped lang="less">
.table-container {
  padding: 0 60px;
  height: 100%;
}
</style>
