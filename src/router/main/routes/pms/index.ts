/*
  @Author: 戴伟
  @Date: 2023-06-16 15:06:35
  @FilePath: src\router\main\routes\pms\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/



import type {interfaceRoutes, interfaceRoute} from "../../../../interfaces/router/index"

const route: interfaceRoute = {
    path: "/pms",
    name: "pms",
    meta: {title: "节目管理"},
    children: [
        {
            path: "programTemplate",
            name: "programTemplate",
            meta: {title: "节目模板"},
            children: [
                {
                    path: "programTemplateList",
                    name: "programTemplateList",
                    meta: {title: "节目模板"},
                },
                {
                    path: "programTemplateMake",
                    name: "programTemplateMake",
                    meta: {title: "模板制作"},
                },
            ]
        },
        {
            path: "program",
            name: "program",
            meta: {title: "节目列表"},
            children: [
                {
                    path: "programList",
                    name: "programList",
                    meta: {title: "节目列表"},
                },
                {
                    path: "programMake",
                    name: "programMake",
                    meta: {title: "节目制作"},
                },
            ]
        },



    ],
}


export default route