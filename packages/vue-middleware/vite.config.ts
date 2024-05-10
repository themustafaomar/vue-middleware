import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-middleware',
      fileName: 'vue-middleware',
      formats: ['umd', 'es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-router': 'vue-router',
        },
      },
    },
  },
})
