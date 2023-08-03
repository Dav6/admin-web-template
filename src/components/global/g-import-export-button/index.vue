<!--
  @Author: 戴伟
  @Date: 2023-04-23 14:18:58
  @FilePath: src\components\global\g-import-export-button\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->
<template>
  <d-el-button class="default-width" type="primary" plain @click="goTo('import')">+导入</d-el-button>

</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "g-import-export-button",
  isGlobal: true,
});


import {ref, reactive, computed, watch, useSlots} from "vue";

import defaultIcon from "./images/default-icon.png"

const _componentInfo = ref({
  name: "d-el-dialog",
});
let slots = useSlots();
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
  return () => {
    let _slots = [];
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map((item) => {
      return {
        name: item,
      };
    });
    return _slots;
  };
});

const props = defineProps({
  // 配合emits v-model
  // modelValue: {
  //   type: [String, Boolean, Number, Object, Array],
  // },
  // item: {
  //   type: [Object],
  // }

  limit: {
    type: [Number,],
    default: 1,
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);


const isShow = ref(false)
const isLoading = ref(false)

const goTo = (key: string, data?: any) => {
  console.log(key,data)
  isShow.value = true

  if(key == 'close'){
    isShow.value = false;
  }

}

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less"></style>
