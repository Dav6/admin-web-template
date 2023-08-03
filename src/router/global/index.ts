/*
 * @Author: your name
 * @Date: 2021-01-13 17:37:21
 * @LastEditTime: 2021-01-18 09:45:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\router\globalRoutes.js
 */
import {globalRoutesMap} from "../config"

// console.log('globalRoutesMap',)
// console.log('globalRoutesMap',globalRoutesMap['404'])
export default [
  // {
  //   path: "/login",
  //   name: "login",
  //   isHidden: true,
  //   component: () => import("@/views/login/index.vue"),
  // },

  {
    path: "/:pathMatch(.*)*",
    isHidden: true,
    component: globalRoutesMap['404'],
  },
  {
    path: "/404",
    name: "404",
    isHidden: true,
    component:globalRoutesMap['404'],
  },
];
