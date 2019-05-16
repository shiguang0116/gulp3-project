/**
 * @description: 首页
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2018-12-13 15:35:35
 */
'use strict'

new Page({
    el: 'index_page',
    data: {
        name: 'indexName',
        user: {
            name: 'sg',
            age: '23'
        }
    },
    checkEs6() {
        const foo = () => {
            this.data = Object.assign(this.data, {
                age: '18'
            })
        }
        foo()
        var values = Object.values(this.data)
        $('.es6 span').html(values)
    },
    click() {
        console.log('onclick')
    },
    event() {
        // const self = this
    },
    init() {
        this.checkEs6()
    }
})
