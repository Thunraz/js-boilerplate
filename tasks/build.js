'use strict';

let gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    rollup      = require('rollup').rollup;

module.exports = () => {
    gulp.task('copy-dependencies', () => {
        return gulp
            .src([
                // add the files your app depends on
                './src/electron/electron.js'
            ])
            .pipe(gulp.dest('./dist/'))
    });

    gulp.task('build', ['copy-dependencies'], (callback) => {
        return rollup({
            entry: 'src/js/main.js',
            sourceMap: true
        }).then(function(bundle) {
            return bundle.write({
                dest:  'dist/main.js',
                format: 'iife',
                globals: {
                    // Add your globals if you have some
                },
            });
        });
    });
};
