


interface _routeItemMeta {
    title: string;
    icon?:string;
}


interface _routeItem {
    path: string,
    redirect?: string,
    name?: string,
    meta: _routeItemMeta ,
    component?: any,
    children?: interfaceRouteChildren
    //
    url?:string
}




export interface interfaceRoute extends _routeItem{}

export interface interfaceRouteChildren extends Array<interfaceRoute>{[n:number]:interfaceRoute}


export interface interfaceRoutes extends Array<interfaceRoute>{[n:number]:interfaceRoute}


