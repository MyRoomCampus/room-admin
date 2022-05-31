import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import { createHtmlPlugin } from 'vite-plugin-html'
import * as path from 'path'
import federation from '@originjs/vite-plugin-federation'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, './src', ''))
  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      react(),
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
      viteStylelint({ exclude: /windicss|node_modules/ })
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
    build: {
      target: 'esnext'
    }
  }
})
