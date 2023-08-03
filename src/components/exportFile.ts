/**
 @name: exportFile
 @author: 戴伟
 @date: 015 2022/12/15 15:09:00
 @file: src/components
 @description： do.....
 */

const exportFile = (file:any) => {
  //   const files = import.meta.glob('./*.vue',{eager:true} )
  // console.log('exportFile',files)
  //   let _module = {};
  //   Object.keys(files)?.map(item=>{
  //     let _file = files[item]?.default
  //     let _name = _file?.name;
  //     if(_name){
  //       _module =  _file
  //     }
  //   })
  //
  //
  // // import index from "./index.vue"
  // // console.log(module)
  // // console.log(index);
  //   let _name = _module?.name;

  // let _file = file;
  const _module = file;
  const _name = _module?.name;
  // _module.install = Vue => Vue.component(_name, _module);

  // _module = {};
  _module.isExportFile = true;

  return _module;
};

export default exportFile;
