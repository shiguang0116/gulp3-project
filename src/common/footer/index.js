/**
 * @description: js文件
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2018-12-13 15:35:35
 */
'use strict'

$(function() {
    const oFoot = document.getElementById('footer')
    const oBody = document.getElementsByTagName('body')[0]
    fixedFooter(oBody, oFoot)

    function fixedFooter(oBody, oFooter) {
        var sh, fh
        var h = 0
        sh = document.documentElement.clientHeight // 页面对象高度（即BODY对象高度加上Margin高）
        fh = oFooter.offsetHeight
        // 处理父元素
        oBody.style.position = 'relative'
        oBody.style.minHeight = (sh - h) + 'px'
        oBody.style.paddingBottom = fh + 'px'
        oBody.style.boxSizing = 'border-box'
        // 处理页脚元素
        oFooter.style.position = 'absolute'
        oFooter.style.bottom = '0' + 'px'
    }
})
