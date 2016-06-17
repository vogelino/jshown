/* global require */
/* global process */

// MODULES
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const util = require('gulp-util');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const stylus = require('gulp-stylus');
const nib = require('nib');
const concat = require('gulp-concat');

// CONFIGURATION
const baseSourcePath = './src';
const paths = {
	src: {
		static: [
			`${baseSourcePath}/index.html`,
			`${baseSourcePath}/scripts/libs/**`,
			`${baseSourcePath}/resources/**`
		],
		styles: [
			`${baseSourcePath}/stylesheets/**/*.styl`,
			`${baseSourcePath}/scripts/**/*.styl`
		],
		javascript: [
			`!${baseSourcePath}/scripts/libs/**`,
			`${baseSourcePath}/scripts/**/*.js`
		]
	},
	targetFolder: 'dest',
	target: {
		static: [
			'index.html',
			`${baseSourcePath}/stylesheets/**/*.css`,
			`${baseSourcePath}/scripts/libs/`,
			`${baseSourcePath}/resources/`
		],
		javascript: 'dest/scripts'
	}
};

// SET UP ENVIRONMENT
process.env.NODE_ENV = 'development';

// GULP TASKS
gulp.task('clean', () => gulp
	.src(paths.targetFolder, {
		read: false
	})
	.pipe(clean())
);

gulp.task('build', () =>
	browserify(`${baseSourcePath}/scripts/main.js`, {
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
	.pipe(gulp.dest('./dest/scripts'))
);

gulp.task('stylus', () => gulp
	.src(paths.src.styles)
	.pipe(concat('bundle.styl'))
	.pipe(sourcemaps.init())
	.pipe(stylus({ use: [ nib() ] }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.targetFolder))
);

gulp.task('move-static', () => gulp.
	src(paths.src.static, {
		base: './src'
	})
	.pipe(gulp.dest(paths.targetFolder))
);

gulp.task('watch', [ 'move-static', 'stylus', 'build' ], () => {
	gulp.watch(paths.src.styles, [ 'stylus' ]);
	gulp.watch(paths.src.static, [ 'move-static' ]);
	gulp.watch(paths.src.javascript, [ 'build' ]);
});

gulp.task('default', [ 'move-static', 'stylus', 'build' ]);
