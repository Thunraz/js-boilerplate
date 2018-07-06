'use strict';

let gulp = require('gulp');

export default () => {
    return gulp.src(['src/assets/**/*'])
        .pipe(gulp.dest('dist/assets/'));
};