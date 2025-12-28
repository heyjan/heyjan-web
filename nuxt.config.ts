import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // SEO Configuration
  site: {
    url: 'https://heyjan.de',
    name: 'Jan Mayer',
  },

  // Global page headers: https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
    head: {
      htmlAttrs: {
          lang: 'en'
      },
      titleTemplate: (title) =>
          title
              ? `${title} · Jan Mayer`
              : 'Jan Mayer · AI Solution Architect & Consultant',
      meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'robots', content: 'index, follow' },
          {
              name: 'description',
              content:
                  'Jan Mayer is an AI Solution Architect and Full-Stack Developer based in Ulm, Germany, specializing in enterprise AI, Azure AI Foundry, and RAG architectures.'
          }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://challenges.cloudflare.com" }
      ],
      script: [
        { src: "https://analytics.ahrefs.com/analytics.js", async: true, 'data-key': "kK9WahAIZ2+5ycKldReAYA" },
        { 
          src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad", 
          defer: true 
        }
      ],
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

  seo: {
    redirectToCanonicalSiteUrl: true
  },

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
    "/datenschutz": { prerender: true }, // Datenschutzerklärung: prerendered for SEO
    "/auth/**": { ssr: false },      // auth flows: client-side only
    "/app/**": { ssr: false },       // app dashboard & tools: client-side only
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/app/**', '/auth/**'],
  },

  robots: {
    index: true,
    follow: true,
    sitemap: 'https://heyjan.de/sitemap.xml',
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/app/**, /auth/**',
      contentUsage: {
        'bots': 'y',
        'train-ai': 'n'
      },
      contentSignal: {
        'ai-train': 'no',
        'search': 'yes'
      }
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    // Private keys (server-side only)
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    // Public keys (exposed to client)
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || ''
    }
  },
});