'use strict';

let gulp     = require('gulp'),
    gutil    = require('gulp-util'),
    rename   = require('gulp-rename'),
    through  = require('through2'),
    uglify   = require('gulp-uglify-es').default,
    zip      = require('gulp-zip');

function minify() {
    return new Promise((resolve, reject) => {
        gulp
            .src('dist/main.js')
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('dist'))
        resolve();
    });
}

function createZip() {
    return new Promise((resolve, reject) => {
        gulp
            .src([
                './dist/main.min.js',
                './dist/*.css',
                './dist/index.html',
                './dist/assets/**/*'
            ], { base: 'dist' })
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('dist'))
            .pipe(getZipSize());
        resolve();
    });
}

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

export default (done) => {
    minify()
        .then(createZip)
        .then(done);
};
