/**
 * author :  yangshaojun
 * create time : 2017-12-12 11:58
 */
/**
 * author :  yangshaojun
 * create time : 2017-12-10 21:55
 */


// 用户 service
var _mm = require('util/mm.js');

var _order = {


    //  获取商品列表信息
    getProductList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    //  提交订单
    createOrder: function (orderInfo, resolve, reject) {
        _mm.request({
            data: orderInfo,
            url: _mm.getServerUrl('/order/create.do'),
            success: resolve,
            error: reject
        });
    },
    //   获取 订单列表
    getOrderList: function (listParam, resolve, reject) {
        _mm.request({
            data: listParam,
            url: _mm.getServerUrl('/order/list.do'),
            success: resolve,
            error: reject
        });
    },
    //  获取到的详情
    getOrderDetail: function (orderNo, resolve, reject) {
        _mm.request({
            data: {
                orderNo: orderNo
            },
            url: _mm.getServerUrl('/order/detail.do'),
            success: resolve,
            error: reject
        });
    },
    //  取消订单
    cancelOrder: function (orderNo, resolve, reject) {
        _mm.request({
            data: {
                orderNo: orderNo
            },
            url: _mm.getServerUrl('/order/cancel.do'),
            success: resolve,
            error: reject
        });
    },

}

module.exports = _order;

