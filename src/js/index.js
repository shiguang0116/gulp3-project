/**
 * @description: 首页
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:35:35 
 */
'use strict';

const page = {
    el: 'indexPage',
    data: {
        name: 'indexName',
        user: {
            name: 'sg',
            age: '23',
        }
    },
    checkUtil(){
        _util.cookie.remove('name') 
        _util.storage.set('user', this.data.user)
        
        console.log(_util.storage.get('user'))
        console.log(_util.browser.type())
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
    click1(){
        console.log('onclick1');
    },
    events(){
        const self = this;
        $('#btn').click(function(){
            _util.url.jumpFromReferrer('./center.html');
        })
    },
    init(){
        this.checkUtil();
        this.checkEs6();
    }
};

$(function(){
    Page(page);
});

/**
 * @description 页面构建
 * @param {Object} param 参数对象
 */
function Page(param){
    if(param.el && !document.getElementById(param.el)) return false;
    param.init();
    param.events();
}
