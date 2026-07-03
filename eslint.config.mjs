import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt()
  .append({
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      '.data/**',
      'public/**',
      'static/**',
    ],
  })
