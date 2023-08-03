<!--
  author: 戴伟
  date: 019 2022/12/19 10:25:11
  file: src\components\global\g-dialog\index.vue
  des:
    do.....
-->

<template>
  <Component
    :ref="(el:Element) => (_componentInfo.ref = el)"
    :is="_componentInfo.name"
    labelPosition="top"
    labelWidth="6em"
    v-bind="$attrs"

  >
    <template
      v-for="(item, index) in slotListCOM()"
      :key="index"
      #[item.name]="data"
    >
      <slot :name="item.name" :data="data.data"></slot>
    </template>
  </Component>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "g-form-model",
  isGlobal: true,
});
import {ref, reactive, computed, watch, useSlots} from "vue";

const _componentInfo:  any  = ref({
  name: "d-form-model",
  ref: null,
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

// eslint-disable-next-line no-unused-vars
const formModelRef = ref(null);
const getRef = (el:any) => {
  // console.log('_componentInfo?.value?.ref',)
  return _componentInfo?.value?.ref;
};

const getFormData = () => {
  // console.log(_componentInfo?.value?.ref?.getFormData())
  return _componentInfo?.value?.ref?.getFormData();
};
const getFormDataByNoHidden = () => {
  return _componentInfo?.value?.ref?.getFormDataByNoHidden();
};
const validate = (callback) => {
  // console.log(_componentInfo?.value?.ref);
  return new Promise((resolve, reject) => {
    _componentInfo?.value?.ref?.formModelRef?.validate((valid,invalidFields) => {
      callback(valid,invalidFields);
      resolve(valid,invalidFields);
    });
  });
};
const clearValidate = () => {
  return _componentInfo?.value?.ref?.formModelRef?.clearValidate();
};
const resetFields = () => {
  // console.log(_componentInfo?.value?.ref?.resetFields())
  return _componentInfo?.value?.ref?.resetFields();
};
const scrollToField = (prop)=>{
  return _componentInfo?.value?.ref?.scrollToField(prop)
}
const setLinkage = ()=>{
  return _componentInfo?.value?.ref?.setLinkage()
}
defineExpose({
  getFormData,
  getFormDataByNoHidden,
  validate,
  getRef,
  clearValidate,
  resetFields,
  scrollToField,
  setLinkage
});

const props = defineProps({
  // 配合emits v-model
  // modelValue: {
  //   type: [String, Boolean, Number, Object, Array],
  // },
  // item: {
  //   type: [Object],
  // }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less"></style>
