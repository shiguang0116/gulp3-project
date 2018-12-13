/**
 * @description: 首页
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:35:35 
 */
'use strict';

$(function(){
    var data = {
        name: 'index'
    };
    const foo = () => {
        data = Object.assign(data, {
            age: '18'
        });
    };
    foo();
    var values = Object.values(data);
    $('.es6 span').html(values);
});