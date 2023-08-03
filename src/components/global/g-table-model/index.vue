<!--
  author: 戴伟
  date: 019 2022/12/19 10:25:11
  file: src\components\global\g-dialog\index.vue
  des:
    do.....
-->

<template>
  <Component
    class="g-default-table"
    :is="_componentInfo.name"
    :ref="(el:Element) => (_componentInfo.ref = el)"
    :list="list"
    :keyList="keyList"
    :isShowExpand="isShowExpand"
    :isShowSelection="isShowSelection"
    :isShowIndex="isShowIndex"
    :isShowSettings="isShowSettings"
    :settingsButtonList="settingsButtonList"
    :beforeSwitchChange="beforeSwitchChange"
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
  name: "g-table-model",
  isGlobal: true,
});
import { ref, reactive, computed, watch, useSlots } from "vue";

const _componentInfo = ref({
  name: "d-table-model",
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
const emits = defineEmits([]);

const props = defineProps({
  modelValue: {
    type: [String, Boolean],
  },
  list: {
    type: [Array],
  },
  keyList: {
    type: [Array],
  },

  isShowExpand: {
    type: [Boolean],
  },
  isShowSelection: {
    type: [Boolean],
  },
  isShowIndex: {
    type: [Boolean],
  },
  isShowSettings: {
    type: [Boolean],
  },
  settingsButtonList: {
    type: [Array],
  },
  beforeSwitchChange:{
    type:[Function,Boolean],
    default:true,
  }
});

const getRef = (el:any) => {
  // console.log('_componentInfo?.value?.ref',)
  return _componentInfo?.value?.ref;
};

const getFormData = () => {
  return _componentInfo?.value?.ref?.getFormData();
};
const validate = (callback:Function) => {
  // console.log(_componentInfo?.value?.ref);
  return new Promise((resolve, reject) => {
    _componentInfo?.value?.ref?.formModelRef?.validate((valid:boolean) => {
      callback(valid);
      resolve(valid);
    });
  });
};

defineExpose({
  getFormData,
  validate,
  getRef,
});

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less"></style>
