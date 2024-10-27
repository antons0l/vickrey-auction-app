import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = `${env.VITE_API_URL ?? ''}`;
  const nodeEnv = `${env.VITE_NODE_ENV ?? 'development'}`
  console.log("debug check second var " + nodeEnv)
  
  return {
    server: (nodeEnv === 'development') ? {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    } : {},
    plugins: [react()],
  }});
