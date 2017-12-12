/*
 * @Author: shaojunyang
 * @Date:   2017-12-10 00:32:42
 * @Last Modified by:   shaojunyang
 * @Last Modified time: 2017-12-10 10:34:12
 */

var _mm = require('util/mm.js');
require('./index.css');
require('util/slider/index.js');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');

//  模板
var templateBanner = require('./banner.string');

$(function () {
    //  渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化 banner
    var $slider = $('.banner').unslider({
        dots: true
    });
//     前一张后遗症
    $('.banner-con .banner-arrow').on('click', function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
});

