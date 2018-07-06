'use strict';

let gulp       = require('gulp'),
    http       = require('http'),
    path       = require('path'),
    st         = require('st');

module.exports = () => {
    gulp.task('server', (done) => {
        let port = process.env.GULP_PORT || 8080;
        
        http.createServer(
            st({ path: path.join(__dirname, '..', 'dist'), index: 'index.html', cache: false })
        ).listen(port, done);
    });

    gulp.task('watch', gulp.series('server', () => {
        return gulp.watch(
            ['src/**/*'],
            gulp.series(['build', 'css', 'template', 'assets'])
        );
    }));
};
