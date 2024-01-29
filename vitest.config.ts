import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./setup/mongo-memory-server.ts'],
    coverage: {
      all: false,
      include: ['src'],
      exclude: ['src/**/*-test.ts', 'src/**/*-spec.ts']
    }
  }
})
