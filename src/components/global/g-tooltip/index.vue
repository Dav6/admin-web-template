<!--
  author: 戴伟
  date: 019 2022/12/19 10:25:11
  file: src\components\global\g-dialog\index.vue
  des:
    do.....
-->

<template>

  <Component
      :is="_componentInfo.name"
      :ref="(el:Element) =>_componentInfo.ref = el"

      v-bind="$attrs"

      :isShowByContent="true"
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
  name: "g-tooltip",
  isGlobal: true,
});
import {computed, onMounted, ref, useSlots} from "vue";

const _componentInfo = ref({
  name: "d-el-tooltip",
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

const tooltipDefaultRef = ref();


const props = defineProps({
  // 配合emits v-model
  isShowByContent: {
    type: [Boolean],
    default: true,
  },
  // item: {
  //   type: [Object],
  // }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

// const disabled = ref(false);
//
// const goTo = (key, data) => {
//   // console.log(key,data);
//
//   if (key == "mouseenter") {
//     if (!props.isShowByContent) return false;
//     // console.log(props.isDefaultShow)
//
//     // console.log(tooltipDefaultRef)
//     //
//     // console.log(`
//     //   w-clientWidth ${tooltipDefaultRef.value.clientWidth}
//     //   w-offsetWidth ${tooltipDefaultRef.value.offsetWidth}
//     //
//     //   c-clientWidth ${tooltipDefaultRef.value.children[0]['clientWidth']}
//     //   c-offsetWidth ${tooltipDefaultRef.value.children[0]['offsetWidth']}
//     //
//     // `)
//     let _outClientWidth = tooltipDefaultRef.value.clientWidth;
//     let _innerOffsetWidth = tooltipDefaultRef.value.children[0]["offsetWidth"];
//     // 里面内容宽度超过外面宽度
//     if (_innerOffsetWidth > _outClientWidth) {
//       disabled.value = false;
//     } else {
//       // console.log('禁用')
//       disabled.value = true;
//     }
//   }
// };

// 接口请求方法放这
const init = () => {
  //getList();
};

// 统一执行初始化方法
init();
onMounted(() => {
  // console.log('onMounted',_componentInfo.value?.ref)
  //
  // setTimeout(()=>{
  //   console.log('onMounted',_componentInfo.value?.ref?.contentRef)
  //
  // },2000)
});
</script>

<style scoped  lang="less">
.tooltip-default {
  display: inline-block;
  width: 100%;
  height: 100%;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
