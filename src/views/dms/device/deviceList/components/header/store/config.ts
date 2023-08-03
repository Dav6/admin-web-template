/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\deviceList\components\header\store\config.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
// section listQuery中 表单列表
export const listQueryFormList = [
  {
    name: "",
    key: "checkbox",
    value: [],
    labelWidth: "0",
    placeholder: "请选择选项",
    disabled: false,
    formType: "checkbox",
    options: [
      {
        label: "包含子部门",
        value: 1,
      },
    ],
    width: 100,
  },
  {
    name: "",
    key: "name1",
    placeholder: "请输入名称",
    formType: "input",
    isClearable: true,
    labelWidth: "0",
    width: 300,
    isSearch: true,
  },
  {
    name: "名称",
    key: "name2",
    placeholder: "请输入名称",
    formType: "input",
    isClearable: true,
    labelWidth: "4em",
    width: 300,
  },
  {
    name: "状态",
    key: "radio",
    value: 1,
    labelWidth: "4em",
    placeholder: "请选择选项",
    disabled: false,
    formType: "radio",
    width: 600,
    options: [
      {
        label: "选项1",
        value: 1,
      },
      {
        label: "选项2",
        value: 2,
      },
      {
        label: "选项3",
        value: 3,
      },
    ],
    span: 24,
    buttonList: [
      {name: "查 询", key: "search", type: "primary"},
      {name: "重 置", key: "reset"},
    ],
  },
];
// section listQuery中 表单按钮
export const listQueryButtonList = [
  {name: "打 开(treeDialog)", key: "add", type: "primary"},
];
