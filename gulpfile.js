'use strict';

const gulp = require('gulp');

let tasks = ['build', 'css', 'template', 'watch', 'assets', 'zip'];

// Bootstrap individual task files
tasks.forEach(
    (task) => require(`./tasks/${task}`)()
);

let filteredTasks = tasks.filter((x) => { return x != 'watch' });

gulp.task('default', gulp.series(filteredTasks));