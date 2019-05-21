/**
 * @description: eslint代码检查规则
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-04-30 15:32:46 
 */

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        jquery: true
    },
    globals: {
        
    },
    plugins: [
        'html'                  // 需要检查 *.html 文件 里的js代码
    ],
    // 一个配置文件可以从基础配置中继承已启用的规则，每个配置继承它前面的配置
    extends: [
        'eslint:recommended',
        'vui'
    ],

    // 在此处添加自定义规则，此规则基于 https://github.com/shiguang0116/eslint-config-vui
    rules: {
        
    }
};
