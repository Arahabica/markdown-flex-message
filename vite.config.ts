/// <reference types="vitest" />
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      all: true,
      exclude: [
        'src/**/*.d.ts',
        'src/test/**/*',
        'src/types.ts'
      ],
      reporter: ["json", "html"]
    }
  }
})
