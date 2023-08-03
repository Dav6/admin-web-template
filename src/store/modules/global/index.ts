/*
  author: 戴伟
  date: 2023-01-07 09:49:11 
  file: src\store\modules\global\index.js
  fileName:index
  des:
    do.....
*/

import { defineStore } from "pinia";
// @ts-ignore
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
import type { RouteLocationRaw } from "vue-router";

// 是否全局导出
// 如果全局导出 必须下面 名称格式为 useXXXXStore
export const isGlobal = true;
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "global",
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  actions: {



    goToPage(route:(RouteLocationRaw | number)){

      if(typeof route == 'number'){

        return router.go(route)
      }

      return router.push(route).then();


    },




    messageBox(options:any, appContext:any) {
      return ElMessageBox(
        {
          ...options,
        },
        appContext
      );
    },
    messageBoxConfirm(message:any, title:string = "提示", options:object = {}) {
      return ElMessageBox.confirm(message, title, {
        ...options,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        draggable: true,
      });
    },
    message(data:any):any {
      let _data = data;
      if (!_data) {
        return this.message({ message: "请输入提示内容", type: "error" });
      }
      if (typeof _data === "string" || typeof _data === "number") {
        _data = { message: _data };
      } else {
        _data = { ..._data };
      }
      // console.log('showMessage')
      // message	消息文字	string / VNode	—	—
      // type	    主题	string	success/warning/info/error	info
      // iconClass	自定义图标的类名，会覆盖 type	string	—	—
      // dangerouslyUseHTMLString	是否将 message 属性作为 HTML 片段处理	boolean	—	false
      // customClass	                自定义类名	string	—	—
      // duration	        显示时间, 毫秒。设为 0 则不会自动关闭	number	—	3000
      // showClose	是否显示关闭按钮	boolean	—	false
      // center	文字是否居中	boolean	—	false
      // onClose	关闭时的回调函数, 参数为被关闭的 message 实例	function	—	—
      // offset	Message 距离窗口顶部的偏移量	number	—	20

      return ElMessage({
        ..._data,
        message: _data.message ? _data.message : "",
        type: _data.type ? _data.type : "success",
        duration: _data.duration ? _data.duration : 3000,
        dangerouslyUseHTMLString: _data.dangerouslyUseHTMLString
          ? _data.dangerouslyUseHTMLString
          : false,
      });
    },
  },
});
