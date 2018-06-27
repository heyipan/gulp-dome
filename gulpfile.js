var gulp = require('gulp');
//编译less
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');//压缩css
//js合并 压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//浏览器同步测试
var browserSync = require('browser-sync');
//压缩html
var htmlmin = require('gulp-htmlmin');

gulp.task('test',function  () {
	// body...
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,//去掉空格
		removeComments:true//去掉注释
	}))
	.pipe(browserSync.reload({
      stream: true
    }))
	.pipe(gulp.dest('dist/'));
});
gulp.task('styles',function (){
	//css 的 
	gulp.src('src/css/*.less')
	.pipe(less())//编译less
	.pipe(cssnano())//压缩css
	.pipe(browserSync.reload({
		stream:true
	}))
	.pipe(gulp.dest('dist/css/'));
})
gulp.task('scripts',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))//合并
	.pipe(uglify())//压缩混淆
	.pipe(browserSync.reload({
		stream:true
	}))
	.pipe(gulp.dest('dist/js/'));
})


gulp.task('start',function(){
	browserSync({
    server: {
      baseDir: ['dist']
    },
  	}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
  	});

	gulp.watch('src/*.html',['test']);
	gulp.watch('src/js/*.js',['scripts']);
	gulp.watch('src/css/*.less',['styles']);
})
