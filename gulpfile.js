var gulp = require("gulp");

var msPath = "./";
// var msPath = "public/manage/classic/";

// 引入组件
var uglify = require('gulp-uglify'),				// js 压缩
	concat = require('gulp-concat'),				// 合并文件
	minifycss = require('gulp-minify-css'),			// 压缩css
	less = require('gulp-less'),					// less
	autoprefixer = require('gulp-autoprefixer'),	// 自动添加CSS前缀
	rename = require('gulp-rename'),				// 重命名
	clean = require('gulp-clean'),					// 清空文件夹
	jshint = require('gulp-jshint'),				// js 检查
	htmlmin = require('gulp-htmlmin'),				// html 压缩
	imagemin = require('gulp-imagemin'),			// 图片压缩
	cache = require('gulp-cache'),					// 图片缓存，只有图片替换了才压缩
    notify = require('gulp-notify'),				// 更改提醒
	browserSync = require('browser-sync').create();	// 用来打开一个浏览器

// Default task
gulp.task('default', ['clean'], function(){
	browserSync.init({
        server:{ baseDir:'./' }
        // proxy: "192.168.31.234"
    });
	gulp.start('scripts', 'jslib', 'styles', 'images', 'watch');
});

// 监听
gulp.task('watch', function(){
	gulp.watch(msPath + 'index/*.html').on('change', browserSync.reload);
	gulp.watch(msPath + 'src/js/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch(msPath + 'src/css/*.less', ['styles']).on('change', browserSync.reload);
	gulp.watch(msPath + 'src/images/*', ['images']);
});

// JS脚本检查，合并
gulp.task('scripts', function(){
	gulp.src([msPath + 'src/js/*.js', '!' + msPath + 'src/js/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(msPath + 'dist/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(msPath + 'dist/js'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

gulp.task('jslib', function(){
	var lib_path = msPath + 'src/js_libs/';
	gulp.src([lib_path + 'hamster.js', lib_path + 'hamster.form.js', lib_path + 'hamster.validation.js'])
		.pipe(uglify())
		.pipe(gulp.dest(msPath + 'dist/js'))
		.pipe(notify({
			message: 'Scripts libs task complete'
		}));
});

// 合并、压缩、重命名css
gulp.task('styles', function(){
	gulp.src([msPath + 'src/css/*.less', '!' + msPath + 'dist/css/*.min.css'])
		.pipe(less())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(msPath + 'dist/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(msPath + 'dist/css'))
		.pipe(notify({
			message: 'styles task complete'
		}));
});

// 图片
gulp.task('images', function(){
	gulp.src(msPath + 'src/images/*')
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest(msPath + 'dist/images'));
});

// 清空JS,CSS,图片
gulp.task('clean', function(){
	return gulp.src([msPath + 'dist/*'], {read: false})
		.pipe(clean({force: true}));
});