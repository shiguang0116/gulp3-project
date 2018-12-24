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
        if (u.browser.isAndroid()) {
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
        exdate.setTime(exdate.getTime() +  u.number.parseInt(expiredays * 24 * 60 * 60 * 1000));
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
        u.cookie.set(name, '', -1);
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

    u.isString = function (str) {
        return typeof (str) == 'string';
    };
    /**
     * @description 判断字符串是否以指定字符串开头
     * @param {String} str
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写
     * @return {Boolean} 
     */
    u.string.isStartWith = function (str, searchString) {
        if (str == null || str == undefined) return false;
        var preSubStr = str.substr(0, searchString.length) + '';
        if (ignoreCase) {
            preSubStr = preSubStr.toLowerCase();
            searchString = (searchString + '').toLowerCase();
        }
        return preSubStr === searchString;
    }
    /**
     * @description 判断字符串是否以指定字符串开头
     * @param {String} str
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写
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
    }
    /**
     * @description 判断字符串是否为空
     * @return {Boolen} 是否为空
     */
    u.string.isEmpty = function (str) {
        if (str == undefined || str == null) return true;
        if (typeof (str) == 'string') return str.length == 0;
        else return str.toString().length == 0;
    }
    /**
     * @description 以指定的分割符分割字符串
     * @param {String} source 源字符串
     * @param {String} separator 分隔符
     * @param {Boolen} ignoreSpaceOrEmpty 是否忽略掉空白
     */
    u.string.split = function (source, separator, ignoreSpaceOrEmpty) {
        if (u.stringIsEmpty(source)) return [];
        var items = source.split(separator);
        if (ignoreSpaceOrEmpty) {
            var tmp = [];
            u.forEach(items, function (i, item) {
                item = u.trim(item);
                if (u.stringIsEmpty(item)) return;
                tmp.push(item);
            });
            items = tmp;
        }
        return items;
    };
    u.string.equal = function (str1, str2, ignoreCase) {
        if (u.string.isEmpty(str1) && u.string.isEmpty(str2)) return true;
        if (ignoreCase) {
            str1 = u.string.toLower(str1);
            str2 = u.string.toLower(str2);
        };
        return str1 == str2;
    };

    /**
     * @description 字符串替换
     */
    u.string.replace = function (str, regexp, replacement) {
        return String.prototype.replace.call(str, regexp, replacement);
    };

    /**
    * @description 以指定的分割符分割字符串
    * @param {string} source 源字符串
    * @param {string} separator 分隔符
    * @param {boolen} ignoreSpaceOrEmpty 是否忽略掉空白
    */
    u.string.split = function (source, separator, ignoreSpaceOrEmpty) {
        if (u.string.isEmpty(source)) return [];

        var items = source.split(separator);
        if (ignoreSpaceOrEmpty) {
            var tmp = [];
            u.forEach(items, function (i, item) {
                item = u.trim(item);
                if (u.stringIsEmpty(item)) return;
                tmp.push(item);
            });
            items = tmp;
        }
        return items;
    };
    /**
     * @description 转换为小写
     * @param {String} str 字符串
     */
    u.string.toLower = function (str) {
        if (u.string.isEmpty(str)) return null;
        return String.prototype.toLowerCase.call(str);
    };
    /**
     * @description 转换为大写
     * @param {String} str 字符串
     */
    u.string.toUpper = function (str) {
        return String.prototype.toUpperCase.call(str);
    };
    /**
     * @description 首字母小写
     */
    u.string.firstLowerCase = function (str) {
        if (u.string.isEmpty(str)) return str;
        return str.replace(/^\S/, function (s) { return s.toLowerCase(); });
    };
    /**
     * @description 首字母大写
     */
    u.string.firstUpperCase = function (str) {
        if (u.string.isEmpty(str)) return str;
        return str.replace(/^\S/, function (s) { return s.toUpperCase(); });
    };
    /**
     * @description 截取指定的字符串
     * @param {String} str 待截取的字符传
     * @param {Number} start 一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
     * @param {Number} stop 一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。
     */
    u.string.subString = function (str, start, stop) {
        if (u.string.isEmpty(str)) return null;
        return String.prototype.substring.call(str, start, stop);
    };
    /**
     * @description 字母和数字混合的编号自加1
     * @param {String} code 编号，字符串。例：'XM0001'
     * @param {String} xyz 不需要变动的字符串。例：'XM'
     * @return {String} 编号+1。例：'XM0002'
     */
    u.string.getNext = function (code, xyz){
        var code = code || '';
        var count = code.split(xyz)[1];
        var newCount = (parseInt(count)+1).toString();
        var zeroLen = count.length - newCount.length;
        var zero = '';
        for(var i = 0; i< zeroLen; i++){
            zero += '0';
        }
        newCode = xyz + zero + newCount;
        return newCode;
    };
    
    /*********************************************数字***************************************************/

    u.number = {};
    
    /**
     * @description 转换成int类型
     * @param input
     * @param defaultValue 转换失败时的默认值
     * @return {int}
     */
     u.number.parseInt = function (input, defaultValue) {
        var value = parseInt(input);
        if (isNaN(value) || Infinity == value) {
            if (defaultValue == undefined) defaultValue = 0;
            return defaultValue;
        }
        return value;
    };

    /**
     * @description 转换成float类型
     * @param input
     * @param defaultValue 转换失败时的默认值
     * @return {float}
     */
    u.number.parseFloat = function (input, defaultValue) {
        var value = parseFloat(input);
        if (isNaN(value) || Infinity == value) {
            if (defaultValue == undefined) defaultValue = 0;
            return defaultValue;
        }
        return value;
    };

    /**
     * @description 使用定点表示法来格式化一个数
     * @param input 输入的数
     * @param digits 小数位数，默认0
     */
    u.number.toFixed = function (input, digits) {
        input = u.number.parseFloat(input, 0);
        if (input == 0) return 0;
        return input.toFixed(digits || 0);
    };
    /**
     * @description 两数相乘
     */
    u.number.Mul = function (arg1,arg2){
		 var m=0,s1=arg1.toString(),s2=arg2.toString();    
		 try{m+=s1.split(".")[1].length}catch(e){}    
		 try{m+=s2.split(".")[1].length}catch(e){}    
		 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    };
    /**
     * @description 两数相加
     */
    u.number.Add = function (arg1,arg2){
    	var r1,r2,m;    
    	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}    
    	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}    
    	m=Math.pow(10,Math.max(r1,r2))    
    	return (arg1*m+arg2*m)/m    
    }
    u.number.getRandom = function (min, max) {
        var random = 0;
        random = min + Math.random() * (max - min);
        return Math.round(random);
    };
    
    u.number.get0 = function (obj){
        for(var i in obj){
            obj[i] == '' ? obj[i] = 0 : ''
        }
        return obj
    };
    
    /*********************************************数组***************************************************/
    
    u.array = {};

    u.isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array;
        }
    };
    u.array.isEmpty = function (array) {
        if (array == undefined || array == null) return true;
        else if (u.isArray(array) && array.length == 0) return true;
        return false;
    };
    /**
     * @description 合并两个数组，生成新的数组
     * @param source 原数组
     * @param array 待合并的数组
     * @param keys 数组元素主键，如允许重复可不设置此参数
     * @return obj 对象
     */
    u.array.concat = function (source, array, keys) {
        if (!source || !array) return;
        var ret = [];
        if (keys && keys.length > 0) {
            ret = source.concat([]);
            u.forEach(array, function (i, item) {
                var searchObj = {};
                u.forEach(keys, function (j, key) {
                    searchObj[key] = item[key];
                });

                //检查目标数组中是否存在该元素
                var obj = u.getByObject(source, searchObj);
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
     * @description 筛选出符合条件的数组，生成新的数组
     * @param source 原数组
     * @param filter 条件对象
     * @return {Array} 新的数组
     */
    u.filterArray = function (source, filter) {
        if (!source) return [];
        if (!u.isArray(source)) source = [source];
        if (!filter) return source;

        var ret = [];
        u.forEach(source, function (i, item) {
            var equal = true;
            u.forEach(filter, function (property, filterPropertyValue) {
                var itemPropertyValue = u.object.getPropertyValue(item, property);
                if (!u.isArray(filterPropertyValue)) filterPropertyValue = [filterPropertyValue];
                if (u.array.indexOf(filterPropertyValue, itemPropertyValue) == -1) {
                    equal = false;
                    return false;
                }
            });
            if (equal) ret.push(item);
        });
        return ret;
    };

    /**
     * @description 根据主键删除数组中的元素
     * @param source 原数组
     * @param keyField 主键字段
     * @param keyValues 主键值
     */
    u.array.deleteByKeys = function (source, keyField, keyValues) {
        if (!source || !keyField || !keyValues) return;
        if (!u.isArray(keyValues)) keyValues = [keyValues];
        u.forEach(keyValues, function (i, item) {
            var param = [];
            param[keyField] = item;

            var index = -1;
            do {
                index = u.getIndexByObject(source, param);
                if (index != -1) source.splice(index, 1);
            } while (index > -1);
        });
    };
        /**
     * @description 对数组中的元素进行分组
     * @param array 数组对象
     * @param fields 分组的依据字段
     * @return {Array} 分组后的新数组
     */
    u.groupArray = function (array, fields) {
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
    u.sortArray = function (array, sort, order) {
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
     * @description 选择数组（对象）中的一个（多个）属性
     * @param obj 源对象（数组）
     * @param property 属性（集合）
     * @return {Array} 新数组
     */
    u.selectProperties = function (source, property) {
        if (!source) return [];
        if (!u.isArray(source)) source = [source];

        if (!property) return source;

        var ret = [];
        var isObject = u.isArray(property);
        u.forEach(source, function (i, item) {
            if (isObject) {
                var obj = {};
                u.forEach(property, function (j, p) {
                    obj[p] = u.object.getPropertyValue(item, p, true);
                });
                ret.push(obj);
            }
            else {
                ret.push(u.object.getPropertyValue(item, property, true));
            }
        });
        return ret;
    };
    /**
     * 数组去重
     * @param {*} array 数组对象
     */
    u.array.unique = function(array){
        if (u.array.isEmpty(array)) return;
        return $.unique(array);
    };
    u.array.uniq = function(array){
        var temp = []; //一个新的临时数组
        for(var i = 0; i < array.length; i++){
            if(temp.indexOf(array[i]) == -1){
                temp.push(array[i]);
            }
        }
        return temp;
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
     * @description 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
     * @param array 数组对象
     * @param searchElement 要查找的元素
     * @param fromIndex 开始查找的位置
     * @param useStrict 是否使用严格模式匹配查找
     * @return 首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1
     */
    u.array.indexOf = function (array, searchElement, fromIndex, useStrict) {
        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (array == null) {
            return -1;
        }

        var O = Object(array);
        fromIndex = fromIndex || 0;
        useStrict = useStrict || false;

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O) {
                if ((useStrict && O[k] === searchElement) || O[k] == searchElement) {
                    return k;
                }
            }
            k++;
        }
        return -1;
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

    /*********************************************对象***************************************************/
    
    u.object = {};
    
    u.object.isEmpty = function (obj) {
        if (JSON.stringify(obj) === '{}') {
            return true;
        }
        return false;
    }; 
    
    u.object.length = function(obj) {
        var count = 0;
        for(var i in obj){
            count ++;
        }
        return count;
    };

    // 从对象中过滤出需要的字段
    u.object.getNeedData = function (needObj, obj){
        for(var key in needObj){
            obj[key] ? needObj[key] = obj[key] : ''
        }
    }

    u.object.clear = function (obj){
        for (var key in obj) {
            obj[key] = ''
        }
        return obj
    }
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
        if (u.string.isEmpty(propertyName)) return propertyValue;

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
    u.isFunction = function (obj) {
        if (typeof obj == "function") return true;
        return false;
    };

    /******************************************** 日期 **************************************************/

    u.date = {};

    /**
     * @description 获取需要的时间格式
     * @param
     * @return {String} 格式化后的时间
     */
    u.date.format = function (param){
        var time    = param.time ? new Date(param.time) : new Date(),   //已知时间
            format  = param.format || 'yyyy-MM-dd';                     //时间格式
        function tf(i){return (i < 10 ? '0' : '') + i};  
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){  
            switch(a){  
                case 'yyyy':  
                    return tf(time.getFullYear());
                    break;  
                case 'MM':  
                    return tf(time.getMonth() + 1);  
                    break;  
                case 'mm':  
                    return tf(time.getMinutes());
                    break;  
                case 'dd':  
                    return tf(time.getDate());  
                    break;  
                case 'HH':  
                    return tf(time.getHours());  
                    break;  
                case 'ss':  
                    return tf(time.getSeconds());  
                    break;  
            }  
        })  
    }
    /**
     * @description 获取上个月的日期
     * @param str
     * @return {String} 格式化后的时间
     */
    u.date.lastMonth =  function (){
        var now = u.getFormatDate()
        var arr = now.split('-')
        arr[1] = arr[1] - 1
        if (arr[1] == 0) {
            arr[0] = arr[0]-1
            arr[1] = 12
        }
        if (arr[1]<10) {
            arr[1] = '0' + arr[1]
        }
        var last = arr.join('-')
        return last;
    }
    /**
     * @description 获取前后几月的日期
     * @param 
     * @return {String} 格式化后的时间
     */
    u.date.otherMonth = function (param){
        var format  = param.format || 'yyyy-MM-dd',         //时间格式: ''
            MM      = !isNaN(param.MM) ? param.MM : -1,     //前后几月: number
            time    = new Date();
        // 判断有没有‘日’
        var dd = format.indexOf('dd') > -1 ? time.getDate() : '1' ;
        time.setMonth(time.getMonth()+MM, dd);
        var result = getFormatDate({time: time, format:format});
        return result;
    }
    /**
     * @description 获取前后几天的日期
     * @param 
     * @return {String} 格式化后的时间
     */
    u.date.getOtherDay = function (param){
        var time    = param.time ? new Date(param.time) : new Date(),   //已知时间
            format  = param.format || 'yyyy-MM-dd',                     //时间格式: ''
            dd      = !isNaN(param.dd) ? param.dd : -6;                 //前后几天: number
        var timestamp = time.getTime() + 3600 * 1000 * 24 * dd;
        var otherDay = getFormatDate({time: timestamp,format:format});
        return otherDay;
    }

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

    /********************************************* 文本 ***************************************************/

    /**
     * @description 复制文本
     * @param text {String} 需要复制的文本内容
     */
    u.copyText = function (text) {
        var input = document.createElement('input');
        input.value = text;
        input.select();
        document.execCommand("copy"); //执行浏览器复制命令
    }

    /*********************************************浏览器/手机端***************************************************/
    
    u.browser = {};
    var userAgent = navigator.userAgent; //获取浏览器的userAgent字符串 
        
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
            if (fIEVersion == 7) { return "ie7"; }
            else if (fIEVersion == 8) { return "ie8"; }
            else if (fIEVersion == 9) { return "ie9"; }
            else if (fIEVersion == 10) { return "ie10"; }
            else if (fIEVersion == 11) { return "ie11"; }
            else { return false }   // IE版本过低 
        }
        
        if (u.browser.isFirefox()) { return "firefox";} 
        if (u.browser.isOpera()) { return "opera";} 
        if (u.browser.isSafari()) { return "safari";} 
        if (u.browser.isChrome()) { return "chrome";} 
        if (u.browser.isEdge()) { return "edge";} 
    }
    /**
     * @description 判断是否是IE浏览器
     */
    u.browser.isIE = function () { 
        return userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !u.browser.isOpera(); 
    }
    /**
     * @description 判断是否IE的Edge浏览器
     */
    u.browser.isEdge = function () { 
        return userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !u.browser.isIE();
    }
    /**
     * @description 判断是否Safari浏览器
     */
    u.browser.isSafari = function () { 
        return userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    }
    /**
     * @description 判断是否是Chrome浏览器
     */
    u.browser.isChrome = function () { 
        return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    }
    /**
     * @description 判断是否Firefox浏览器
     */
    u.browser.isFirefox = function () { 
        return userAgent.indexOf("Firefox") > -1;  
    }
    /**
     * @description 判断是否Opera浏览器
     */
    u.browser.isOpera = function () { 
        return userAgent.indexOf("Opera") > -1;
    }
    /**
     * @description 判断是否是微信浏览器
     */
    u.browser.isWechat = function () {
        var ua = userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    /**
     * @description 判断是否是Android
     */
    u.browser.isAndroid = function(){
        return (/android/gi).test(navigator.appVersion);
    } 
    /**
     * @description 判断是否是移动端
     */
    u.browser.isMobile = function () {
        if ((userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            return true;
        } else {
            return false;
        }
    }

    window.util = u;
})(window);