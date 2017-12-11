/*
 * @Author: shaojunyang
 * @Date:   2017-12-10 10:18:19
 * @Last Modified by:   shaojunyang
 * @Last Modified time: 2017-12-10 10:27:32
 */
var webpack = require('webpack');


//  // 把 css单独打包到 文件中dist/js/index.css的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 1、引入  html模板插件
var HtmlWebpackPlugin = require('html-webpack-plugin');


// 环境变量配置、dev、online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// console.log(WEBPACK_ENV);


// 封装 一个 获取 html-webpack-plugin参数的方法
var getHtmlConfig = function (filename,title) {
    // 返回 参数
    return {
        template: './src/view/' + filename + '.html',//原始文件- 需要打包的文件路径
        filename: 'view/' + filename + '.html',// 目标文件的名称、路径 是 output 中配置的输出路径
        inject: true,
        hash: true,
        title:title,
        // 需要打包的模块-  就是 entry中定义的入口文件 模块
        chunks: ['common', filename] //允许你只添加一些块（例如，只有单元测试块）
    }
}

// webpack 配置
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].bundle.js'
    },
    externals: {
        // 把全局变量变成一个模块
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                // 处理图片 的 url-loader  还需要安装 file-loader
                test: /\.(gif|png|jpg|jpeg|woff|ttf|svg|eot)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test:/\.string$/,
                loader:'html-loader'
            }
        ]
    },
    resolve: { // 配置 路径 别名
        alias: {
            util: __dirname + '/src/util',
            service: __dirname + '/src/service',
            page: __dirname + '/src/page',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        //  独立通用模块 到 dist/js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.bundle.js' //输出的文件名称
        }),
        // 把 css单独打包到 文件中dist/js/index.css的插件
        new ExtractTextPlugin("css/[name].css"),

        // 2、html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index',"首页")),
        new HtmlWebpackPlugin(getHtmlConfig('login',"用户登录")),
        new HtmlWebpackPlugin(getHtmlConfig('result',"操作结果"))
    ]


}


//  区分 线上环境 或者 是 开发环境
if ('dev' == WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;