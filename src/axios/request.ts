
import axios from "axios";
import {ElMessage, ElMessageBox, ElLoading} from "element-plus";

// import store from "@/store/index";
// import {getToken} from '@/utils/auth' ;

import {systemCode} from '@/config'


import {useWuJieStore} from "@/store/modules/wuJie";
import {useAppStore} from "@/store/modules/app"
// import {SET_TOKEN} from "@/store/modules/app/type";

// import

/*
    SUCCESS(200, "操作成功"),
    FAILED(500, "操作失败"),
    VALIDATE_FAILED(404, "参数检验失败"),
    UNAUTHORIZED(401, "暂未登录或token已经过期"),
    FORBIDDEN(403, "没有相关权限");
 */

// 创建axios实例
const service = axios.create({
  // baseURL: import.meta.env.VUE_APP_BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
});

// const openFullScreen2 = () => {
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 2000)
// }
// openFullScreen2()
// console.log(import.meta.env)

service.defaults.headers.get["contentType"] =  "application/x-www-form-urlencoded";
service.defaults.headers.post["contentType"] = "application/json";
service.defaults.headers.put["contentType"] = "application/json";
service.defaults.headers.delete["contentType"] = "application/json";
service.defaults.headers.common["Accept-Language"] = "zh-CN,zh;q=0.9";

let isNeedGoLogin = false;

const elMessages:any[] = [];

const showMessage = (message:string) => {
  const _message:string = message;
  let _index = elMessages.findIndex((item) => item.message == _message);
  // console.log('_index',_index);

  if (_index > -1) {
    elMessages[_index]["mesEl"].close();
    elMessages.splice(_index, 1);
  }

  // console.log(elMessages);

  const mesEl:any = ElMessage({
    showClose: true,
    message: _message,
    type: "error",
    duration: 3 * 1000,
    onClose: () => {
      // console.log('elMessages')
      // console.log(_message,elMessages)
      _index = elMessages.findIndex((item) => item.message == _message);
      elMessages.splice(_index, 1);
    },
  });
  _index = elMessages.findIndex((item) => item.message == _message);
  // mesEl.close();
  if (!(_index > -1)) {
    elMessages.push({
      message: _message,
      mesEl,
    });
  }
};

// request拦截器
service.interceptors.request.use(
  (config:any) => {
    // console.log(config);
    // config.data = config.data;
    // console.log('request拦截器config',config);

    if (config.data) {
      // console.log(JSON.parse(config.data))
    }
    // console.log(JSON.parse(config.data))
    // console.log('import.meta.env.NODE_ENV',import.meta.env.MODE)
    if (
      import.meta.env.NODE_ENV == "development" ||
      import.meta.env.MODE == "development"
    ) {
      // 设置了代理 就不能设置baseURL
      config.baseURL = "";
    }
    // config.headers['Authorization'] = '123123' // 让每个请求携带自定义token 请根据实际情况自行修改
    // console.log('request拦截器-token', localStorage.getUserToken(),);
    const appStore = useAppStore()
    // const wuJieStore = useWuJieStore()

    if (appStore.token) {
      let _token = appStore.token;
      _token = _token ? `Bearer ${_token}` : "";
      // console.log('request-_token',_token)
      config.headers["Authorization"] = _token;
    }


    config.headers["systemCode"] = systemCode;

    // if (config.method === 'post' || config.method === 'put') {
    //   // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    //   config.data = JSON.stringify(config.data)
    // }
    // config.headers['Authorization'] = localStorage.getUserToken() ? localStorage.getUserToken() : 'asd123';

    // if (store.getters.token) {
    //   // console.log(config,config.headers['Authorization'],'-----config.headers')
    // }
    // console.log(config);

    return config;
  },
  (error:any) => {
    // Do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response:any) => {
    // console.log("success", response); // for debug

    /**
     * code为非 0000000 是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    // console.log(response);
    if (response.config.responseType === "blob") return response;

    if (response.config.url == "/api/storage/v1/bucket/putBucket")
      return response;

    if (res.code == "0000000" || res?.success) {
      return {headers: response.headers, ...res};
    } else {
      // store.dispatch('storeGlobal/mineMessage', {
      //     message: res.message,
      //     type: 'error',
      // })
      if(res.code === '1000009') {
        const wuJieStore :any = useWuJieStore()
        console.log('wuJieStore',wuJieStore)
        if (!isNeedGoLogin) {
          isNeedGoLogin = true;
          let message = `你已被登出，可以取消继续留在该页面，或者重新登录`;
          if (res.code == "1002002") {
            message = `登录失效是否重新登录`;
          }

          ElMessageBox.confirm(message, "提示", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            showCancelButton: false,
            showClose:false,
            draggable: true,
          }).then(() => {
            wuJieStore?.logOut()
            // router.replace({path: "/login"});
            //
            // setTimeout(() => {
            //   // 第一次加载 如果token失效 不会挂载app ，跳转到登录后需要重新刷新一下
            //   location.reload();
            // }, 50);
          })
            .catch(() => {
            })
            .finally(() => {
              // console.log("不管点啥都");
              isNeedGoLogin = false;
            });
        }
      }




      // 1002001:未登录;
      // 1002002: token已失效！
      if (res.code == "1002001" || res.code == "1002002") {
        // localStorage.setUserToken('')


        if (!isNeedGoLogin) {
          isNeedGoLogin = true;
          let message = `你已被登出，可以取消继续留在该页面，或者重新登录`;
          if (res.code == "1002002") {
            message = `登录失效是否重新登录`;
          }

          ElMessageBox.confirm(message, "提示", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            showCancelButton: false,
            draggable: true,
          }).then(() => {
              // router.replace({path: "/login"});
              //
              // setTimeout(() => {
              //   // 第一次加载 如果token失效 不会挂载app ，跳转到登录后需要重新刷新一下
              //   location.reload();
              // }, 50);
            })
            .catch(() => {
            })
            .finally(() => {
              // console.log("不管点啥都");
              isNeedGoLogin = false;
            });
        }
      }

      // // 403: 没有权限
      // if (res.code === 403 || res.code == -1) {
      //   console.log(res);
      //
      //   // router.replace({path:'/home'})
      //   // MessageBox.confirm('暂无权限，可以取消继续留在该页面，或者跳到首页', '提示', {
      //   //     confirmButtonText: '跳转',
      //   //     cancelButtonText: '取消',
      //   //     type: 'warning'
      //   // }).then(() => {
      //   //     router.replace({path:'/home'})
      //   //
      //   //     // store.dispatch('FedLogOut').then(() => {
      //   //     //     router.replace({path:'/login'})
      //   //     //     // location.reload()// 为了重新实例化vue-router对象 避免bug
      //   //     // })
      //   // })
      //
      // }

      // Message({
      //   message: res.message ? res.message : '接口获取失败',
      //   type: 'error',
      //   duration: 3 * 1000
      // })
      // ElMessage({
      //   showClose: true,
      //   message: res.message || res.msg || "接口获取失败",
      //   type: "error",
      //   duration: 3 * 1000,
      // });
      let _message = res.message || res.msg || "接口获取失败";

      showMessage(_message);

      return Promise.reject(res);
    }
  },
  async (error) => {
    // console.log(Object.keys(error));
    // Object.keys(error).map(item=>{
    //   console.log(item,error[item]);
    // })

    // console.log(error.toJSON()); // for debug
    // console.log("error" + JSON.stringify(error, null, 2)); // for debug
    let _message =
      error?.response?.data?.message ||
      error.message ||
      error.response?.data?.message ||
      error.response?.data?.msg ||
      "接口获取失败";
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      _message = "请求超时，请检查网络再重新连接";
    }

    console.log("_message", _message);

    showMessage(_message);

    return Promise.reject(error);
  }
);

// data axios 正常参数对象
// listQuery 需要修改的请求参数对象，必须是对象 会自动修改total
// const request = (data, listQuery) => {
//   // console.log(listQuery);
//   return new Promise((resolve, reject) => {
//     service(data).then((res:any) => {
//
//         resolve(res);
//       },
//       (err:any) => {
//         reject(err);
//       }
//     );
//   });
// };

export default service;
export const post = (url:any, data:any) => service.post(url, data);
export const get = (url:any, params:any) => service.get(url, {params});
