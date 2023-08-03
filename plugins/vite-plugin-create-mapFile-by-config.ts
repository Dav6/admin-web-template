/*
  @Author: 戴伟
  @Date: 2023-04-17 13:59:31
  @FilePath: plugins\vite-plugin-create-mapFile-by-config.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/


import path from "path";
import fs from "fs";
import dayjs from "dayjs";
// @ts-ignore
import mapKeys from "../src/mapOptions/config";


export default () => {
    let _config: any;
    return {
        name: "createFileByRouter",
        configResolved(resolvedConfig: any) {
            // 存储最终解析的配置
            _config = resolvedConfig;
        },
        apply: "serve",
        // enforce: 'post',
        // 在其他钩子中使用存储的配置
        config(config: any, env: any) {
            // console.log("启动-config",env);
            // console.log(`time ${new Date}`);
        },
        buildStart() {
            // console.log("buildStart", "_config");
            // console.log('mapKeys',mapKeys)
            const _mapKeys = JSON.parse(JSON.stringify(mapKeys))

            _mapKeys?.map((item: ({ [name: string]: any } | string) ) => {
                let _key = "";
                let _name = "";
                let _disabled = false;
                let _options:any = [
                    {
                        label: "测试",
                        value: "测试",
                        language: "",
                    },
                ];
                if(typeof (item) == 'string'){
                    _key = item;
                }
                if(typeof (item) == 'object'){
                    _key = item?.code || "";
                    _name = item?.name || "";
                    _disabled = item?.disabled == true?true: false

                    const _newOptions =  item?.options?.map((cItem:any)=>{
                        let _label = "";
                        let _value = "";
                        let _language = ""
                        let _disabled = item?.disabled == true? true:false;
                        if(typeof (cItem) == 'string'){
                            _label = cItem;
                            _value = cItem
                        }
                        if(typeof (cItem) == 'object'){
                            _label = cItem?.label;
                            _value = cItem?.value || cItem?.label;
                            _language = cItem?.language || "";
                            _disabled = cItem?.disabled == true? true:_disabled;
                        }
                        return {
                            label: _label || "",
                            value: _value  || "",
                            language: _language || "",
                            disabled:_disabled,
                        }
                    })
                    if(_newOptions?.length>0){
                        _options = _newOptions;
                    }

                }
                if (_key) {
                    const _path = path.join(_config.root, "/src/mapOptions/", _key);
                    // console.log(_path)
                    if (!fs.existsSync(_path)) {
                        console.log("mapOptions文件开始创建-开始");
                        // console.log('w',_path)
                        const _tPath = path.join(_path, 'index.ts');
                        const _filePath = path.join("/src/mapOptions/", _key, 'index.ts');
                        console.log(_filePath)

                        _options = JSON.stringify(_options)
                            .replace(/\[/g, "[\n        ")
                            .replace(/\]/g, "\n    ]    ")
                            .replace(/},{/g, "},\n        {")

                            .replace(/":/g, ":")
                            .replace(/{"/g, "{")
                            .replace(/,"/g, ",")
                            // .replace(/\\"/g, '"')
                        // console.log(_options)
                        //  字符串内容 前面不能加，不然创建文件后需要重新格式化
                        const _container = `
/**
    @Author: 戴伟
    @Date: ${dayjs().format("YYYY/MM/DD HH:mm:ss")}
    @FilePath: ${_filePath} 
    @LastEditTime: ''
    @LastEditors: ''
    @Description: 
       根据 /src/mapOptions/config.ts 文件中key 自动创建(也可以自己创建)
       code 可以为空，就会以目录名称为code
       name 不能为空， 显示名称 , 有name  在字典管理 点击添加才会有
       option:[] ，第一次创建字典默认值，不需要就设置为[]
       选项中的 disabled 为true 时
          字典编辑时 选项会和本地比较，
          如果value相同 且 disabled:true 为true 就不能编辑
*/

const options = {
    code: "${_key}",
    name: "${_name}", 
    options: ${_options}
}

export default options;`
                        // console.log(String(_container))
                        fs.mkdirSync(_path, {recursive: true});
                        fs.writeFile(_tPath, _container, function (err: any) {
                            console.log(`${_key} 文件创建成功`);
                        });

                    }
                }

                return


            })


            // console.log("文件开始创建-结束");
        },
        closeBundle() {
            // if (_config.command == "build") {
            //
            // }
        },
    };
};
