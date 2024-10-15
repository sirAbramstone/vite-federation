import { readFileSync, writeFileSync, cpSync, rmSync } from 'fs';

// @NOTE this fix is only required coz we use 'file:' deps which breaks vite
const pwd = process.cwd();
const packages = ['facade', 'widgets'];

packages.forEach((name) => {
    const path = `${pwd}/${name}/package.json`;
    const json = JSON.parse(readFileSync(path));
    json.dependencies.wcore = '^1.0.0';
    writeFileSync(path, JSON.stringify(json, null, 4));
});

// replace 'wcore' symlink with source (or else vite wont work)
rmSync('./node_modules/wcore', { recursive: true });
cpSync('./wcore', './node_modules/wcore', { recursive: true });

console.log('FIX-DEPS:', 'patched packages', packages, 'wcore symlink removed');
