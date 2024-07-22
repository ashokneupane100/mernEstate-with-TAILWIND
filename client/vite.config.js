import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom'],
        },
      },
      external: ['number-to-words']
    },
    chunkSizeWarningLimit: 1000,
  },
});
