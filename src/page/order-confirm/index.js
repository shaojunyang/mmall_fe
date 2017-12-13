/**
 * author :  yangshaojun
 * create time : 2017-12-13 10:44
 */



require('./index.css');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');


var page = {
    data: {
        selectedAddressId: null

    },
// 初始化
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //  初始化  加载
        this.loadAddressList();
        this.loadProductList();
    },
//  绑定事件
    bindEvent: function () {
        var _this = this;
        //      地址的选择
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            // 地址id
            _this.data.selectedAddressId = $(this).data('id');

        })
        //   订单提交
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            //  如果地址id 操作

            if (shippingId) {
                //  提交订单
                _order.createOrder({
                    shippingId: shippingId,
                }, function (res) {
                    //     成功、跳转支付页面
                    window.location.href = './payment.html?orderNo=' + res.orderNo;
                }, function (errMsg) {
                    // 失败
                    _mm.errorTips(errMsg);
                })
            } else {
                _mm.errorTips('请选择地址后在提交');

            }
        })

        //      地址的添加
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            })
        })

        //      地址的编辑
        $(document).on('click', '.update-address', function (e) {
            e.stopPropagation();

            var shippingId = $(this).parents('.address-item').data('id');
            // 读取一条 地址信息
            _address.getAddress(shippingId, function (res) {
                // 如果 成功的话 打开弹窗
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                })
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            })

        })

        //  地址的删除
        $(document).on('click', '.delete-address', function (e) {
            e.stopPropagation();

            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确定要删除该地址吗')) {
                _address.deleteAddress(id, function (res) {
                    //     成功的话 重新加载列表
                    _this.loadAddressList();
                }, function (errMsg) {
                    _mm.errorTips(errMsg);

                });
            }
        })

    },
//  加载 地址列表
    loadAddressList: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');

        // 获取 地址 列表
        _address.getAddressList(function (res) {
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<p class="err-tips">地址加载失败、请刷新后再试</p>');

        })
    },
    //  处理 地址列表中选中状态
    addressFilter: function (data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, len = data.list.length; i < len; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            //  如果以前选中的地址不在列表中、将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    //  加载商品清单 列表
    loadProductList: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取 地址 列表
        _order.getProductList(function (res) {
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<p class="err-tips">商品信息加载失败、请刷新后再试</p>');

        })
    },
// filter  管理 数据
    filter: function (data) {
        //  强制转换成布尔型
        data.notEmpty = !!data.cartProductVoList.length;
    },
// 显示错误信息
    showCartError: function () {
        $('.page-wrap').html('<p class="err-tips">哪里不对了、刷新试试吧</p>');
    }

}
$(function () {
    page.init();
})
