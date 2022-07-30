import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from "glob";

export default defineConfig({
    root: './src',
    // base: "./",
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: glob.sync(resolve(__dirname, "src", "**/*.html")),// 下層ページも出力する
            output: {
                assetFileNames: (assetInfo) => {
                    console.log(assetInfo);
                    const [dirFileName, extType] = assetInfo.name.split('.');
                    const dir = (() => {
                        const ary = dirFileName.split("/");
                        if (ary.length <= 1) {
                            return ''; //ディレクトリの階層が1階層のとき
                        }
                        ary.pop(); //ファイル名を削除
                        return ary.join("/") + '/';
                    })();
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        return `assets/images/[name][extname]`;
                    }
                    return `${dir}${extType}/[name][extname]`;;
                },
                chunkFileNames: 'assets/js/main.js',
                entryFileNames: 'assets/js/main.js',
            },
        }
    },
    server: {
        open: '/',
    },
});