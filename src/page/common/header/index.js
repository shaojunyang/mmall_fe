/**
 * author :  yangshaojun
 * create time : 2017-12-11 12:55
 */

require('./index.css');

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');


// 通用页面头部
var header = {
    init: function () {
        this.bindEvent();
    },
    // 回填输入框信息
    onLoad: function () {
        var keyword = _mm.getUrlParam("keyword");
        if (keyword) {
            // 如果 keyword存在、回填输入框
            $('#search-input').val(keyword);
        }
    },
    // 绑定事件
    bindEvent: function () {
        var _this = this;
        //     点击搜索按钮 、做搜索提交 事件
        $('#search-btn').click(function () {
            _this.searchSubmit();
        })
        //     输入回车后也是做搜索提交
        $('#search-input').keyup(function (e) {
            // 12 是回车键的keycode
            // debugger;

            if (e.keyCode === 13) {

                _this.searchSubmit();
            }
        })
    },
    // 搜索 提交 方法
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            // 如果提交的时候、有keyword、跳转到列表页面
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            //   keyword为空、否则 返回主页
            _mm.goHome();
        }
    }
}
header.init();
// module.exports=nav.init();