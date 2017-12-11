/**
 * author :  yangshaojun
 * create time : 2017-12-10 21:55
 */


// 用户 service
var _mm = require('util/mm.js');

var _user = {

    /**
     *  // 退出登录方法
     * @param resolve  成功
     * @param reject  失败
     */
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //   根据用户名获取 用户密码提示问题
    getQuestion: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            method: 'POST',
            data: {
                username: username
            },
            success: resolve,
            error: reject
        });
    },
    //用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    // 检测登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //  检测用户名是否存在
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            data: {
                type: 'username',
                str: username
            },
            success: resolve,
            error: reject
        });
    },

    //  检查密码提示问题的答案
    checkAnswer: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //  重置 密码
    resetPassword: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
    //  获取用户信息
    getUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //  更新用户个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },

    //  登录状态下 更新密码
    updatePassword: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/reset_pass.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        });
    },
}

module.exports = _user;
