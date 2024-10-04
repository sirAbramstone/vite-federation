import federation from '@originjs/vite-plugin-federation';

// https://github.com/originjs/vite-plugin-federation/issues/510
/**
 * @param {{ isLibrary:boolean, packageJson:object, facadeOptions:object, libraryOptions:object }} options
 * @return {import('vite').Plugin}
 */
export const useFederation = ({
    isLibrary,
    packageJson = {},
    facadeOptions = { name: 'facade' },
    libraryOptions = {
        name: 'library',
        filename: 'remoteEntry.js',
        exposesName: './exports',
        exposesPath: './resolveEntry.js',
    },
}) => {
    const { dependencies = {} } = packageJson;
    // https://github.com/originjs/vite-plugin-federation?tab=readme-ov-file#shared
    const shared = Object.keys(dependencies);

    if (isLibrary) {
        const { name, filename, exposesName, exposesPath } = libraryOptions;
        return federation({
            name,
            filename,
            exposes: {
                [exposesName]: exposesPath,
            },
            shared,
        });
    }
    {
        const { name } = facadeOptions;
        return federation({
            name,
            remotes: { dummy: 'dummy.js' },
            shared,
        });
    }
};
