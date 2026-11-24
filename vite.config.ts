import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// 빌드 결과는 GitHub Pages(https://<계정>.github.io/always-react/)에 배포하므로 build에서만 base 경로를 지정합니다.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/always-react/' : '/',
  plugins: [react()],
}))
