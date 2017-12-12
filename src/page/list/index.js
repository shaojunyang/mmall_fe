/**
 * author :  yangshaojun
 * create time : 2017-12-12 11:52
 */
require('./index.css');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var Pagination = require('util/pagination/index.js');

require('page/common/header/index.js');
require('page/common/nav/index.js');

var page = {
    data: {
        //  参数
        listParam: {
            keyword: _mm.getUrlParam("keyword") || '',
            categoryId: _mm.getUrlParam("categoryId") || '',
            orderBy: _mm.getUrlParam("orderBy") || 'default',
            pageNum: _mm.getUrlParam("pageNum") || 1,
            pageSize: _mm.getUrlParam("pageSize") || 10
        }
    },
    // 初始化
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    //  绑定事件
    bindEvent: function () {
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function () {
            var $this = $(this);
            //  点击排序 page置为1
            _this.data.listParam.pageNum = 1;

            //  点击默认排序
            if ($this.data('type') == 'default') {
                //  如果已经是active样式
                if ($this.hasClass('active')) {
                    return;
                } else {
                    //   没有 active样式
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }

                //  点击价格排序
            } else if ($this.data('type') == 'price') {
                //     active类的处理
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序降序处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }

            //     重新加载列表
            _this.loadList();

        })
    },
    //  加载列表
    loadList: function () {
        var _this = this;
        var listHtml = '';
        var listParam = this.data.listParam;

        var $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');

        //   三元操作符 删除参数中不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

        //  请求接口
        _product.getProductList(listParam, function (res) {
            //         成功的话渲染html
            // debugger;
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            //     放入 容器中
            $pListCon.html(listHtml);
            //     加载分页信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prevPage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages

            });
        }, function (errMsg) {
            _mm.errorTips(errMsg);
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
                _this.loadList();
            }
        }))
    }
}
$(function () {
    page.init();
})

