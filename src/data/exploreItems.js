import {
  artsHighlights,
  culinaryHighlights,
  featuredDestinations,
} from './wonosoboData'

const detailSegments = {
  nature: 'wisata',
  culinary: 'kuliner',
  culture: 'kesenian',
}

function mapItems(items, category, categoryLabel, subcategoryKey) {
  return items.map((item, index) => ({
    ...item,
    category,
    categoryLabel,
    subcategory: item[subcategoryKey] || categoryLabel,
    rank: index + 1,
    detailPath: `/explore/${detailSegments[category]}/${item.id}`,
  }))
}

export const exploreCategories = [
  { value: 'all', label: 'Semua' },
  { value: 'nature', label: 'Wisata Alam' },
  { value: 'culinary', label: 'Kuliner Khas' },
  { value: 'culture', label: 'Kesenian & Budaya' },
]

export const exploreItems = [
  ...mapItems(featuredDestinations, 'nature', 'Wisata Alam', 'location'),
  ...mapItems(culinaryHighlights, 'culinary', 'Kuliner Khas', 'category'),
  ...mapItems(artsHighlights, 'culture', 'Kesenian & Budaya', 'category'),
]
