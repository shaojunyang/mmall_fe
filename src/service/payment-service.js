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

var _payment = {


    //  获取 支付信息
    getPaymentInfo: function (orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    //  获取到的状态
    getPaymentStatus: function (orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    }


}

module.exports = _payment;

