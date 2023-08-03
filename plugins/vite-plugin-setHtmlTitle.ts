/**
 @Author: 戴伟
 @Date: 2023/01/30 10:37:55
 @FilePath: plugins/vite-plugin-html-transform.js
 @LastEditTime: ''
 @LastEditors: ''
 @Description:
 do.....
 */
const _defaultPluginsOptions:{title: string} = {
  title: "title",
};
export default (pluginsOptions:{title: string} = _defaultPluginsOptions) => {
  return {
    name: "htmlTitle",
    configResolved(resolvedConfig:any) {},
    transformIndexHtml(html:any) {
      // console.log(html,options.server )
      return html.replace(
        /<title>(.*?)<\/title>/,
        `<title>${pluginsOptions.title}</title>`
      );
    },
  };
};
