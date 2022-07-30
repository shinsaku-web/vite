import { defineConfig } from 'vite';

export default defineConfig({
    root: './src',
    base: "./",
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.')[1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images';
                    }
                    if (extType === 'css') {
                        return `assets/css/style.css`;
                    }
                    return `assets/${extType}/[name][extname]`;
                },
                chunkFileNames: 'assets/js/[name].js',
                entryFileNames: 'assets/js/[name].js',
            },
        }
    },
    server: {
        open: '/',
    },
});