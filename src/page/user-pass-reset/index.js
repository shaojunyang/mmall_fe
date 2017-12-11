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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    // 初始化
    init: function () {
        this.onLoad();
        // 调用 事件方法
        this.bindEvent();
    },
    // 加载 html
    onLoad: function () {
        this.loadStepUsername()
    },
    // 绑定事件
    bindEvent: function () {
        var _this = this;
        // 输入用户名点击下一步
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                //     如果不为空、请求接口 返回密码提示问题
                _user.getQuestion(username, function (res) {
                    // 获取  返回的 用户密码提示答案
                    _this.data.username = username;
                    _this.data.question = res;

                    // 显示提交问题 模块
                    _this.loadStepQuestion()
                }, function (essMsg) {
                    formError.show(essMsg);
                })

                //     如果用户名为空
            } else {
                formError.show("请输入用户名");
            }

        })
        // 输入 密码提示问题、点击下一步的按钮点击事件
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            // 答案不为空
            if (answer) {
                //     检测密码提示问题答案  、 提交ajax
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer,
                }, function (res) {
                    // 获取  返回的 用户密码提示答案、token
                    _this.data.answer = answer;
                    _this.data.token = res;

                    // 显示提交问题 模块
                    _this.loadStepPassword()
                }, function (essMsg) {
                    formError.show(essMsg);
                })

                //     如果用户名为空
            } else {
                formError.show("请输入 密码提示问题的答案");
            }

        })

        // 输入  新密码 后的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            //  密码 不为空
            if (password && password.length >= 6) {
                //     修改密码提交
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    // 成功 \跳转结果页
                    window.location.href = './result.html?type=pass-reset';

                }, function (essMsg) {
                    formError.show(essMsg);
                })

                //     如果用户名为空
            } else {
                formError.show("请输入不少于6位的新密码");
            }

        })
    },
    // 加载输入用户名的一步
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 加载输入 密码提示答案的一步
    loadStepQuestion: function () {
        //  清楚错误提示
        formError.hide();
        //  做容器的切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);


    },
    // 加载输入 新密码的一步
    loadStepPassword: function () {
        //  清楚错误提示
        formError.hide();
        //  做容器的切换
        $('.step-question').hide().siblings('.step-password').show();

    }
}

$(function () {
    page.init();
})
