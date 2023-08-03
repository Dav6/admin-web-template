<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\deviceEdit\components\header\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->

<template>
  <g-folder :isFold="false">

    <g-form-model
        class="headerStore-form-list"
        :ref="el=>headerStore.setListQueryFormRef(el)"
        labelPosition="right"
        labelWidth="5em"
        :formList="queryData.formList"
        :formData="queryData.formData"
        :buttonList="queryData.buttonList"
        :isButtonsRow="true"
        @onFormItemButtonClick=" (data:any) => goTo('onFormItemButtonClick', data)   "
        @onClick="(data:any) => goTo('onClick', data)"
        @onSubmit="(data:any) => goTo('onSubmit', data)"
        @onInputSearch="data=>goTo('onInputSearch',data)"

    >



    </g-form-model>


    <div class="container-top">

      <div class="container-top-left">
        <d-el-button class="default-width" type="primary" @click="goTo('add')">+添加</d-el-button>


      </div>
      <div class="container-top-right">
        <d-el-button class="default-width" type="primary" plain @click="goTo('goToPage')">跳转</d-el-button>

      </div>
    </div>

    <template #expand>

    </template>
  </g-folder>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed
} from "vue";

const emits = defineEmits([]);

const isShowFilter = ref<boolean>(true);
// import {} from "../options";
import {useHeaderStore} from "./store/index"

const headerStore = useHeaderStore()
const queryData = computed(() => headerStore.queryData);
const goTo = (key: string, data?: any) => {
  console.log(key, data);

  const _key:string = key;
  const _data:any = data;


    if (key == "onFormItemButtonClick" || key == "onInputSearch") {
        let _bKey = data?.bItem?.key;


        headerStore.setListQuery(_bKey)


    }




  if(_key === 'onClick'){
    const _formClickKey = _data?.key;
      if(_formClickKey === 'add'){
          headerStore.openDialog('tree',{})

      }

  }



  if (_key == "add") {
    // deviceEditStore.addEditDialogData.isShow = true;
    // deviceEditStore.addEditDialogData.type = "add";

      headerStore.openDialog('addEdit',{})
    // addEditDialogStore.openCloseDialog(true, 'add', {})
  }
  if(_key == 'goToPage'){
      headerStore.goToPage()
  }


};

const init = ()=>{
    headerStore.init();
}
init()

</script>

<style scoped lang="less">
.container-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
}
</style>
