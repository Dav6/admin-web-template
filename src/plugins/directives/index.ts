/*
  @Author: 戴伟
  @Date: 2023-05-25 16:14:14
  @FilePath: src\plugins\directives\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

export default {
  install: (app:any, { router }:any) => {
    // const files = require.context("@/directives/modules", false, /\.js$/);

    const files:any = import.meta.glob("./modules/**/*.ts", { eager: true });

    // console.log('files',files)

    Object.keys(files).map((key:string) => {
      // console.log('files[key]',files[key]?.default)

      const file:any = files[key];
      Object.keys(file).map((cKey:string) => {
        // console.log(cKey)
        if(cKey){
          let name:string = cKey;
          const method:any = file[cKey];

          if(cKey === 'default'){
            name = file?.default?.name;

          }

          if(name){
            // console.log(name);
            // console.log(method);
            app.directive(name, (el:any, binding:any) => method(el, binding, app, router));
          }

        }


      })


    });
  },
};
