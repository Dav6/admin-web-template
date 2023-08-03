<!--
  author: 戴伟
  date: 019 2022/12/19 10:25:11
  file: src\components\global\g-dialog\index.vue
  des:
    do.....
-->

<template>
  <Component
      class="g-dialog"
      :is="_componentInfo.name"
      :close-on-click-modal="false"
      v-bind="$attrs">
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
  name: "g-dialog",
  isGlobal: true,
});
import {ref, reactive, computed, watch, useSlots} from "vue";

const _componentInfo = ref({
  name: "d-el-dialog",
});
let slots = useSlots();
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
  return () => {
    let _slots: any = [];
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
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

// console.log('this.$props',this.$props);
// console.log('props',props);

//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less"></style>
