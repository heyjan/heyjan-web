export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'enterprise-rag',
    title: 'Enterprise RAG (Coming soon)',
    description: 'A practical blueprint for retrieval-augmented generation systems in enterprise environments.',
    tags: ['RAG', 'Search', 'Architecture'],
  },
  {
    slug: 'azure-ai-foundry-poc',
    title: 'Azure AI Foundry POC (Coming soon)',
    description: 'A proof-of-concept approach for evaluating models, prompts, and safeguards in Azure AI Foundry.',
    tags: ['Azure', 'AI Foundry', 'Evaluation'],
  },
  {
    slug: 'nuxt-seo-hub',
    title: 'Nuxt SEO Hub (Coming soon)',
    description: 'A structured Nuxt site foundation with SEO, content, and routing best practices.',
    tags: ['Nuxt', 'SEO', 'Content'],
  },
]


