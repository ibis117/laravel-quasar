import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from "@vitejs/plugin-vue";
import UnoCss from 'unocss/vite'
export default defineConfig({
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),
        quasar({
            sassVariables: 'resources/css/quasar-variables.sass'
        }),

        UnoCss({ /* options */ }),

        laravel({
            input: ['resources/css/app.scss', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
