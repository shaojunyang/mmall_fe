/*
 * @Author: shaojunyang
 * @Date:   2017-12-10 00:32:42
 * @Last Modified by:   shaojunyang
 * @Last Modified time: 2017-12-10 10:34:12
 */

var __mm = require('util/mm.js');
//
// console.log("__mm:", __mm);
//
// var  a=__mm.getUrlParam('test');
// console.log("a:" , a);
// console.log(__mm.constructor.toString());

 require('page/common/header/index.js');
 require('page/common/nav/index.js');
 var navSide =require('page/common/nav-side/index.js');

 navSide.init({
     name:'order-list'
 });