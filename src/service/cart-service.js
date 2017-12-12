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
            url: _mm.getServerUrl("/cart/get_cart_product_count.do"),
            success: resolve,
            error: reject
        })
    },
    //  添加商品到购物车
    addToCart: function (productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/add.do"),
            success: resolve,
            data: productInfo,
            error: reject
        })
    },
    //  获取 购物车列表
    getCartList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/list.do"),
            success: resolve,
            error: reject
        })
    },
    //   选择购物车商品
    selectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/select.do"),
            success: resolve,
            data: {
                productId: productId
            },
            error: reject
        })
    },
    //   取消 选择购物车商品
    unSelectProduct: function (productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/un_select.do"),
            success: resolve,
            data: {
                productId: productId
            },
            error: reject
        })
    },
    //  取消  全选  购物车商品
    unSelectAllProduct: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/un_select_all.do"),
            success: resolve,
            error: reject
        })
    },
    //  全选  购物车商品
    selectAllProduct: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/select_all.do"),
            success: resolve,
            error: reject
        })
    },
    //  更新 购物车商品数量
    updateProduct: function (productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/update.do"),
            success: resolve,
            data: productInfo,
            error: reject
        })
    },
    //  删除指定商品
    deleteProduct: function (productIds, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/delete_product.do"),
            success: resolve,
            data: {
                productIds: productIds
            },
            error: reject
        })
    },
}

module.exports = _cart;
