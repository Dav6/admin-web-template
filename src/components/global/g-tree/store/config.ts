/**
 @name: constructFormList
 @author: 戴伟
 @date: 006 2023/01/06 16:56:45
 @file: src/components/pageContainer/asideTree/store
 @description： do.....
 */
import { randomNum } from "@/utils/tools"



export const formKeyMap: any = {
    parentOrgId: "parentOrgId", //所属部门id
    parentOrgName: "parentOrgName", //所属部门
    id: "id", //id
    orgCode: "orgCode", //标识码
    orgName: "orgName", //部门名称
    sort: "sort", //排序号
    brief: "brief", //部门描述
}


export const addEditDialogFormList: Array<object> = [
    {
        name: "所属部门Id",
        key: "parentOrgId",
        formType: "input",
        placeholder: "请输入",
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
        clearable: true,
        isHidden: true,
        value: "",
    },
    {
        name: "所属部门",
        key: "parentOrgName",
        linkageKey: "parentOrgId",
        value: "",
        formType: "input",
        placeholder: "请输入",
        disabled: true,
        span: 24,
        rules: [{required: true, message: "请输入", trigger: "blur"}],
        clearable: true,
    },
    {
        name: "部门名称",
        key: "orgName",
        value: "",
        formType: "input",
        placeholder: "请输入名称（30字符以内）",
        maxlength: 30,
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请输入部门名称", trigger: "blur"}],
        clearable: true,
    },
    {
        name: "排序号",
        key: "sort",
        value: "",
        formType: "inputNumber",
        controls: false,
        textAlign: "left",
        placeholder: "",
        disabled: false,
        span: 24,
        rules: [{required: true, message: "请输入部门名称", trigger: "blur"}],
        clearable: true,
    },
    {
        name: "标识码",
        key: "orgCode",
        value: "",
        formType: "input",
        placeholder: "",
        disabled: false,
        span: 24,
        // rules: [{ required: true, message: "请输入标识码", trigger: "blur" }],
        clearable: true,
    },
    {
        name: "部门描述",
        key: "brief",
        value: "",
        formType: "input",
        type: "textarea",
        placeholder: "请输入描述",
        disabled: false,
        span: 24,
        maxlength: 500,
        // rules: [{ required: true, message: "请输入部门描述", trigger: "blur" }],
        clearable: true,
    },


];


const setList = (list:any[], parent?:any, level: (number ) = 1) => {
    const _level = level;
    // console.log('level',level)
    if (_level > 4) {
        return [];
    }
    const _list:any[] = list?.map((item, index) => {
        const _item:{[n:string]:any} = {}

        _item.title = parent?.index ? `测试 ${parent.index}-${index}` : `测试 ${index}`;
        _item.label = _item.title;
        _item.name = _item.label;
        _item.index = parent?.index ? `${parent.index}-${index}` : `${index}`;
        _item.value = _item.index;
        _item.children = []
        _item.children = setList(Array(randomNum(1,5)).fill({}), _item, _level + 1)

        // if (index == 3 || index == 4) {
        //     _item.children = setList(Array(1).fill({}), _item, _level + 1)
        // }

        return _item;
    })

    return _list
}

const _treeList = setList(Array(1).fill({}))
// console.log('_treeList',_treeList)
export const treeList = _treeList