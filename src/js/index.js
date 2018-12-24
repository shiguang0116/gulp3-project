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
    init : function(){
        this.check_util();
        this.check_es6();
        this.bindEvent();
        this.queryPage();
    },
    check_util : function(){
        util.cookie.remove('name')
        util.storage.set('name', this.data)
        
        console.log(util.storage.get('name').name)
        console.log(util.browser.type())
    },
    check_es6 : function(){
        const foo = () => {
            this.data = Object.assign(this.data, {
                age: '18'
            });
        };
        foo();
        var values = Object.values(this.data);
        $('.es6 span').html(values);
    },
    bindEvent : function(){
        const self = this;
        
    },
    queryPage : function(){
        // util.ajax({
            // url: '/product/list',
        // });
    }
};

$(function(){
    $('#indexPage').length && indexPage.init();
})