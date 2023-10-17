// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      alchemyApiKey: '',
    },
  },

  devtools: {enabled: true},

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/tailwindcss'],

  build: {
    transpile: ['primevue'],
  },
})
