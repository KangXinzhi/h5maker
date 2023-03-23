import react from '@vitejs/plugin-react'
import pkg from 'vite';

const { defineConfig } = pkg;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3007
  },
})
