import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { useFederation } from '../use-federation';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue(), useFederation({ isLibrary: true, packageJson })],
    build: {
        target: 'esnext', //browsers can handle the latest ES features
    },
});
