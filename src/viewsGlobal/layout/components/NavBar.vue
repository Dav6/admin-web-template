<!--
  @Author: 戴伟
  @Date: 2023-06-02 16:12:57
  @FilePath: src\viewsGlobal\layout\components\NavBar.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->

<template>
  <!--    <div class="ve_nav_bar">-->
  <!--&lt;!&ndash;        <hamburger></hamburger>&ndash;&gt;-->
  <!--&lt;!&ndash;        <breadcrumb></breadcrumb>&ndash;&gt;-->
  <!--      <div class="logo" style="width:120px">LOGO</div>-->
  <!--      <side-bar></side-bar>-->
  <!--      <personal></personal>-->

  <!--    </div>-->

  <div class="d-nav-bar" ref="navBarRef">
    <div class="d-nav-bar-logo-title">
      <!--      智能家居-->
    </div>
    <div class="d-nav-bar-list">
      <template v-for="(item, index) in navList" :key="index">
        <div
          ref="navBarItemRef"
          v-if="!item.isHidden"
          class="d-nav-bar-list-item"
          :class="{ active: goTo('isActive', { data: item, index }) }"
          @click="goTo('page', item)"
        >
          <div class="label">{{ setOneNavTitle("title", item) }}</div>
        </div>
      </template>
    </div>
    <div class="d-nav-bar-bar-settings" v-if="false">
      <el-dropdown style="margin-right: 20px">
        <div class="d-nav-bar-bar-download">
          <el-link :underline="false" class="link-item">
            <g-image :src="download" size="24 24"></g-image>
          </el-link>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="(item, index) in downloadList">
              <el-dropdown-item>
                <template v-if="item.key == 'link'">
                  <el-link
                    :underline="false"
                    target="_blank"
                    :href="item?.href"
                    class="link-item"
                  >
                    {{ item.label }}
                  </el-link>
                </template>
                <template v-if="item.key == 'QRCode'">
                  <el-popover
                    placement="left-start"
                    title=""
                    :width="200"
                    trigger="hover"
                    content="this is content, this is content, this is content"
                  >
                    <template #reference>
                      {{ item.label }}
                    </template>
                    <template #default>
                      <qrcode-vue
                        class="link-Qrcode"
                        :value="QRCodeOptions.value"
                        :size="QRCodeOptions.size"
                        :level="QRCodeOptions.level"
                        :margin="QRCodeOptions.margin"
                        :background="QRCodeOptions.background"
                        :foreground="QRCodeOptions.foreground"
                      ></qrcode-vue>
                    </template>
                  </el-popover>
                </template>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <div class="d-nav-bar-bar-avatar-name">
          <el-icon class="d-nav-bar-bar-avatar" size="24px">
            <Avatar />
          </el-icon>
          <div class="d-nav-bar-bar-name">
            {{ userInfo?.name || userInfo?.userName }}
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="(item, index) in settingList">
              <template v-if="item.isShow">
                <el-dropdown-item @click="goTo(item.key, {})">
                  {{ item.label }}
                </el-dropdown-item>
              </template>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!--  {{ navListChild }}-->
  <div class="d-nav-bar-list-two" :class="{ isHidden: route.name == 'home' }">
    <template v-for="(item, index) in navListChild" :key="item">
      <div
        class="d-nav-bar-item"
        :class="{ active: goTo('isActiveChild', item) }"
        @click="goTo('page', item)"
        v-if="!item.isHidden"
      >
        <div class="label">{{ item.meta.title }}</div>
      </div>
    </template>
  </div>

  <edit-password-dialog
    v-model="isShowEditPasswordDialog"
  ></edit-password-dialog>
</template>
<script setup lang="ts">
//
// import {
//   LOGIN,
//   LOGIN_OUT
// } from "@/store/modules/app/type";

import QrcodeVue from "qrcode.vue";

import EditPasswordDialog from "./editPasswordDialog.vue";

import download from "@/assets/navBar/download.png";

import { useRoute, useRouter } from "vue-router";

import {
  computed,
  ref,
  toRaw,
  toRefs,
  reactive,
  watchEffect,
  nextTick,
  watch,
} from "vue";
import { ElMessageBox } from "element-plus";
import { useAppStore } from "@/store/modules/app/index.js";
// import resize from "@/directives/modules/resize";
// const store = useStore();
const appStore = useAppStore();

const routers = useRouter();
const route = useRoute();
const userInfo = appStore.userInfo;
const systemCode = appStore.systemCode;
const systemConfig = appStore.systemConfig;
const notLoginUserInfo = appStore.notLoginUserInfo;

watch(
  () => route,
  (route) => {
    // console.log('route',route)
    // console.log('route.name',route.name)
  },
  {
    deep: true,
    immediate: true,
  }
);

// console.log("notLoginUserInfo", notLoginUserInfo);
// console.log("userInfo", userInfo);
// console.log("systemConfig", systemConfig.app_download);

// console.log('vue',window)

let _href =
  "https://www.yunzhijia.com/docrest/file/downloadfile/632bf51c689c6d00012ad399?bizkey=cloudflow&networkId=6214bbbde4b09395114c040f&original";

_href = systemConfig?.app_download;
const downloadList = [
  {
    label: "app下载",
    key: "link",
    href: _href,
  },
  {
    label: "扫码下载",
    key: "QRCode",
    href: _href,
  },
];
const QRCodeOptions = ref({
  value: downloadList[0]["href"],
  size: 175,
  //二维码的容错能力等级，取值为 'L', 'M', 'Q', 'H'
  level: "Q",
  margin: 0,
  background: "#fff",
  foreground: "#000",
});

let _isNotLoadingAccount = false;
if (notLoginUserInfo?.loginIdentify == userInfo?.userName) {
  _isNotLoadingAccount = true;
}
// console.log(route.name);
const settingList = [
  {
    label: "修改密码",
    key: "editPassword",
    isShow: !_isNotLoadingAccount,
  },
  {
    label: "退出登录",
    key: "loginOut",
    isShow: true,
  },
];

// console.log(userInfo)
// console.log('route', route);
let navCurrent = ref(0);
let navList = ref([]);
let navListLineLeft = ref("");
let navListChild = ref([]);
const navBarItemRef = ref();
// 获取路由
const getRoutes = (routes, parent) => {
  return routes
    .map((item) => {
      // console.log(item.name);

      //
      // if (item.isMenuHidden) return '';

      // let url = ''
      // if (parent) {
      //   url = `${parent.url}/${item.name}`
      // } else {
      //   url = `/${item.name}`;
      // }
      // item.url = url;

      if (item.children?.length > 0) {
        item.children = getRoutes(item.children, item).filter(
          (item) => item != ""
        );
      }

      return item;
    })
    .filter((item) => item != "" && !item?.isHidden);
};

const authRoutes = computed(() => appStore.mainRoutes);

// 不需要权限，直接获取页面路由
// const authRoutes = ref();
// authRoutes.value = JSON.parse(JSON.stringify(routers.options.routes)).map(item =>{
//
//   if(!item.isHidden){
//     return item
//   }else{
//     return ''
//   }
//
// }).filter(Boolean)

watchEffect(() => {
  // console.log("router change");
  // console.log('111',store.getters.authRoutes);
  // navList.value = getRoutes(authRoutes.value);
  console.log('authRoutes.value',authRoutes.value)
  console.log('routers',routers.options.routes)
  navList.value = getRoutes(routers.options.routes);
  // console.log("navList.value", navList.value);
}, {});

// 设置标题
const setOneNavTitle = (key, item) => {
  // console.log('item',item);
  // console.log('defaultActive', route.name);
  let title = item.meta?.title;
  // if (item.children?.length == 1) {
  //   title = item.children[0]['meta']['title'];
  // }
  return title;
};

const isShowEditPasswordDialog = ref(false);

console.log();
const setNavLineLeft = (index) => {
  // console.log("setNavLineLeft", index);
  // console.log('na vBarItemRef',navBarItemRef)
  let _index = index == undefined ? navCurrent.value : index || 0;

  navCurrent.value = _index;

  let _width = navBarItemRef?.value?.[0]?.["offsetWidth"] || 0;
  let _left = ((_width + 12 + 12) / 2) * (2 * _index + 1);

  // console.log(_width,_left)
  navListLineLeft.value = `${_left}px`;
};

const navBarRef = ref();

const navBarResize = () => {
  // console.log('navBarResize')

  setNavLineLeft();
};
// window.removeEventListener("resize", navBarResize);
// window.addEventListener("resize", navBarResize);

// 大部分方法 ，根据key 去做不同的处理
const goTo = (key, data) => {
  // console.log(key);
  // console.log(JSON.parse(JSON.stringify(item)));
  // 第一层navbar
  if (key == "isActive") {
    let _data = data.data;
    let _index = data.index;
    // console.log('isActive',route.name);
    // console.log(data);
    // path 以/切割 取第一个
    let name = route.path.split("/")[1];

    if (_data.name == name) {
      // console.log("name", data);
      // navListChild = reactive([]);
      // 获取当前激活的第二层路由列表
      navListChild.value = _data.children;

      // navListLineLeft.value

      setNavLineLeft(_index);

      // console.log(data.navListChild);
      return true;
    } else {
      return false;
    }
  }

  // 第二层navbar
  if (key == "isActiveChild") {
    // let route1 = JSON.parse(JSON.stringify(route));
    let name = route.path.split("/")[2];
    if (route.path == "/home") {
      name = "home";
    }

    // console.log(key + 'item', item);
    // console.log(key+'route',route);
    // console.log('isActiveChild-route',JSON.parse(JSON.stringify(route)));

    // 当前路由的详细信息，路由上的自定义参数
    let routeDetail = navListChild.value.filter((item) => {
      // console.log(item);
      return data.name == name;
    });
    // console.log('isActiveChild-route',name,data.navListChild,routeDetail);
    // console.log('isActiveChild-route',routeDetail , data.name);

    // console.log(data.name )
    // console.log(routeDetail)
    if (
      data.name == name ||
      (routeDetail?.length > 0 && routeDetail[0].parent == data.name)
    ) {
      // console.log('name',data.navListChild)
      // navListChild = reactive([]);
      // console.log(data.navListChild);
      return true;
    } else {
      return false;
    }
  }

  if (key == "editPassword") {
    console.log("修改密码");
    isShowEditPasswordDialog.value = true;
  }

  if (key == "loginOut") {
    console.log("退出登录");

    ElMessageBox.confirm(`是否退出登录`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      draggable: true,
    }).then(() => {
      // store.dispatch(`app/${LOGIN_OUT}`);
    });
  }

  if (key == "page") {
    console.log(data);

    let name = data.name;
    routers.push({
      name,
      query: { ...route.query },
    });
  }
};

// console.log('defaultActive', route.path);
//
// const active = computed(() => {
//   console.log('defaultActive', route.path);
//   let path =route.path.split('/');
//   console.log(path);
//   // console.log('defaultActive', toRaw(route));
//   // let i = route.name.indexOf("/");
//   // if (i < 0) {
//   //   return "/" + route.name;
//   // } else {
//   //   return "/" + route.name.slice(0, i);
//   // }
//   return route.name;
// });
</script>
<style lang="less" scoped>
.d-nav-bar {
  --d-nav-bar-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--d-nav-bar-height);
  background: #fff;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #12294d;
  box-shadow: 0px 6px 58px 0px rgba(196, 203, 214, 0.1);

  .d-nav-bar-logo-title {
    position: relative;
    font-size: 20px;
    //font-family: PingFangSC-Regular, PingFang SC;
    //font-weight: 400;
    color: #ffffff;
    //width:351px;
    //padding-left: 48px;
    white-space: nowrap;
    height: 100%;
    width: calc(280px - 16px);
    &:before {
      content: " ";
      display: block;
      width: 127px;
      height: 27px;
      position: absolute;
      //background-color:#eee;
      left: 48px;
      top: 50%;
      transform: translateY(-50%);
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../../../assets/logo/logo.png");
    }
  }

  .d-nav-bar-list {
    flex: 1;
    display: flex;
    align-content: center;
    //padding-left: 80px;
    overflow: hidden;
    height: 100%;
    position: relative;
    .d-nav-bar-list-item {
      position: relative;
      height: 100%;

      //font-size: 18px;
      //font-family: PingFangSC-Regular, PingFang SC;
      //font-weight: 400;
      //color: #FFFFFF;
      line-height: var(--d-nav-bar-height);
      //padding: 0 12px;
      width: 120px;
      cursor: pointer;
      margin: 0 12px;
      text-align: center;

      .label {
        position: relative;
        z-index: 10;
      }

      &.active {
        color: var(--nav-bar-active-color);
      }
    }

    &:after {
      transition: all 0.22s ease-in-out;
      content: " ";
      display: block;
      position: absolute;
      width: 40px;
      height: 4px;
      background: var(--nav-bar-active-color);
      box-shadow: 0px 1px 2px 0px rgba(227, 238, 255, 0.5),
        0px 2px 4px 1px rgba(227, 238, 255, 0.5);
      border-radius: 2px;
      bottom: 0;
      left: v-bind("navListLineLeft");
      transform: translateX(-50%);
    }
  }

  .d-nav-bar-bar-settings {
    padding: 0 24px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #12294d;
    .d-nav-bar-bar-avatar-name {
      font-size: 14px;
      font-weight: 400;
      display: flex;
      align-items: center;
      cursor: pointer;

      .d-nav-bar-bar-avatar {
        margin-right: 6px;
      }
    }
  }
}

.d-nav-bar-list-two {
  background-color: #fff;
  display: flex;
  padding: 0 120px;
  //overflow: hidden;
  transition: all 0.11s ease-in-out;
  height: 56px;
  opacity: 1;
  box-shadow: 0px 6px 58px 0px rgba(196, 203, 214, 0.1);

  border-top: 2px solid rgba(245, 247, 254, 1);
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6a717e;

  &.isHidden {
    height: 0;
    opacity: 0;
  }

  .d-nav-bar-item {
    height: 56px;
    line-height: 56px;
    //padding: 0 8px;
    margin: 0 12px;
    width: 120px;
    position: relative;
    cursor: pointer;
    transition: color 0.22s ease-in-out;
    text-align: center;
    &.active {
      color: var(--nav-bar-active-color);
    }
  }
}

.link-Qrcode {
  display: block;
}
</style>
