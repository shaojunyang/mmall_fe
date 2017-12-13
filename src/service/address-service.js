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

var _address = {


    //  获取地址 列表信息
    getAddressList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //  添加 收货地址
    save: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //  获取 单条 收件人 地址
    getAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //  更新 收件人 地址
    update: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    deleteAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },

}

module.exports = _address;

