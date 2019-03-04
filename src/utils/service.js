/**
 * @description: 服务类工具
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-02-25 09:42:58 
 */
'use strict';

(function (window) {
    var s = {}; 

    /********************************************* 统一处理 ***************************************************/

    /**
     * @description 返回首页
     */
    s.goHome = function(){
        window.location.href = './index.html';
    };

    /**
     * @description 统一登录处理
     * @param {Boolean} isReferrer 是否需要跳回，默认false
     * @param {String} referrerURL 登录成功之后跳回的地址，默认当前页面路径
     */
    s.doLogin = function(isReferrer, referrerURL){
        if(isReferrer){
            return _util.url.jumpFromReferrer('./login.html', referrerURL);
        }
        window.location.href = './login.html';
    };

    /**
     * @description 成功提示
     */
    s.successTip = function(msg){
        alert(msg);
    };

    /**
     * @description 错误提示
     */
    s.errorTip = function(msg){
        alert(msg);
    };

    /********************************************* api 请求 ***************************************************/

    s.api = {};

    /**
     * @description 异步请求（以 jQuery 为例）
     * @param {Object} param 请求参数
     */
    s.ajax = function(param){
        $.ajax({
            type : param.method || 'POST',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function(res){
                var data = res.data || '';
                var msg = res.message || '';
                if(res.status === 'SUCCESS'){
                    typeof param.success === 'function' && param.success(data, msg);
                }
                else if(res.status === 'ERROR'){
                    if(typeof param.error === 'function'){
                        return param.error(msg);
                    }
                    return s.errorTip(msg);
                }
            },
            error : function(err){
                var msg = (err && err.statusText) ? err.statusText : '请求错误';
                if(typeof param.error === 'function'){
                    return param.error(msg);
                }
                return s.errorTip(msg);
            }
        });
    };

    /**
     * @description 获取URL请求的地址
     * @param {String} name 
     */
    s.api.url = function(name){
        // return
    };

    /**
     * @description 创建标准的查询条件对象
     * @param search_data 查询条件
     * @param search_data_operator 查询条件比较符
     * @param page_data 分页对象
     * @param order_data 排序字段
     * @param ignoreFields 忽略掉的字段
     * @returns {Object} 标准的查询条件对象
     */
    s.api.buildParams = function(search_data, search_data_operator, page_data, order_data, ignoreFields){
        var params = {
            filter_fields: [],
            order_fields: [],
            page_size: -1,
            page_index: -1
        };
        // 处理参数

        return params;
    };

    /********************************************* user 用户 ***************************************************/

    s.user = {};

    /**
     * @description 初始用户信息
     * @param {Object} user 
     */
    s.user.init = function (user) {
        var expireDays = 0.25; // cookie过期时间 默认6小时；如果记住密码，则7天

        _util.cookie.set('user_id', user.userId, expireDays);
        _util.cookie.set('user_name', user.userName, expireDays);
        _util.cookie.set('is_login', '1', expireDays);
    };

    /**
     * 用户登入
     */
    s.user.login = function (data) {
        s.ajax({
            url: 'service/userService/checkToken',
            data: data,
            success: function(res){
                s.user.init(res.data.user);
            }
        });
    };
    
    /**
     * 用户登出
     */
    s.user.logout = function () {
        s.ajax({
            url: 'service/userService/logout',
            success: function(res){
                // 清空本地存储
                _util.cookie.remove('userId');
                _util.cookie.remove('username');
                _util.cookie.remove('is_login');
                _util.storage.clear();
            }
        });
    };

    /**
     * 判断用户是否登陆
     */
    s.user.isLogin = function () {
        return _util.cookie.get('is_login') == 1;
    };

    /********************************************* menu 菜单 ***************************************************/

    s.menu = {};

    window._sv = s;
})(window);
