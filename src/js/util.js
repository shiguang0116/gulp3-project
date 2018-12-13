/**
 * @description: 通用工具类
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:38:27 
 */
'use strict';

(function (window) {
    var u = {};
    
    function uzStorage() {
        var ls = window.localStorage;
        if (u.isAndroid) {
            ls = os.localStorage();
        }
        return ls;
    };

    /******************************************** 本地储存 **************************************************/
    
    u.storage = {};

    /**
     * @description 设置本地储存
     * @param {String} key 储存的名字
     * @param {*} value 储存的值
     */
    u.storage.set = function (key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    };
    /**
     * @description 获取本地储存的数据
     * @param {String} key 要获取的数据对应的名字
     */
    u.storage.get = function (key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) { return; }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    };
    /**
     * @description 删除本地储存中某些数据
     * @param {String} key 要删除的数据对应的名字
     */
    u.storage.remove = function (key) {
        var ls = uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };
    /**
     * @description 清空本地储存的所有数据
     */
    u.storage.clear = function () {
        var ls = uzStorage();
        if (ls) {
            ls.clear();
        }
    };

    /********************************************* 缓存 ***************************************************/

    u.cookie = {};

    /**
     * @description 设置缓存
     * @param {String} name 缓存数据的名字
     * @param {*} value 缓存数据的值
     * @param {Number} expiredays 缓存数据的时间（天）
     */
    u.cookie.set = function (name, value, expiredays) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + u.parseInt(expiredays * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    };
    /**
     * @description 获取缓存的数据
     * @param {String} name 要获取的数据对应的名字
     */
    u.cookie.get = function (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=');
            if (temp[0] == name) {
                return unescape(temp[1]);
            }
        }
        return null;
    };
    /**
     * @description 删除缓存中某些数据
     * @param {String} name 要删除的数据对应的名字
     */
    u.cookie.remove = function (name) {
        u.setcookie(name, '', -1);
    };
    
    /******************************************** 字符串 ***************************************************/
    
    u.string = {};

    /**
     * @description 去除字符串前后空格
     * @param {String} str
     * @return {String} 去除空格之后的字符串
     */
    u.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    /**
     * @description 去除字符串所有空格
     * @param {String} str
     * @return {String} 去除空格之后的字符串
     */
    u.trimAll = function (str) {
        return str.replace(/\s*/g, '');
    };

    window.util = u;
})(window);