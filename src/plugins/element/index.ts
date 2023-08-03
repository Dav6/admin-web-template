/*
  @Author: 戴伟
  @Date: 2023-05-25 14:57:17
  @FilePath: src\plugins\element\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/
import * as components from "@element-plus/icons-vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// @ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default {
    install: (app:any, ) => {
        const _components:any = components;
        for (const key in _components) {
            const componentConfig = _components[key];
            app.component(componentConfig.name, componentConfig);
        }
        app.use(ElementPlus, {
            locale: zhCn,
            size: "default",
            zIndex: 2999,
        });

        // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        //   app.component(key, component)
        // }
    },
    version: () => {
        return ElementPlus.version;
    },
};
