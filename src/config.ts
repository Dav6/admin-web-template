/*
 * @Author: your name
 * @Date: 2021-01-06 17:24:12
 * @LastEditTime: 2021-11-30 15:34:54
 * @LastEditors: Please set LastEditors
 * @Description: 修改配置需重启服务后生效
 * @FilePath: \src\config.js
 */

export const title:string = "信息发布";

// 前端项目code
export const systemCode:string = "media-publish";
// 后端项目code  前缀 + 打包会用到
export const serverCode:string = "media-publish"



// apisSystemCode: ['smart-power','usercenter-manager', 'zerui-video-platform', 'fushan-property-format', 'fushan-power'],
export default {
  title: title,
  systemCode: systemCode,
  serverCode:serverCode,
  pageSize: "20",
};


