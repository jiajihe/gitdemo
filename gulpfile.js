

'use strict'

/*
1、less编译、压缩、合并

2、JS 合并、压缩、混淆

3、img复制

4、html压缩
*/



//在gulpfile中先载入gulp包，这个包中提供了一些api
var gulp = require('gulp');


var less = require('gulp-less'); //将less解释成css文件

var cssnano = require('gulp-cssnano'); //压缩css



//1、less编译、压缩、合并
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())	
		.pipe( gulp.dest('dist/styles'))
		.pipe(browserSync.reload({stream:true}));
});


//2、JS 合并、压缩、混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js')) //合并
		.pipe(uglify()) //压缩
		.pipe( gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({stream:true}));
});


//3、img复制
gulp.task('image',function(){

	gulp.src('src/images/*.*')
		.pipe( gulp.dest('dist/images'))
		.pipe(browserSync.reload({stream:true}));
});


//4、html压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe( htmlmin({
			collapseWhitespace: true,
			removeComments:true 
		}) )
		.pipe( gulp.dest('dist'))
		.pipe(browserSync.reload({stream:true}));
});



//浏览器同步
var browserSync =  require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir:['dist']
		}

	}, function(err, bs) {    });


	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});