<!--
  date: 030 2022/05/30 11:06:02
  author: 戴伟
  file: \src\components\pageContainer\pagination.vue
  des:
    分页
-->

<template>
  <!--  {{pageData.data}}-->
  <g-pagination
    v-model:currentPage="minePageData.data.page"
    v-model:page-size="minePageData.data.pageSize"
    :page-sizes="minePageData.data.pageSizes"
    :total="minePageData.data.total"
    :small="minePageData.data.small"
    :disabled="minePageData.data.disabled"
    :background="minePageData.data.background"
    :layout="minePageData.data.layout"
    @onPageSizeChange="handleSizeChange"
    @onPageCurrentChange="handleCurrentChange"
  />
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line no-undef
defineOptions({
  name: "page-container-pagination",
  isGlobal: false,
});
import { ref, watch, reactive, toRefs } from "vue";

const props = defineProps({
  pageData: {
    type: Object,
  },
});
const emits = defineEmits(["onPageSizeChange", "onPageCurrentChange"]);
// console.log(props, "pagepagepagepage");
let defaultPageData = reactive({
  data: {
    page: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30],
    total: 0,
    layout: "total, sizes, prev, pager, next, jumper",
    small: false,
    background: false,
    disabled: false,
  },
});
// console.log(props.pageData.total, "propspropsprops");

let minePageData:any = reactive({
  data: {
    page: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30],
    total: 0,
    layout: "total, sizes, prev, pager, next, jumper",
    small: false,
    background: true,
    disabled: false,
  },
});
// console.log(Object.keys(defaultPageData.data))

// console.log(pageData);
watch( () => props.pageData, (newValue, oldValue) => {
    Object.keys(defaultPageData.data).map((item) => {
      if (newValue && (newValue[item] || newValue[item] == 0)) {
        // console.log(item);
        minePageData.data[item] = newValue[item];
      }
    });
    // defaultActive = newValue.path;
  },
  { immediate: true, deep: true }
);

// watch(()=>minePageData.data.pageSize,(data,preData)=>{
//   console.log('newValue', data);
//
// })


const handleCurrentChange = (data:any) => {
  // console.log(`current page: ${data}`)
  emits("onPageCurrentChange", data);
};
const handleSizeChange = (data:any) => {
  // console.log(`${data} items per page`)
  emits("onPageSizeChange", data);
};
</script>

<style scoped lang="less"></style>
