/*
  @Author: 戴伟
  @Date: 2023-01-30 09:24:28
  @FilePath: src\directives\modules\resize.js  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
*/

import { useElementSize, debouncedWatch } from "@vueuse/core";
const _resize = (el:any, binding:any) => {
  const { width } = useElementSize(el);
  // console.log(width);
  if (width.value === 0) return;
  const { value } = binding;
  debouncedWatch(
    width,
    () => {
      value && value.resize();
    },
    { debounce: 500 }
  );
};
export const resize = _resize;
