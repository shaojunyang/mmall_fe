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
var getHtmlConfig = function (filename, title) {
    // 返回 参数
    return {
        template: './src/view/' + filename + '.html',//原始文件- 需要打包的文件路径
        filename: 'view/' + filename + '.html',// 目标文件的名称、路径 是 output 中配置的输出路径
        inject: true,
        favicon: './favicon.ico',
        hash: true,
        title: title,
        // 需要打包的模块-  就是 entry中定义的入口文件 模块
        chunks: ['common', filename] //允许你只添加一些块（例如，只有单元测试块）
    }
}

// webpack 配置
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'about': ['./src/page/about/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dev' == WEBPACK_ENV ? '/dist/' : '//s.yunhewanjia.com/mmall_fe/dist/',
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
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', "首页")),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', "用户登录")),
        new HtmlWebpackPlugin(getHtmlConfig('result', "操作结果")),
        new HtmlWebpackPlugin(getHtmlConfig('list', "商品列表")),
        new HtmlWebpackPlugin(getHtmlConfig('detail', "商品详情")),
        new HtmlWebpackPlugin(getHtmlConfig('cart', "购物车")),
        new HtmlWebpackPlugin(getHtmlConfig('about', "关于我们")),
        new HtmlWebpackPlugin(getHtmlConfig('payment', "订单支付")),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', "订单确认")),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', "订单列表")),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', "订单详情")),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', "个人中心")),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', "修改密码")),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', "修改个人信息")),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', "找回密码")),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', "用户注册"))
    ]


}


//  区分 线上环境 或者 是 开发环境
if ('dev' == WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;