'use strict';

let gulp     = require('gulp'),
    gutil    = require('gulp-util'),
    rename   = require('gulp-rename'),
    through  = require('through2'),
    uglify   = require('gulp-uglify-es').default,
    zip      = require('gulp-zip');

function getZipSize(inKib) {
    return through.obj(function(file, encoding, callback) {
        let filenameShort = file.path.split(/\/|\\/).pop()

        // Check if we're dealing with a file or a buffer
        let byteSize = file.stat ? file.stat.size : Buffer.byteLength(String(file.contents));
        
        let formattedSize = byteSize;
        if(inKib === true) {
            formattedSize /= 1024;
        }
        formattedSize = formattedSize.toLocaleString();
        formattedSize += inKib ? ' KiB' : ' B';

        gutil.log('Size', gutil.colors.cyan(filenameShort), ':', gutil.colors.magenta(formattedSize));

        callback(null, file);
    });
}

module.exports = () => {
    gulp.task('minify', gulp.series(['build', 'css', 'template', 'assets'], () => {
        return gulp
            .src('dist/main.js')
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('dist'));
    }));

    gulp.task('zip', gulp.series('minify', () => {
        return gulp
            .src([
                './dist/main.min.js',
                './dist/*.css',
                './dist/index.html',
                './dist/assets/**/*'
            ], { base: 'dist' })
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('dist'))
            .pipe(getZipSize());
    }));
};
