
// const appConfig = {
//   systemCode :"",
// }

import appConfig from "@/config"
import {useWuJieStore} from "@/store/modules/wuJie";

const local:{[n:string]:any} = {
  systemCode: appConfig.systemCode+'-',
  getCurrentTimeStamp: function () {
    // @ts-ignore
    return Date.parse(new Date());
  },
  // 过期时间毫秒计算
  setStorage: function (key: any, value: any, duration: any) {
    const _key = this.systemCode + key;
    const data = {
      value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration),
    };
    // console.log(data);
    localStorage[_key] = JSON.stringify(data);
  },
  getStorage: function (key:any) {
    const _key = this.systemCode + key;
    const data = localStorage[_key];
    if (!data || data === "null") {
      return null;
    }
    const now = this.getCurrentTimeStamp();
    let obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }

    if(!obj.expiryTime && obj.expiryTime !== 0){
      return obj
    }

    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj?.value  ;
    }

    return null;
  },
  removeStorage: function (key:any) {
    const _key = this.systemCode + key;
    // console.log(key);
    // console.log(localStorage[key])
    window.localStorage.removeItem(_key);
  },

  setUserToken: function (data: any, duration: any) {
    const _key = this.systemCode + '_userToken';
    this.setStorage(_key, data, duration);
  },
  getUserToken: function () {
    const _key = this.systemCode + '_userToken';

    return this.getStorage(_key);
  },
  removeUserToken: function () {
    const _key = this.systemCode + '_userToken';
    this.removeStorage(_key);
  },

  setUserInfo: function (data: any, duration: any) {
    const _key = this.systemCode + '_userInfo';
    this.setStorage(_key, data, duration);
  },
  getUserInfo: function () {
    const _key = this.systemCode + '_userInfo';
    return this.getStorage(_key);
  },
  removeUserInfo: function () {
    const _key = this.systemCode + '_userInfo';
    this.removeStorage(_key);
  },

};
export default local;
