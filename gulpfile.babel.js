'use strict';

import gulp from 'gulp';
import Path from 'path';
import sass from 'gulp-sass';
import log from 'fancy-log';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import fileinclude from 'gulp-file-include';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import util from 'gulp-util';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import nunjucks from 'gulp-nunjucks';
import inject from 'gulp-inject-string';

const svgmin   = require('gulp-svgmin');
const changed  = require('gulp-changed');
const del      = require('del');
const prettify = require('gulp-html-prettify');

var production = process.env.NODE_ENV === 'production';

gulp.task('styles', () => {
    return gulp.src(['./src/styles/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(connect.reload());
});


gulp.task('html', () => {
    var datum = new Date();
    var timestamp = datum.getTime()/1000;

    // console.log(getData());

    return gulp.src('./src/html/**/[^_]*.html')
        // .pipe(data(() => ({data: getData()})))
        .pipe(nunjucks.compile({}, { trimBlocks: true, lstripBlocks: true }))
        .pipe(prettify({
          indent_size: 4,
          indent_char: ' '
        }))
        .pipe(inject.after('src="/js/main.js', '?' + timestamp))
        .pipe(inject.after('href="/styles/main.css', '?' + timestamp))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function(done) {
    gulp.watch('./src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/html/**/*.html', gulp.series('html'));
    gulp.watch('./src/js/**/*.js', gulp.series('webpack'));
    gulp.watch('./static/images/**/*.{jpg,png,jpeg,svg,gif}', gulp.series('copy'));
    gulp.watch('./static/fonts/**/*.{ttf,eot,woff,woff2}', gulp.series('copy'));
    gulp.watch('./static/lib/**/*', gulp.series('copy'));
    
    done();
});

gulp.task('serve', function(done) {
    connect.server({
        root: './dist',
        livereload: true,
        host: "0.0.0.0"
    });

    done();
});

const webpackConfig = require('./webpack.config.js');
webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.optimization.minimize = production ? true : false;

gulp.task('webpack', function() {
    return gulp.src('./src/js/main.js')
                .pipe(webpackStream(webpackConfig))
                .pipe(gulp.dest('./dist/js/'))
                .pipe(connect.reload());
});



gulp.task('svg', function() {
    return gulp
        .src('./src/images/svg/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeXMLProcInst: false
            }, {
                removeDoctype: false
            }, {
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(gulp.dest('./dist/images/svg'));
});

gulp.task('copy:img', function() {
    return gulp
        .src(['./static/images/**/*.{jpg,png,jpeg,svg,gif}'])
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy:fonts', function() {
    return gulp
        .src(['./static/fonts/**/*.{ttf,eot,woff,woff2}'])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy:root', function(done) {
    gulp
        .src('./static/*.*')
        .pipe(gulp.dest('./dist/'));

    gulp
        .src('./static/lib/**/*')
        .pipe(gulp.dest('./dist/jslib'));

    done();
});

gulp.task('copy:watch', function() {
    gulp.watch('./static/images/**/*.{jpg,png,jpeg,svg,gif}', ['copy']);
});

gulp.task('clean', function(cb) {
    return del([
        './dist/'
    ]).then(function(paths) {
        util.log('Deleted:', util.colors.magenta(paths.join('\n')));
    });
});

gulp.task('copy', gulp.series('copy:img', 'copy:fonts', 'copy:root'));
gulp.task('build', gulp.series('clean', 'copy', 'html', 'styles', 'webpack'));

const defaultTasks = gulp.parallel('html', 'styles', 'serve', 'webpack', 'watch')
export default defaultTasks