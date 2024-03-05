import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/eslint-module',
    ['unplugin-icons/nuxt', {

    }]
  ],
  eslint: {

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
