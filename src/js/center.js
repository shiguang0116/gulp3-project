/**
 * @description: 个人中心
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:35:57 
 */
'use strict';

const page = new Page({
    el: 'center_page',
    data : {
        name: 'center'
    },
    bindEvent(){
        const self = this;
        $('#btn').click(function(){
            _util.url.jumpToReferrer();
        })
    },
    onLoad(){
        
    },
    init(){
        console.log(this.data);

        this.bindEvent();
        this.onLoad();
    }
});