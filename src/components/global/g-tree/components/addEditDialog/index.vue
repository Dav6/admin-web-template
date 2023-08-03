<!--
  author:
  date: 031 2022/05/31 13:58:00
  file: src\views\ams\alarm\components\detailDrawer.vue
  des:
    do.....
-->

<template>
  <g-dialog
      v-model="isShow"
      :before-close="(done:any) => goTo('close', '')"
      :title="addEditDialogData.title"
      :append-to-body="true"
      width="600px"
  >
    <template #default>
      <div class="dialog-container">
        <g-form-model
            class="dialog-form-model"
            label-width="8em"
            :ref="(el)=>treeStore.addEditDialogData.formRef = el"
            :formList="formList"
            :formData="addEditDialogData.details"

        ></g-form-model>
      </div>
    </template>
    <template #footer v-if="type != 'detail'">
      <el-button @click="goTo('close', '')">取消</el-button>
      <el-button
          type="primary"
          :loading="addEditDialogData.isLoading"
          @click="goTo('confirm', '')"
      >确定
      </el-button
      >
    </template>
  </g-dialog>
</template>

<script setup lang="ts">
import {ref, computed, reactive, watch} from "vue";

import {ElMessageBox} from "element-plus";
import {} from "../../api";
// import {getList as getUserListAPI} from "@/views/sms/user/api";
import dayjs from "dayjs";
// import {pad} from "@/utils/tools.js"
// import { useAppStore } from "@/store/modules/app";
import {useTreeStore} from "../../store/index";

// const store = useStore();
// const appStore = useAppStore();
const treeStore = useTreeStore();

const props = defineProps({
    modelValue: {
        type: [String, Boolean],
    },
    detail: {
        type: [Object],
    },
    type: {
        type: [String],
    },

    unitList: {
        type: [Array],
    },
});
const emits = defineEmits(["update:modelValue", "onSuccess"]);
const addEditFormRef = ref();

const addEditDialogData = computed(() => treeStore.addEditDialogData);
// const formData = computed()

const isShow = computed({
    // 重新定义
    get: () => addEditDialogData.value.isShow,
    set: (value) => (treeStore.addEditDialogData.isShow = false),
});

const formList = computed(() => treeStore.addEditDialogData.formList)

const isLoading = ref(true);
// section formList
// const formList = ref( []);
//
// let _obj = {}
// formList.value.map(item=>{
//   _obj[item.key] = `${item.key} //${item.name}`
// })
// console.log(_obj)

// section keyMap

// section dataFormat
const dataFormat = (data: any) => {
    console.log(treeStore.addEditDialogData.detail);
    isLoading.value = true;
    let _data: any = treeStore.addEditDialogData.detail || {};

    let _type = treeStore.addEditDialogData.type;
    console.log("_type", _type);
    // <!--//"ltr", "rtl", "ttb", "btt"-->

    // if (_type == "add") {
    //   treeStore.addEditDialogData.title = "添加";
    // }
    //
    // if (_type == "edit") {
    //   treeStore.addEditDialogData.title = "编辑";
    // }

    // // console.log(data);
    // formList.value = formList.value.map((item:any) => {
    //   //
    //   item.disabled = false;
    //   // // 为true 的时候隐藏
    //   // item.isHidden = false;
    //   // // 为true 的时候 为文本状态
    //   // item.isText = false;
    //   // // 为true 的时候 rule 失效
    //   // item.isHiddenRulers = false;
    //   // // form列表赋值
    //   // let value = data[keyMap[item.key]];
    //   item.value = _data[item.key] || (item.value == 0 ? item.value : "");
    //
    //   if (item.key == "name") {
    //     if (_type == "add") {
    //       item.value = "";
    //     }
    //   }
    //
    //   if (item.key == "parentName") {
    //     item.disabled = true;
    //     item.isHidden = true;
    //     if (_type == "add") {
    //       item.value = "";
    //       if (_data?.id > 0) {
    //         item.isHidden = false;
    //         item.value = _data.name;
    //       }
    //     }
    //     if (_type == "edit" && _data?.parentId > 0) {
    //       item.isHidden = false;
    //       item.value = _data.parentName;
    //     }
    //   }
    //
    //   return item;
    // });

    // treeStore.addEditDialogData.isLoading = false;
};

// section watch-isShow treeStore.addEditDialogData.isShow,
watch(() => treeStore.addEditDialogData.isShow, async (isShow, preIsShow) => {
        // console.log(isShow);

        // if (isShow) {
        //   // treeStore.addEditDialogData.isLoading = true;
        //   // if (treeStore.addEditDialogData.type == "edit") {
        //   //   // getDetailById(detail);
        //   //   dataFormat && dataFormat({});
        //   // } else {
        //   //   dataFormat && dataFormat({});
        //   // }
        //   setTimeout(() => {
        //     addEditFormRef.value?.clearValidate();
        //   }, 0);
        // }
    },
    {immediate: false, deep: true}
);

const goTo = (key: string, data: any) => {
    if (key == "confirm") {
        // console.log(JSON.parse(JSON.stringify(formList.value)))
        // console.log(addEditFormRef.value?.getRef()?.formModelRef?.validate((valid)=>{}) )
        treeStore.addEditData();
        //
        // console.log(addEditFormRef.value?.getFormData());
        // addEditFormRef.value?.validate((valid:boolean) => {
        //   console.log("valid", valid);
        //   if (valid) {
        //     let _data = addEditFormRef.value?.getFormData();
        //   }
        // });
        //

    }

    if (key == "cancel") {
        addEditFormRef.value?.clearValidate();
        // addEditFormRef.value?.getRef()?.formModelRef.clearValidate();
        // addEditFormRef.value?.formModelRef?.clearValidate();

        setTimeout(() => {
        }, 0);
        // cancel();
    }
    if (key == "close") {
        console.log(key, data);
        cancel();
    }
};

const onSuccess = () => {
    emits("update:modelValue", false);
    emits("onSuccess");
};

//
const cancel = () => {
    // emits('update:modelValue', false);
    treeStore.addEditDialogData.isShow = false;
};

const init = () => {
    // getDeviceList()
};

init();
</script>

<style scoped lang="less">
.dialog-container {
  width: 100%;
  //padding: 24px;
  max-height: 55vh;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;

  .dialog-form-model{
    padding-right: 24px;
  }

}

:deep(.el-form-item--default .el-form-item__label) {
  //height: 32px;
  //line-height: 32px;
}
</style>
