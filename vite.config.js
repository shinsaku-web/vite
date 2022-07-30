import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from "glob";
import handlebars from 'vite-plugin-handlebars';
import viteImagemin from "vite-plugin-imagemin"; // 追加


const pageData = {
    '/index.html': {
        title: 'Main Page',
    },
    '/about/index.html': {
        people: [
            "Aさん",
            "Sさん",
            "Nさん",
        ],
    },
};

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
                    if (extType === 'css') {
                        return `${dir}css/style.css`;
                    }
                    return `${dir}${extType}/[name][extname]`;
                },
                chunkFileNames: 'assets/js/main.js',
                entryFileNames: 'assets/js/main.js',
            },
        }
    },
    server: {
        open: '/',
    },
    plugins: [
        handlebars({
            //コンポーネントの格納ディレクトリを指定
            partialDirectory: resolve(__dirname, './src/components'),
            //各ページ情報の読み込み
            context(pagePath) {
                return pageData[pagePath];
            },
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
        }),
    ],
});