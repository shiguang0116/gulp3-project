/**
 * @description: 首页
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:35:35 
 */
'use strict';

const indexPage = {
    data : {
        name: 'index'
    },
    checkUtil(){
        util.cookie.remove('name') 
        util.storage.set('name', this.data)
        
        console.log(util.storage.get('name').name)
        console.log(util.browser.type())
    },
    checkEs6(){
        const foo = () => {
            this.data = Object.assign(this.data, {
                age: '18'
            });
        };
        foo();
        var values = Object.values(this.data);
        $('.es6 span').html(values);
    },
    bindEvent(){
        const self = this;
        
    },
    onLoad(){
        // util.ajax({
            // url: '/product/list',
        // });
    },
    init(){
        this.checkUtil();
        this.checkEs6();
        this.bindEvent();
        this.onLoad();
    }
};

$(function(){
    $('#indexPage').length && indexPage.init();
})