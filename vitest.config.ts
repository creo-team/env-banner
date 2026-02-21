import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			exclude: ['node_modules/', 'src/test/setup.ts', 'dist/', 'examples/'],
			reporter: ['text', 'json', 'html'],
		},
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['./src/test/setup.ts'],
	},
})
