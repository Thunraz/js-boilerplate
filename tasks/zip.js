'use strict';

// Set up the constants how you need them
const MAX_ZIP_SIZE_CHECK = true;
const MAX_ZIP_SIZE_BYTES = 13312;
const ZIP_SIZE_IN_KIB    = false;

let colors  = require('ansi-colors'),
    clean   = require('gulp-clean'),
    flog    = require('fancy-log'),
    gulp    = require('gulp'),
    through = require('through2'),
    uglify  = require('gulp-uglify-es').default,
    zip     = require('gulp-zip');

function minifyJS() {
    return gulp
        .src('dist/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/temp'));
};

function copyDistFiles() {
    return gulp
        .src([
            './dist/*.css',
            './dist/index.html',
            './dist/assets/**/*'
        ], { base: 'dist' })
        .pipe(gulp.dest('dist/temp/'));
}

function createZip() {
    return gulp
        .src(['./dist/temp/*', './dist/temp/**/*'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('dist'))
        .pipe(getZipSize(ZIP_SIZE_IN_KIB));
}

function deleteTempDir() {
    return gulp
        .src('./dist/temp')
        .pipe(clean());
}

function formatSize(size, inKiB) {
    let formattedSize = size;

    if(inKiB) {
        formattedSize = Math.round(formattedSize * 100 / 1024) / 100;
    }

    formattedSize = formattedSize.toLocaleString();
    formattedSize += inKiB ? ' KiB' : ' B';

    return formattedSize;
}

function getZipSize(inKiB) {
    return through.obj(function(file, encoding, callback) {
        let filenameShort = file.path.split(/\/|\\/).pop();

        // Check if we're dealing with a file or a buffer
        let byteSize = file.stat ? file.stat.size : Buffer.byteLength(String(file.contents));

        flog(
            'ZIP Size',
            colors.cyan(filenameShort),
            colors.magenta(formatSize(byteSize, inKiB))
        );

        if(MAX_ZIP_SIZE_CHECK === true) {
            if(byteSize <= MAX_ZIP_SIZE_BYTES) {
                flog(
                    colors.green('Inside ZIP size limit'),
                    colors.magenta(formatSize(byteSize, inKiB), colors.green('/'), formatSize(MAX_ZIP_SIZE_BYTES, inKiB)),
                    colors.green('(') +
                    colors.magenta(formatSize(MAX_ZIP_SIZE_BYTES - byteSize, inKiB)),
                    colors.green('left)')
                );
            } else {
                flog(
                    colors.red('Exceeded max ZIP size limit:'),
                    colors.magenta(formatSize(byteSize, inKiB), colors.red('/'), formatSize(MAX_ZIP_SIZE_BYTES, inKiB))
                );
            }
        }

        callback(null, file);
    });
}

export default gulp.series(
    minifyJS,
    copyDistFiles,
    createZip,
    deleteTempDir
);
