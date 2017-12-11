/*
 * @Author: shaojunyang
 * @Date:   2017-12-10 10:22:11
 * @Last Modified by:   shaojunyang
 * @Last Modified time: 2017-12-10 16:42:16
 */


require('./index.css');
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
}

// 登录 页面脚本

var page = {
    // 初始化
    init: function () {
        // 调用 事件方法
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function () {
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function () {
            // debugger;
            _this.submit();
        })
        // 回车 提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode == 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function () {


        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }
        // 表单验证 结果
        var validateResult = this.formValidate(formData);
        // debugger;
        // 验证成功
        if (validateResult.status == true) {
            // debugger;

            //     提交
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {


                formError.show(errMsg);
            })
        } else {
            //   验证失败
            //     错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单字段验证 、
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_mm.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //     通过认证、返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}

$(function () {
    page.init();
})
