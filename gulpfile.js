var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

// Tasks
gulp.task('browser-sync', function() {
	browserSync({
		server: './',
		notify: false,
		ui: false
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('css', function(){
	gulp.src('theme/css/sass/**/*.scss')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest('theme/css/'))
		.pipe(browserSync.stream())
});

gulp.task('js', function(){
	gulp.src('theme/js/master.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('master.min.js'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('theme/js/'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch('theme/css/**/*.scss', ['css']);
	gulp.watch('theme/js/**/*.js', ['js']);
	gulp.watch(['**/*.html', '!node_modules'], ['bs-reload']);
});
