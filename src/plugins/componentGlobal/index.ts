/**
 @name: index
 @author: 戴伟
 @date: 009 2022/11/09 15:05:27
 @file: src/components
 @description： do.....
 */
// import * as components from "@element-plus/icons-vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import "dayjs/locale/zh-cn";
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale'
// locale.use(zhCn)

// const

const files:any = import.meta.glob(["@/components/**/index.ts"], { eager: true });
// console.log('components-files',files)

const defaultOptions:any = {};
const install = (app:any, options = defaultOptions) => {

  // console.log('index-files',files);



  Object.keys(files)?.map((item) => {
    //console.log(files[item].default)
    //
    // console.log( 'name',files[item]?.default?.name)
    const _module = files[item]?.default;
    const _name = _module?.name;
    const _isGlobal = _module?.isGlobal;
    const _isExportFile = _module?.isExportFile;

    if (_name && _isGlobal && _isExportFile) {

      const _component = _module;
      // console.log('_name-------',_name)
      app.component(_name, _component);
      // app.component(_name, _component)
      // console.log(app)
      // app.component(_name, _component)
    }
  });

  // app.provide(/* 注入名 */ 'message', /* 值 */ ()=>{return '123'})

  // console.log(app)
};

// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  install(window.Vue);
}

export default install;
