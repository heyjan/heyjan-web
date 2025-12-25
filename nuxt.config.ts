import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // SEO Configuration
  site: {
    url: 'https://heyjan.de',
    name: 'Jan Mayer | AI Solution Architect & Azure AI Specialist',
    description: 'AI Solution Architect at LIQUI MOLY specializing in Azure AI Foundry and enterprise AI solutions. Self-taught developer building production-ready AI systems.',
    defaultLocale: 'en',
  },

  // Global page headers: https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [{ src: "https://analytics.ahrefs.com/analytics.js", async: true, 'data-key': "kK9WahAIZ2+5ycKldReAYA" }],
    },
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

  // Auto import components: https://nuxt.com/docs/guide/directory-structure/components
  components: true,

  // Modules: https://nuxt.com/docs/guide/directory-structure/modules
  modules: ["v-gsap-nuxt", "@nuxt/content", "@nuxtjs/seo"],

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
    "/impressum": { prerender: true }, // Impressum: prerendered for SEO
    "/auth/**": { ssr: false },      // auth flows: client-side only
    "/app/**": { ssr: false },       // app dashboard & tools: client-side only
  },

  sitemap: {
    exclude: ['/app/**', '/auth/**'],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});