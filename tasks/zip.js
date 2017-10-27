'use strict';

let gulp     = require('gulp'),
    filesize = require('gulp-filesize'),
    rename   = require('gulp-rename'),
    uglify   = require('gulp-uglify-es').default,
    zip      = require('gulp-zip');

module.exports = () => {
    gulp.task('minify', ['build', 'css', 'template', 'assets'], () => {
        return gulp
            .src('dist/main.js')
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('zip', ['minify'], () => {
        return gulp
            .src([
                './dist/main.min.js',
                './dist/*.css',
                './dist/index.html',
                './dist/assets/**/*'
            ], { base: 'dist' })
            .pipe(zip('dist.zip'))
            .pipe(filesize())
            .pipe(gulp.dest('dist'));
    });
};
