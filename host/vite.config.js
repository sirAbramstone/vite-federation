import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { useViteFederation } from '../use-vite-federation';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('widget-'),
                },
            },
        }),
        useViteFederation({ isLibrary: false, packageJson }),
    ],
    build: {
        target: 'esnext',
    },
});
