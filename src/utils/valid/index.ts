/*
  @Author: 戴伟
  @Date: 2023-04-23 10:50:58
  @FilePath: src\utils\valid\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/


// 手机号校验
export const validatePhone = (value: any, message?: string, callback?: Function) => {
    let _valid = false;
    const _message = message ? message : '请输入正确的手机号!';
    if (value && !(/^1[3456789]\d{9}$/.test(value))) {
        if (callback) {
           return callback(new Error(_message))
        }
    } else {
        if(callback){
            return callback()
        }
        _valid = true;
    }
    return _valid;
};

// 校验邮箱
export const validateEmail = (value: any, message?: string, callback?: Function) => {
    let _valid = false;
    const _message = message ? message : '请输入正确的邮箱!';
    if (value !== null && value.length > 0 && !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
        if (callback) {
            return callback(new Error(_message))
        }
    } else {
        if(callback){
            return callback()
        }
        _valid = true;
    }
    return _valid;
};


// 身份证验证
export const validateIdCard = (value: any, message?: string, callback?: Function)=>{
    let _valid = false;
    const _message = message ? message : '请输入正确的身份证!';
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$) /
    if(value !== null && !reg.test(value)){
        if (callback) {
            return callback(new Error(_message))
        }
    }else{
        if(callback){
            return callback()
        }
        _valid = true;
    }
    return _valid;

}
