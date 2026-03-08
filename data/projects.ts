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
    slug: 'media-center-ai',
    title: 'Media Center with Object Recognition and multiple AI powered Tools (Coming Soon)',
    description: 'A comprehensive media management platform leveraging computer vision and AI to automatically identify objects, analyze content, and provide intelligent media processing capabilities.',
    tags: ['AI', 'Computer Vision', 'Object Recognition'],
  },
  {
    slug: 'data-classification-matching',
    title: 'Data Classification and Matching System (Coming Soon)',
    description: 'An intelligent system that automatically classifies and matches data across different sources using machine learning algorithms to improve data quality and consistency.',
    tags: ['AI', 'Data Processing', 'Classification'],
  },
  {
    slug: 'expense-manager-ocr',
    title: 'Expense Manager - Tool to combine OCR and Vision API to extract totals (Coming Soon)',
    description: 'Automated expense tracking solution that uses OCR and computer vision APIs to extract and process receipt information, eliminating manual data entry.',
    tags: ['OCR', 'Vision API', 'Finance'],
  },
]


