
/*
  @Author: 戴伟
  @Date: 2023-04-03 09:10:33
  @FilePath: src\components\pageContainer\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        导出vue
*/


import exportFile from "@/components/exportFile";

import file from "./index.vue";
const module = exportFile(file);
export default module;
