



export const globalRoutesMap:{[name:string|number]:any} =  {
    404:()=>import(`@/viewsGlobal/404/index.vue`),
    layout:()=>import(`@/viewsGlobal/layout/index.vue`),

    routerView:()=>import(`@/viewsGlobal/routerView/index.vue`)


}
