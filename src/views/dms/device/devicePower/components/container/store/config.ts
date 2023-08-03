/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\devicePower\components\container\store\config.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
export const tableKeyList = [
  {label: "id", key: "id",  sortable: 'custom', showOverflowTooltip: true},
  {label: "姓名", key: "name", showOverflowTooltip: true},
  {
    label: "人员编号", key: "number",  showOverflowTooltip: true,
  },

  {
    label: "性别", key: "gender", type: "option", showOverflowTooltip: true,
    // option:[],
    // option:[
    //   {label: "选项111", value: 1},
    //   {label: "选项2222", value: 2},
    //   {label: "选项33333", value: 3},
    // ],
    // option:{
    //   1:"选项12",
    //   2:"选项23",
    //   3:"选项34",
    // }
  },
  {label: "出生日期", key: "birthDate", type: "time", format: "YYYY-MM-DD",  showOverflowTooltip: true,},
  {label: "民族", key: "nation", type: "option", showOverflowTooltip: true,},
  {label: "显示状态", key: "isShow", type: "switch", activeValue:1,inactiveValue:0,   showOverflowTooltip: true,},
  {label: "人员头像",key: "image", type: "image",  size: "24 24", width: 100, limit: 2, showOverflowTooltip: false},
  {label: "自定义",key: "customKey", type: "custom", customName: "customName",  showOverflowTooltip: true,},
];

export const sectionButtonsConfig = [
  {name: "导出(测试)", key: "export",class:"zr-iconfont zr-export",  icon:"",},
  // {name: "导出", key: "export",class:"export", icon:"",}
]

// section table设置列配置
export const tableSettingsConfig = {
  isShow: true,
  label: "操作",
  fixed: "right",
  type: "123123",
  align: "center",
  width: 200,
  divided: true,
  buttonList: [
    {
      name: "修改",
      key: "edit",
    },
    {
      name: "删除",
      key: "delete",
    },

    {
      type: "dropdown",
      trigger: "click", // hover/click/contextmenu
      placement: "bottom-start",
      teleported: false, //top/top-start/top-end/bottom/bottom-start/bottom-end
      list: [
        {
          name: "详情",
          key: "detail",
          type: "button",
        },

        {
          name: "设置",
          key: "delete",
          divided: true,
        },
      ],
    },
  ],
};
export const tableShowConfig = {
  isShowExpand: false, //是否显示扩展
  isShowSelection: true, //是否显示选项框
  isShowIndex: true, //是否显示序号
};