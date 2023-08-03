# 后台管理模板

```sh
npm install
```
### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# 页面生成
```
/src/router/main/routes.ts
项目会根据此文件自动生成 views 下的页面文件
多人开发时 routes.ts 可以导入当前routes文件夹下的路由
注：不能在routes.ts 文件中使用 带@的路径(别名)，包括导入进来的路由文件

当前routes.ts 中 不需要 写 component ， 其他参数参考示例 
```




## 项目介绍



### 目录介绍
 ```
 /src/config.ts
 项目基础配置 
 title  项目运行 或者打包后 index.html 显示的title
 serverCode  前缀 + 打包到指定目录会用到
 ```

```
/src/styles/index.less
全局css 在这边整体导入

```
 ```
 /src/plugins/
 项目插件
 /src/plugins/index.ts 
 会自动安装当前目录下一层的（@/plugins/*/index.ts）里的 index.ts 插件
 /src/plugins/piniaGlobal/index.ts 
 会自动把 @/store/modules/**/index.ts 下
 export const isGlobal = true;
 所有以index命名的store插件且导出的 isGlobal 参数为true 挂载到全局
 在其他store里使用， 可以通过如 this.utilStore 访问到对应的 全局store
 
 /src/plugins/router/index.ts  
 router.beforeEach 路由切换
 ```
``` 
/src/components/index.ts 

defineOptions({
    name: "page-container",
    isGlobal: true,
});

自动安装当前目录下所有的 isGlobal 为 true的 组件 到项目全局

```


### 插件zr-Components
## 使用方式
### 组件安装方式
#### 1. package.json 加入
```
"dependencies": { 
    "zr-component": "git+http://192.168.10.100:8070/develops/zr-component.git"
},
```
#### 2. 插件安装
```sh
npm cache clean --force
npm install zr-component --force  
```
 