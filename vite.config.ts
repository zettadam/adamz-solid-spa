import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import prefetchPlugin from 'vite-plugin-bundle-prefetch'
// import webFontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
  plugins: [
    solid(),
    prefetchPlugin(),
    //webFontDownload()
  ],
  resolve: {
    alias: {
      '~/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
