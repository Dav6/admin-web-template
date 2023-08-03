/*
  @Author: 戴伟
  @Date: 2023-05-26 14:41:26
  @FilePath: src\plugins\zrComponent\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/
import zrComponent from "zr-component";

const zrComponentsOptions = {
    isImportElementPlus: false,
    // uploadFileMethod: uploadFileAPI,
    elConfig: {
        zIndex: 3333,
    },
};

export default {
    install: (app:any, ) => {
        app.use(zrComponent, zrComponentsOptions)


        // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        //   app.component(key, component)
        // }
    },
};
