/**
 * @description: gulp配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2018-12-13 17:53:40
 */
'use strict'

var gulp = require('gulp')
var fs = require('fs') // 创建文件
var babel = require('gulp-babel') // 编译es6
var htmltpl = require('gulp-html-tpl') // 引用html模板
var artTemplate = require('art-template') // 模板渲染
var concat = require('gulp-concat') // 合并文件
var rename = require('gulp-rename') // 重命名
var clean = require('gulp-clean') // 清空文件夹
var gulpif = require('gulp-if') // 条件判断
var uglify = require('gulp-uglify') // js压缩
var pump = require('pump')
var csso = require('gulp-csso') // css压缩
var less = require('gulp-less') // less编译
var autoprefixer = require('gulp-autoprefixer')	// 自动添加CSS前缀
var htmlmin = require('gulp-htmlmin') // html压缩
var imagemin = require('gulp-imagemin') // 图片压缩
var cache = require('gulp-cache') // 图片缓存（只压缩修改的图片）
var rev = require('gulp-rev-dxb') // 生成版本号清单
var revCollector = require('gulp-rev-collector-dxb') // 替换成版本号文件
var browserSync = require('browser-sync').create() // 用来打开一个浏览器
var watch = require('gulp-watch') // 监听文件（修改、新建、删除）
var runSequence = require('run-sequence') // 按顺序执行task

// 路径
var html_path = 'src/{pages,common,components}/**/*.html'
var html_main_path = 'src/pages/**/*.html'
var js_libs_path = 'src/libs/**/*.js'
var js_main_path = 'src/{utils,pages,common,components}/**/*.js'
var css_libs_path = 'src/libs/**/*.css'
var css_main_path = 'src/{styles,pages,common,components}/**/*.{css,less}'
var images_path = ['src/images/**', 'favicon.ico']
var fonts_path = 'src/libs/**/fonts/**'

// 设置环境变量
var env = ''
function set_env(type) {
    env = process.env.NODE_ENV = type || 'dev'
}

// html模板处理
gulp.task('html', function() {
    return gulp.src(html_main_path)
        .pipe(htmltpl({
            tag: 'component',
            paths: ['src/common', 'src/components'],
            engine: function(template, data) {
                return template && artTemplate.compile(template)(data)
            },
            // 传入页面的初始化数据
            data: {
                env: env, // 环境变量
                header: false,
                g2: false
            }
        }))
        .pipe(rename({
            dirname: '' // 清空路径
        }))
        .pipe(gulp.dest('dist'))
})

// 打包js
gulp.task('js_libs', function() {
    return gulp.src(js_libs_path)
        .pipe(rename({
            dirname: '' // 清空路径
        }))
        .pipe(gulp.dest('dist/js'))
})
gulp.task('js_main', ['uglify_check'], function() {
    return gulp.src(js_main_path)
        .pipe(babel()) // 编译es6语法
        .pipe(concat('main.min.js')) // 合并文件并命名
        .pipe(gulpif(env === 'build', uglify())) // 判断是否压缩js
        .pipe(gulp.dest('dist/js'))
})
/**
 * @description 检查压缩JS时的错误，作为'js_main'的依赖执行。
 *
 * 1、解决js压缩出错的问题
 * 2、解决修改的代码有语法错误时，服务会终止的问题
 */
gulp.task('uglify_check', function(cb) {
    pump([
        gulp.src(js_main_path),
        babel(),
        uglify()
    ], cb)
})

// 打包css
gulp.task('css_libs', function() {
    return gulp.src(css_libs_path)
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('dist/css'))
})
gulp.task('css_main', function() {
    return gulp.src(css_main_path)
        .pipe(less()) // 编译less
        .on('error', function(err) { // 解决编译出错，监听被阻断的问题
            console.log('\x1B[31m%s\x1B[0m', '\nLess Error: ' + err.message + '\n')
            this.end()
        })
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'Firefox > 10',
                'ie >= 8'
            ]
        }))
        .pipe(concat('main.min.css'))
        .pipe(gulpif(env === 'build', csso())) // 判断是否压缩css
        .pipe(gulp.dest('dist/css'))
})

// 打包其他资源
gulp.task('images', function() {
    return gulp.src(images_path)
        .pipe(rename({ dirname: '' }))
        .pipe(gulpif(env === 'dev', cache(imagemin({
            optimizationLevel: 5, // 取值范围：0-7（优化等级），默认：3
            progressive: true, // 无损压缩jpg图片，默认：false
            interlaced: true, // 隔行扫描gif进行渲染，默认：false
            multipass: true // 多次优化svg直到完全优化，默认：false
        }))))
        .pipe(gulp.dest('dist/images'))
})
gulp.task('fonts', function() {
    return gulp.src(fonts_path)
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('dist/fonts'))
})
gulp.task('cache.clear', function() {
    cache.clearAll()
})

// 生成版本号清单
gulp.task('rev', function() {
    return gulp.src(['dist/js/**', 'dist/css/**'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./'))
})
// 添加版本号（路径替换）
gulp.task('set_version', function() {
    return gulp.src(['rev-manifest.json', 'dist/*.html'])
        .pipe(revCollector()) // 根据.json文件 执行文件内js/css名的替换
        .pipe(gulpif(env === 'build', htmlmin({
            removeComments: true, // 清除HTML注释
            collapseWhitespace: true, // 压缩HTML
            minifyJS: true, // 压缩页面JS
            minifyCSS: true // 压缩页面CSS
        })))
        .pipe(gulp.dest('dist'))
})
// 生成版本文件
gulp.task('version.txt', function() {
    var buf = `{ "BUILD_VERSION": "", "BUILD_URL": "" }`
    fs.writeFile('dist/version.txt', buf, function(err) {
        err && console.log(err)
    })
})

// 清空dist文件夹
gulp.task('clean', function() {
    return gulp.src(['dist/*'])
        .pipe(clean())
})

// 启本地服务，并打开浏览器
gulp.task('browser', function() {
    browserSync.init({
        server: 'dist' // 访问目录，自动指向该目录下的 index.html 文件
        // proxy: "你的域名或IP"    // 设置代理
    })
})
gulp.task('browser_reload', function() {
    browserSync.reload()
})

// 监听文件变化（'add', 'change', 'unlink'）
gulp.task('watch', function() {
    w(html_path, 'html')
    w(js_libs_path, 'js_libs')
    w(js_main_path, 'js_main')
    w(css_libs_path, 'css_libs')
    w(css_main_path, 'css_main')
    w(images_path, 'images')
    w(fonts_path, 'fonts')

    function w(path, task) {
        watch(path, function() {
            runSequence(task, 'browser_reload') // 打包完成后，再刷新浏览器。监听任务不要带cb参数，否则会报错：回调次数太多
        })
    }
})

// 开发环境
gulp.task('dev', function(cb) {
    set_env('dev')
    runSequence(
        ['clean'],
        ['html', 'js_libs', 'js_main', 'css_libs', 'css_main', 'images', 'fonts'],
        ['browser', 'watch'],
        cb)
})

// 生产环境
gulp.task('build', function(cb) {
    set_env('build')
    runSequence(
        ['clean'], // 首先清理文件，否则会把新打包的文件清掉
        ['html', 'js_libs', 'js_main', 'css_libs', 'css_main', 'images', 'fonts'], // 不分先后的任务最好并行执行，提高效率
        ['rev'], // 所有文件打包完毕之后开始生成版本清单文件
        ['set_version', 'version.txt'], // 根据清单文件替换html里的资源文件
        cb)
})
