/**
 * author :  yangshaojun
 * create time : 2017-12-11 23:56
 */


require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

var page = {
    // 初始化
    init: function () {
        // 调用 事件方法
        this.onLoad();
    },
    onLoad: function () {
        //  初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        this.loadUserInfo();
    },
    //  加载个人用户信息
    loadUserInfo: function () {
        var userHtml = '';
        //  如果成功的话
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    }
}

$(function () {
    page.init();
})
