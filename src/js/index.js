/*
 * @Author: guang.shi 
 * @Date: 2018-12-01 19:22:31 
 * @Last Modified by:   guang.shi 
 * @Last Modified time: 2018-12-01 19:22:31 
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