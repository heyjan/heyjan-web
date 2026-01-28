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
      titleTemplate: (title?: string) =>
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
      ],
      // Turnstile script is now loaded dynamically only in ContactSection
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
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Modules: https://nuxt.com/docs/guide/directory-structure/modules
  modules: [
    "v-gsap-nuxt",
    "@nuxt/content",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
  ],

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: ['300', '400', '500', '600'],
      },
      {
        name: 'TT Travels Text',
        provider: 'local',
        src: [
          { url: '/font/TT_Travels_Text_Medium.woff2', weight: 500, style: 'normal' }
        ],
      }
    ]
  },

  // Image optimization
  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  // Third-party scripts optimization
  scripts: {
    globals: {
      ahrefs: {
        src: 'https://analytics.ahrefs.com/analytics.js',
        async: true,
        defer: true,
        'data-key': 'kK9WahAIZ2+5ycKldReAYA',
      },
    },
  },



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

  // Nitro server configuration
  nitro: {
    // Compress static assets for better performance
    compressPublicAssets: true,
  },

  compatibilityDate: "2025-02-28",

  // Hybrid rendering: SEO for homepage, SPA-style for auth/app
  routeRules: {
    "/": { prerender: true },           // homepage: fully prerendered for SEO
    "/jan-mayer": { prerender: true },  // person page: prerendered for SEO
    "/cv": { prerender: true },         // CV page: prerendered for SEO
    "/projects": { prerender: true },   // projects listing: prerendered for SEO
    "/blog": { prerender: true },       // blog listing: prerendered for SEO
    "/blog/**": { prerender: true },    // blog articles: prerendered for SEO
    "/impressum": { prerender: true },  // Impressum: prerendered for SEO
    "/datenschutz": { prerender: true }, // Datenschutzerklärung: prerendered for SEO
    "/auth/**": { ssr: false },      // auth flows: client-side only
    "/app/**": { ssr: false },       // app dashboard & tools: client-side only

    // Static asset caching - 1 year cache for images, fonts, and icons
    "/images/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/font/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/favicon.ico": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/favicon.svg": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/*.png": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    "/site.webmanifest": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/app/**', '/auth/**', '/test'],
    sources: [
      '/api/__sitemap__/urls',
    ],
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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split GSAP into its own chunk for lazy loading
            'gsap': ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin'],
            // Split lucide icons into their own chunk
            'lucide': ['lucide-vue-next'],
          },
        },
      },
    },
  },

  runtimeConfig: {
    // Private keys (server-side only)
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
    // Public keys (exposed to client)
    public: {
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || ''
    }
  },

  // Performance improvements
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
          visibility: false
        }
      }
    }
  }
});