/**
 * author :  yangshaojun
 * create time : 2017-12-12 14:41
 */


require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');


var Pagination = function () {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }

//      事件的处理
    $(document).on('click', '.pg-item', function () {
        var $this = $(this);
        //  对于disabled 和 actice按钮点击 不做处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
    })

}
//  渲染分页 组件
Pagination.prototype.render = function (userOption) {
    //  合并 option
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断 容器是否为合法的jq对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //  判断是否 只有 1页
    if (this.option.pages <= 1) {
        return;
    }
//     渲染分页
    this.option.container.html(this.getPaginationHtml());
}

//  获取 分页 的 html
Pagination.prototype.getPaginationHtml = function () {

    // |上一页 | 1 2 3 4 5 6 |下一页| 5/ 6

    var html = '';
    var pageArray = [];
    var option = this.option;
    var start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
    var end = option.pageNum + option.pageRange > option.pages ? option.pages : option.pageNum + option.pageRange;
    //  上一页 按钮数据
    pageArray.push({
        name: '上一页',
        value: this.option.prevPage,
        disabled: !this.option.hasPreviousPage

    })
//      页码数字按钮处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)

        })
    }

    //  上一页 按钮数据
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    })


    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    })
    return html;


}


module.exports = Pagination;
