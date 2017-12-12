/**
 * author :  yangshaojun
 * create time : 2017-12-12 16:22
 */


require('./index.css');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

require('page/common/header/index.js');
require('page/common/nav/index.js');


var page = {
    data: {
        //  参数
        productId: _mm.getUrlParam('productId') || ''

    },
// 初始化
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //  如果没有传 商品id 、跳回首页
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
//  绑定事件
    bindEvent: function () {
        var _this = this;
        // 因为是通过异步接口绑定的事件、
        // 所以页面渲染完、绑定事件绑不上
        //      需要使用事件代理
        //    图片预览
        $(document).on('mouseenter', '.p-img-item', function () {
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        })
        $(document).on('mouseleave', '.p-img-item', function () {
            var mainImageUrl = $('.p-img-item').eq(0).find('.p-img').attr('src');
            $('.main-img').attr('src',mainImageUrl);
        })

        //     加减库存 操作
        $(document).on('click', '.p-count-btn', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus';
            var $pCount = $('.p-count');
            var currCount = parseInt($pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        })

        //     加入购物车
        $(document).on('click', '.cart-add', function (e) {
            e.preventDefault();
            _cart.addToCart({
                productId: _this.data.productId,
                count: parseInt($('.p-count').val())
            }, function (res) {

                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                // _mm.errorTips(errMsg.msg);
            })
        })
    },
//  加载 商品详情
    loadDetail: function () {
        var $pageWrap = $('.page-wrap');
        //  loading
        $pageWrap.html('<div class="loading"></div>');
        var _this = this;
        var html = '';
        //  请求 detail 信息
        _product.getProductDetail(this.data.productId, function (res) {
            //         成功
            //  过滤返回的数据
            _this.filter(res);
            //  缓存 detail的数据
            _this.data.detailInfo = res;
            // renderHtml
            html = _mm.renderHtml(templateIndex, res);
            //     把渲染好的html放入容器
            $pageWrap.html(html);
        }, function (errMsg) {
            //  失败
            $pageWrap.html('<p class="err-tips">此商品太淘气、找不到了 </p>');
        })


    },
    // filter  管理 数据
    filter: function (data) {
        data.subImages = data.subImages.split(',');
    }

}
$(function () {
    page.init();
})
