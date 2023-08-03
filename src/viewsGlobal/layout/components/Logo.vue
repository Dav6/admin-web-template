<!--
  author: 戴伟
  date: 002 2022/06/02 09:12:12
  file: src\views\layout\components\Logo.vue
  des:
    do.....
-->

<template>
  <el-tooltip :content="title" placement="right-end" effect="dark">
    <div class="ve_menu_logo">
      <div class="ve_logo_img">
        <el-image
          style="height: 100%"
          :src="require('../../../assets/logo.png')"
          fit="contain"
        ></el-image>
      </div>
      <!-- content to trigger tooltip here -->
      <h3 v-show="!opened" class="ve_logo_title">
        {{ title }}
      </h3>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from "vue";

const title = "vue3-element-admin";
</script>

<style lang="scss" scoped>
.ve_menu_logo {
  width: 100%;
  height: $nav-height;
  white-space: nowrap;
  overflow: hidden;
  .ve_logo_img {
    height: 100%;
    text-align: center;
    // 和side收缩后的宽度一致
    width: $side-close-width;
    // padding: 10px;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
  }
  .ve_logo_title {
    width: $side-open-width;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin: 0;
    vertical-align: middle;
    color: #000;
    &:hover {
      color: $base-color;
    }
  }
}
</style>
