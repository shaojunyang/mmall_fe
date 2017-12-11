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
        this.bindEvent();
    },
    //  提交时间
    bindEvent: function () {
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            var validateResult = _this.validateForm(userInfo);
            //  如果通过验证
            if (validateResult.status) {
                //   更改用户信息
                _user.updateUserInfo(userInfo, function (res,msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
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
            name: 'user-center'
        })
        this.loadUserInfo();
    },
    //  加载个人用户信息
    loadUserInfo: function () {
        var userHtml = '';
        //  如果成功的话
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    //  验证 字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
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
