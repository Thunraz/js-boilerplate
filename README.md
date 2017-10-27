[![npm](https://img.shields.io/github/license/thunraz/js-boilerplate.svg)](https://github.com/Thunraz/js-boilerplate/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/thunraz/js-boilerplate.svg)](https://github.com/Thunraz/js-boilerplate/tags)

# js-boilerplate

Just some boilerplate code to get you started with a JavaScript-heavy HTML5 page (e.g. an HTML5 game).

Uses [gulp](http://gulpjs.com/) and supports [electron](http://electron.atom.io/).

1. `git clone --depth=1 --branch=master git://github.com/Thunraz/js-boilerplate.git my-project`
2. `cd my-project`
3. `rm -rf .git`
4. Edit `package.json`
5. `npm install`

There are a few gulp tasks predefined:
* `build` Runs rollup on your source code. Entry point is the file src/js/main.js
* `css` Transforms your SASS (src/sass/main.scss) to CSS
* `template` Transforms your Pug (formerly Jade) file to HTML
* `watch` Starts a local web server that runs on port 8080 (can be overriden using the environment variable GULP_PORT). Rebuilds when files change.
* `assets` Copies your assets to the destination.
* `electron` Prepares an electron package (run `npm run dist` in dist directory to create the electron package)
