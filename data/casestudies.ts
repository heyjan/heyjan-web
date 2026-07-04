export type CaseStudyMetric = {
  value: string
  label: string
}

export type CaseStudy = {
  slug: string
  title: string
  description: string
  tags: string[]
  image?: string
  /** When set, the card links to this URL directly (e.g. a standalone report) instead of /case-studies/[slug]. */
  url?: string
  /** Short category shown in the hero number badge, e.g. "Data & ML". */
  category?: string
  /** Optional result metrics rendered on the hero card. Omit to hide the row. */
  metrics?: CaseStudyMetric[]
}

export const casestudies: CaseStudy[] = [
  {
    slug: 'ai-job-market-report',
    title: 'Der deutsche KI-Arbeitsmarkt, entschlüsselt',
    description: 'Ein durchgängiges Datenprodukt, das tausende roher Stellenanzeigen in eine strukturierte Landkarte des deutschen KI-Arbeitsmarktes verwandelt — von Scraping über kalibrierte ML-Deduplizierung bis zum dialogfähigen SQL-Agent.',
    tags: ['Data Engineering', 'Machine Learning', 'LLMs', 'Produkt'],
    image: '/images/case-studies/ai-job-market-report.png',
    url: '/case-studies/ai-job-market-report',
    category: 'Data & ML',
    metrics: [
      { value: '4.268', label: 'Stellenanzeigen analysiert' },
      { value: '2.052', label: 'Unternehmen erfasst' },
      { value: '425', label: 'Städte abgedeckt' },
    ],
  },
]
