import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxtjs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },
    extraEases: {
      expoScaleEase: true,
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["v-gsap-nuxt", "@nuxt/content"],

  // Nuxt Content configuration
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'bash', 'json']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },

  compatibilityDate: "2025-02-28",

  // Hybrid rendering: SEO for homepage, SPA-style for auth/app
  routeRules: {
    "/": { prerender: true },        // homepage: fully prerendered for SEO
    "/blog": { prerender: true },    // blog listing: prerendered for SEO
    "/blog/**": { prerender: true }, // blog articles: prerendered for SEO
    "/auth/**": { ssr: false },      // auth flows: client-side only
    "/app/**": { ssr: false },       // app dashboard & tools: client-side only
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});