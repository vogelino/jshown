/* global require */
/* global process */

// MODULES
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var nib = require('nib');

// CONFIGURATION
var baseSourcePath = './src';
var paths = {
	src: {
		static: [
			baseSourcePath + '/index.html',
			baseSourcePath + '/scripts/libs/**',
			baseSourcePath + '/resources/**'
		],
		styles: [
			baseSourcePath + '/stylesheets/**/*.styl'
		],
		javascript: [
			'!' + baseSourcePath + '/scripts/libs/**',
			baseSourcePath + '/scripts/**/*.js'
		]
	},
	targetFolder: 'dest',
	target: {
		static: [
			'index.html',
			baseSourcePath + '/stylesheets/**/*.css',
			baseSourcePath + '/scripts/libs/',
			baseSourcePath + '/resources/'
		],
		javascript: 'dest/scripts'
	}
};

// SET UP ENVIRONMENT
process.env.NODE_ENV = 'development';

// GULP TASKS
gulp.task('clean', function(){
	return gulp.src(paths.targetFolder, {
			read: false
		})
		.pipe(clean());
});

gulp.task('build', function() {
	return browserify(baseSourcePath + '/scripts/main.js', {
			debug: true
		})
		.transform(babelify, {})
		.bundle()
		.on('error', util.log.bind(util, 'Browserify Error'))
		.pipe(source('build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dest/scripts'));
});

gulp.task('stylus', function () {
	gulp.src(paths.src.styles)
		.pipe(sourcemaps.init())
		.pipe(stylus({ use: [ nib() ] }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.targetFolder));
});

gulp.task('move-static', function() {
	return gulp.src(paths.src.static, {
			base: './src'
		})
		.pipe(gulp.dest(paths.targetFolder));
});

gulp.task('watch', ['move-static', 'stylus', 'build'], function() {
	gulp.watch(paths.src.styles, ['stylus']);
	gulp.watch(paths.src.static, ['move-static']);
	gulp.watch(paths.src.javascript, ['build']);
});

gulp.task('default', ['move-static', 'stylus', 'build']);
