'use strict';

let gulp   = require('gulp'),
    rollup = require('rollup').rollup;

let cache;

function build() {
    return rollup({
        input: 'src/js/main.js',
        cache: cache,
        external: [
            // add your externals if you have some
        ]
    }).then(function(bundle) {
        return bundle.write({
            file:  'dist/main.js',
            sourcemap: true,
            format: 'iife',
            globals: {
                // add your globals if you have some
            },
        });
    });
}

module.exports = () => {
    gulp.task('copy-dependencies', () => {
        return gulp
            .src([
                // add the files your app depends on e.g.:
                './src/electron/electron.js'
            ])
            .pipe(gulp.dest('./dist/'))
    });

    gulp.task('build', gulp.series('copy-dependencies', build));
};
