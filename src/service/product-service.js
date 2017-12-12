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

var _product = {


    //  获取商品列表信息
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },

    //  获取 商品详细 信息
    getProductDetail: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: {
                productId:productId
            },
            success: resolve,
            error: reject
        });
    },
}

module.exports = _product;
