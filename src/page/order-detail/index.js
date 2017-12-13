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
var _order = require('service/order-service.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNo')
    },
    // 初始化
    init: function () {
        // 调用 事件方法
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //  初始化左侧菜单
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderDetail();
    },
    // 事件绑定
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确实要取消该订单吗？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _mm.successTips('该订单已经取消成功');
                    _this.loadOrderDetail();
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }

        })
    },
    // 加载订单列表
    loadOrderDetail: function () {
        var orderDetailHtml = '',
            _this = this,
            $content = $('.content');
        //     请求
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            //  关联
            _this.dataFilter(res);
            //  渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex, res);

            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tips">' + errMsg + '</p>');
        })
    },
    //  数据的视频
    dataFilter: function (data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;

    }
}

$(function () {
    page.init();
})
