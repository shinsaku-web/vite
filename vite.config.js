import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from "glob";

export default defineConfig({
    root: './src',
    base: "./",
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: glob.sync(resolve(__dirname, "src", "**/*.html")),// 下層ページも出力する
            output: {
                assetFileNames: (assetInfo) => {
                    const extType = assetInfo.name.split('.')[1];
                    console.log(extType);
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