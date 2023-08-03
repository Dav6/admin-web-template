/**
 @name: tree
 @author: 戴伟
 @date: 025 2022/07/25 11:37:38
 @file: src/components/pageContainer
 @description： do.....
 */

// import instance from "@/axios/https";


//创建部门
// POST
// /base-data/api/v1/department
// 请求数据类型application/json
// 响应数据类型[ "*/*" ]
// {
//   "brief": "",
//   "orgCode": "",
//   "orgIcon": "",
//   "orgName": "",
//   "orgType": 0,
//   "parentOrgId": 0,
//   "sort": 0
// }
// export const createData = (data:any)=> instance({
//     method: 'POST',
//     url: '/base-data/api/v1/department',
//     data
// })
//
//
// //更新部门复制接口复制文档复制地址
// // PUT
// // /base-data/api/v1/department
// // 请求数据类型application/json
// // 响应数据类型[ "*/*" ]
// // {
// //   "brief": "",
// //   "id": 0,
// //   "orgCode": "",
// //   "orgIcon": "",
// //   "orgName": "",
// //   "orgType": 0,
// //   "sort": 0
// // }
// export const editData = (data:any)=> instance({
//     method: 'PUT',
//     url: '/base-data/api/v1/department',
//     data
// })
//
//
// // 同级部门调整顺序复制接口复制文档复制地址
// // PUT
// // /base-data/api/v1/department/sort
// // 请求数据类型application/json
// // 响应数据类型[ "*/*" ]
// // []
// export const changeSort = (data:any)=> instance({
//     method: 'PUT',
//     url: '/base-data/api/v1/department/sort',
//     data
// })
//
//
// //删除部门，部门下存在人员，提示错误复制接口复制文档复制地址
// // DELETE
// // /base-data/api/v1/department/{id}
// // 请求数据类型application/x-www-form-urlencoded
// // 响应数据类型[ "*/*" ]
// export const deleteData = (id:(string|number))=> instance({
//     method: 'DELETE',
//     url: `/base-data/api/v1/department/${id}`,
// })
//
//
// // 部门-字段列表-分页复制接口复制文档复制地址
// // GET
// // /base-data/v1/department/extend
// // 请求数据类型application/x-www-form-urlencoded
// // 响应数据类型[ "*/*" ]
// export const getFields = (params: {[name:string]:any}) => instance({
//     method: 'GET',
//     url: '/base-data/api/v1/department/extend',
//     params:{
//         pageIndex: 1,
//         pageSize: 999,
//     }
// })
