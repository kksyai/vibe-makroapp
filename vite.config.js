import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST || '127.0.0.1',
      port: parseInt(env.VITE_PORT) || 3000,
      strictPort: true,
      open: false,
      cors: true,
    },
    preview: {
      host: env.VITE_HOST || '127.0.0.1',
      port: 4173,
      strictPort: true,
    },
    define: {
      'import.meta.env.VITE_ENABLE_DEBUG': env.VITE_ENABLE_DEBUG === 'true',
      'import.meta.env.VITE_ENABLE_ANALYTICS': env.VITE_ENABLE_ANALYTICS === 'true',
    }
  }
})
