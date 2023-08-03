/*
  @Author: 戴伟
  @Date: 2023-06-16 14:33:39
  @FilePath: src\router\main\routes\dms\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/


import type {interfaceRoutes, interfaceRoute} from "../../../../interfaces/router/index"

const route: interfaceRoute = {
    path: "/dms",
    name: "dms",
    meta: {title: "终端管理"},
    children: [
        {
            path: "device",
            name: "device",
            meta: {title: "终端管理"},
            children: [
                {
                    path: "deviceList",
                    name: "deviceList",
                    meta: {title: "终端管理"},
                },
                {
                    path: "deviceEdit",
                    name: "deviceEdit",
                    meta: {title: "编辑"},
                },
                {
                    path: "devicePower",
                    name: "devicePower",
                    meta: {title: "开关机设置"},
                },
                {
                    path: "deviceDisplay",
                    name: "deviceDisplay",
                    meta: {title: "显示设置"},
                },
                {
                    path: "deviceVolume",
                    name: "deviceVolume",
                    meta: {title: "音量设置"},
                },
                // {
                //     path: "deviceExamine",
                //     name: "deviceExamine",
                //     meta: {title: "审核设置"},
                // },
                {
                    path: "deviceSchedule",
                    name: "deviceSchedule",
                    meta: {title: "终端日程"},
                },


            ]
        },

    ],
}


export default route