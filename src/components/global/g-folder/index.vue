<!--
  @Author: 戴伟
  @Date: 2023-04-10 14:03:06
  @FilePath: src\components\global\g-folder\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->

<template>
  <div class="fold-container" :class="{ isShow: isShowFilter }">
    <slot></slot>
    <el-button v-if="isFold"
               class="fold-container-filter"
               type=""
               text
               icon="Filter"
               @click="goTo('isShowFilter')"
    ></el-button>
  </div>
  <div class="fold-expand-container"
       :class="{ isShow: isShowFilter, isFoldExpandLine: isFoldExpandLine }"
       v-if="isFold"
  >
    <slot name="expand"></slot>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "g-folder",
  isGlobal: true,
});

import {ref, reactive, computed, watch} from "vue";

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
  isFold: {
    type: [Boolean],
    default: true,
  },
  // 80  ->  80px
  // 100% -> 100%
  // calc(100% - 60px) -> calc(100% - 60px)
  foldLineWidth: {
    type: [Number, String],
  },
  isFoldExpandLine: {
    type: [Boolean],
    default: false,
  },
});

// console.log('props.isFold',props.isFold,)
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const isShowFilter = ref(false);

const foldLineWidthCOM = computed(() => {
  let _width:(string | number | undefined) = "100%";

  const _foldLineWidth:(string | number | undefined) = props.foldLineWidth
  // console.log('props.foldLineWidth',props.foldLineWidth)
  if (parseInt(String(_foldLineWidth)) >= 0) {
    _width = `${props.foldLineWidth}px`;
  }
  if (String(_foldLineWidth).indexOf("%") > -1) {
    _width = props.foldLineWidth;
  }
  if (String(_foldLineWidth).indexOf("calc") > -1) {
    _width = props.foldLineWidth;
  }

  return _width;
});

const goTo = (key:string, data:any) => {
  // 显示或隐藏 搜索条件
  if (key == "isShowFilter") {
    isShowFilter.value = !isShowFilter.value;
  }
};
</script>

<style scoped lang="less">
.fold-container {
  //padding:0 60px;
  //min-height: 64px;
  position: relative;
  //display: flex;
  //flex-flow: column;
  //justify-content: space-around;
  //align-items: flex-start;
  //margin-bottom: 20px;

  .fold-container-filter {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
  }

  &:after {
    content: " ";
    display: block;
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 50%;
    transform: translateX(-50%);
    background: #e4e9ee;
    width: 0;
    transition: all 0.22s ease-in-out;
    opacity: 0;
  }

  &.isShow:after {
    width: v-bind("foldLineWidthCOM");
    opacity: 1;
  }
}

.fold-expand-container {
  position: relative;
  overflow: hidden;
  max-height: 0;
  transition: all 0.22s ease-in-out;

  &.isShow {
    max-height: 200px;
  }

  &:after {
    content: " ";
    display: block;
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 50%;
    transform: translateX(-50%);
    background: #e4e9ee;
    width: 0;
    transition: all 0.22s ease-in-out;
    opacity: 0;
  }

  &.isShow.isFoldExpandLine:after {
    width: v-bind("foldLineWidthCOM");
    opacity: 1;
  }
}
</style>
