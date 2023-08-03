<!--
  @Author: 戴伟
  @Date: 2023-05-26 16:30:11
  @FilePath: src\components\pages\layout\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
  <el-container class="app-container" :class="{isHaveWuJie:isHaveWuJie}">
    <!--      <el-header class="app-container-header">-->
    <!--        <nav-bar></nav-bar>-->
    <!--      </el-header>-->
    <el-container class="app-container-aside-main">
      <el-aside class="app-container-aside" width="248px">
        <d-menu-model v-model="active" :list="authRoutes" isMerge @onClick="data=>goTo('onClick',data)"></d-menu-model>

        <!--          <menu-model v-model="active" :list="authRoutes" @onClick="data=>goTo('onClick',data)"></menu-model>-->

      </el-aside>

      <el-main class="app-container-main">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
// import {nav_height} from "@/styles/variables.scss.js";
// import NavBar from "./components/NavBar.vue";
import {computed, provide, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {JSONPath} from "jsonpath-plus";
import {useWuJieStore} from "@/store/modules/wuJie";
import {useAppStore} from "@/store/modules/app";
import {useGlobalStore} from "@/store/modules/global";

const route = useRoute();
// const routerAlive = ref(null);

const appStore = useAppStore();
const wuJieStore = useWuJieStore()
const globalStore = useGlobalStore()
const isHaveWuJie = computed(() => wuJieStore.isHaveWuJie)

// console.log('layout-appStore',appStore.routes)
const authRoutes = computed(() => {
    let _list = appStore?.routes || []
    _list = JSON.parse(JSON.stringify(_list))
    // // const _path = `$..childs[:]`;
    const _path = `$..[?(@property == "children")]`
    const _setList = {name: "", label: "", value: "", id: "", children: _list}
    JSONPath({
        json: _setList, path: _path, resultType: "all",
        callback(item) {
            // const _parent = item.parent;
            const _children = item.value;
            //
            _children?.map((cItem, cIndex) => {
                cItem.index = cItem?.url;
                cItem.title = cItem?.meta.title;
            })
        }
    });

    return _list;
});

const active = ref('')

const setActive = () => {
    const _fullPath = route.fullPath;
    const _fullPathList = _fullPath.split('/');
    // console.log('_fullPathList',_fullPathList)
    let _active: string = ''
    _fullPathList?.map(((item: any, index: number) => {
        // 因为左边只显示两层 所以只取前两层做匹配
        if (index !== 0 && index < 3) {
            _active += `/${item}`
        }
    }))
    // console.log('_active',_active)

    active.value = _active;

}


const goTo = (key, data) => {
    console.log(key, data)
    const _data = data
    if (key == 'onClick') {

        const _url = _data?.menuItem?.index;
        console.log('_url', _url)
        globalStore.goToPage(_url)

    }
}


watchEffect(() => {
    setActive();
});


// provide("reload", () => {
//   routerAlive.value = Math.random() + "_" + Math.random();
// });
</script>
<style lang="scss" scoped>

.app-container {
  width: 100vw;
  height: 100vh;

  &.isHaveWuJie {
    height: 100%;
  }

  .app-container-header {
    --el-header-height: auto;
    --nav-bar-active-color: var(--el-color-primary);

    padding: 0;
    //height:auto;
  }


  .app-container-aside-main {
    // 设置了 flex 高度设置为0
    //height:0;
    background: var(--el-main-bg-color);
    flex: 1;
    --el-main-padding: 16px;
    padding-top: var(--el-main-padding);
  }

  .app-container-aside {
    height: 100%;
    //overflow: hidden;
    //background: #fff;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6C6E73;
    //border-radius: 24px 24px 24px 24px;
    //overflow-y: auto;
    //overflow-x: reset;
    //overflow: visible;
    overflow: unset;
    padding: 0 24px 0 0;
    overflow-y: auto;
    //滚动条的宽度

    &::-webkit-scrollbar {
      width: 0px;
      //height: 6px;
    }

    //滚动条的滑块
    &::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 0.3);
      border-radius: 3px;
    }

  }

  .app-container-main {
    //height: calc(100vh - v-bind(nav_height));
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 0;
    padding-left: 0;
    //:deep(.el-scrollbar__bar.is-horizontal) {
    //  visibility: hidden;
    //}
  }
}
</style>
