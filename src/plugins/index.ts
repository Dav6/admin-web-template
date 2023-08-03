/*
  @Author: 戴伟
  @Date: 2023-05-25 15:16:53
  @FilePath: src\plugins\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        各种本地插件统一安装
*/



const _pluginFiles:any = import.meta.glob(["@/plugins/*/index.ts"], { eager: true });



export default {
    install: (app:any,  { router,pinia}:any) => {
        Object.keys(_pluginFiles)?.map((filePath:string)=>{
            const _filePath:string = filePath;
            // console.log(_pluginFiles?.[_filePath])
            if(_pluginFiles?.[_filePath] && _pluginFiles?.[_filePath]?.default){
                const _plugin = _pluginFiles?.[_filePath]?.default;
                app.use(_plugin,{ router,pinia });
            }
        })
    },
};
