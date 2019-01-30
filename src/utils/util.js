/**
 * @description: 通用工具类
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-12-13 15:38:27 
 */
'use strict';

(function (window) {
    var u = {}; 

    /********************************************* cookie 缓存 ***************************************************/

    u.cookie = {};

    /**
     * @description 设置缓存
     * @param {String} name 缓存数据的名字
     * @param {*} value 缓存数据的值
     * @param {Number} expiredays 缓存数据的时间（天），默认 7 天
     */
    u.cookie.set = function (name, value, expiredays) {
        expiredays = expiredays || 7;
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
    };

    /**
     * @description 获取缓存的数据
     * @param {String} name 要获取的数据对应的名字
     * @return {*}
     */
    u.cookie.get = function (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=');
            if (temp[0] == name) return unescape(temp[1]);
        }
        return null;
    };
    
    /**
     * @description 删除缓存中某些数据
     * @param {String} name 要删除的数据对应的名字
     */
    u.cookie.remove = function (name) {
        u.cookie.set(name, '', -1);
    };
    
    /******************************************** localStorage 本地储存 **************************************************/
    
    u.storage = {};
    
    /**
     * @description 获取localStorage对象，兼容android（android原生系统老系统不支持localstorage）
     * @return localStorage对象
     */
    function uzStorage() {
        var ls = window.localStorage;
        if (u.browser.isAndroid()) {
            ls = os.localStorage();
        }
        return ls;
    }

    /**
     * @description 设置本地储存
     * @param {String} key 储存的名字
     * @param {*} value 储存的值
     */
    u.storage.set = function (key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v === 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) ls.setItem(key, v);
        }
    };

    /**
     * @description 获取本地储存的数据
     * @param {String} key 要获取的数据对应的名字
     * @return {*}
     */
    u.storage.get = function (key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) return;
            if (v.indexOf('obj-') === 0) return JSON.parse(v.slice(4));
            else if (v.indexOf('str-') === 0)  return v.slice(4);
        }
    };

    /**
     * @description 删除本地储存中某些数据
     * @param {String} key 要删除的数据对应的名字
     */
    u.storage.remove = function (key) {
        var ls = uzStorage();
        if (ls && key) ls.removeItem(key);
    };

    /**
     * @description 清空本地储存的所有数据
     */
    u.storage.clear = function () {
        var ls = uzStorage();
        if (ls) ls.clear();
    };
    
    /******************************************** 数据类型 ***************************************************/

    /**
     * @description JavaScript 数据类型
     * 
     * 基本类型        string number boolean null undefined
     * 引用类型        array object function date 等
     * 强制类型转换     Number() String() Boolean()
     * 
     * typeof       返回一个字符串 'undefined' 'boolean' 'number' 'string' 'function' 'symbol' 'object'
     * toString()   转化为字符串
     * 
     * @description JavaScript 全局函数
     * 
     * isNaN()      判断元素是否为非数字，是数字则为false（包括 number 类型 和 由数字组成的 string 类型）
     * parseInt()   解析一个字符串并返回一个整数 或 NaN
     * parseFloat() 解析一个字符串并返回一个浮点数 或 NaN
     * escape()	    对字符串进行编码
     * unescape()   对字符串进行解码
     */

    /**
     * @description 判断元素是否为字符串
     * @param {*} source 
     * @return {Boolen}
     */
    u.isString = function (source) {
        return typeof (source) === 'string';
    };

    /**
     * @description 判断元素是否为数组
     * @param {*} source 
     * @return {Boolen}
     */
    u.isArray = function (source) {
        if (Array.isArray) return Array.isArray(source);
        else return source instanceof Array;
    };

    /**
     * @description 判断元素是否为对象
     * @param {*} source 
     * @return {Boolen}
     */
    u.isObject = function (source) {
        return Object.prototype.toString.call(source) === '[object Object]';
    };

    /**
     * @description 判断元素是否为函数
     * @param {*} source 
     * @return {Boolen}
     */
    u.isFunction = function (source) {
        return typeof (source) === 'function';
    };

    /**
     * @description 判断元素是否为空
     * @param {*} source 
     * @return {Boolen}
     */
    u.isEmpty = function (source) {
        if (source == undefined || source == null) return true;
        if (u.isString(source)) return source.length == 0;
        if (u.isArray(source)) return source.length == 0;
        if (u.isObject(source)) return JSON.stringify(source) === '{}';
        else return source.toString().length == 0;
    };

    /**
     * @description 判断元素的长度
     * @param {*} source 
     * @return 
     */
    u.length = function (source) {
        if (source == undefined || source == null) return 0;
        if (u.isString(source)) return source.length;
        if (u.isArray(source)) return source.length;
        if (u.isObject(source)) {
            var len = 0;
            for(var key in source){
                len ++;
            }
            return len;
        }
    };

    /**
     * @description 遍历数组、对象
     * @param {*} source 对象或数组，（字符串也适用）
     * @param {Function} func 执行函数，function(i, item) 或 function(key, value)。执行函数返回 false 时，循环终止。
     */
    u.forEach = function (source, func) {
        if (u.isEmpty(source)) return;
        if (typeof (func) != "function") return;
        var i = 0;
        for (var ikey in source) {
            var flag = func.apply(window, [(typeof (source) === "object" ? ikey : i++), source[ikey]]);
            if (flag == false) break;
        }
    };
    
    /******************************************** string 字符串 ***************************************************/
    
    /**
     * @description string 常用方法
     * 
     * indexOf(searchvalue, fromindex);     检索字符串。返回某个指定的字符串值在字符串中首次出现的位置，没有则返回 -1
     * charAt(index);                       返回指定位置的字符，如果参数 index 不在 0 与 length 之间，则返回一个空字符串
     * sub();	                            把字符串显示为下标。
     * substr(start, length);               从起始索引号提取字符串中指定数目的字符。返回一个新的字符串，包含从 start（包括start）开始的 length 个字符。如果没有指定length，那么返回的字符串包含从 start 到结尾的字符。start 可以为负数（-1表示最后一个字符）
     * substring(start, stop);	            提取字符串中两个指定的索引号之间的字符。返回一个新的字符串，包含从 start 处到 stop-1 处的所有字符，其长度为 stop 减 start。
     * slice(start, end);                   提取字符串中两个指定的索引号之间的字符。返回一个新的字符串，包含从 start 处到 stop-1 处的所有字符，其长度为 stop 减 start。（参数可谓负数，-1 表示最后一个字符）
     * split(separator, howmany);           把字符串分割为字符串数组。返回一个字符串数组
     * replace(regexp/substr, replacement); 在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
     * toLowerCase();	                    把字符串转换为小写
     * toUpperCase();	                    把字符串转换为大写
     */

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

    /**
    * @description 判断两个字符串是否相等
    * @param {string} str1 
    * @param {string} str2 
    * @param {boolen} ignoreCase 是否忽略掉大小写，不传则为false
    */
    u.string.equal = function (str1, str2, ignoreCase) {
        if (u.isEmpty(str1) && u.isEmpty(str2)) return true;
        if (ignoreCase) {
            str1 = String.prototype.toLowerCase.call(str1);
            str2 = String.prototype.toLowerCase.call(str2);
        }
        return str1 == str2;
    };

    /**
     * @description 判断字符串是否以指定字符串开头
     * @param {String} str 源字符串
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写，默认false
     * @return {Boolean} 
     */
    u.string.isStartWith = function (str, searchString, ignoreCase) {
        if (str == null || str == undefined) return false;
        var preSubStr = str.substr(0, searchString.length) + '';
        if (ignoreCase) {
            preSubStr = preSubStr.toLowerCase();
            searchString = (searchString + '').toLowerCase();
        }
        return preSubStr === searchString;
    };

    /**
     * @description 判断字符串是否以指定字符串结束
     * @param {String} str 源字符串
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写，默认false
     * @return {Boolean} 
     */
    u.string.isEndWith = function (str, searchString, ignoreCase) {
        if (str == null || str == undefined) return false;
        var lastSubStr = str.substr(str.length - searchString.length, searchString.length) + '';
        if (ignoreCase) {
            lastSubStr = lastSubStr.toLowerCase();
            searchString = (searchString + '').toLowerCase();
        }
        return lastSubStr === searchString;
    };

    /**
     * @description 首字母小写
     */
    u.string.firstLowerCase = function (str) {
        if (u.isEmpty(str)) return str;
        return str.replace(/^\S/, function (s) { return s.toLowerCase(); });
    };

    /**
     * @description 首字母大写
     */
    u.string.firstUpperCase = function (str) {
        if (u.isEmpty(str)) return str;
        return str.replace(/^\S/, function (s) { return s.toUpperCase(); });
    };

    /**
    * @description 以指定的分割符分割字符串
    * @param {string} source 源字符串
    * @param {string} separator 分隔符
    * @param {boolen} ignoreSpaceOrEmpty 是否忽略掉空白，不传则为false
    */
    u.string.split = function (source, separator, ignoreSpaceOrEmpty) {
        if (u.isEmpty(source)) return [];

        var items = source.split(separator);
        if (ignoreSpaceOrEmpty) {
            var tmp = [];
            u.forEach(items, function (i, item) {
                item = u.trim(item);
                if (u.isEmpty(item)) return;
                tmp.push(item);
            });
            items = tmp;
        }
        return items;
    };

    /**
     * @description 字母和数字混合的编号自加1
     * @param {String} code 编号，字符串。例：'XM0001'
     * @param {String} xyz 不需要变动的字符串。例：'XM'
     * @return {String} 编号+1。例：'XM0002'
     */
    u.string.getNext = function (code, xyz){
        var count = code.split(xyz)[1];
        var newCount = (parseInt(count)+1).toString();
        var zeroLen = count.length - newCount.length;
        var zero = '';
        for(var i = 0; i< zeroLen; i++){
            zero += '0';
        }
        return xyz + zero + newCount;
    };

    /**
     * @description 复制文本
     * @param text {String} 需要复制的文本内容
     */
    u.string.copy = function (text) {
        var input = window.document.createElement('input');
        input.value = text;
        input.select();
        window.document.execCommand("copy");
    };
    
    /********************************************* number 数字 ***************************************************/

    /**
     * @description number 常用方法
     * 
     * toFixed(x)	    把数字转换为字符串，结果为小数点后有指定位数的数字。
     * 
     * @description Math 对象常用方法
     * 
     * ceil(x)	    上舍入
     * floor(x)	    下舍入
     * round(x)	    四舍五入
     * random()	    返回 0 ~ 1 之间的随机数
     * pow(x,y)	    返回 x 的 y 次幂
     * max(x,y,z,...,n)	    返回 x,y,z,...,n 中的最高值
     * min(x,y,z,...,n)	    返回 x,y,z,...,n 中的最低值
     */

    u.number = {};
    
    /**
     * @description 转换成int类型
     * @param {String Number} input 输入的数
     * @param {Number} defaultValue 转换失败时的默认值
     * @return {int}
     */
    u.number.parseInt = function (input, defaultValue) {
        var value = parseInt(input);
        if (isNaN(value) || Infinity == value) {
            defaultValue = defaultValue || 0;
            return defaultValue;
        }
        return value;
    };

    /**
     * @description 转换成float类型
     * @param {String Number} input 输入的数
     * @param {Number} defaultValue 转换失败时的默认值
     * @return {float}
     */
    u.number.parseFloat = function (input, defaultValue) {
        var value = parseFloat(input);
        if (isNaN(value) || Infinity == value) {
            defaultValue = defaultValue || 0;
            return defaultValue;
        }
        return value;
    };

    /**
     * @description 使用定点表示法来格式化一个数
     * @param {String Number} input 输入的数
     * @param digits 小数位数，默认0
     * @return {String}
     */
    u.number.toFixed = function (input, digits) {
        input = u.number.parseFloat(input, 0);
        if (input == 0) return 0;
        return input.toFixed(digits || 0);
    };

    /**
     * @description 两数相乘
     * @param {Number String} arg1 乘数
     * @param {Number String} arg2 乘数
     * @return {Number} 积
     */
    u.number.mul = function (arg1, arg2){
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try{ m += s1.split(".")[1].length; } catch(e){}
        try{ m += s2.split(".")[1].length; } catch(e){}    
        return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m);
    };

    /**
     * @description 两数相加
     * @param {Number String} arg1 加数
     * @param {Number String} arg2 加数
     * @return {Number} 和
     */
    u.number.add = function (arg1, arg2){
    	var r1, r2, m;
    	try{ r1 = arg1.toString().split(".")[1].length; } catch(e){ r1=0; }
    	try{ r2 = arg2.toString().split(".")[1].length; } catch(e){ r2=0; }
    	m = Math.pow(10, Math.max(r1,r2));
    	return (arg1*m + arg2*m) / m;
    };

    /**
     * @description 获取两个数之间的随机数
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     */
    u.number.getRandom = function (min, max) {
        var random = 0;
        random = min + Math.random() * (max - min);
        return Math.round(random);
    };
    
    /********************************************* array 数组 ***************************************************/
    
    /**
     * @description 字符串常用方法
     * 
     * push()	            向数组的末尾添加一个或更多元素，并返回新的长度。
     * unshift()	        向数组的开头添加一个或更多元素，并返回新的长度。
     * shift()	            删除并返回数组的第一个元素。
     * pop()	            删除并返回数组的最后一个元素。
     * splice(index,howmany,itemX)  从数组中添加或删除元素。
     * slice(start, end)	        返回一个新的数组，包含从 start 到 end （不包括该元素）的数组中的元素。
     * reverse()	                反转数组的元素顺序。
     * sort(sortby)	                对数组的元素进行排序。如果不传参数则按照字符编码的顺序
     * forEach(function(item, index){})             调用数组的每个元素，并将元素传递给回调函数。（*** 不能break）
     * filter(function(item, index){ return *** })  返回一个新的数组，新数组中的元素是 return true 的所有元素。不会改变原始数组
     */
    
    u.array = {};

    var arr1 = [1,['w','q','r'],['q','w']];
    var arr3 = [2,['w','q','r'],['q','w']];
    // var arr1 = ['w','q','r'];
    // var arr3 = ['w','q','r'];

    var arr2 = [
        { status: '1',id:'a' },
        { status: '1',id:'a' },
        { status: '1',id:'b' },
        { status: '2',id:'b' },
        { status: '3',id:'c' },
    ];

    /**
    * @description 判断两个数组是否相等
    * @param {Array} arr1 
    * @param {Array} arr2 
    * @param {Boolean} ignoreSort 是否忽略排序，不传则为false
    * @return {Boolean} 是否相等
    */
    u.array.equal = function (arr1, arr2, ignoreSort) {
        if (!u.isArray(arr1) || !u.isArray(arr2)) return;
        if(arr1.length != arr2.length) return false;
        if(ignoreSort){
            arr1.sort();
            arr2.sort();
        }
        u.forEach(arr1, function(i, item){
            if(u.isArray(item) && u.isArray(arr2[i])){
                u.array.equal(item, arr2[i]);
            }
            else if(u.isObject(item) && u.isObject(arr2[i])){
                u.object.equal(item, arr2[i]);
            }
            else{
                u.string.equal(item, arr2[i]);
            }
        });
        return arr1 == arr2;
    };
    u.equal = function (source1, source2, ignoreCase, ignoreSort) {
        var equal = true;
        // 同为数组或同为对象
        if((u.isArray(source1) && u.isArray(source2)) || (u.isObject(source1) && u.isObject(source2))){
            if(u.isArray(source1)){
                if(source1.length != source2.length) return false;
                if(ignoreSort){
                    source1.sort();
                    source2.sort();
                }
            }else{
                if(u.object.length(source1) != u.object.length(source2)) return false;
            }

            u.forEach(source1, function(ikey, item){
                return u.equal(item, source2[ikey], ignoreCase, ignoreSort);
            });
            return equal;
        }
        // 字符串
        else{
            if (ignoreCase) {
                source1 = String.prototype.toLowerCase.call(source1.toString());
                source2 = String.prototype.toLowerCase.call(source2.toString());
            }
            if(source1 != source2) equal = false;
            return equal;
        }
        // return equal;
    };
    console.log(u.equal(arr1,arr3));

    /**
     * @description 检索数组
     * @param {Array} source [''] [{}]
     * @param {*} searchElement '' 或 [''] 或 {id:'a'}
     * @return {Number} 索引或-1
     */
    u.array.indexOf = function(source, searchElement){
        var index = -1;
        // 元素为对象
        if(u.isObject(searchElement)){
            u.forEach(source, function(i, item){
                var searchValueString = '';
                var itemValueString = '';
                u.forEach(searchElement, function(searchKey, searchValue){
                    searchValueString += searchValue;
                    itemValueString += item[searchKey];
                });
                if(itemValueString == searchValueString){
                    index = i;
                    return false;
                }
            });
            return index;
        }
        // 元素为数组
        if(u.isArray(searchElement)){
            u.forEach(source, function(i, item){
                // if(item == searchElement){
                //     index = i;
                //     return false;
                // }
            });
            return index;
        }
        // 元素为字符串
        else{
            return source.indexOf(searchElement);
        }
    };
    // console.log(u.array.indexOf(arr1, ['w','q','r']));

    /**
     * @description 数组去重（字符串或对象）
     * @param {Array} array [''] [{}]
     * @param {String Array} keys '' ['']
     * @return {Array} 新数组 
     */
    u.array.unique = function(array, keys){
        var ret = []; 
        u.forEach(array, function(i, item){
            if(keys){ //根据属性去重
                if (!u.isArray(keys)) keys = [keys];
                var searchProperties = u.object.selectProperties(item, keys);
                if(u.array.indexOf(ret, searchProperties) == -1) ret.push(item);
            }
            else{
                if(u.array.indexOf(ret, item) == -1) ret.push(item);
            }
        });
        return ret;
    };
    // console.log(u.array.unique(arr1))

    /**
     * @description 筛选出符合条件的数组，生成新的数组
     * @param {Array} source 原数组 [{}]
     * @param {Object} filterProperty 条件对象 {status: ['1','2']}
     * @param {Boolean} getDeleteData 是否返回被过滤掉的数组，默认false
     * @return {Array} 新数组
     */
    u.array.filter = function (source, filterProperty, getDeleteData) {
        if (u.isEmpty(source) || u.isEmpty(filterProperty)) return [];

        var ret = [];
        var retByDelete = [];
        u.forEach(source, function (i, item) {
            var equal = true;
            u.forEach(filterProperty, function (filterKey, filterValue) {
                var itemValue = item[filterKey];
                if (!u.isArray(filterValue)) filterValue = [filterValue];
                if (filterValue.indexOf(itemValue) == -1) {
                    equal = false;
                    return false;
                }
            });
            if (equal) ret.push(item);
            else retByDelete.push(item);
        });
        if(getDeleteData) return retByDelete;
        return ret;
    };

    /**
     * @description 选择数组中的一个（多个）属性
     * @param {Array} source 源数组 [{}]
     * @param {String Array} keys 属性（集合）
     * @return {Array} 新数组 [''] [{}]
     */
    u.array.selectProperties = function (source, keys) {
        if (!source) return [];
        if (u.isArray(source) || u.isEmpty(keys)) return source;

        var ret = [];
        u.forEach(source, function (i, item) {
            if (u.isArray(keys)) {
                var obj = {};
                u.forEach(keys, function (j, key) {
                    obj[key] = item[key];
                });
                ret.push(obj);
            }
            else {
                ret.push(item[keys]);
            }
        });
        return ret;
    };

    /**
     * @description 合并两个数组，生成新的数组
     * @param {Array} source 原数组
     * @param {Array} array 待合并的数组
     * @param {Array} keys 数组元素主键，如允许重复可不设置此参数
     * @return {Object} 
     */
    u.array.concat = function (source, array, keys) {
        if (u.isEmpty(source)) return array;
        if (u.isEmpty(array)) return source;
        if (!u.isArray(keys)) keys = [keys];

        var ret = [];
        if (keys && keys.length) {
            ret = source.concat([]);
            u.forEach(array, function (i, item) {
                var searchObj = {};
                u.forEach(keys, function (j, key) {
                    searchObj[key] = item[key];
                });

                //检查目标数组中是否存在该元素
                var obj = u.getByObject(source, searchObj);
                // u.object.selectProperties
                if (!obj) {
                    ret.push(item);
                }
            });
        }
        else {
            ret = source.concat(array);
        }
        return ret;
    };

    /**
     * @description 对数组中的元素进行分组
     * @param array 数组对象
     * @param fields 分组的依据字段
     * @return {Array} 分组后的新数组
     */
    u.array.group = function (array, fields) {
        var self = this;
        if (!array && !fields) return null;

        var result = [];
        self.forEach(array, function (i, item) {
            var itemGroup = {};
            var obj = {};
            fields.forEach(function (field, k) {
                obj[field] = item[field];
            });
            itemGroup = self.getByObject(result, obj);
            if (!itemGroup) {
                itemGroup = obj;
                itemGroup.group = [];
                result.push(itemGroup);
            }
            itemGroup.group.push(item);
        });
        return result;
    };

    /**
     * @description 对数组排序
     * @param sort 排序字段
     * @param order 排序方式，asc升序，desc降序，默认为升序
     * @return {Array} 排序后的新数组
     */
    u.array.sort = function (array, sort, order) {
        if (u.array.isEmpty(array)) return [];
        var result = array.concat([]);
        order = order || "asc";
        result.sort(function (a, b) {
            var aVal = a[sort];
            var bVal = b[sort];
            if (aVal > bVal) return order == "asc" ? 1 : -1;
            else if (aVal < bVal) return order == "asc" ? -1 : 1;
            return 0;
        });
        return result;
    };

    /**
     * 清空数组中的元素
     * @param array 待清空的数组
     */
    u.array.clear = function (array) {
        if (u.array.isEmpty(array)) return;

        array.splice(0, array.length);
    };

    /**
     * 方法可向数组的末尾添加一个或多个元素，并返回新的长度
     * @targetArray 目标数组
     * @array 要添加的数组
     */
    u.array.push = function (target, source) {
        if (!target || !source) return;
        if (!u.array.isArray(source)) source = [source];
        return Array.prototype.push.apply(target, source);
    };

    /**
     * 删除数组中的元素，并添加新的元素
     * @param array 原数组
     * @param item 待删除的对象
     * @param newItem 添加的新对象
     * @return 原数组
     */
    u.array.splice = function (array, item, newItem) {
        var index = -1;
        if (!u.array.isEmpty(array)) {
            index = array.indexOf(item);
            if (index == -1) {
                if (newItem != undefined) array.push(newItem);
            }
            else {
                if (newItem == undefined) array.splice(index, 1);
                else array.splice(index, 1, newItem);
            }
        }
        return index;
    };

    /**
     * @description 删除数组中不合法的值（undefined,null,空字符串）
     *
     */
    u.array.removeInvalidItems = function (array) {
        var i = array.length;
        while (i--) {
            var item = array[i];
            if (item === null || item === undefined || item === '') {
                array.splice(i, 1);
            }
        }
    };

    /**
     * 创建内置key
     * @param {*} array
     * @param {*} keyField
     */
    u.array.createInnerKey = function (array, keyField) {
        if (u.array.isEmpty(array)) return;
        keyField || (keyField = '__id');
        u.forEach(array, function (i, item) {
            item[keyField] = u.uuid();
        });
    };

    /********************************************* object 对象 ***************************************************/
    
    u.object = {};

    var obj = {
        id: 'a',
        status: '1',
        con: 'qwer',
    };

    /**
     * @description 选择数组中的一个（多个）属性
     * @param {Object} source 源数组 [{}]
     * @param {String Array} keys 属性（集合）
     * @return {Object} 新对象 
     */
    u.object.selectProperties = function (source, keys) {
        if (u.isEmpty(source) || u.isEmpty(keys)) return {};

        var ret = {};
        if (u.isArray(keys)) {
            u.forEach(keys, function (i, selectKey) {
                ret[selectKey] = source[selectKey];
            });
        }
        else {
            ret[keys] = source[keys];
        }
        return ret;
    };

    // 从对象中过滤出需要的字段
    u.object.getNeedData = function (needObj, obj){
        for(var key in needObj){
            obj[key] ? needObj[key] = obj[key] : '';
        }
    };

    u.object.clear = function (obj){
        for (var key in obj) {
            obj[key] = '';
        }
        return obj;
    };

    /**
     * @description 删除对象中的属性
     * @param obj 对象
     * @param propertyNames 属性数组
     * @return obj 对象
     */
    u.object.deleteProperties = function (obj, propertyNames) {
       if (!obj) return;
       if (!u.array.isArray(propertyNames)) propertyNames = [propertyNames];
       u.forEach(propertyNames, function (i, property) {
           try {
               delete obj[property];
           } catch (e) { }
       });
    };

    /**
     * @description 获取对象的属性值
     * @param obj 对象
     * @param propertyName 属性名
     * @param ignoreCase 忽略属性名大小写
     */
    u.object.getPropertyValue = function (obj, propertyName, ignoreCase) {
        var propertyValue = null;
        if (!obj) return propertyValue;
        if (u.isEmpty(propertyName)) return propertyValue;

        var pointIndex = propertyName.indexOf('.');
        var isMultiPart = pointIndex > -1;
        if (isMultiPart) {
            obj = obj[u.string.subString(propertyName, 0, pointIndex)];
            return u.object.getPropertyValue(obj, u.string.subString(propertyName, pointIndex + 1), ignoreCase);
        }

        u.forEach(obj, function (key, value) {
            if (u.string.equal(key, propertyName, ignoreCase)) {
                propertyValue = value;
                return false;
            }
        });
        return propertyValue;
    };
    
    //查找数组中符合条件的对象
    u.getByObject = function (array, paramObject) {
        if (array == undefined || array == null) { return };
        var equalFlag = false;

        for (var i = 0; i < array.length; i++) {
            equalFlag = true;
            var item = array[i];
            for (var property in paramObject) {
                if (u.object.getPropertyValue(item, property, true) != paramObject[property]) {
                    equalFlag = false;
                    break;
                }
            }

            if (equalFlag) {
                return array[i];
            }
        }
        return undefined;
    };

    //查找数组中符合条件的对象的索引
    u.getIndexByObject = function (array, paramObject) {
        if (array == undefined || array == null) { return };
        var equalFlag = false;
        var index = -1;

        for (var i = 0; i < array.length; i++) {
            equalFlag = true;
            var item = array[i];
            for (var property in paramObject) {
                if (item[property] != paramObject[property]) {
                    equalFlag = false;
                    break;
                }
            }

            if (equalFlag) {
                index = i;
                break;
            }
        }
        return index;
    };

    //序列化对象
    u.serialize = function (paramObj) {
        var self = this;
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in paramObj) {
            value = paramObj[name];
            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += self.serialize(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += self.serialize(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };

    /******************************************** date 时间 **************************************************/

    /**
     * @description 时间常用方法
     * Date.setMonth(month,day) 
     */

    u.date = {};

    /**
     * @description 获取需要的时间格式
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.format = function (time, format){
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';
        function tf(i){ return (i < 10 ? '0' : '') + i; }
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(a){  
            switch(a){  
                case 'YYYY':  
                    return tf(time.getFullYear());
                    // break;  
                case 'MM':  
                    return tf(time.getMonth() + 1);
                case 'DD':  
                    return tf(time.getDate());
                case 'mm':  
                    return tf(time.getMinutes());
                case 'hh':  
                    return tf(time.getHours());
                case 'ss':  
                    return tf(time.getSeconds());
            }  
        });
    };

    /**
     * @description 前后几月的日期
     * @param {Number} MM 前后几月（正数代表后几个月，负数代表前几个月），默认上个月（-1）
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.otherMonth = function (MM, time, format){
        MM = !isNaN(MM) ? MM : -1;
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';
        
        var DD = format.indexOf('DD') > -1 ? time.getDate() : '1' ;
        time.setMonth(time.getMonth()+MM, DD);
        return u.date.format(time, format);
    };

    /**
     * @description 当月的第一天
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.startOfMonth = function (time, format){
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';

        time.setMonth(time.getMonth(), 1);
        return u.date.format(time, format);
    };

    /**
     * @description 当月的最后一天
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.endOfMonth = function (time, format){
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';

        time.setMonth(time.getMonth()+1, 0);
        return u.date.format(time, format);
    };

    /**
     * @description 前后几周的日期
     * @param {Number} WW 前后几周（正数代表后几周，负数代表前几周），默认本周（0）
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {Array} ['当前周的第一天（星期一）', '当前周的最后一天（星期日）']
     */
    u.date.otherWeek = function (WW, time, format){
        WW = !isNaN(WW) ? WW : -1;
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';

        var ret = [];
        var curWW = time.getDay();
        curWW = curWW == 0 ? 7 : curWW;
        var startTimestamp = time.getTime() + 3600 * 1000 * 24 * (7*WW - (curWW-1));
        var endTimestamp = startTimestamp + 3600 * 1000 * 24 * 6;
        ret.push(u.date.format(startTimestamp, format));
        ret.push(u.date.format(endTimestamp, format));
        return ret;
    };
    
    /**
     * @description 前后几天的日期
     * @param {Number} DD 前后几天（正数代表后几天，负数代表前几天），默认过去一周的日期（-6）
     * @param {String Date} time 时间
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.otherDay = function (DD, time, format){
        DD = !isNaN(DD) ? DD : -6;
        time = time ? new Date(time) : new Date();
        format = format || 'YYYY-MM-DD';

        var timestamp = time.getTime() + 3600 * 1000 * 24 * DD;
        return u.date.format(timestamp, format);
    };

    /**
     * @description 查询两个日期之间的所有月份
     * @param {String} start 'YYYY-MM'
     * @param {String} end 'YYYY-MM'
     * @return {Array}
     */
    u.date.getMonthBetween = function(start, end) {
        var result = [];
        var starts = start.split('-');
        var ends = end.split('-');
        var staYear = parseInt(starts[0]);
        var staMon = parseInt(starts[1]);
        var endYear = parseInt(ends[0]);
        var endMon = parseInt(ends[1]);
        while (staYear <= endYear) {
            if (staYear === endYear) {
                while (staMon <= endMon) {
                    staMon = staMon > 9 ? staMon : '0'+staMon;
                    result.push(staYear + '-' + staMon);
                    staMon++;
                }
                staYear++;
            } else {
                if (staMon > 12) {
                    staMon = 1;
                    staYear++;
                }
                staMon = staMon > 9 ? staMon : '0'+staMon;
                result.push(staYear + '-' + staMon);
                staMon++;
            }
        }
        return result;
    };

    /******************************************** base64 **************************************************/
    
    u.base64 = {};

    /**
     * @description base64 编码
     */
    u.base64.encrypt = function (input) {
        var str = CryptoJS.enc.Utf8.parse(input);
        var base64 = CryptoJS.enc.Base64.stringify(str);
        return base64;
    };
    /**
     * @description base64 解码
     */
    u.base64.decrypt = function (input) {
        var str = CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8);
        return str;
    };

    /********************************************* 浏览器/手机端 ***************************************************/
    
    u.browser = {};
    var userAgent = window.navigator.userAgent; //获取浏览器的userAgent字符串 
        
    /**
     * @description 判断当前浏览类型
     * @return {String} ie7
     * @return {String} ie8
     * @return {String} ie9
     * @return {String} ie10
     * @return {String} ie11
     * @return {String} edge
     * @return {String} chrome
     * @return {String} safari
     * @return {String} firefox
     * @return {String} opera
     */
    u.browser.type = function () { 
        if (u.browser.isIE()) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) return "ie7"; 
            if (fIEVersion == 8) return "ie8"; 
            if (fIEVersion == 9) return "ie9"; 
            if (fIEVersion == 10) return "ie10"; 
            if (fIEVersion == 11) return "ie11"; 
            else return false;  // IE版本过低
        }
        
        if (u.browser.isFirefox()) return "firefox";
        if (u.browser.isOpera()) return "opera";
        if (u.browser.isSafari()) return "safari";
        if (u.browser.isChrome()) return "chrome";
        if (u.browser.isEdge()) return "edge";
    };
    /**
     * @description 判断是否是IE浏览器
     */
    u.browser.isIE = function () { 
        return userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !u.browser.isOpera(); 
    };
    /**
     * @description 判断是否IE的Edge浏览器
     */
    u.browser.isEdge = function () { 
        return userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !u.browser.isIE();
    };
    /**
     * @description 判断是否Safari浏览器
     */
    u.browser.isSafari = function () { 
        return userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    };
    /**
     * @description 判断是否是Chrome浏览器
     */
    u.browser.isChrome = function () { 
        return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    };
    /**
     * @description 判断是否Firefox浏览器
     */
    u.browser.isFirefox = function () { 
        return userAgent.indexOf("Firefox") > -1;  
    };
    /**
     * @description 判断是否Opera浏览器
     */
    u.browser.isOpera = function () { 
        return userAgent.indexOf("Opera") > -1;
    };
    /**
     * @description 判断是否是微信浏览器
     */
    u.browser.isWechat = function () {
        var ua = userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') return true;
        else return false;
    };
    /**
     * @description 判断是否是Android
     */
    u.browser.isAndroid = function(){
        return (/android/gi).test(navigator.appVersion);
    };
    /**
     * @description 判断是否是移动端
     */
    u.browser.isMobile = function () {
        if ((userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            return true;
        } 
        else return false;
    };

    window.util = u;
})(window);