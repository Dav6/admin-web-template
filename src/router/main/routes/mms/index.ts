/*
  @Author: 戴伟
  @Date: 2023-06-16 15:06:35
  @FilePath: src\router\main\routes\mms\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/


import type {interfaceRoutes, interfaceRoute} from "../../../../interfaces/router/index"

const route: interfaceRoute = {
    path: "/mms",
    name: "mms",
    meta: {title: "素材管理"},
    children: [
        {
            path: "material",
            name: "material",
            meta: {title: "素材管理"},
            children: [
                {
                    path: "materialList",
                    name: "materialList",
                    meta: {title: "素材管理"},
                },
                {
                    path: "materialUpload",
                    name: "materialUpload",
                    meta: {title: "上传"},
                },



            ]
        },

    ],
}


export default route