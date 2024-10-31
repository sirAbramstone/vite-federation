import { federation } from '@module-federation/vite';
import path from 'path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// https://github.com/module-federation/vite/pull/148/files#diff-8a62656f3d9333b1abd6ce377cbef6e32ceb6f09a9c264617b4df417d21fcaf9
/**
 * @param {{ isLibrary:boolean, packageJson:object, hostOptions:object, remoteOptions:object }} options
 * @return {import('vite').Plugin}
 */
export const useViteFederation = ({
    isLibrary,
    packageJson = {},
    hostOptions = { name: 'host', packageExcludes: ['vue'] },
    remoteOptions = {
        name: 'remote',
        filename: 'remoteEntry.js',
        exposesName: './exports',
        exposesPath: './resolveEntry.js',
    },
}) => {
    const pwd = process.cwd();
    /** @type {Array<[string, string]>} */
    const sharedDeps = [];

    Object.entries(packageJson.dependencies).forEach(([name, version]) => {
        const versionFixed = version.startsWith('file:') ? '^0.0.0' : version;
        sharedDeps.push([name, versionFixed]);
        // dont analyze these
        if (hostOptions.packageExcludes.includes(name)) {
            return;
        }
        const sharedPackagePaths = [
            path.resolve(pwd, 'node_modules', name, 'package.json'),
            // this is just for the sake of mono-repo
            path.resolve(`${pwd}/../`, 'node_modules', name, 'package.json'),
        ];
        const sharedPackageJson = sharedPackagePaths
            .map((val) => {
                try {
                    return require(val);
                } catch (e) {
                    return null;
                }
            })
            .find((v) => v !== null);
        const sharedExports = Object.keys(sharedPackageJson?.exports ?? {})
            .filter((val) => {
                const isRoot = val === '.';
                const isFile = val.match(/\.\w+$/) != null;
                const isGlob = val.includes('*');
                // @NOTE we cant handle globs atm
                return !isRoot && !isFile && !isGlob;
            })
            .map((subname) => [`${sharedPackageJson.name}${subname.slice(1)}`, '^0.0.0']);

        sharedDeps.push(...sharedExports);
    });

    console.log('federation shared deps:');
    console.log(sharedDeps);
    console.log('--------');

    // remote mode
    if (isLibrary) {
        const { name, filename, exposesName, exposesPath } = remoteOptions;
        return federation({
            name,
            filename,
            exposes: {
                [exposesName]: exposesPath,
            },
            shared: sharedDeps.reduce((acc, [name, version]) => ({ ...acc, [name]: { name, singleton: true } }), {}),
        });
    }

    // host mode
    {
        const { name } = hostOptions;
        return federation({
            name,
            manifest: true,
            remotes: { dummy: 'dummy.js' },
            shared: sharedDeps.reduce((acc, [name, version]) => ({ ...acc, [name]: { name, singleton: true } }), {}),
        });
    }
};
