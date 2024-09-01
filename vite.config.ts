import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
// import webFontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
  plugins: [
    solid(),
    //webFontDownload()
  ],
  resolve: {
    alias: {
      '~/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
