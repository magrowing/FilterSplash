import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {fileURLToPath , URL} from 'url'

export default defineConfig({
  plugins: [react()],
  resolve : {
    alias : {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      '@assets' : fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components' : fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages' : fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@types' : fileURLToPath(new URL('./src/types', import.meta.url)),
      '@store' : fileURLToPath(new URL('./src/store', import.meta.url)),
      '@apis' : fileURLToPath(new URL('./src/apis', import.meta.url)),
      '@firebase' : fileURLToPath(new URL('./src/firebase', import.meta.url)),
      '@utils' : fileURLToPath(new URL('./src/utils', import.meta.url)),
    }
  }, 
})
