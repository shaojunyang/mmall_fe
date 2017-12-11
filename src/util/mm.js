/**
 * author :  yangshaojun
 * create time : 2017-12-10 16:47
 */
var conf = {
    serverHost: ''
}
var hogan = require('hogan.js');
// 通用js工具类封装 （网络数据请求功能）
var _mm = {
    // 请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || ' ',
            dataType: param.type || 'json',
            data: param.data || ' ',
            success: function (res) {
                if (0 == res.status) {
                    //      如果 响应状态码是 0 、调用 success 方法
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (10 == res.status) {
                    //     没有登录 响应强制登录
                    _this.doLogin();
                } else if (1 == res.status) {
                    //    如果响应状态码 == 1  、调用 error方法
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (error) {
                typeof param.error === 'function' && param.error(error.statusText);
            }

        })
    },
//     获取 服务端接口地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    /**
     * 获取url参数
     * @param name 参数的key属性
     */
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        // 返回 参数的值
        return result ? decodeURIComponent(result[2]) : null;
    },
    /**
     *  用  hogan 渲染html 模板和
     * @param htmlTemplate 模板
     * @param data   数据
     */
    renderHtml: function (htmlTemplate, data) {
        var template = hogan.compile(htmlTemplate),
            result = template.render(data);
        // 返回渲染的模板
        return result;
    },

    successTips: function (msg) {
        alert(msg || '操作成功！');
    },
    errorTips: function (msg) {
        alert(msg || '哪里不对了');
    },
    /**
     * 字段的验证、支持非空判断、手机、邮箱
     * @param value
     * @param type
     */
    validate: function (value, type) {
        value = $.trim(value);
        // 非空验证  、 返回 boolean
        if ('require' === type) {
            return !!value;
        }
        //     手机号验证= 返回 boolean
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //     邮箱验证
        if ('email' === type) {
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //     统一 强制登录处理
    doLogin: function () {
        // redirect 参数表示 从哪个链接强制登录、登录完成重新跳回之前的页面
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //  跳回主业方法
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;