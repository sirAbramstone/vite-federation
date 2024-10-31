import { readFileSync, writeFileSync, cpSync, rmSync } from 'fs';

// @NOTE this fix is only required coz we use 'file:' deps which breaks vite
const pwd = process.cwd();
const packages = ['facade', 'widgets'];

packages.forEach((name) => {
    const path = `${pwd}/${name}/package.json`;
    const json = JSON.parse(readFileSync(path));
    json.dependencies.shared = '^1.0.0';
    writeFileSync(path, JSON.stringify(json, null, 4));
});

// replace 'shared' symlink with source (or else vite wont work)
rmSync('./node_modules/shared', { recursive: true });
cpSync('./shared', './node_modules/shared', { recursive: true });

console.log('FIX-DEPS:', 'patched packages', packages, 'shared symlink removed');
