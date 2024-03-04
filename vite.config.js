import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/i18n-editor",
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: 'i18n-editor' },
      ]
    }),
    Components({
      resolvers: IconsResolver(),
    }),
    Icons({ compiler: 'vue3' })]
})
