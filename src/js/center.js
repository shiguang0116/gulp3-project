/**
 * @description: 个人中心
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:35:57 
 */
'use strict';

const centerPage = {
    data : {
        name: 'center'
    },
    bindEvent(){
        const self = this;
        
    },
    onLoad(){
        
    },
    init(){
        console.log(this.data);

        this.bindEvent();
        this.onLoad();
    }
};

$(function(){
    $('#centerPage').length && centerPage.init();
})