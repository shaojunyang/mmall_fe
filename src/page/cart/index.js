/**
 * author :  yangshaojun
 * create time : 2017-12-12 16:22
 */


require('./index.css');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');


var page = {
    data: {
        //  参数

    },
// 初始化
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
//  绑定事件
    bindEvent: function () {
        var _this = this;
        //      商品的选择或者取消选择
        $(document).on('click', '.cart-select', function () {
            // debugger;
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            //     选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                //     取消选中
                _cart.unSelectProduct(productId, function (res) {
                    // 成功 回调  做渲染
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        })
        //  商品 全选和 取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            //     全选
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                //     取消 全选
                _cart.unSelectAllProduct(function (res) {
                    // 成功 回调  做渲染
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        })

        //      商品 数量的变化
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currentCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _mm.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currentCount + 1;
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }

            //      提交接口 、更新购物车 商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                // 渲染
                _this.renderCart(res);
            }, function (errMsg) {
                // 提示错误
                _this.showCartError();
            })

        })

        //      删除单个 商品
        $(document).on('click', '.cart-delete', function () {
            if (window.confirm("确定要删除商品吗")) {
                var productId = $(this).parents('.cart-table').data('product-id');
                // debugger;
                //     删除 操作
                _this.deleteCartProduct(productId);
            }

        })

        //      批量删除 选中商品
        $(document).on('click', '.cart-delete-selected', function () {
            if (window.confirm("确定要删除选中商品吗")) {
                var ProductArrayIds = [];
                var $selectedItem = $('.cart-select:checked');
                //  循环 查找选中的 商品 id
                for (var i = 0; i < $selectedItem.length; i++) {
                    ProductArrayIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }

                if (ProductArrayIds.length) {
                    //     删除 操作
                    _this.deleteCartProduct(ProductArrayIds.join(","));
                } else {
                    _mm.errorTips('你还没有选中要选中的商品');
                }

            }

        })

        //  提交 购物车
        $(document).on('click', '.btn-submit', function () {
            //     判断 总价大于0  提交
            if (_this.data.cartInfo && (_this.data.cartInfo.cartTotalPrice > 0)) {
                window.location.href = './order-confirm.html';
            } else {
                _mm.errorTips('请选择商品后再提交');
            }
        })
    },
//  加载 商品详情
    loadCart: function () {
        var _this = this;
        var $pageWrap = $('.page-wrap');
        // 获取 购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        })
        // Loading
        // $pageWrap.html('<div class="loading"></div>');
    },
    //  渲染购物车
    renderCart: function (data) {
        this.filter(data);
        //      缓存购物车信息
        this.data.cartInfo = data;
        //      删除 html
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);

        //     通知导航的购物车 更新 数量
        nav.loadCartCount();
    },
    // filter  管理 数据
    filter: function (data) {
        //  强制转换成布尔型
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 删除 指定 商品 、支持批量  、productId用逗号分隔
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);

        }, function (errMsg) {
            // debugger;
            _this.showCartError();

        })
    },
    // 显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tips">哪里不对了、刷新试试吧</p>');
    }

}
$(function () {
    page.init();
})
