<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\rms\release\releaseList\components\treeDialog\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <g-dialog
      v-model="isShow"
      :before-close="(done:any) => goTo('close', '')"
      :title="treeDialogData.title"
      :append-to-body="true"
      width="600px"
  >
    <template #default>
      <div class="dialog-container">
        <g-tree
            :treeList="treeDialog.treeList"
            :treeType="treeConfig.treeType"
            :treeCurrent="treeConfig.treeCurrent"
            :treeNodeKey="treeConfig.treeNodeKey"

            :expandOnClickNode="treeConfig.expandOnClickNode"
            :isFilter="treeConfig.isFilter"
            :treeDefaultExpandedKeys="treeConfig.treeDefaultExpandedKeys"
            @onClick="(data:any) => goTo('onTreeClick', data)"
            @onCurrentChange="(data:any) => goTo('onTreeCurrentChange', data)"
            @onCheck="(data:any) => goTo('onTreeCheck', data)"
        ></g-tree>

      </div>
    </template>
    <template #footer>
      <el-button @click="goTo('cancel')">取消</el-button>
      <el-button
          type="primary"
          :loading="treeDialogData.isLoading"
          @click="goTo('confirm', '')"
      >确定
      </el-button
      >
    </template>
  </g-dialog>
</template>

<script setup lang="ts">
import {ref, computed, reactive, watch} from "vue"
import {useTreeDialogStore} from "./store/index";
// console.log(treeDialog)
const props = defineProps({});

const emits = defineEmits([]);
const treeDialog = useTreeDialogStore();
const treeDialogData = computed(() => treeDialog.treeDialogData);
const treeConfig = computed(() => treeDialog.treeConfig);
const isShow = computed({
    // 重新定义
    get: () => treeDialogData.value.isShow,
    set: () => treeDialog.treeDialogData.isShow = false,
});


// section goTo
const goTo = (key: string, data?: any) => {
    console.log('treeDialog-goTo-key,data',key,data);
    const _data = data;

    if(key === 'onTreeCurrentChange'){
        treeDialog.onTreeCurrentChange(_data)
    }

    if (key === "confirm") {
        treeDialog.editData();
    }

    if (key === "cancel") {
        cancel();
    }
    if (key === "close") {
        cancel();
    }
};

//
const cancel = () => {
    treeDialog.openCloseDialog(false, 'close', {})

};

const init = () => {
    treeDialog.init()

};

init();
</script>

<style scoped lang="less">
.dialog-container {
  width: 100%;
  padding: 24px;
  height: 55vh;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

:deep(.el-form-item--default .el-form-item__label) {
  //height: 32px;
  //line-height: 32px;
}
</style>
