// 'use strict';

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
    var keys = Object.keys(data);
    $('.box').html(keys);
});