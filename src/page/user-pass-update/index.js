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


var page = {

    // 初始化
    init: function () {
        // 调用 事件方法
        this.onLoad();
        this.bindEvent();
    },
    //  提交事件
    bindEvent: function () {
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            };
            var validateResult = _this.validateForm(userInfo);
            //  如果通过验证
            if (validateResult.status) {
                //   更改用户 密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {

                    _mm.successTips(msg);

                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });

                //      没有通过验证
            } else {
                _mm.errorTips(validateResult.msg);
            }

        })
    },
    onLoad: function () {
        //  初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })

    },
    //  验证 字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        }

        // 验证 原密码 是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证 新密码 长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得少于6位';
            return result;
        }


        // 验证 原密码 是否为空
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次密码输入不一致';
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
