import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

import { allMarginRuleHandle } from './src/plugin/unocss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '~': resolve(__dirname, 'node_modules'), // 设置 `@` 指向 `src` 目录
    },
  },
  plugins: [
    uni(),
    Unocss({
      presets: [
        // presetAttributify({ /* preset options */ }), //小程序端不适用属性类
        presetIcons({
          scale: 1.2,
          collections: {
            // common: FileSystemIconLoader(
            //   './assets/icons/svg',
            //   svg => svg.replace(/#fff/, 'currentColor'),
            // ),
          },
        }),
      ],
      rules: [
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}rpx` })], // margin:10px;
        [/^p-(\d+)$/, match => ({ padding: `${match[1]}rpx` })], // padding:10px;
        [/^(m|p)(l|r|t|b|lr|tb|lrtb|tblr|rl|bt)-(\d+)$/, allMarginRuleHandle],
        [/^fs-(\d+)$/, match => ({ 'font-size': `${match[1]}rpx` })], // font-size:10px;
        [/^letter-(\d+)$/, match => ({ 'letter-spacing': `${match[1]}rpx` })],
        [/^lh-(\d+)$/, match => ({ 'line-height': `${match[1]}rpx` })],
        [/^h-(\d+)$/, match => ({ height: `${match[1]}rpx` })],
        [/^w-(\d+)$/, match => ({ width: `${match[1]}%` })],
        [/^box-(\d+)$/, match => ({ width: `${match[1]}rpx` })],
      ],
    }),
    AutoImport({
      // global imports to register
      imports: [
        'vue',
        'pinia',
      ],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: 'src/shim.d.ts/auto-imports.d.ts',
    }),
  ],
})
