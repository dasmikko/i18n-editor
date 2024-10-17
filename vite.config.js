import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import Pages from "vite-plugin-pages";
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Components({
      resolvers: IconsResolver(),
    }),
    Icons({ compiler: 'vue3' }),
    vueDevTools(),
  ],
})
