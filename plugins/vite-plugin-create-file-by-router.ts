import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import {fileURLToPath, URL} from "node:url";
import {JSONPath} from "jsonpath-plus";

/**
 @name: vite-plugin-create-views
 @author: 戴伟
 @date: 014 2022/12/14 09:22:01
 @file: plugins
 @description： do.....
 */


// import routes from "../src/router/mainRoutes.js";

// console.log('routes',routes)

// @ts-ignore
import routes from "../src/router/main/routes"


/**
 * 复制文件夹到目标文件夹
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 * @param title XXXNAME 替换标题
 * @param callback
 */
const copyDir = (src: string, dest: string, title?: string, callback?: Function) => {
    const copy = (copySrc: string, copyDest: string, title?: string) => {
        fs.readdir(copySrc, (err: any, list: any) => {

            if (err) {
                callback && callback(err);
                return;
            }
            list.forEach((item: any) => {
                const ss = path.resolve(copySrc, item);
                fs.stat(ss, (err: any, stat: any) => {
                    if (err) {
                        callback && callback(err);
                    } else {
                        const curSrc = path.resolve(copySrc, item);
                        const curDest = path.resolve(copyDest, item);

                        if (stat.isFile()) {
                            // console.log("stat", stat);
                            // console.log("curSrc", curSrc);
                            // console.log("curDest", curDest);

                            // 文件，直接复制
                            // fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
                            fs.readFile(curSrc, function (err, data) {
                                if (err) {
                                    return console.error(err);
                                }
                                // console.log("curSrc", curSrc);
                                // console.log("curDest", curDest);
                                // console.log("异步读取: " + data.toString());
                                const _fileData = path.parse(item);
                                const _fileExtension = _fileData?.ext;
                                // let _fileName = _fileData?.name;
                                const _url = new URL(curDest);
                                let _fileUrl = _url?.pathname;
                                _fileUrl = "src" + _fileUrl.split("src")?.[1];
                                const _container = data.toString();
                                let _newContainer = _container;
                                if (_fileExtension == ".js" || _fileExtension == ".ts") {
                                    const reg = /(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/;
                                    // console.log("新内容", _newContainer);

                                    // console.log("匹配内容", _container.match(reg)?.[0]);

                                    let _exp = `
                         /**
                            @Author: 戴伟
                            @Date: ${dayjs().format("YYYY/MM/DD HH:mm:ss")}
                            @FilePath: ${_fileUrl}
                            @LastEditTime: ''
                            @LastEditors: ''
                            @Description: 
                                  do.....
                         */
                  `;
                                    // console.log('_exp',_exp)
                                    _exp = _exp.replace(/\n\s*/g, "");
                                    _exp = _exp.replace(/(@.*?[:|：])/g, "\n    $1 ");
                                    _exp = _exp.replace(/\*\//g, "\n*/\n");

                                    _newContainer = _container.replace(reg, _exp);
                                }

                                if (_fileExtension == ".vue") {
                                    const reg = /<!--([\s\S]*?)-->/;

                                    // console.log("匹配内容", _container );
                                    // console.log("匹配内容", _container.match(reg)?.[0]);
                                    let _exp = `
                         <!--
                            @Author: 戴伟
                            @Date: ${dayjs().format("YYYY/MM/DD HH:mm:ss")}
                            @FilePath: ${_fileUrl}
                            @LastEditTime: ''
                            @LastEditors: ''
                            @Description: 
                                  do.....
                        -->
                  `;
                                    _exp = _exp.replace(/\n\s*/g, "");
                                    _exp = _exp.replace(/(@.*?[:|：])/g, "\n    $1 ");
                                    _exp = _exp.replace(/-->/g, "\n-->\n");

                                    // console.log(_exp)

                                    _newContainer = _container.replace(reg, _exp);
                                }

                                {
                                    // 模板的 storeName  修改替换
                                    // 用初始闯入目标路径 获取 名称
                                    const _storeId = path.basename(path.resolve(dest));
                                    // console.log(_storeId,dest)
                                    let _useStoreName =
                                        _storeId.slice(0, 1).toUpperCase() + _storeId.slice(1);
                                    _useStoreName = `use${_useStoreName}Store`;
                                    const _storeName = `${_storeId}Store`;
                                    // console.log(`
                                    //   _storeId: ${_storeId}
                                    //   _storeName: ${_storeName}
                                    //   _useStoreName : ${_useStoreName}
                                    // `)


                                    const _title:string = title || _storeId;
                                    _newContainer = _newContainer.replace(
                                        /XXXNAME/g,
                                        _title
                                    );


                                    _newContainer = _newContainer.replace(
                                        /useXXXStore/g,
                                        _useStoreName
                                    );
                                    _newContainer = _newContainer.replace(
                                        /XXXStore/g,
                                        _storeName
                                    );
                                    _newContainer = _newContainer.replace(/XXX/g, _storeId);
                                }

                                // console.log(_newContainer)
                                //
                                fs.writeFile(curDest, _newContainer, function (err: any) {

                                    const _name: string = path.basename(path.resolve(dest));

                                    // const _destSrc:string = _name + _fileUrl.split(_name)?.[1];

                                    const _nameIndex: number = _fileUrl.indexOf(_name)

                                    const _destSrc: string = _fileUrl?.slice(_nameIndex)

                                    const _message: string = `${_destSrc} 文件创建成功`
                                    // console.log('_message',_message)
                                    callback && callback({message: _message, code: "200"});
                                    // console.log(err);//null
                                });
                            });
                        } else if (stat.isDirectory()) {
                            // 目录，进行递归
                            fs.mkdirSync(curDest, {recursive: true});
                            copy(curSrc, curDest, title);
                        }


                    }
                });
            });
        });
    };

    fs.access(dest, (err: any) => {
        if (err) {
            // 若目标目录不存在，则创建
            fs.mkdirSync(dest, {recursive: true});
        }
        copy(src, dest, title);
    });
};


const _defaultPluginsOptions = {
    json: "",
    filename: "test.json",
    outDir: "",
};

export default (pluginsOptions = _defaultPluginsOptions) => {
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
            console.log("文件开始创建-开始");


            const _routes = JSON.parse(JSON.stringify(routes))
            // console.log('_routes', JSON.stringify(routes,null, '\t'))
            const recursion = (list: any) => {
                list?.map((item: any) => {
                    if (item.url == "/") return false;

                    const _path: string = path.join(_config.root, "/src/views/", item.url);

                    // 判断是否在最后一层
                    if (Array.isArray(item?.children) && item?.children?.length > 0) {
                        recursion(item.children);
                    } else {

                        // console.log('item', item)
                        const _title: string = item.meta.title || item.name

                        //  判断是否存在目录 如果有 就不创建
                        if (!fs.existsSync(_path)) {
                            const _tPath: string = path.join(_config.root, "/src/views/test/template/");
                            copyDir(_tPath, _path, _title, (res: any) => {
                                console.log(res.message);
                            });
                        }
                    }
                });
            };

            recursion(_routes);


            // console.log("文件开始创建-结束");
        },
        closeBundle() {
            // if (_config.command == "build") {
            //
            // }
        },
    };
};
