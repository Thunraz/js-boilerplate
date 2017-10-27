'use strict';

let fs   = require('fs'),
    gulp = require('gulp'),
    pug  = require('pug');

function writeFile(fname, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fname, data, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function readFile(fname) {
    return new Promise((resolve, reject) => {
        fs.readFile(fname, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data.toString('utf8'));
        });
    });
}

module.exports = () => {
    gulp.task('template', ['css'], (done) => {
        readFile('./src/index.pug')
            .then((str) => {
                // development index file
                let result = pug.compile(str, { filename: './src/index.pug' })();
                return writeFile('./dist/index.html', result);
            })
            .then(done);
    });
};
