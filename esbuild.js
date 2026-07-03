import * as esbuild from 'esbuild';
import fs from 'node:fs';

await esbuild.build({
    entryPoints: ['src/code.js'],
    bundle: true,
    outfile: 'dist/Code.js',
    format: 'iife',
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
});

(() => {
    const path = 'dist/Code.js';
    let code = fs.readFileSync(path, 'utf8');

    code = code
        .replace(/^\(\(\)\s*=>\s*\{\s*/, '')
        .replace(/\s*\}\)\(\);?\s*$/, '');

    fs.writeFileSync(path, code);
})();
