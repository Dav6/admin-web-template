<!--
  @Author: 戴伟
  @Date: 2023-06-03 09:50:07
  @FilePath: src\viewsGlobal\routerView\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
</script>
<style scoped></style>
