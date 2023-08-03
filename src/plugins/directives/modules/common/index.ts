/*
  @Author: 戴伟
  @Date: 2023-06-13 10:41:10
  @FilePath: src\plugins\directives\modules\common\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/

import { useFocus } from '@vueuse/core'

const _focus = (el:any,binding:any) =>{

    let _el:any = el;
    //  el-input el-input--default form-input
    if(el.className?.indexOf('el-input')>-1 && el.className?.indexOf('el-input--default') > -1 ){
        _el = el.children?.[0]?.children?.[0];
    }
    useFocus(_el, { initialValue: true })



}
export const focus = _focus;
