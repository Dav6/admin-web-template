/*
  author: 戴伟
  date: 2023-01-03 15:03:19
  file: src\components\pageContainer\asideTree\store\tree.js
  fileName:tree
  des:
    do.....
*/

import {defineStore} from "pinia";
// import {
//     createData as createDataAPI,
//     editData as editDataAPI,
//     deleteData as deleteDataAPI,
//     changeSort as changeSortAPI,
//     getFields as getFieldsAPI,
// } from "../api";
import {
    addEditDialogFormList,
    formKeyMap,
    treeList,
} from "./config";
import {debounce, swapKeysAndValues} from "@/utils/tools";
import type Node from 'element-plus/es/components/tree/src/model/node'
import type {DragEvents} from 'element-plus/es/components/tree/src/model/useDragNode'
import type {
    AllowDropType,
    NodeDropType,
} from 'element-plus/es/components/tree/src/tree.type'
import {JSONPath} from "jsonpath-plus";
// import {tableListTemplate} from "@/views/tms/test/store/config";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useTreeStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "gTree",
    // state: 返回对象的函数
    state: () => ({
        config: {
            draggable: false
        },
        isLoading: true,
        treeNodeKey: "",
        treeCurrent: "",
        treeType: 1,
        treeRef: "",

        filter: {
            ref: "",
            formList: [
                {
                    name: "",
                    key: "search",
                    placeholder: "请输入部门名称",
                    formType: "input",
                    isClearable: true,
                    labelWidth: "0",
                    span: 24,
                    value: "",
                    isSearch: true,
                    marginBottom: 0,
                },
            ],
        },


        addEditDialogData: {
            formRef: null,
            isShow: false,
            isLoading: true,
            title: "添加部门",
            type: "",
            details: {},
            formList: JSON.parse(JSON.stringify(addEditDialogFormList))
        },


        props: {},
        emits: "",
    }),
    getters: {
        // treeList:(state:any)=>{
        //     let _treeList:any[] = [];
        //
        //     console.log('_treeList--state', state)
        //     const _treeType: number = Number(state.treeType)
        //
        //     if(_treeType>0){
        //         console.log('state',state.optionsStore.treeMap)
        //         _treeList = state.optionsStore?.treeMap?.[state.treeType] || [];
        //     }
        //     // const _data = state.getCurrentData()
        //
        //
        //     // state.setCurrentKey(state.treeCurrent)
        //
        //     return _treeList
        // }
    },
    actions: {
        init(props: any) {
            this.setConfig(props)
            const _treeList: Array<any> | undefined = props.treeList;
            //
            // this.getTreeList()
            // setTimeout(() =>{
            //     console.log('重新获取')
            //     this.optionsStore.deviceGroupTree()
            // },3000)
        },
        setConfig(props: any) {
            const _treeType: string | number | undefined = props.treeType || undefined;
            const _treeNodeKey: string | number = props.treeNodeKey;

            this.treeType = _treeType;
            this.treeNodeKey = _treeNodeKey;
        },
        setTreeFilterRef(el: any) {
            this.filter.ref = el;
        },
        setTreeRef(el: any) {
            console.log('this.treeRef------',this.treeRef)
            this.treeRef = el;
        },


        isInTreeListByKey(treeList: any[], currentKey: string) {
            const _list: any[] = treeList
            // // const _path = `$..childs[:]`;
            const _path = `$..[?(@property == "children")]`
            const _setList = {name: "", label: "", value: "", id: "", children: _list}
            let _isHave = false;
            const _this = this;
            JSONPath({
                json: _setList, path: _path, resultType: "all",
                callback(item) {
                    // const _parent = item.parent;
                    const _children = item.value;
                    //
                    _children?.map((cItem: any, cIndex: any) => {
                        // console.log('cItem',currentKey,cItem)
                        // console.log('this.treeNodeKey',_this.treeNodeKey)
                        if (cItem?.[_this?.treeNodeKey] === currentKey) {
                            _isHave = true;
                        }

                    })
                }
            });


            return _isHave;
        },





        filterTree() {
            // console.log(treeFilterFormRef.value?.getFormData())
            const formData = this.filter.ref?.getFormData();
            const value = formData?.search
            this.treeRef.filter(value);
        },
        filterNode(value: any, data: any) {
            // console.log(value, data);
            if (!value || value.trim() == "") return true;
            const labelKey = this.props?.treeProps?.label || "label";
            return data[labelKey].includes(value);
        },


        addEditInputBlur(data: any) {
            console.log('data', data);
            const _node = data?.node;
            const _data = data?.data;
            const _removeBy = data?.removeBy;
            const _labelTem = _data?.labelTem;
            if (_labelTem) {
                _data.isEdit = false;
                _data.label = _labelTem;
                _data.value = _data.index;

            } else {
                _removeBy?.(_node);
            }
        },

        addEditTree(type: string, data: any) {
            console.log(type, data)
            const _data = data?.data;
            const _node = data?.node;
            const _removeBy = data?.removeBy;
            console.log('this.treeNodeKey _removeBy', _removeBy)
            if (type === 'add') {
                _node.expanded = true;
                const _children = _data?.children;
                let _index: string = _data?.index;
                const _childrenIndex = _children?.length || 0
                _index = `${_index}-${_childrenIndex}`

                const _childrenData: { [n: string]: any } = {
                    isEdit: true,
                    labelTem: "",
                    index: _index,

                }
                if (_children?.length > 0) {
                    _children.splice(0, 0, _childrenData)
                } else {
                    _data.children = [
                        _childrenData
                    ]
                }

                setTimeout(() => {
                }, 10)
            }
            if (type === 'edit') {
                _data.isEdit = true;
                _data.labelTem = _data.label;
            }
            if(type === 'delete'){
                console.log('delete')

                // 等接口 更换成接口
                _removeBy?.(_node);

            }



        },


        //  打开弹框
        showAsideTreeAddEditDialog(type: string, data: any = {}) {
            const _isHave = this.appStore.isHaveRole(['base-admin'])
            if (!_isHave) {
                return this.globalStore.message({message: '没有权限', type: "error"});
            }
            this.addEditDialogData?.formRef?.clearValidate();

            console.log('showAsideTreeAddEditDialog-data', data)
            let _data: any = data?.data;
            if (type == 'add') {
                this.addEditDialogData.title = '添加部门'
                this.addEditDialogData.type = 'add'
                // console.log('treeList', this.treeList);
                _data = {};
                _data.parentOrgId = this.treeList?.[0]?.['id'] || ''
                _data.parentOrgName = this.treeList?.[0]?.['name'] || ''
            }

            if (type == 'addChildren') {
                this.addEditDialogData.title = '添加子部门'
                this.addEditDialogData.type = 'addChildren'
                const _parentId = _data.id;
                const _parentName = _data.name;
                _data = {};
                _data.parentOrgId = _parentId
                _data.parentOrgName = _parentName
            }
            if (type == 'edit') {
                this.addEditDialogData.title = '编辑部门'
                this.addEditDialogData.type = 'edit'
                _data.parentOrgName = _data.parentName
            }


            _data?.extendDataValueDtoList?.map((item: any) => {
                console.log(item);
                if (item?.fieldId) {
                    _data[item?.fieldId] = item.value;
                }
            })

            this.addEditDialogData.details = _data;
            // this.addEditDialogData.formData = _data;
            console.log('showAsideTreeAddEditDialog-details', this.addEditDialogData.details)


            // this.setFormListData('addEditDialog', _data)
            this.addEditDialogData.isLoading = false;
            this.addEditDialogData.isShow = true;

        },


        setFormListData(type: string, data: any = {}) {
            // console.log('setFormListData', data);
            // console.log('addEditDialogFormListByField', this.addEditDialogFormListByField)

            const _data = data;
            const _formData = _data
            // let _formList = []
            if (type == 'current') {
                this.addEditDialogData.details = _formData || {};
                // _formList = this.currentData.formList
            }


            // _formList?.map((item: any) => {
            //     // console.log(item.name, formKeyMap?.[item?.key])
            //     // console.log(formKeyMap, item.key, _formData)
            //     item.value = "";
            //     formKeyMap?.[item?.key] && (item.value = _formData?.[formKeyMap?.[item?.key]])
            // })
            //
            // console.log('_formList', _formList)
            //
            // this.addEditDialogData?.formRef?.setLinkage()
            // this.addEditDialogData.isLoading = false;
        },

        setCurrentData(data: any) {
            // console.log('current',data)
            this.setFormListData('current', data);

        },


        // section getSendData
        getSendData() {

            const _details = this.addEditDialogData.details
            console.log('_details', _details)
            const _formData: any = this.addEditDialogData.formRef.getFormData();
            const _type: any = this.addEditDialogData.type;
            const _fieldsData: any = this.fieldsData.data
            const _sendData: any = {
                orgCode: "",
                orgName: "",
                sort: "",
                brief: "",


                orgType: "",
                orgIcon: "",

                customFields: [],
            }


            if (_type == 'add' || _type == 'addChildren') {
                _sendData.parentOrgId = "";
            }

            if (_type == 'edit' || _type == 'addChildren') {
                _sendData.id = this.addEditDialogData.details.id;
            }
            //  根据formKey自动赋值
            // const sendFormKeyMap = this.utilStore.swapKeysAndValues(formKeyMap)
            Object.keys(_sendData).map((key: string) => {
                if (key == 'id') return false;
                _sendData[key] = _formData[key]
            })
            _sendData.customFields = [];


            _fieldsData?.map((item: any) => {
                console.log(item);
                const _item = item;
                // 非系统字段
                if (_item.source === 1) {
                    const _customFieldItem: any = {
                        extendFieldId: _item.id,
                        value: _formData[_item.id] || ""
                    }
                    _sendData.customFields.push(_customFieldItem)
                }
            })


            _sendData.parentOrgId = _details?.parentOrgId;
            _sendData.parentOrgName = _details?.parentOrgName;


            // console.log('sendFormKeyMap', sendFormKeyMap)
            // console.log('_formData', _formData);
            // console.log('_sendData',_sendData);

            return _sendData;
        },

        addEditData(data = {}) {
            console.log('this.addEditDialogData.formData', this.addEditDialogData.formData)
            console.log('getFormData', this.addEditDialogData.formRef?.getFormData());
            console.log('this.fieldsData', this.fieldsData.data)

            // addEditDialogStore.addEditDialogData.isShow = false;
            this.addEditDialogData.formRef?.validate((valid: boolean) => {
                // console.log("valid", valid);
                const _sendData = this.getSendData()
                console.log('_sendData', _sendData)
                if (valid) {

                    if (this.addEditDialogData.type === "add" || this.addEditDialogData.type === "addChildren") {
                        this.addData(_sendData);
                    } else {
                        this.editData(_sendData);
                    }
                }


            });

        },
        addData(data: object) {
            const _data = data;
            const _API = async () => Object({success: true, message: '删除成功'})
            this.APIStore.setDataAPI(_API, _data, '', this.addEditDialogData, this.getTreeList).then((res: any) => {
                // console.log('res',res);
                // 同步选项里的options
                // optionsStore.getLocationOptions(true).then();
            })
        },
        editData(data: object) {
            const _data = data;
            // console.log("修改");
            const _API = async () => Object({success: true, message: '删除成功'})
            this.APIStore.setDataAPI(_API, _data, '', this.addEditDialogData, this.getTreeList).then((res: any) => {
                // console.log('res',res);
                // 同步选项里的options
                // optionsStore.getLocationOptions(true).then();
            })
        },
        deleteAsideTreeData(data: any) {
            const _isHave = this.appStore.isHaveRole(['base-admin'])
            if (!_isHave) {
                return this.globalStore.message({message: '没有权限', type: "error"});
            }
            console.log('data', data)
            const _data = data.data;
            const _id = _data.id;
            const _boxMessage = `是否删除部门 ${_data?.name}`;
            const _config = {
                boxMessage: _boxMessage, // 不填默认为 是否删除当前
                // message : '删除成功'  // 不填默认为删除成功
            }

            const _API = async () => Object({success: true, message: '删除成功'})

            this.APIStore.deleteDataAPI(_API, _id, _config, this.getTreeList)
        },

        // 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。
        // type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
        allowDrop(draggingNode: Node, dropNode: Node, type: typeof AllowDropType) {
            // console.log('allowDrop-draggingNode', draggingNode)
            // console.log('allowDrop-dropNode', dropNode)
            // console.log('allowDrop-type', type)


            const _type: any = type;
            // 当前拖拽
            const _draggingNode: any = draggingNode;
            const _draggingNodeData = _draggingNode?.data || {};
            // 拖拽释放目标
            const _dropNode: any = dropNode;
            const _dropNodeData = _dropNode?.data || {}
            // 只能同层拖放
            if (_draggingNodeData?.parentId !== _dropNodeData.parentId) {
                return false;
            }
            if (_type == 'inner') {
                return false;
            }


            // return false;
            return true
        },
        // 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
        allowDrag(draggingNode: Node) {
            // console.log('allowDrag-draggingNode', draggingNode)
            const _data: any = draggingNode;
            const _parent = _data?.parent || {}
            if (!(_parent?.id > 0)) {
                return false;
            }
            return true;
        },
        // 拖拽成功完成时触发的事件
        // 共四个参数，依次为：
        // 被拖拽节点对应的 Node、
        // 结束拖拽时最后进入的节点、
        // 被拖拽节点的放置位置（before、after、inner）、
        // event
        nodeDrop(draggingNode: Node, dropNode: Node, dropType: typeof NodeDropType, ev: typeof DragEvents) {

            console.log('tree drop:', dropNode, dropType)

            // 拖拽释放目标
            const _data: any = dropNode;
            const _parent = _data?.parent?.data || {}
            console.log('tree _parent:', _parent)

            const _list: any[] = []
            _parent?.children?.map((item: any) => {
                _list?.push(item.id)
            })
            console.log(_list)
            _list?.length > 0 && this.changeSort(_list)


        },
        changeSort(list: []) {
            const _list = list;
            // changeSortAPI(_list).then(res=>{
            //     console.log(res);
            // })

            const _API = async () => Object({success: true, message: '修改成功'})
            this.APIStore.setDataAPI(_API, _list, '顺序调整成功', {}, this.getTreeList).then((res: any) => {
                // console.log('res',res);
                // 同步选项里的options
                // optionsStore.getLocationOptions(true).then();
            })

        },


//         getCurrentData() {
//             const _data: any = this.getCurrentNode();
//             const _node: any = this.getNode(_data);
//             const _currentData: { [n: string]: any } = {data: _data, node: _node}
//             return _currentData;
//         },
//         emitsOnCurrentChange() {
//             const _currentData = this.getCurrentData()
//             console.log('_currentData', _currentData)
//             // this.treeNodeKey = _treeNodeKey;
//             // const _id:any = _currentData?.data?.[this.treeNodeKey]
//             // this.treeCurrent = _id;
//             // this.setCurrentKey(this.treeCurrent)
//
//             this.emits("onCurrentChange", _currentData);
//
//         },
//
//
//         setCurrentKey(id: any) {
//             // console.log('setCurrentKey', this.treeRef?.setCurrentKey, this.props.treeNodeKey, id);
//             this.treeRef?.setCurrentKey?.(id, true);
//         },
//         setCurrentNode(node: any) {
//             this.treeRef?.setCurrentNode?.(node, true);
//
//         },
//         setCheckedKeys(id: string | number | undefined) {
//             this.treeRef?.setCheckedKeys?.([id], false);
//         },
//
// //    let _leafKeys  this.treeRef?.getCheckedKeys(true,false);
// // let _leafNodes  this.treeRef?.getCheckedNodes(true);
//         getCheckedKeys(leafOnly: boolean) {
//             // (leafOnly) 接收一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
//             return this.treeRef?.getCheckedKeys?.(leafOnly) ? this.treeRef?.getCheckedKeys?.(leafOnly) : [];
//         },
//         getCheckedNodes(leafOnly: boolean, includeHalfChecked?: boolean | undefined) {
//             //(leafOnly, includeHalfChecked) 接收两个布尔类型参数:
//             // 1. 默认值为 false. 若参数为 true, 它将返回当前选中节点的子节点
//             // 2. 默认值为 false. 如果参数为 true, 返回值包含半选中节点数据
//             return this.treeRef?.getCheckedNodes?.(leafOnly, includeHalfChecked);
//         },
//
//         getCurrentKey() {
//             return this.treeRef?.getCurrentKey?.();
//         },
//         getCurrentNode() {
//             return this.treeRef?.getCurrentNode?.();
//         },
//
//         // 根据 data 或者 key 拿到 Tree 组件中的 node
//         getNode(key: any) {
//             return this.treeRef?.getNode?.(key);
//         },
//
//         removeBy(data: any) {
//             // remove	删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性	(data) 要删除的节点的 data 或者 node 对象
//             return this.treeRef?.remove?.(data);
//         },


        // 当路由切换的时候
        onRouteChange(route: any) {
            // console.log('route', route)
            // console.log(this.filter.formList?.[0])
            // if (this.filter.formList?.[0]?.formType) {
            //     this.filter.formList[0].value = '';
            // }

        },


    },
});
