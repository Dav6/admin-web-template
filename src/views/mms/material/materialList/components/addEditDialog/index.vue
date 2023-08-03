<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\mms\material\materialList\components\addEditDialog\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->


<template>
  <g-dialog
      v-model="isShow"
      :before-close="(done:any) => goTo('close', '')"
      :title="addEditDialogData.title"
      :append-to-body="true"
      width="600px"
  >
    <template #default>
      <div class="dialog-container">
        <g-form-model
            :ref="el=>addEditDialogStore.setAddEditDialogFormRef(el)"
            :formList="addEditDialogData.formList"
            :formData="addEditDialogData.data"

            :options="addEditDialogStore.mapOptions"
        >

          <template #sliderLabel="{data}" >
            <div class="slider-label">
              <div class="slider-label-left">
                {{data.label}} <span class="icon zr-iconfont zr-luminance"></span>
              </div>
              <div class="slider-label-right">
                <div class="title">
                  默认值:
                </div>
                <div class="number">
                  50
                </div>
              </div>
            </div>
          </template>
          <template #custom1="{data}">
            <!-- {{  images  }} -->
            <div class="123123">自定义 {{ data}}</div>
          </template>
        </g-form-model>
      </div>
    </template>
    <template #footer>
      <el-button @click="goTo('cancel')">取消</el-button>
      <el-button
          type="primary"
          :loading="addEditDialogData.isLoading"
          @click="goTo('confirm', '')"
      >确定
      </el-button
      >
    </template>
  </g-dialog>
</template>

<script setup lang="ts">
import {ref, computed, reactive, watch} from "vue"
import {useAddEditDialogStore} from "./store/index";
// console.log(addEditDialogStore)
const props = defineProps({});

const emits = defineEmits([]);
const addEditDialogStore = useAddEditDialogStore();
const addEditDialogData = computed(() => addEditDialogStore.addEditDialogData);
const isShow = computed({
    // 重新定义
    get: () => addEditDialogData.value.isShow,
    set: () => addEditDialogStore.addEditDialogData.isShow = false,
});


// section goTo
const goTo = (key: string, data?: any) => {
    const _data = data;
    if (key === "confirm") {
        addEditDialogStore.addEditData();
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
    addEditDialogStore.openCloseDialog(false, 'close', {})

};

const init = () => {
    addEditDialogStore.init()

};

init();
</script>

<style scoped lang="less">
.dialog-container {
  width: 100%;
  padding: 24px;
  max-height: 55vh;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

:deep(.el-form-item--default .el-form-item__label) {
  //height: 32px;
  //line-height: 32px;
}
</style>
