'use strict';

let css    = require('gulp-concat-css'),
    gulp   = require('gulp'),
    uglify = require('gulp-uglifycss');

const cssFiles = [
    'src/css/reset.css',
    'src/css/main.css'
];

module.exports = () => {
    gulp.task('css', function () {
        return gulp.src(cssFiles)
            .pipe(css('main.css'))
            .pipe(uglify({
                'maxLineLen': 80
            }))
            .pipe(gulp.dest('./dist'));
    });
};
