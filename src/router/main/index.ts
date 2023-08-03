/**
 @name: mainRouterMethods
 @author: 戴伟
 @date: 016 2023/01/16 11:28:30
 @file: src/router
 @description： do.....
 */


import type {interfaceRoutes,interfaceRoute,interfaceRouteChildren} from "@/interfaces/router"

import mainRouters from "./routes";

import type { RouteRecordRaw } from "vue-router";

// appMain(第一层页面结构)  404页面 等
import {globalRoutesMap} from "../config"

import { systemCode } from "@/config";

const _routerJurisdictionApis:any[] = [];
let pageFiles:any = {};
// 获取所有页面文件
pageFiles = import.meta.glob([
    "@/views/**/index.vue",
]);
// console.log('globalRoutesMap',globalRoutesMap)
// console.log('pageFiles',pageFiles)
import {isArray} from "@/utils/tools/index"

const _paths:Set<any> = new Set();
const _names:Set<any> = new Set();
const routesFormat = (list:interfaceRoutes, parent?:interfaceRoute) => {
    // console.log(list,parent);
    return list.map((item:interfaceRoute) => {
        const _item:interfaceRoute = item;
        // console.log('_item-------------------------',_item)

        const _path:string = _item.path;
        const _name:string = _item.name;
        const _isHavePath:boolean = _paths.has(_path)
        const _isHaveName:boolean = _names.has(_name)

        if(_isHavePath){
            console.error(`%c path: ${_path} 重复`,  'font-weight:600;padding:0 10px',     )
        }else{
            _paths.add(_path)
        }
        if(_isHaveName){
            console.error(`%c name: ${_name} 重复`,'font-weight:600;padding:0 10px')
        }else{
            _names.add(_name)
        }



        const _parentRedirect:string = parent?.redirect || "";
        const _url:string  = _item.url || "";

        const _children:interfaceRouteChildren | undefined = isArray(_item.children)?_item.children:[]; // || [];

        let _fileUrl:string = "";


        let _redirect:string = '';

        // 没有children 才设置 自动重定向
        if(_children && _children?.length > 0){
            // redirect
            _redirect = `${_children[0]['url']}`;
            _item.redirect = _redirect;
        }





        // 有子的时候 需要跳转
        if (_children && _children?.length > 0) {
            _fileUrl = 'routerView'
        }else{
            _fileUrl = `/src/views${_url}/index.vue`;
            if (!pageFiles[_fileUrl]) {
                _fileUrl = "404";
            }
        }
        if (!parent) {
            _fileUrl = 'layout';
        }

        // 根据路径 去找到文件
        switch (_fileUrl) {

            case 'layout':
            case 'routerView':
            case "404":
                _item.component = globalRoutesMap[_fileUrl]
                break;

            //     默认对应的文件 、没有就是404
            default:
                _item.component = pageFiles[_fileUrl] ||  globalRoutesMap['404'];
                break;
        }





        // _item.url = url;
        // nUrl = `${parentUrl}/${item.name}`;
        // console.log(url)

        const _newItem:interfaceRoute = {
            ..._item,
        };
        // console.log(nItem);

        // 获取路由上所有得接口权限 （ 功能权限
        // if (nItem.jurisdictionApis?.length > 0) {
        //     nItem.jurisdictionApis?.map((cItem:any) => {
        //         const _cItem = JSON.parse(JSON.stringify(cItem));
        //         _routerJurisdictionApis.push(_cItem);
        //     });
        // }

        if (_children && Array.isArray(_children) && _children.length > 0) {
            _newItem.children = routesFormat(_children, _item);
        }

        return _newItem;
    });
};

const routes:Array<RouteRecordRaw> = routesFormat(mainRouters) as any;
// console.log('index-routes------带component', routes);





export default routes;



