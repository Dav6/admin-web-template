<!--
  @Author: 戴伟
  @Date: 2023-06-12 16:27:59
  @FilePath: src\components\global\g-button-group\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->
<template>

  <Component
      :is="_componentInfo.name"
      :ref="(el:Element) =>_componentInfo.ref = el"
      v-bind="$attrs"

  >
    <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">


      <!--      isShowByContent-->
      <slot :name="item.name" :data="data.data"></slot>

    </template>
  </Component>

</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "g-button-group",
  isGlobal: true,
});
import {computed, onMounted, ref, useSlots} from "vue";

const _componentInfo = ref({
  name: "d-el-button-group",
  ref: null,
});
let slots = useSlots();
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
  return () => {
    let _slots:any = [];
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

});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);


// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
onMounted(() => {

});
</script>

<style scoped  lang="less">

</style>
