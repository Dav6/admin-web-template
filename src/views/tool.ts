

// 当前页面里的 store 共享
// components 里的 store 都挂在 主 store 里
// components 通过 主 store 里 各自的name 去访问其他的
export const setStoresShare = (mainStore:any,componentsStoreFiles:any) => {
    const _mainStore: any = mainStore();
    Object.keys(componentsStoreFiles)?.map((file: any) => {
        Object.keys(componentsStoreFiles?.[file])?.map((key: any) => {
            const _lastStr = key?.slice(-5)
            if (key.indexOf('use') === 0 && _lastStr == 'Store') {
                if (componentsStoreFiles?.[file]?.[key]) {
                    const _store = componentsStoreFiles?.[file]?.[key];

                    const _mainStoreName:string = _mainStore.$id;
                    const _useMainStoreName:string = `${_mainStoreName}Store`
                    // 组件里使用名称太长  去掉XXX
                    const _names:any[] = `${_store.$id}`?.split(_mainStoreName) || [];
                    const _mainStoreNameIndex:number = _store.$id.indexOf(_mainStoreName)  + _mainStoreName.length

                    let _name:string = _store.$id.slice(_mainStoreNameIndex);

                    _name = _name.replace(_name[0],_name[0]?.toLowerCase())
                    _name = `${_name}Store`
                    // 代理
                    const _currentStore = _store()


                    // components 里的 store 都写入 主 _mainStore
                    !_currentStore?.[_useMainStoreName] && Object.defineProperties(_currentStore, {
                        [_useMainStoreName]: {get: () => _mainStore}
                    })
                    !_currentStore.$state?.[_useMainStoreName] && Object.defineProperties(_currentStore.$state, {
                        [_useMainStoreName]: {get: () => _mainStore}
                    })


                    // 主 _mainStore 写入 components 里的 store
                    !_mainStore?.[_name] && Object.defineProperties(_mainStore, {
                        [_name]: {get: () => _currentStore}
                    })
                    !_mainStore.$state?.[_name] && Object.defineProperties(_mainStore.$state, {
                        [_name]: {get: () => _currentStore}
                    })
                }
            }
        })
    })

};