/*
 * @Author: 吴志远
 * @Date: 2022-12-22 14:30:18
 * @LastEditors: 吴志远
 * @LastEditTime: 2022-12-22 15:54:13
 * @FilePath: \intelligent-cloud-platform\vite-plugin-fullImport.ts
 * @Description: 自定义插件 ./plugins/fullImport, 处理开发环境完全引入element-plus， 生产环境按需引入
 * Copyright (c) 2022 by 吴志远, All Rights Reserved. 
 */
import * as path from 'path'
import type {Plugin, ResolvedConfig} from 'vite'

export default function fullImport() {
    let config: ResolvedConfig
    return <Plugin>{
        name: 'fullImportElementPlus',
        async configResolved(conf) {
            config = conf
        },
        transform(code, id) {
            // 判断当前处理的是否是 _src/main.ts
            if (path.join(config.root, 'src/main.ts').replace(/\\/g, "\/") === id) {
                const name = 'ElementPlus'
                // 引入 ElementPlus 和 样式(最好提前引入)
                const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';`
                code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
                code = code.replace('import { createApp } from "vue";', ($1) => $1 + '\n' + prepend)
                return code
            }
            return code
        }
    }
}
