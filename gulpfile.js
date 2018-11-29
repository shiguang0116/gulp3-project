/**
 * 打包路径无法生成单一文件 
 * 路径保持一致
 * 文件顺序无法保证
 * js检查       1
 * es6          1
 * 代理     config.js
 * 监听新建文件的变化   1
 * iconfont
 * gulp.start() 会影响同步执行
 */

'use strict';

var gulp = require('gulp');
var path= require('path');
var pump = require('pump');
var fs = require('fs');
var babel = require('gulp-babel');
var htmltpl = require('gulp-html-tpl');     // 引用html模板
var artTemplate = require('art-template');  // 模板渲染
var concat = require('gulp-concat');        // 合并文件
var clean = require('gulp-clean');          // 清空文件夹
var filter = require('gulp-filter');        // 过滤文件
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');        // js 压缩
var csso = require('gulp-csso');            // css压缩
var less = require('gulp-less');	        // less编译
var autoprefixer = require('gulp-autoprefixer');	// 自动添加CSS前缀
var htmlmin = require('gulp-htmlmin');      // html 压缩
var imagemin = require('gulp-imagemin');    // 图片压缩
var revAll = require('gulp-rev-all');       // 增加版本号    
var revCollector = require('./rev/gulp-rev-collector');
var browserSync = require('browser-sync').create();	// 用来打开一个浏览器
var watch = require('gulp-watch');          // 监听文件（修改、新建、删除）
var runSequence = require('run-sequence');  // 按顺序执行task

// 设置环境变量
var env = 'dev';
function set_env(env){
    env = env || 'dev';
    fs.writeFile("./env.js", 'export default ' + env + ';', function(err){
        err && console.log(err);
    });
}

// 模板处理
gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmltpl({
            tag: 'template',
            paths: ['./src/common'],
            engine: function(template, data) {
                return template && artTemplate.compile(template)(data);
            },
            data: {
                header: false,
                g2: false
            }
        }))
        .pipe(gulp.dest('./dist'));
});

// 打包js
gulp.task('js_libs', function(){
    return gulp.src('./src/libs/**/*.js')
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('js_main', ['uglify_check'], function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('main.min.js'))    // 合并文件并命名
        .pipe(babel())                  // 编译es6语法
        .pipe(gulpif(env==='build', uglify()))  // 压缩js
        .pipe(gulp.dest('./dist/js'));
});
/**
 * @description 检查压缩JS时的错误，作为'js_main'的依赖执行。
 * 
 * 1、解决js压缩出错的问题
 * 2、解决修改的代码有语法错误时，服务会终止的问题
 */
gulp.task('uglify_check', function (cb) {
    return pump([
        gulp.src('./src/js/*.js'),
        babel(),
        uglify()
    ], cb);
});

// 打包css
gulp.task('css_libs', function(){
    return gulp.src('./src/libs/**/*.css')
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('css_main', function(){
    return gulp.src('./src/css/**/*.css')
        .pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.min.css'))
        .pipe(csso())                   // 压缩优化css
        .pipe(gulp.dest('./dist/css'));
});

// 打包其他资源
gulp.task('images', function () {
    return gulp.src('./src/images/*.*')
        .pipe(imagemin({
            progressive: true,
        }))
        .pipe(gulp.dest('./dist/images'));
});

// 生成版本号清单
gulp.task('rev', function() {
    return gulp.src(['./dist/js/**', './dist/css/**'])
        .pipe(revAll.revision({
            transformFilename: function (file, hash) {
                return path.basename(file.path) + '?' + hash.substr(0, 10);
            }
        }))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest("./rev"))
        .pipe(revAll.versionFile())
        .pipe(gulp.dest("./rev"));
});
// 添加版本号（路径替换）
gulp.task('set_version', function() {
    return gulp.src(['./rev/rev-manifest.json', './dist/*.html'])
        .pipe(revCollector())   // 根据.json文件 执行文件内js/css名的替换
        .pipe(htmlmin({ 
            removeComments: true,       // 清除HTML注释
            collapseWhitespace: true,   // 压缩HTML
            minifyJS: true,             // 压缩页面JS
            minifyCSS: true             // 压缩页面CSS
        }))
        .pipe(filter('**/*.html'))
        .pipe(gulp.dest('./dist'));
});
// 生成版本文件
gulp.task('version.txt', function () {
    var buf = `{
        "BUILD_VERSION": "",
        "BUILD_URL": ""
    }`;
    fs.writeFile("./version.txt", buf, function(err){
        err && console.log(err);
    });
});

// 清空dist文件夹
gulp.task('clean', function(){
	return gulp.src(['./dist/*'])
		.pipe(clean());
});

// 打开浏览器，开启服务
gulp.task('browser', function(){
	browserSync.init({
        server: './dist'
        // proxy: "你的域名或IP"    // 代理
    });
});

// 监听文件变化（'add', 'change', 'unlink'）
gulp.task('watch', function () {
    w('./src/**/*.html', 'html');
    w('./src/js/**', 'js_main');
    w('./src/libs/**/*.js', 'js_libs');
    w('./src/css/**', 'css_main');
    w('./src/libs/**/*.css', 'css_libs');

    function w(path, task){
        watch(path, function () {
            gulp.start(task);
            browserSync.reload();
        });
    }
});

// 开发环境
gulp.task('dev', function(done) {
    set_env('dev');
    runSequence(
        ['clean'],
        ['html', 'js_libs', 'js_main', 'css_libs', 'css_main', 'images'],
        ['browser', 'watch'],
        done);
});

// 生产环境
gulp.task('build', function(done) {
    set_env('build');
    runSequence(
        ['clean'],
        ['html', 'js_libs', 'js_main', 'css_libs', 'css_main', 'images'],
        ['rev'],
        ['set_version', 'version.txt'],
        done);
});
