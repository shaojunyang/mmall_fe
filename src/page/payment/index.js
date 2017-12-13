/**
 * author :  yangshaojun
 * create time : 2017-12-13 18:36
 */

/**
 * author :  yangshaojun
 * create time : 2017-12-11 23:56
 */


require('./index.css');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNo')
    },
    // 初始化
    init: function () {
        // 调用 事件方法
        this.onLoad();
    },
    onLoad: function () {
        this.loadPaymentInfo();
    },
    // 加载订单列表
    loadPaymentInfo: function () {
        var paymentHtml = '',
            _this = this,
            $pageWrap = $('.page-wrap');
        //     请求
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {

            //  渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);

            $pageWrap.html(paymentHtml);
            //     监听订单状态
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tips">' + errMsg + '</p>');
        })
    },
    // 监听订单状态
    listenOrderStatus: function () {
        var _this = this;
        _this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res == true) {
                    //     支付成功
                    window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNumber;
                }
            }, function () {

            })
        }, 5000);
    }
}

$(function () {
    page.init();
})
