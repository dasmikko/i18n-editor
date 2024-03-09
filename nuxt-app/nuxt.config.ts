import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: true,
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: [
      'composables/*/index.{ts,js,mjs,mts}',
    ]
  },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, './presets/lara/') }      //import and apply preset
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      Components({
        resolvers: IconsResolver(),
      }),
      Icons(),
    ]
  }
})
