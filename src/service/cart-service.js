/**
 * author :  yangshaojun
 * create time : 2017-12-10 22:13
 */

var _mm = require('util/mm.js');

// 购物车 业务类

var _cart = {
//     获取 购物车 商品数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/get_product_cart_count.do"),
            success: resolve,
            error: reject
        })
    }
}

module.exports = _cart;
