---
title: Getting Started with Nuxt Content
description: Learn how to set up and use Nuxt Content to create a powerful blog system
date: '2025-02-28'
author: Jan Mayer
tags:
  - Nuxt
  - Content Management
  - Vue.js
  - Tutorial
image: /images/blog/nuxt-content.jpg
---

# Getting Started with Nuxt Content

Nuxt Content is a powerful module that allows you to write content in Markdown, JSON, YAML, CSV, or XML and fetch it using a MongoDB-like API. It's perfect for creating blogs, documentation sites, and content-driven applications.

## What is Nuxt Content?

Nuxt Content provides a Git-based headless CMS experience. You write your content in files, and Nuxt Content automatically parses them and makes them available through a query API. This approach combines the simplicity of static site generation with the flexibility of a dynamic content system.

## Key Features

- **Markdown Support**: Write content in Markdown with frontmatter
- **Syntax Highlighting**: Automatic code syntax highlighting
- **Search**: Built-in full-text search capabilities
- **Type Safety**: TypeScript support out of the box
- **Component Integration**: Use Vue components directly in your Markdown
- **File-based**: All content is stored in files, making it version-controlled

## Installation

To get started with Nuxt Content, you need to install the module:

```bash
yarn add @nuxt/content
```

Then, add it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

## Creating Your First Article

Create a `content` directory in your project root and add your first article:

```markdown
---
title: My First Article
description: This is my first blog post
date: 2025-02-28
---

# My First Article

Welcome to my blog!
```

## Querying Content

You can query your content using the `queryContent()` composable:

```vue
<script setup>
const articles = await queryContent('blog')
  .sort({ date: -1 })
  .find()
</script>
```

## Displaying Content

Use the `<ContentDoc>` component to render your content:

```vue
<template>
  <ContentDoc path="/blog/my-article" />
</template>
```

## Conclusion

Nuxt Content makes it easy to create content-driven applications with Nuxt. Whether you're building a blog, documentation site, or portfolio, Nuxt Content provides the tools you need to manage and display your content effectively.

Start creating your content today and see how powerful Nuxt Content can be!


