/**
 * @description: util.js 用法实例
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-03-04 12:45:43 
 */

/********************************************* cookie 缓存 ***************************************************/

// _util.cookie.set()
_util.cookie.set('user_name', 'guang');         // 关闭浏览器后失效。注：单独打开 demo.html 是没法缓存的，需要启动本地服务
_util.cookie.set('user_id', '12', 1);           // 保存一天
_util.cookie.set('user_type', 'admin', 1/24);   // 保存一个小时
_util.cookie.set('is_login', '1', 1/24/60);     // 保存一分钟

// _util.cookie.get()
console.group("_util.cookie.get()"); 
    console.log(_util.cookie.get('user_name'));     // guang
    console.log(_util.cookie.get('user_id'));       // 12
    console.log(_util.cookie.get('user_type'));     // admin
    console.log(_util.cookie.get('is_login'));      // '1'
console.groupEnd();

// _util.cookie.remove('user_name');
// _util.cookie.remove('user_id');
// _util.cookie.remove('user_type');
// _util.cookie.remove('is_login');

/********************************************* localStorage 本地储存 ***************************************************/

// _util.storage.set()
_util.storage.set('user', { name: 'guang', age: '25'}); // 'obj-{"name":"guang","age":"25"}'
_util.storage.set('lang', 'zh-cn');                     // 'zh-cn'

// _util.storage.get()
console.group("_util.storage.get()"); 
    console.log(_util.storage.get('user'));     // { name: 'guang', age: '25'}
    console.log(_util.storage.get('lang'));     // 'zh-cn'
console.groupEnd();

// _util.storage.remove('user');	// 删除 user 及对应的值
// _util.storage.clear();	        // 清空所有 localStorage

/********************************************* 数据类型 ***************************************************/

// _util.isEmpty()
console.group("_util.isEmpty()"); 
    console.log(_util.isEmpty(undefined));  // true
    console.log(_util.isEmpty(null));   // true
    console.log(_util.isEmpty(''));     // true
    console.log(_util.isEmpty([]));     // true
    console.log(_util.isEmpty({}));     // true
console.groupEnd();

// _util.isString()
console.group("_util.isString()"); 
    console.log(_util.isString('q'));  // true
console.groupEnd();

// _util.isArray()
console.group("_util.isArray()"); 
    console.log(_util.isArray('q'));    // false
    console.log(_util.isArray(['q']));  // true
console.groupEnd();

// _util.isObject()
console.group("_util.isObject()"); 
    console.log(_util.isObject('q'));       // false
    console.log(_util.isObject(['q']));     // false
    console.log(_util.isObject({id:'q'}));  // true
console.groupEnd();

// _util.isFunction()
var fn = function(){};
console.group("_util.isFunction()"); 
    console.log(_util.isFunction(fn));  // true
console.groupEnd();

// _util.length()
var obj = {
    id: 'a',
    status: '0'
};
var arr = ['p','o','i'];
var str = 'yeah';
console.group("_util.length()"); 
    console.log(_util.length(obj));     // 2
    console.log(_util.length(arr));     // 3
    console.log(_util.length(str));     // 4
console.groupEnd();

// _util.forEach()
console.group("_util.forEach()"); 
var source = [
    { id: 'c', status: '3', count: '46' },
    { id: 'd', status: '1', count: '41' }
];
_util.forEach(source, function(i, item){
    console.log(i);
    console.log(item);  
    // 0
    // { id: 'c', status: '3', count: '46' }
    // 1
    // { id: 'd', status: '1', count: '41' }
});
var source = {
    id: 'c',
    status: '3'
};
_util.forEach(source, function(key, value){
    console.log(key);
    console.log(value);  
    // 'id'
    // 'c'
    // 'status'
    // '3'
});
console.groupEnd();

// _util.isEqual()
var source1 = [
    'qw',
    ['q','w'],
    { id: 'a', status: '2', count: '19' },
];
var source2 = [
    'qw',
    ['q','w'],
    { id: 'a', status: '2', count: '19' },
];
var source3 = [
    'qw',
    ['q','w'],
    { id: 'b', status: '2', count: '19' },
];
console.group("_util.isEqual()"); 
    console.log(_util.isEqual(source1, source2));     // true
    console.log(_util.isEqual(source1, source3));     // false
console.groupEnd();

/********************************************* string 字符串 ***************************************************/

// _util.trim()
var str = '  qwe  rty ';
console.group("_util.trim()"); 
    console.log(_util.trim(str));       // 'qwe  rty'
console.groupEnd();

// _util.trimAll()
console.group("_util.trimAll()"); 
    console.log(_util.trimAll(str));    // 'qwerty'
console.groupEnd();

// _util.string.format()
console.group("_util.string.format()"); 
    console.log(_util.string.format('确定要{0}单据【{1}】吗？', '删除', 'QZYDYJZB201901300002'));   // '确定要删除单据【QZYDYJZB201901300002】吗？'
console.groupEnd();

// _util.string.isStartWith()
console.group("_util.string.isStartWith()"); 
    console.log(_util.string.isStartWith('qwerty', 'qw'));   // true
console.groupEnd();

// _util.string.isEndWith()
console.group("_util.string.isEndWith()"); 
    console.log(_util.string.isEndWith('qwerty', 'ty'));   // true
console.groupEnd();

// _util.string.firstUpperCase()
console.group("_util.string.firstUpperCase()"); 
    console.log(_util.string.firstUpperCase('qwerty'));   // 'Qwerty'
console.groupEnd();

// _util.string.reverse()
console.group("_util.string.reverse()"); 
    console.log(_util.string.reverse('qwerty'));   // 'ytrewq'
console.groupEnd();

// _util.string.split()
console.group("_util.string.split()"); 
    console.log(_util.string.split('a,s,d', ','));   // ["a", "s", "d"]
console.groupEnd();

// _util.string.next()
console.group("_util.string.next()"); 
    console.log(_util.string.next('0001'));     // '0002'
    console.log(_util.string.next('XM0001'));   // 'XM0002'
console.groupEnd();

/********************************************* number 数字 ***************************************************/

// _util.number.parseInt()
console.group("_util.number.parseInt()"); 
    console.log(_util.number.parseInt('25.36'));   // 25
console.groupEnd();

// _util.number.parseFloat()
console.group("_util.number.parseFloat()"); 
    console.log(_util.number.parseFloat('25.36'));   // 25.36
console.groupEnd();

// _util.number.toFixed()
console.group("_util.number.toFixed()"); 
    console.log(_util.number.toFixed('25.3682', 2));   // '25.37'
console.groupEnd();

// _util.number.round()
console.group("_util.number.round()"); 
    console.log(_util.number.round('25.3682', 2));   // 25.37
console.groupEnd();

// _util.number.ceil()
console.group("_util.number.ceil()"); 
    console.log(_util.number.ceil('25.3612', 2));   // 25.37
console.groupEnd();

// _util.number.floor()
console.group("_util.number.floor()"); 
    console.log(_util.number.floor('25.3682', 2));   // 25.36
console.groupEnd();

// _util.number.mul()
console.group("_util.number.mul()"); 
    console.log(_util.number.mul(1.2, 2.3 ,3.45));   // 9.522
console.groupEnd();

// _util.number.add()
console.group("_util.number.add()"); 
    console.log(_util.number.add(1.2, 2.3 ,3.45));   // 6.95
console.groupEnd();

// _util.number.random()
console.group("_util.number.random()"); 
    console.log(_util.number.random(1, 100));   // 
console.groupEnd();

/********************************************* array 数组 ***************************************************/

var arr = [];

// _util.array.indexOf()
arr = [
    'qwert',
    ['q', 'w', 'e'],
    { id: 'a', name: '光' }
];
console.group("_util.array.indexOf()"); 
    console.log(_util.array.indexOf(arr, 'qwert'));         // 0
    console.log(_util.array.indexOf(arr, ['q', 'w', 'e'])); // 1
    console.log(_util.array.indexOf(arr, {id: 'a'}));       // 2。当检索数组中的对象时，只用匹配该对象的某一个（几个）属性即可查询到。
console.groupEnd();
    
// _util.array.push()
arr = ['q'];
var len = _util.array.push(arr, ['w','e']);
console.group("_util.array.push()");
    console.log(arr);   // ["q", "w", "e"]
    console.log(len);   // 4
console.groupEnd();

// _util.array.sort()
arr = [
    { billNo: 'CGAPD20190301000002', date: '2019-03-01', count: '22' },
    { billNo: 'CGAPD20190228000001', date: '2019-02-28', count: '14' },
    { billNo: 'CGAPD20190301000001', date: '2019-03-01', count: '36' },
];
console.group("_util.array.sort()");
    console.log(_util.array.sort(arr, 'billNo'));   // 输出结果为：  
    // [
    //    { billNo: 'CGAPD20190228000001', date: '2019-02-28', count: '14' },
    //    { billNo: 'CGAPD20190301000001', date: '2019-03-01', count: '36' },
    //    { billNo: 'CGAPD20190301000002', date: '2019-03-01', count: '22' },
    // ];
console.groupEnd();

// _util.array.unique()
arr = [
    'qw',
    'qw',
    ['q','w'],
    ['w','q'],
    { id: 'a', status: '1', count: '22' },
    { id: 'a', status: '2', count: '19' },
];
console.group("_util.array.unique()");
    console.log(_util.array.unique(arr));   // 输出结果为：
    // [
    //     'qw',
    //     ['q','w'],
    //     ['w','q'],
    //     { id: 'a', status: '1', count: '22' },
    //     { id: 'a', status: '2', count: '19' },
    // ]

    console.log(_util.array.unique(arr, 'id')); // 输出结果为：
    // [
    //     'qw',
    //     ['q','w'],
    //     ['w','q'],
    //     { id: 'a', status: '1', count: '22' },
    // ]

    console.log(_util.array.unique(arr, 'id', true));   // 输出结果为：
    // [
    //     'qw',
    //     ['q','w'],
    //     { id: 'a', status: '1', count: '22' },
    // ]
console.groupEnd();

// _util.array.filter()
arr = [
    { id: 'a', status: '1', count: '22' },
    { id: 'b', status: '2', count: '19' },
    { id: 'c', status: '3', count: '46' },
    { id: 'd', status: '1', count: '41' },
];
console.group("_util.array.filter()");
    console.log(_util.array.filter(arr, { status: '1'}));   // 输出结果为：
    // [
    //     { id: 'a', status: '1', count: '22' },
    //     { id: 'd', status: '1', count: '41' }
    // ]

    console.log(_util.array.filter(arr, { status: '1', id: 'a'}));      // 输出结果为：
    // [
    //     { id: 'a', status: '1', count: '22' }
    // ]

    console.log(_util.array.filter(arr, { status: ['1', '2']}));        // 输出结果为：
    // [
    //     { id: 'a', status: '1', count: '22' },
    //     { id: 'b', status: '2', count: '19' },
    //     { id: 'd', status: '1', count: '41' }
    // ]

    console.log(_util.array.filter(arr, { status: ['1', '2']}, true));  // 输出结果为：
    // [
    //     { id: 'c', status: '3', count: '46' },
    // ]
console.groupEnd();

// _util.array.select()
arr = [
    { id: 'a', status: '1', count: '22', child: { name: 'l', code: 'c' } },
    { id: 'b', status: '2', count: '19', child: { name: 'la', code: 'co' } },
    { id: 'c', status: '3', count: '46', child: { name: 'lan', code: 'cod' } },
];
console.group("_util.array.select()");
    console.log(_util.array.select(arr, 'count'));    // ["22", "19", "46"]
    console.log(_util.array.select(arr, 'child.name'));    // ["l", "la", "lan"]
    console.log(_util.array.select(arr, ['status', 'count']));    // 输出结果为：
    // [
    //     { status: '1', count: '22' },
    //     { status: '2', count: '19' },
    //     { status: '3', count: '46' }
    // ]
console.groupEnd();

// _util.array.concat()
var arr1 = ['q','w'];
var arr2 = ['q','a'];
console.group("_util.array.concat()");
    console.log(_util.array.concat(arr1, arr2));    // ["q", "w", "a"]
console.groupEnd();

// _util.array.group()
arr = [
    { size: 'S', color: '红色', price: '199' },
    { size: 'M', color: '蓝色', price: '299' },
    { size: 'M', color: '黄色', price: '159' },
    { size: 'S', color: '绿色', price: '168' },
];
console.group("_util.array.group()");
    console.log(_util.array.group(arr, 'size'));    // 输出结果为：
    // [
    //     {
    //         "size":"S",
    //         "group":[
    //             {
    //                 "size":"S",
    //                 "color":"红色",
    //                 "price":"199"
    //             },
    //             {
    //                 "size":"S",
    //                 "color":"绿色",
    //                 "price":"168"
    //             }
    //         ]
    //     },
    //     {
    //         "size":"M",
    //         "group":[
    //             {
    //                 "size":"M",
    //                 "color":"蓝色",
    //                 "price":"299"
    //             },
    //             {
    //                 "size":"M",
    //                 "color":"黄色",
    //                 "price":"159"
    //             }
    //         ]
    //     }
    // ]
console.groupEnd();

// _util.array.remove()
arr = ['sg', '', null, undefined];
_util.array.remove(arr);
console.group("_util.array.remove()");
    console.log(arr);   // ["sg"]
console.groupEnd();

// _util.array.clear()
arr = ['s', 'h', 'i'];
_util.array.clear(arr);
console.group("_util.array.clear()");
    console.log(arr);   // []
console.groupEnd();

/********************************************* object 对象 ***************************************************/

var obj = {};

// _util.object.keys()
obj = {
    name: 'guang',
    age: '25'
};
console.group("_util.object.keys()");
    console.log(_util.object.keys(obj));    // ["name", "age"]
console.groupEnd();

// _util.object.values()
console.group("_util.object.values()");
    console.log(_util.object.values(obj));  // ["guang", "25"]
console.groupEnd();

// _util.object.assign()
var obj2 = {
    type: 'admin',
    age: '26'
};
_util.object.assign(obj, obj2);
console.group("_util.object.assign()");
    console.log(obj);   // { name: "guang", age: "26", type: "admin" }
console.groupEnd();

// _util.object.select()
obj = {
    name: 'guang',
    email: '123456@qq.com',
    phone: '13566668888'
};
console.group("_util.object.select()");
    console.log(_util.object.select(obj, ['name', 'phone'])); // {name: "guang", phone: "13566668888"}
console.groupEnd();

// _util.object.remove()
console.group("_util.object.remove()");
    console.log(_util.object.remove(obj, ['name', 'phone'])); // {email: "123456@qq.com"}
console.groupEnd();

// _util.object.getValue()
obj = {
    name: 'guang',
    child: {
        name: 'lan'
    }
};
console.group("_util.object.getValue()");
    console.log(_util.object.getValue(obj, 'child.name'));  // lan
console.groupEnd();

// _util.object.serialize()
obj = {
    id: 'a',
    billNo: 'CGDD20190228000001'
};
console.group("_util.object.serialize()");
    console.log(_util.object.serialize(obj));   // id=a&billNo=CGDD20190228000001
console.groupEnd();

// _util.object.clear()
_util.object.clear(obj);
console.group("_util.object.clear()");
    console.log(obj);  // {id: "", billNo: ""}
console.groupEnd();

/********************************************* json ***************************************************/

var data = [
    { "id": "1", "level": "1", "name": "基础平台", "parentId": null },
    { "id": "2", "level": "1", "name": "财务平台", "parentId": null },
    { "id": "101", "level": "2", "name": "设置", "parentId": "1" },
    { "id": "102", "level": "2", "name": "系统", "parentId": "1" },
    { "id": "10101", "level": "3", "name": "参数设置", "parentId": "101" },
    { "id": "10201", "level": "3", "name": "权限设置", "parentId": "102" }
];
console.group("_util.json.toTreeData()");
    console.log(_util.json.toTreeData(data, 'id', 'parentId', 'children')); // 输出结果为：
    // [
    //     {
    //         "id":"1",
    //         "level":"1",
    //         "name":"基础平台",
    //         "parentId":null,
    //         "children":[
    //             {
    //                 "id":"101",
    //                 "level":"2",
    //                 "name":"设置",
    //                 "parentId":"1",
    //                 "children":[
    //                     {
    //                         "id":"10101",
    //                         "level":"3",
    //                         "name":"参数设置",
    //                         "parentId":"101"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id":"102",
    //                 "level":"2",
    //                 "name":"系统",
    //                 "parentId":"1",
    //                 "children":[
    //                     {
    //                         "id":"10201",
    //                         "level":"3",
    //                         "name":"权限设置",
    //                         "parentId":"102"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id":"2",
    //         "level":"1",
    //         "name":"财务平台",
    //         "parentId":null
    //     }
    // ]
console.groupEnd();

/******************************************** date 时间 **************************************************/

// _util.date.format()
console.group("_util.date.format()");
    console.log(_util.date.format());
    console.log(_util.date.format('', 'YYYY月MM年DD日'));
    console.log(_util.date.format('', 'YYYY-MM-DD hh:mm:ss 星期WW'));
console.groupEnd();

// _util.date.otherMonth()
console.group("_util.date.otherMonth()");
    console.log(_util.date.otherMonth());
    console.log(_util.date.otherMonth(1));
console.groupEnd();

// _util.date.startOfMonth()
console.group("_util.date.startOfMonth()");
    console.log(_util.date.startOfMonth());
    console.log(_util.date.startOfMonth(-1));
console.groupEnd();

// _util.date.endOfMonth()
console.group("_util.date.endOfMonth()");
    console.log(_util.date.endOfMonth());
    console.log(_util.date.endOfMonth(-1));
console.groupEnd();

// _util.date.startOfWeek()
console.group("_util.date.startOfWeek()");
    console.log(_util.date.startOfWeek());
    console.log(_util.date.startOfWeek(-1));
console.groupEnd();

// _util.date.endOfWeek()
console.group("_util.date.endOfWeek()");
    console.log(_util.date.endOfWeek());
    console.log(_util.date.endOfWeek(-1));
console.groupEnd();

// _util.date.otherDate()
console.group("_util.date.otherDate()");
    console.log(_util.date.otherDate());
    console.log(_util.date.otherDate(-100));
console.groupEnd();

// _util.date.howManyDays()
console.group("_util.date.howManyDays()");
    console.log(_util.date.howManyDays('2019-01-12', '2019-02-01'));    // 20
console.groupEnd();

// _util.date.howManyMonths()
console.group("_util.date.howManyMonths()");
    console.log(_util.date.howManyMonths('2019-01', '2018-05'));    // 8
console.groupEnd();

// _util.date.getDatesBetween()
console.group("_util.date.getDatesBetween()");
    console.log(_util.date.getDatesBetween('2019-01-25', '2019-02-01'));    // ["2019-01-25", "2019-01-26", "2019-01-27", "2019-01-28", "2019-01-29", "2019-01-30", "2019-01-31", "2019-02-01"]
    console.log(_util.date.getDatesBetween('2019-01-25', '2019-02-01', 'YYYY-MM')); // ["2019-01", "2019-02"]
console.groupEnd();

/******************************************** base64 **************************************************/

// // _util.base64.encrypt()
// console.group("_util.base64.encrypt()");
//     console.log(_util.base64.encrypt());
// console.groupEnd();

// // _util.base64.decrypt()
// console.group("_util.base64.decrypt()");
//     console.log(_util.base64.decrypt());
// console.groupEnd();

/******************************************** browser 浏览器/手机端 **************************************************/

// _util.browser.type()
console.group("_util.browser.type()");
    console.log(_util.browser.type());
console.groupEnd();

// _util.browser.isChrome()
console.group("_util.browser.isChrome()");
    console.log(_util.browser.isChrome());
console.groupEnd();

// _util.browser.isIE()
console.group("_util.browser.isIE()");
    console.log(_util.browser.isIE());
console.groupEnd();

// _util.browser.isEdge()
console.group("_util.browser.isEdge()");
    console.log(_util.browser.isEdge());
console.groupEnd();

// _util.browser.isSafari()
console.group("_util.browser.isSafari()");
    console.log(_util.browser.isSafari());
console.groupEnd();

// _util.browser.isFirefox()
console.group("_util.browser.isFirefox()");
    console.log(_util.browser.isFirefox());
console.groupEnd();

// _util.browser.isWechat()
console.group("_util.browser.isWechat()");
    console.log(_util.browser.isWechat());
console.groupEnd();

// _util.browser.isAndroid()
console.group("_util.browser.isAndroid()");
    console.log(_util.browser.isAndroid());
console.groupEnd();

// _util.browser.isIOS()
console.group("_util.browser.isIOS()");
    console.log(_util.browser.isIOS());
console.groupEnd();

// _util.browser.isMobile()
console.group("_util.browser.isMobile()");
    console.log(_util.browser.isMobile());
console.groupEnd();

/********************************************* url 路径处理 ***************************************************/

// 注：这里默认当前页面路径为 http://218.242.249.186/index.html?id=a&billNo=abc100

/**
 *  _util.url.getParams()
 */
console.log(_util.url.getParams());      // { id: 'a', billNo: 'abc100' }
console.log(_util.url.getParams('id'));  // 'a'

/**
 *  _util.url.jump()
 */
var param = {
    id: 'q',
    billNo: 'ert300'
};
// _util.url.jump('./detail.html', param);  // 跳转后的页面路径为 http://218.242.249.186/shop.html?id=q&billNo=ert300

/**
 *  _util.url.jumpFromReferrer()
 */
// _util.url.jumpFromReferrer('./login.html');  // 会将当前页面当做url参数传递

/**
 *  _util.url.jumpToReferrer()
 */
// _util.url.jumpToReferrer();  // 会跳回到之前的页面（当前url参数为之前的页面地址），需配合 _util.url.jumpFromReferrer() 方法使用

/********************************************* validate 验证 ***************************************************/

var input = '12.345';
console.log(_util.validate.positiveToFixed(input, 2));  // false
console.log(_util.validate.positiveToFixed(input, 3));  // true