/*
  @Author: 戴伟
  @Date: 2023-06-02 14:56:09
  @FilePath: src\router\main\routes.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/





// 纯路由 不带 component  根据 interfaceRoute 参数
// 路径不能使用别名
// 因为当前文件需要 vite-plugin-createFileByRouter 插件 导入使用 路径不能使用别名 包括导入的文件
// 只有vite-plugin-createFileByRouter 使用 ， 导入另外一个 index.ts
import type {interfaceRoutes, interfaceRoute} from "../../interfaces/router/index"

// 终端管理数据
import dms from "./routes/dms/index"
// 素材管理
import mms from "./routes/mms/index"
// 节目管理
import pms from "./routes/pms/index"
// 发布管理
import rms from "./routes/rms/index"

const _routes: interfaceRoutes = [
    dms,
    mms,
    pms,
    rms,


    {
        path: "/test",
        name: "test",
        meta: {title: "页面模板"},
        children: [
            {

                path: "template",
                name: "template",
                meta: {title: "模板"},
            },
        ],
    },
];






const routesFormat = (list: interfaceRoutes, parent?: interfaceRoute): interfaceRoutes => {
    // console.log(list,parent);
    return list?.map((item: interfaceRoute) => {
        let url: string = "";
        const parentUrl = parent?.url && parent?.url !== "/" ? parent.url : "";
        // console.log('parent---',item.meta.title,parentUrl)
        const _path:string = item.path;
        let _name:string = _path;
        const _isStartSlash:boolean= _path.startsWith('/')
        // 是否以斜杠开头 一般只有第一层
        if(_isStartSlash){
            _name = _path.slice(1);
        }
        // 如果有 路由参数 ,取第一个 为名称
        _name = _name.split(':')[0];




        url = item.path !== "/" ? `${parentUrl}/${item.name}` : "/";

        // console.log('url',url)
        item.name = _name;
        item.url = url;
        // nUrl = `${parentUrl}/${item.name}`;
        // console.log(url)

        const nItem: interfaceRoute = {
            ...item,
            // jurisdiction: {
            //     authorityName: item.meta?.title,
            //     description: item.meta?.title,
            //     uri: `MENU:${item.url}`,
            //     creator: `${systemCode}-router`,
            //     // deleted:false,
            //     systemCode: `${systemCode}`,
            //     serviceName: `${systemCode}-format`,
            //     category: 0,
            // },
        };

        if (item.children && item.children.length > 0) {
            nItem.children = routesFormat(item.children, item);
        }

        return nItem;
    });
};

const routes: interfaceRoutes = routesFormat(_routes);
// console.log('routes', routes);
export default routes;

