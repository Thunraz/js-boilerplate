[![npm](https://img.shields.io/github/license/thunraz/js-boilerplate.svg)](https://github.com/Thunraz/js-boilerplate/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/thunraz/js-boilerplate.svg)](https://github.com/Thunraz/js-boilerplate/tags)

# js-boilerplate

Just some boilerplate code to get you started with a JavaScript-heavy HTML5 page (e.g. an HTML5 game).

Uses [gulp](http://gulpjs.com/).

1. `git clone --depth=1 --branch=master git://github.com/Thunraz/js-boilerplate.git my-project`
2. `cd my-project`
3. `rm -rf .git`
4. Edit `package.json`
5. `npm install`
6. `npm run dev`

There are a few gulp tasks predefined:
* `clean`
* `compile` Runs the following hidden subtasks:
  * `compileMarkup` Transforms your Pug (formerly Jade) file to HTML
  * `compileScript` Runs rollup on your source code. Entry point is the file src/js/main.js
  * `compileStyle` Concatenates your CSS files (I dropped support for SASS) and minimizes it
  * `minifyJS` Minifies your JavaScript code
  * `zip` Create a zip archive and prints its file size. Useful for [js13kGames](http://js13kgames.com).
* `watch` Starts a local web server that runs on port 8080 (can be overriden using the environment variable GULP_PORT). Rebuilds when files change.
