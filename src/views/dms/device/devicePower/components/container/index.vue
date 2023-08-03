<!--
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\devicePower\components\container\index.vue
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
-->

<template>
  <g-table-model
      :list="listData.data"
      :pageData="listQuery"
      :keyList="tableConfig.keyList"
      :option="globalOption"
      :isShowExpand="tableConfig.showConfig.isShowExpand"
      :isShowSelection="tableConfig.showConfig.isShowSelection"
      :isShowIndex="tableConfig.showConfig.isShowIndex"
      :settingsConfig="tableConfig.settingsConfig"
      :sectionButtons="tableConfig.sectionButtons"
      :beforeSwitchChange="containerStore.beforeSwitchChange"

      :filters="globalFiltersOption"
      v-loading="listData.isLoading"

      height="100%"
      @select="(selection, row) => goTo('select', { selection, row })"
      @onSettingsButtonClick="(data) => goTo('onSettingsButtonClick', data)"
      @onSection="data=>goTo('onSection',data)"
      @sortChange="data=>goTo('sortChange',data)"
      @filterChange="(data)=>goTo('filterChange',data)"
  >
    <template #expand="{ data }">
      <!-- {{  images  }} -->
      <div>
        {{ data?.row }}
      </div>
    </template>

    <template #customName="{ data }">
      <!-- {{  images  }} -->
      <div class="table-custom"> {{ data?.row?.customKey }}</div>
    </template>
  </g-table-model>
</template>

<script setup lang="ts">
import {ref, reactive, computed, watch} from "vue";

import {useContainerStore} from "./store/index"

const containerStore = useContainerStore()

const props = defineProps({
    // 配合emits v-model
});
const emits = defineEmits([]);

const listQuery = computed(() => containerStore.listQuery);
const tableConfig = computed(() => containerStore.tableConfig);
const listData = computed(() => containerStore.listData);

const globalFiltersOption = computed(() => containerStore.globalFiltersOption)
const globalOption = computed(() => containerStore.globalOption)

const goTo = (key: string, data: any) => {
    console.log(key, data);
    if (key === "onSettingsButtonClick") {
        // console.log(data?.data.deviceName);
        // devicePowerStore
        let _buttonKey = data?.buttonKey;
        // console.log(_buttonKey);
        if (_buttonKey === "edit") {
            let _data = data?.data;
            containerStore.openDialog('edit', _data)
        }
        if (_buttonKey === "delete") {
            let _data = data?.data;
            containerStore.deleteData(_data)
        }


    }
    if (key == 'onSection') {
        const _bKey = data?.key;
        if(_bKey === 'delete') {
            containerStore.deleteData(data, 'multiple');
        }
        if(_bKey === 'export'){

        }

    }
    if (key == 'sortChange') {
        containerStore.sortChange(data);
    }

    if (key == 'filterChange') {
        containerStore.filterChange(data);

    }
};

// 接口请求方法放这
const init = () => {
    // devicePowerStore.getList(true);
    containerStore.init();
};

// 统一执行初始化方法
init();
</script>

<style scoped lang="less">
.table-custom{
  color:red;
}
</style>
