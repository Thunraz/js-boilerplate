'use strict';

const rollup = require('rollup').rollup;

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

export default () => {
    return build();
};