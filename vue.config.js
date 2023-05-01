/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-04 22:27:51
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-09 10:48:02
 * @Description: file content
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
});

module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
                secure:false,//true/false,https协议的情况下为true
                changeOrigin: true,
                // pathRewrite: {'^/api': ''}
            },

        },
    },
};