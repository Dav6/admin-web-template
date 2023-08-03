/*
  @Author: 戴伟
  @Date: 2023-06-16 15:00:24
  @FilePath: src\router\main\routes\rms\index.ts  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/


import type {interfaceRoutes, interfaceRoute} from "../../../../interfaces/router/index"

const route: interfaceRoute = {
    path: "/rms",
    name: "rms",
    meta: {title: "发布管理"},
    children: [
        {
            path: "release",
            name: "release",
            meta: {title: "日程发布"},
            children: [
                {
                    path: "releaseList",
                    name: "releaseList",
                    meta: {title: "发布列表"},
                },
                {
                    path: "releaseDetails",
                    name: "releaseDetails",
                    meta: {title: "发布详情"},
                },
                {
                    path: "releaseSetting",
                    name: "releaseSetting",
                    meta: {title: "发布"},
                },
            ]
        },
        {
            path: "releaseReview",
            name: "releaseReview",
            meta: {title: "发布审核"},
        },



    ],
}


export default route