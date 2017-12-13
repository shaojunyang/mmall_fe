/**
 * author :  yangshaojun
 * create time : 2017-12-11 23:56
 */


require('./index.css');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');

var Pagination = require('util/pagination/index.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    // 初始化
    init: function () {
        // 调用 事件方法
        this.onLoad();
    },
    onLoad: function () {
        //  初始化左侧菜单
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderList();
    },
    // 加载订单列表
    loadOrderList: function () {

        var orderListHtml = '',
            _this = this,
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        //     请求
        _order.getOrderList(this.data.listParam, function (res) {

            //   渲染 html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            //      把html放入容器
            $listCon.html(orderListHtml);

            //     加载分页 信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prevPage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
        }, function (errMsg) {
            $listCon.html('<p class="err-tips">加载订单失败.  刷新之后重试</p>');
        });
    },
    //  加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? ' ' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }))
    }
}

$(function () {
    page.init();
})
