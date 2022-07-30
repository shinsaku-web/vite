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
                    const extType = assetInfo.name.split('.')[1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        return `assets/images/[name][extname]`;
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