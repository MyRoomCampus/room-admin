import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import viteStylelint from '@amatlash/vite-plugin-stylelint'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint(),
    viteStylelint({ exclude: /windicss|node_modules/ })
  ],
  resolve: {
    // 别名配置，可以使用绝地路径引入src文件夹下面的文件
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
