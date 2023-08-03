/**
    @Author:  戴伟
    @Date:  2023/06/16 15:35:48
    @FilePath:  src\views\rms\release\releaseList\api.ts
    @LastEditTime:  ''
    @LastEditors:  ''
    @Description:  do.....
*/
// import instance from "@/axios/https";


import local from "@/utils/localStorage"

const _storageKey: string = 'releaseListListData'
export const getList = async () => {

    const _list = local.getStorage(_storageKey) || []
    return Object({success: true, message: '成功', data: _list})
}


export const createData = async (data: any) => {
    const _list = local.getStorage(_storageKey) || []
    // console.log('_list',_list)
    const _lastData = _list[_list?.length-1] || {}
    const _lastDataId:number = _lastData?.id || 0;
    const _id:number = _lastDataId + 1;
    // console.log('data',data)
    const _data = data || {}
    _data.id = _id;
    _list.push(_data);
    local.setStorage(_storageKey, _list)
    return Object({success: true, message: '成功', })
}


export const getDataById = async (data: any) => {
    const _id:number = data.id || 0;
    const _list = local.getStorage(_storageKey) || []
    const _data = _list.find((item:any)=>item.id === _id);
    return Object({success:true,message:'成功',data:_data})
}


export const editData = async (data: any) => {
    const _data = data || {}
    const _id:number = _data.id || 0;
    let _list:any = local.getStorage(_storageKey) || []
    _list = _list?.map((item:any)=>{
        let _item:any = {
            ...item,
        }
        if(item.id === _id){
            _item = {
                ..._data
            }
        }
        return _item;
    })
    local.setStorage(_storageKey, _list)
    // const _list = local.getStorage(_storageKey) || []
    // const _data = _list.find((item:any)=>item.id === _id);


    return Object({success:true,message:'成功',})
}


export const deleteData = async (data: any) => {
    const _data = data || {}
    const _ids:any[] = _data || 0;
    let _list:any = local.getStorage(_storageKey) || []
    _list = _list.filter((item:any)=>_ids.indexOf(item.id)===-1)
    local.setStorage(_storageKey, _list)
    return Object({success:true,message:'成功',})

}
