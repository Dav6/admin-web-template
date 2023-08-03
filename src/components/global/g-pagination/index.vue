<!--
  @Author: 戴伟
  @Date: 2023-04-03 10:17:31
  @FilePath: src\components\global\g-pagination\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
<!--  // eslint-disable-next-line no-undef-->
  <Component
      :ref="(el:Element) => (_componentInfo.ref = el)"
      :is="_componentInfo.name"
      v-model:currentPage="_currentPage"
      v-model:page-size="_pageSize"
      v-bind="$attrs"

  >


  </Component>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "g-pagination",
  isGlobal: true,
});
import {ref, reactive, computed, watch} from "vue"


const _componentInfo = ref({
  name: "el-pagination",
  ref: null,
});
const props = defineProps({
  // 配合emits v-model
  currentPage: {
    type: [String, Number],
  },
  pageSize: {
    type: [String, Number],

  }
});
const emits = defineEmits(['update:currentPage','update:pageSize','onPageSizeChange','onPageCurrentChange']);

const _currentPage= ref<string|number|undefined>(props.currentPage);
const _pageSize = ref<string|number|undefined>(props.pageSize);

watch(()=>_currentPage.value,(currentPage,preCurrentPage)=>{
  // console.log('watch-currentPage',currentPage,_currentPage)
  _currentPage.value = currentPage;
  handlePageOrSizeChange && handlePageOrSizeChange('page',currentPage)
})
watch(()=>_pageSize.value,(pageSize,prePageSize)=>{
  // console.log('pageSize',pageSize,_pageSize)
  _pageSize.value = pageSize;
  handlePageOrSizeChange && handlePageOrSizeChange('pageSize',pageSize)
})


const handlePageOrSizeChange = (key:string,data:any) => {

  console.log('data',data)
  if(key == 'page'){
    emits('update:currentPage',data)
    emits("onPageCurrentChange", data);

  }
  if(key == 'pageSize'){
    emits('update:pageSize',data)
    emits("onPageSizeChange", data);
  }


};


//const emits = defineEmits(["update:modelValue"]);

const defaultCOM = computed(() => {
  return '';
});








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

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>