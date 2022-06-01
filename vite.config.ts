import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import { createHtmlPlugin } from 'vite-plugin-html'
import * as path from 'path'
import federation from '@originjs/vite-plugin-federation'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import viteImagemin from 'vite-plugin-imagemin'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, './src', ''))
  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      react(),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: i => `__tla_${i}`
      }),
      federation({
        name: 'room-components',
        filename: 'remoteEntry.js',
        exposes: {
          './AudioComponent': './src/views/LowCode/components/AudioComponent/index.tsx',
          './TextComponent': './src/views/LowCode/components/TextComponent/index.tsx',
          './VedioComponent': './src/views/LowCode/components/VedioComponent/index.tsx',
          './ImageComponent': './src/views/LowCode/components/ImageComponent/index.tsx',
          './HouseComponent': './src/views/LowCode/components/HouseComponent/index.tsx'
        },
        remotes:{},
        shared: ['react']
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      viteEslint(),
      viteStylelint({ exclude: /windicss|node_modules/ }),
      viteCompression(),
      visualizer({
        // 打包完成后自动打开浏览器，显示产物体积报告
        open: true,
      }),
      viteImagemin({
        // 无损压缩配置，无损压缩下图片质量不会变差
        optipng: {
          optimizationLevel: 7
        },
        // 有损压缩配置，有损压缩下图片质量可能会变差
        pngquant: {
          quality: [0.8, 0.9],
        },
        // svg 优化
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      })
    ],
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      // 别名配置，可以使用绝地路径引入src文件夹下面的文件
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://api.saicem.top',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
  }
})
