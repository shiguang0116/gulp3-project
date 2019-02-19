JavaScript通用工具类

#### 1、如何使用

```javascript
(function (window) {
    var u = {};

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
```

```javascript
util.trim(' str ing '); //'str ing'
util.trimAll(' str ing '); //'string'
```

#### 2、API说明

#### 3、npm下载，下载完成之后复制util.js到项目，引用util.js即可

```
npm i sg-utils -D
```