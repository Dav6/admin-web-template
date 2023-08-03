<!--
  @Author: 戴伟
  @Date: 2023-04-06 15:02:39
  @FilePath: src\components\pageContainer\asideTree\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->
<template>
  <div class="g-tree-container" v-loading="treeStore.isLoading">

    <div class="g-tree-filter" v-if="isFilter">
      <g-form-model
          :ref="el=>treeStore.setTreeFilterRef(el)"
          :gutter="0" :formList="treeStore.filter.formList"
          @onInputSearch="data=>goTo('onFilterInputSearch',data)"
      ></g-form-model>
      <!--      <el-input v-model="treeStore.filter.value" :placeholder="treeStore.filter.placeholder"/>-->
    </div>
    <!--    <div style="height:40px"></div>-->

    <!--  setCurrentKey(newValue) -->
    <el-tree
        ref="treeRef"
        class="g-tree"
        :indent="0"
        :draggable="treeStore.config.draggable"
        :data="treeList"
        :props="treeProps"
        :expand-on-click-node="expandOnClickNode"
        :default-expanded-keys="treeDefaultExpandedKeys"
        :current-node-key="_treeCurrent"
        @current-change="(data, node) => goTo('currentChange', { data, node })"
        :node-key="treeNodeKey"
        :highlight-current="isHighlightCurrent"
        :show-checkbox="isShowCheckbox"
        @check-change="(item, isChecked, hasChildrenChecked) => goTo('checkChange', { item, isChecked, hasChildrenChecked })  "
        @check="(check, checks) => goTo('onCheck', { check, checks })"
        :filter-node-method="treeStore.filterNode"
        :allow-drop="treeStore.allowDrop"
        :allow-drag="treeStore.allowDrag"
        @node-drop="treeStore.nodeDrop"
    >
      <template #default="{ node, data }">
        <div class="tree-item " :class="{isEdit:data?.isEdit, isShow: true ,isCurrent:node?.isCurrent }">
          <template v-if="!data.isEdit">
            <div class="tree-item-label">
              <g-tooltip
                  style="display:flex"
                  placement="top-start"
                  :content="data.label"
              >
                <span class="tooltip-content">{{ data.label }}</span>
              </g-tooltip>
              <!--            <div class="tree-item-label-text"></div>-->
            </div>

            <!--          <el-button-group class="tree-item-btns">-->
            <!--            <template v-for="(item, index) in treeBtnList" :key="index">-->
            <!--              <el-button-->
            <!--                  text-->
            <!--                  class="tree-item-btn"-->
            <!--                  :icon="item.icon"-->
            <!--                  @click.stop="goTo(item.key, { data, node, item })"-->
            <!--              ></el-button>-->
            <!--            </template>-->
            <!--          </el-button-group>-->
            <template v-if="isEdit">
              <g-button-group
                  class="tree-item-btns"
                  :list="treeBtnList"
                  @onClick="buttonData=>goTo('onButtonClick', { buttonData, data, node,removeBy})"
              >

              </g-button-group>
            </template>



          </template>
          <template v-else>
            <div class="tree-item-input-box" @click.stop="()=>{}">
              <d-el-input
                  v-focus="data"
                  v-model="data.labelTem"
                  @blur="(inputData)=>treeStore.addEditInputBlur({key:'blur',inputData, data, node,removeBy})"
                  @keyup.enter="(inputData)=>treeStore.addEditInputBlur({key:'enter', inputData, data, node,removeBy})"
              ></d-el-input>

            </div>
          </template>


        </div>
      </template>
    </el-tree>
    <!--    @onSuccess="getList"-->

    <add-edit-dialog></add-edit-dialog>
  </div>
</template>

<script setup lang="ts">

// @ts-ignore
// eslint-disable-next-line no-undef
import {debounce, throttle} from "@/utils/tools";

defineOptions({
    name: "g-tree",
    isGlobal: true,
});


import {ref, watch, computed, reactive, nextTick,onActivated, onMounted,onDeactivated, toRefs} from "vue";

import AddEditDialog from "./components/addEditDialog/index.vue";

import {useRoute} from "vue-router";
import {useTreeStore} from "./store/index";

const treeStore = useTreeStore();

// console.log("treeStore", treeStore);

const props: any = defineProps({


    isOrganizationTree: {
        type: [Boolean],
    },

    isFilter: {
        type: [Boolean],
    },

    treeNodeKey: {
        type: [String],
    },
    treeCurrent: {
        type: [String, Number],
    },
    // 是否在点击节点的时候展开或者收缩节点，
    // 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandOnClickNode:{
        type:[Boolean],
    },
    treeDefaultExpandedKeys: {
        type: [Array],
    },
    treeProps: {
        type: Object,
        default: () => {
            return {
                // label: "name",
            };
        },
    },
    treeList: {
        type: [Array],
    },
    isTreeLoading: {
        type: [Boolean],
    },
    isShowCheckbox: {
        type: [Boolean],
    },
    isHighlightCurrent: {
        type: [Boolean],
        default: true,
    },
    isEdit:{
        type:[Boolean]
    }
});

const emits: any = defineEmits(["onClick", "onCurrentChange", "onCheck"]);
treeStore.props = props;
treeStore.emits = emits;

const treeRef = ref();

const _treeCurrent = ref(props.treeCurrent);

const route = useRoute();

const onTreeListChange = (treeList: any[]) => {
    // console.log('%c g-tree-onTreeListChange-----treeList 改变','color:red')

    const _currentKey = getCurrentKey()
    const _currentNode = getCurrentNode()

    // console.log('_currentKey', _currentKey)
    // _treeStore.setCurrentKey(null)
    const _isHave = treeStore.isInTreeListByKey(treeList, _currentKey);
    // console.log('_isHave', _isHave)
    if (_isHave) {
        setTimeout(() => {

            setCurrentKey(null)
            setCurrentKey(_currentKey)
        }, 10)
    } else {
        setTimeout(() => {
            setCurrentKey(null)
            setCurrentKey(_treeCurrent.value)
        }, 10)

    }


};




watch(() => props.treeList, (treeList,preTreeList) => {

    onTreeListChange(treeList)

}, {
    deep: true,
});

watch(() => props.isTreeLoading, (isTreeLoading) => {
    treeStore.isLoading = isTreeLoading ? isTreeLoading : false;
}, {
    deep: true
});
watch(()=>props.treeCurrent ,(treeCurrent)=>{
    _treeCurrent.value = treeCurrent;
},{
    deep:true
})



const treeBtnList = [

    {
        // label: "编辑",
        // icon: "EditPen",
        class: "tree-item-btn zr-iconfont zr-edit",
        key: "edit",
    },
    {
        // label: "删除",
        // icon: "Remove",
        key: "delete",
        class: "tree-item-btn zr-iconfont zr-sub",
    },
    {
        // label: "添加",
        // type: "dropdown",
        // icon: "CirclePlus",
        key: "add",
        class: "tree-item-btn zr-iconfont zr-add",
    },
    // {
    //     name: "添加",
    //     type: "dropdown",
    //     trigger: "hover", // hover/click/contextmenu
    //     placement: "bottom-start",
    //     teleported: true,//top/top-start/top-end/bottom/bottom-start/bottom-end
    //     class:"dropdown-button",
    //     list: [
    //         {
    //             name: "添加同级",
    //             key: "edit",
    //             class:"edit",
    //         },
    //         {
    //             name: "添加子级",
    //             key: "delete",
    //             class:"delete",
    //         },
    //
    //     ]
    // }
];
// zr-iconfont zr-add

// section goTo
const goTo = (key: string, data: any) => {
    // console.log(key, data);
    // console.log('current',current.value)
    // console.log(key.indexOf('treeBtn-'));

    if (key == 'onFilterInputSearch') {
        treeStore.filterTree()
    }

    if (key == 'onButtonClick') {
        const _buttonData = data?.buttonData;
        const _buttonKey = _buttonData?.key;
        const _treeData = data?.data;
        const _node = data?.node;
        const _removeBy = data?.removeBy;
        treeStore.addEditTree(_buttonKey, {data: _treeData, node: _node,removeBy:_removeBy})


    }


    if (key == 'add' || key == 'edit') {

        let _type = ''
        if (key == 'add') {
            _type = 'addChildren'
        }
        if (key == 'edit') {
            _type = 'edit'
        }
        let _data = data;
        treeStore.showAsideTreeAddEditDialog(_type, _data);
    }
    if (key == 'delete') {
        let _data = data;
        treeStore.deleteAsideTreeData(_data)
    }


    // 自定义 按钮的 事件
    // if (key.indexOf("treeBtn-") == 0) {
    //   emits("onClick", {key: data.item.key, data});
    // }

    // section goTo  节点选中currentChange
    if (key == "currentChange") {
        // console.log('_key',key)
        // console.log('_data',data)
        emitsOnCurrentChange()




    }

    if (key == "checkChange") {
        // console.log(key,data);
    }
    if (key == "onCheck") {
        // console.log(key, data);
        let _leafKeys = getCheckedKeys(true);
        let _leafNodes = getCheckedNodes(true);
        emits("onCheck", {...data, leafKeys: _leafKeys, leafNodes: _leafNodes});
    }

    // if (key == 'add' || key == 'relevance' || key == 'edit' || key == 'delete') {
    //   emits('onClick', {key, data});
    //
    // }
} ;












const getCurrentData = () => {
    const _data: any = getCurrentNode();
    const _node: any = getNode(_data);
    const _currentData: { [n: string]: any } = {data: _data, node: _node}
    return _currentData;
};


//
const emitsOnCurrentChange = debounce( () => {
    const _currentData = getCurrentData()
    // console.log('_currentData', _currentData)
    // this.treeNodeKey = _treeNodeKey;
    // const _id:any = _currentData?.data?.[this.treeNodeKey]
    // this.treeCurrent = _id;
    // this.setCurrentKey(this.treeCurrent)

    emits("onCurrentChange", _currentData);

} ,100)


const setCurrentKey = (id: any) => {
    // console.log('setCurrentKey', treeRef?.value?.setCurrentKey, this.props.treeNodeKey, id);
    treeRef?.value?.setCurrentKey?.(id, true);
};
const setCurrentNode = (node: any) => {
    treeRef?.value?.setCurrentNode?.(node, true);

};
const setCheckedKeys = (id: string | number | undefined) => {
    treeRef?.value?.setCheckedKeys?.([id], false);
};

//    let _leafKeys  treeRef?.value?.getCheckedKeys(true,false);
// let _leafNodes  treeRef?.value?.getCheckedNodes(true);
const getCheckedKeys = (leafOnly: boolean) => {
    // (leafOnly) 接收一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
    return treeRef?.value?.getCheckedKeys?.(leafOnly) ? treeRef?.value?.getCheckedKeys?.(leafOnly) : [];
};
const getCheckedNodes = (leafOnly: boolean, includeHalfChecked?: boolean | undefined) => {
    //(leafOnly, includeHalfChecked) 接收两个布尔类型参数:
    // 1. 默认值为 false. 若参数为 true, 它将返回当前选中节点的子节点
    // 2. 默认值为 false. 如果参数为 true, 返回值包含半选中节点数据
    return treeRef?.value?.getCheckedNodes?.(leafOnly, includeHalfChecked);
};

const getCurrentKey = () => {
    return treeRef?.value?.getCurrentKey?.();
};
const getCurrentNode = () => {
    return treeRef?.value?.getCurrentNode?.();
};

// 根据 data 或者 key 拿到 Tree 组件中的 node
const getNode = (key: any) => {
    return treeRef?.value?.getNode?.(key);
};

const removeBy = (data: any) => {
    // remove	删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性	(data) 要删除的节点的 data 或者 node 对象
    return treeRef?.value?.remove?.(data);
};




























onMounted(()=>{
    // console.log('%cg-tree-onMounted---------------------------------------','color: yellow')
})

const getRef = (prop)=>{
    return treeStore.treeRef
}
const getStore = ()=>{
    return treeStore
}
defineExpose({
    getRef,
    getStore,
});


// 接口请求方法放这
const init = () => {
    //getList();
    treeStore.init(props)
}

// 统一执行初始化方法
init();

</script>

<style scoped lang="less">
.g-tree-container {
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  //padding-top: 80px;
  position: relative;
  //width: 288px;
  height: 100%;
  background: #fff;
  overflow: auto;
  flex-shrink: 0;
  //margin-right: 10px;
  //background:rgba(4,165,249,0.1);


  /*//滚动条的宽度*/
  //::-webkit-scrollbar {
  //  width: 6px;
  //  height: 6px;
  //}

  ///*//滚动条的滑块*/
  //::-webkit-scrollbar-thumb {
  //  background-color: rgba(144, 147, 153, 0.3);
  //  border-radius: 3px;
  //}


  .g-tree-filter {
    flex-shrink: 0;
    overflow: hidden;
    //position: absolute;
    //top: 40px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    min-height: 45px;
    padding: 24px 20px ;

    //&:first-child {
    //  padding-top: 10px;
    //}
  }


  :deep(.g-tree) {
    --el-tree-node-hover-bg-color: rgba(72, 134, 255, 0.1);
    --el-color-primary-light-9: transparent;
    --el-tree-node-current-bg: rgba(72, 134, 255, 0.1);
    --el-tree-node-icon-width: 16px;
    --el-tree-node-border-left: 1px dashed rgba(72, 134, 255, 0.5);
    --el-tree-node__content-height: 40px;
    --el-tree-transition: all 0.2s ease-in-out;
    padding: 0 0 12px 16px;
    //width: 100%;
    flex: 1;
    overflow-y: auto;
    background: transparent;


    // 左边虚线部分 ↓↓↓↓↓↓↓↓↓↓↓↓
    .el-tree-node {
      padding-left: 24px;
      position: relative;

      &:before {
        content: '';
        height: calc(100%);
        //width: 1px;
        position: absolute;
        left: calc(24px + var(--el-tree-node-icon-width) / 2);
        top: 0;
        border-left: var(--el-tree-node-border-left);

      }

      &:first-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(var(--el-tree-node__content-height) / 2);
      }

      &:last-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(0 + var(--el-tree-node__content-height) / 1);
      }

      &:only-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(0 + var(--el-tree-node__content-height) / 1);
        opacity: 0;
      }

      .el-tree-node__content {
        //overflow: hidden;


      }


      .el-tree-node__content {
        position: relative;
        height: var(--el-tree-node__content-height);

        .el-icon.el-tree-node__expand-icon {
          flex-shrink: 0;
          width: var(--el-tree-node-icon-width);
          height: var(--el-tree-node-icon-width);
          background: #4886FF;
          border-radius: 2px;
          box-sizing: border-box;
          position: relative;
          transform: unset;

          svg {
            display: none;
          }

          &:before {
            transition: var(--el-tree-transition);
            content: " ";
            display: block;
            width: 10px;
            height: 2px;
            background: #FFFFFF;
            position: absolute;
            top: calc(50% - 1px);
            left: calc(50% - 5px);
            transform: rotate(0);
          }

          &:after {
            transition: var(--el-tree-transition);
            content: " ";
            display: block;
            width: 2px;
            height: 10px;
            background: #FFFFFF;
            position: absolute;
            top: calc(50% - 5px);
            left: calc(50% - 1px);
            transform: rotate(0);
          }

          &.is-leaf {
            //opacity: 0;
            opacity: 0.5;
            cursor: not-allowed;
          }

          &.expanded {
            &:before {
              transform: rotate(-180deg)
            }

            &:after {
              transform: rotate(90deg);
            }
          }
        }
      }


    }

    // 去掉最外层最后一个 多余的部分
    > .el-tree-node {

      &:before {
        opacity: 0;
      }

    }

    // 左边虚线部分 ↑↑↑↑↑↑↑↑↑↑


    .tree-item {
      //width: 100%;
      display: flex;
      align-items: center;
      flex: 1;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
      line-height: 1;
      padding-left: 8px;
      padding-right: 20px;
      position: relative;
      //&:before{
      //  position: absolute;
      //  content:" ";
      //  display: block;
      //  height:100%;
      //  border-left: 2px solid rgba(72,134,255,0.5);
      //  left:0;
      //  top:0;
      //}
      &.isEdit {
        padding-left: 24px;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }


      .tree-item-label {
        display: flex;
        align-items: center;
        //flex: 1;
        height: 100%;
        padding-right: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6C6E73;

        .tooltip-default {
          padding: 0;
          height: unset;
          transition: var(--el-tree-transition);
        }

        .tree-item-label-text {
        }
      }

      .tree-item-btns {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        transition: var(--el-tree-transition);

        pointer-events: none;
        overflow: hidden;
        width: 0;
        opacity: 0;
        transform: scale(0);
        transform-origin: left;
        //&.isShow {
        //  width: auto;
        //  opacity: 1;
        //  pointer-events: auto;
        //}


        .tree-item-btn {
          border: 0;
          background-color: transparent;
          padding: 0 5px;
          margin: 0;
          //color:#4f6d95;
          color: #12294d;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          min-width: 0;

          &:hover {
            color: #4886FF;

          }
        }
      }

      .tree-item-input-box {
        position: absolute;
        width: 100%;
        padding-left: 24px;
        padding-right: 20px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);


      }


    }


    .tree-item {
      &:hover {
        .tree-item-btns {
          width: auto;
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);

        }
      }
    }

    .tree-item {
      &.isCurrent {


        .tooltip-default {
          padding: 3px 20px 3px 4px;
          background: var(--el-tree-node-current-bg);

          border-radius: 4px;
        }


      }


    }


  }


}

</style>
