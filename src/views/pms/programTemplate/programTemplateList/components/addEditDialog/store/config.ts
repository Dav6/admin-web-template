/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\pms\programTemplate\programTemplateList\components\addEditDialog\store\config.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import dayjs from "dayjs";


// section 弹窗formList
export const addEditDialogFormList = [
    {
        name: "姓名",
        key: "name",
        value: "",
        formType: "input",
        placeholder: "请输入姓名",
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请输入姓名", trigger: "blur"}],
        clearable: true,
    },
    {
        name: "人员编号",
        key: "number",
        value: "",
        formType: "inputNumber",
        controls: false,
        textAlign: "left",
        placeholder: "请输入中英文",
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请输入人员编号", trigger: "blur"}],
        clearable: true,
    },
    {
        formClass:"slider-card",
        tooltipClass:"slider-card-tooltip",
        name: "人数",
        labelCustomName:"sliderLabel",
        key: "personNumber", value: "1", min: 1, max: 10, step:1,
        placeholder: "数字",
        disabled: false,
        formType: "slider",
        // unit: "次/分",
        showInput: true,
        showInputControls:false,
        span: 12,
        rules: [{required: true, message: "请输入数字", trigger: "blur"}],
        range: false,
        marks:{
            1:"1",
            10:"10"
        }
    },
    {
        name: "类型", key: "type", value: 1,   placeholder: "按钮滑块",
        formType: "tabs",
        span: 24,
        rules: [{required: true, message: "请输入按钮滑块", trigger: "blur"}],
        options: [
            {
                label: "开启",
                value: 1,
            },
            {
                label: "关闭",
                value: 2,
                // disabled:true,
            },
        ]
    },
    {
        name: "性别",
        key: "gender",
        value: "",
        formType: "radio",
        placeholder: "请选择性别",
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请选择性别", trigger: "blur"}],
        // 如果这边有值优先使用这边的 不然就使用全局的
        options: [],
        clearable: true,
    },

    {
        name: "出生日期",
        key: "birthDate",
        value: "",
        formType: "datePicker",
        placeholder: "请选择日期",
        format: "YYYY-MM-DD",
        valueFormat: "YYYY-MM-DD",
        disabled: false,
        span: 24,
        rules: [{required: false, message: "请选择日期", trigger: "blur"}],
        clearable: true,
    },
    {
        name: "民族",
        key: "nation",
        value: "",
        formType: "select",
        placeholder: "请选择",
        disabled: false,
        span: 24,
        // rules: [{ required: true, message: "请输入", trigger: "blur" }],
        clearable: true,
    },
    {
        name: "显示状态",
        key: "isShow",
        value: "",
        formType: "select",
        placeholder: "请选择",
        disabled: false,
        span: 24,
        // rules: [{ required: true, message: "请输入", trigger: "blur" }],
        clearable: true,
    },

    {
        name: "自定义",
        key: "customKey",
        value: "",
        formType: "custom",
        customName:"custom1",
        placeholder: "请输入自定义",
        disabled: false,
        span: 24,
        rules: [{required: false, message: "请输入自定义", trigger: "blur"}],
        clearable: true,
    },


    {
        name: "人员头像",
        key: "image",
        // limit: 1,
        disabled: false,
        formType: "imageVideoUpload",
        span: 20,
        value: [],
        accept: "image/jpeg,image/jpg",
        previewTeleported: true,
        rules: [{required: false, message: "请上传图片", trigger: "blur"}],
    },


];
