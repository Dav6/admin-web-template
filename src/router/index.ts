/*
  @Author: 戴伟
  @Date: 2023-05-25 14:00:00
  @FilePath: src\router\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/
import type { RouteRecordRaw } from "vue-router";

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import globalRoutes from "./global/index";
import mainRoutes from "./main/index";

const routes:RouteRecordRaw[] = [
  // { path: '/:pathMatch(.*)*', name: '404', component: () => import("@/views/other/404.vue") },
  // {
  //   path: "/404",
  //   name: "404",
  //   component: () => import("@/views/other/404.vue"),
  // },

  ...globalRoutes,


  //  接入后端路由权限的时候不需要引入
  ...mainRoutes,
];

console.log('routes',routes)

// console.log('import.meta.env.BASE_URL',import.meta.env.BASE_URL)
// console.log(mainRoutes);
const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  // scrollBehavior: () => ({ y: 0 }),
  // isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: routes, //globalRoutes.concat(mainRoutes),
  // beforeRouteEnter(to, from) {
  //   // 在渲染该组件的对应路由被验证前调用
  //   // 不能获取组件实例 `this` ！
  //   // 因为当守卫执行时，组件实例还没被创建！
  //   console.log("--------", to, from);
  // },
});

export default router;