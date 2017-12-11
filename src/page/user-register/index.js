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

// 注册  页面脚本 逻辑

var page = {
    // 初始化
    init: function () {
        // 调用 事件方法
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function () {
        var _this = this;
        // 验证 用户名是否存在
        $('#username').blur(function () {

            var username = $(this).val();
            // debugger;
            if (!username) {
                // 如果没有填写用户名的话、不做提交后台动作
                return;
            }
            // alert(username);
            //     异步验证用户名是否存在
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            })
        })
        // 注册 按钮的点击
        $('#submit').click(function () {

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

        // 表单的值
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        }
        // 表单验证 结果
        var validateResult = this.formValidate(formData);
        // debugger;
        // 验证成功
        if (validateResult.status == true) {
            //     提交
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';

            }, function (errMsg) {
                // 显示错误信息
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
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        // 验证密码是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        // 验证两次密码是否一致
        if (formData.password != formData.passwordConfirm) {
            result.msg = '两次密码输入不一致';
            return result;
        }
        // 验证手机号
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不符合规则';
            return result;
        }
        // 验证邮箱
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不符合规则';
            return result;
        }
        // 验证密码提示问题
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示答案
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
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
