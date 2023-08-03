/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\dms\device\deviceList\store\index.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
import {defineStore} from "pinia";


import {
    globalKeyMap,
    globalMapOptions
} from "./config";
import {
    getList as getListAPI,
} from "../api";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// 命名规范将返回的函数命名为 use deviceList Store 是跨可组合项的约定,
// id 命名为 deviceList
export const useDeviceListStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "deviceList",
    // state: 返回对象的函数
    state: () => ({
        pageConfig: {
            title: "终端管理",
            // 是否显示左边返回箭头
            isShowBack: true,
            // 是否显示左边侧边栏
            isShowAside: true,
            // 显示左边侧边栏树结构 数据根据type切换
            treeType: 1,
            // 是否显示搜索
            isFilter:false,
            // 是否显示左边侧边栏树的 Checkbox
            isShowCheckbox: false,
            // 是否显示左边点击高亮显示
            isHighlightCurrent: true,
            // 是否在点击节点的时候展开或者收缩节点，
            // 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
            expandOnClickNode:false,
            // 左边树默认点击的   默认第一个 index 为字符串
            treeCurrent: '0',
            //  左边树默认展开的  默认以index为准
            treeDefaultExpandedKeys: ['0'],
            // 是否显示底部分页
            isShowPaging: true,
        },
        // 左边本地key 对应右边 接口key
        // 用于table 和 addEditDialog 弹框使用
        // addEditDialog 提交时 会转变为右边
        //  table 会去取 对应的右边key值
        globalKeyMap: globalKeyMap,

        // 用于table 和 addEditDialog 的options
        globalMapOptions: globalMapOptions,


    }),
    getters: {
        //
        listQuery: (state: any) => {
            const _listQuery:any =  state.headerStore.queryData.listQuery || {};
            return _listQuery;
        },

        // table 上全局的过滤选项 根据 key去区分
        // table 显示过滤 需要先设置 _filterKeyMap 中需要的 key
        globalFiltersOption: (state: any) => {

            const _filterKeyMap: { [name: string]: any } = {
                "option1": [
                    {
                        label: "测试1",
                        value: 1,
                    },
                    {
                        label: "测试2",
                        value: 2,
                    }
                ],
                // _mapOptionsServer 里的key 做映射
                // 人员类型
                // personType:"personnelType",
                // // 证件类型
                // idType:"idType",
            }

            const _filters: { [name: string]: any } = state.optionsStore?.getMapOptionsByKey(_filterKeyMap, 'options')
            return _filters

        },
        //  table 列表中 需要转换的选项值
        globalOption: (state: any) => {
            const _optionKeyMap: { [name: string]: any } = {

                "option1": [
                    {
                        label: "测试1",
                        value: 1,
                    },
                    {
                        label: "测试2",
                        value: 2,
                    }
                ],

                // 人员类型
                personType: "personnelType",
                // 证件类型
                idType: "idType",
            }

            const _option: { [name: string]: any } = state.optionsStore?.getMapOptionsByKey(_optionKeyMap, 'options')
            return _option
        }

    },
    actions: {
        init(router: any, route?: any) {


            // console.log('test-store-init', this)
            // this.setStoresShare();

            this.setIsShowBack(router, route)
            // 如果页面需要字典数据
            // 数据获取可以看 上方globalFiltersOption 和 globalOption 的使用
            // this.getMapOptions()

            // this.getList();

        },

        onTreeCurrentChange(data: any) {
            console.log('%ctest-onTreeCurrentChange','color:red',data?.data?.index)

            // this.pageConfig.treeCurrent = data?.data?.index;


            this.getList();
        },
        // 分页大小变更 时触发
        onPageSizeChange(data: any) {
            // console.log('onPageSizeChange',data)
            const _pageSize:any = data;
             this.headerStore.queryData.listQuery.pageSize = _pageSize;
            // deviceListStore.getList(true);
            this.getList(true)
        },
        onPageCurrentChange(data: any) {
            // console.log('onPageCurrentChange',data)
            const _page:any = data;
            this.headerStore.queryData.listQuery.page = _page;
            this.getList()

        },

        getList(isFirst = false) {
            console.log("获取列表数据", this);
            const _isFirst = isFirst;

            // 统一处理的获取数据的接口
            // 第一个参数(必传) 获取数据的接口， 详情 列表 等接口
            // 第二个参数(非必传) 外部传入整个 queryData  必须是个对象
            // 第三个参数(非必传) 外部绑定数据，必须是个对象 且有 isLoading 和 data ，会自动修改 isLoading ，和接口返回时设置data
            // 四个个参数(非必传) isFirst 为true 且 queryData 中有 page 自动修改 queryData 的page为1
            // 如果 queryData 中有 page 会自动修改total
            //  具体使用 看 src\stores\modules\API\index.ts

            const _listQuery = this.headerStore.queryData.listQuery;
            const _globalKeyMap = this.globalKeyMap
            _listQuery.keyMap = JSON.parse(JSON.stringify(_globalKeyMap));
            const _list = this.containerStore.listData;
            this.APIStore.getDataAPI(getListAPI, _listQuery, _list, _isFirst).then((res: any) => {
                console.log('列表', res);
                this.containerStore.listData.data?.map((item: any, index: number) => {

                    // selectable 为true 会禁用table 选项
                    // const _item:any = item;
                    // if (index % 3 === 0) {
                    //     _item.selectable = true;
                    // } else {
                    //     _item.selectable = false;
                    // }
                })


            }, (err: any) => {
                // this.listData.isLoading = false;

            })

        },


        //  自动设置 显示返回 ，
        //  根据需求可手动设置
        setIsShowBack(router: any, route: any) {

            const _route: any = route;
            const _url = _route.fullPath
            const _urls = _url.split('/');
            const _matched = _route.matched;

            this.pageConfig.isShowBack = true;

            if (this.utilStore.isArray(_matched)) {
                const _lastRoute = _matched?.[_matched?.length - 1] || {};
                const _lastLastRoute = _matched?.[_matched?.length - 2] || {};

                //  默认 children 里第一个的时候 不显示返回
                if (_lastRoute?.path === _lastLastRoute?.['children']?.[0]?.['url']) {
                    this.pageConfig.isShowBack = false;
                }
                //  或者只有 2层的 也不显示返回
                if (_urls?.length <= 3) {
                    this.pageConfig.isShowBack = false;
                }

            }


        },


        goToPage() {
            this.globalStore.goToPage('ff')

        },


    },
});

import {setStoresShare} from "@/views/tool"

const componentsStoreFiles: any = import.meta.glob(["../components/**/store/index.ts"], {eager: true});
//components 里的 store 都挂在 主 useDeviceListStore 里
setStoresShare(useDeviceListStore, componentsStoreFiles);