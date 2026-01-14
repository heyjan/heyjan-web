export type CaseStudy = {
  slug: string
  title: string
  description: string
  tags: string[]
  image?: string
}

export const casestudies: CaseStudy[] = [
  {
    slug: 'joomla-datenextraktion',
    title: '5+ Jahre alte Archivdaten Extrahieren, Bereinigen und Strukturieren',
    description: 'Wie ich Forendaten aus einem veralteten Joomla-System mit Kunena-Extension extrahiert und in eine nutzbare Struktur gebracht habe.',
    tags: ['Datenmigration', 'Legacy-System', 'DDEV'],
    image: '/images/case-studies/fallstudie-joomla.png',
  },
]
