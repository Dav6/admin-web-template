/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\pms\program\programMake\store\config.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import dayjs from "dayjs";
import { randomNum } from "@/utils/tools"


const _globalMapOptions: { [n: string]: any } = {
  gender: [
    {
      label: "男",
      value: "男"
    },
    {
      label: "女",
      value: "女"
    }
  ],
  nation: [
    {label:"汉族",value:"汉族"},
    {label:"少数民族",value:"少数民族"}
  ],
  isShow:[
    {
      label:"显示",
      value:1,
    },
    {
      label:"隐藏",
      value: 0,
    }
  ]
}


const optionsMap = (_globalMapOptions: { [n: string]: any }) => {
  const _objKeys: any = {};
  Object.keys(_globalMapOptions)?.map((key: string) => {
    const _key: string = key;
    _objKeys[_key] = {}
    _globalMapOptions[_key]?.map((item: any) => {
      _objKeys[_key][item.value] = item.value;
    })
  })

  return _objKeys;
};

export const globalMapOptions = {
  options: _globalMapOptions,
  optionsMap: optionsMap(_globalMapOptions),
};



// 左边本地key 对应右边 接口key
// 用于table 和 addEditDialog 弹框使用
// addEditDialog 提交时 会转变为右边
//  table 会去取 右边的key值
export const globalKeyMap:{[n:string]:any} = {
  "id":"id",
  "name":"name",
  "number":"number",
  "gender":"sex",
  "birthDate":"birthDate",
  "nation":"nation",
  "isShow":"isDisplay",
  "customKey":"customKey",
  "image":"imageUrl",
  "type":"type",
  "personNumber":"personNumber",
}

