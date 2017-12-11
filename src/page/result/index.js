/**
 * author :  yangshaojun
 * create time : 2017-12-11 14:42
 */

// 引入样式

require('./index.css');
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js');

// 操作结果页展示 、根据不同的结果 展示不同的页面内容
$(function () {
    var type = _mm.getUrlParam('type') || 'default';
    var $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
