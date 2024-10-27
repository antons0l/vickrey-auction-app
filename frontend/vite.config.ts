import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = `${env.VITE_API_URL ?? ''}`;
  
  return {
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  }});
