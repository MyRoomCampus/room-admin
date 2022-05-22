import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import {createHtmlPlugin} from 'vite-plugin-html'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, path.resolve(__dirname, './src', ''))
  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      react(),
      viteEslint(),
      viteStylelint({ exclude: /windicss|node_modules/ }),
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
          target: 'http://180.184.74.73',
          changeOrigin: true,
        } 
      }
    }
  }
})
