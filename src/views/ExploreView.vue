<script setup>
import { computed, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import BaseIcon from '../components/ui/BaseIcon.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import ExploreCard from '../components/ui/ExploreCard.vue'
import FilterChip from '../components/ui/FilterChip.vue'
import { exploreCategories, exploreItems } from '../data/exploreItems'

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortOrder = ref('featured')

const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('id-ID')
  const matches = exploreItems.filter((item) => {
    const matchesCategory =
      selectedCategory.value === 'all' ||
      item.category === selectedCategory.value
    const searchableText = [
      item.name,
      item.categoryLabel,
      item.subcategory,
      item.description,
    ]
      .join(' ')
      .toLocaleLowerCase('id-ID')

    return matchesCategory && (!query || searchableText.includes(query))
  })

  if (sortOrder.value === 'name') {
    return [...matches].sort((first, second) =>
      first.name.localeCompare(second.name, 'id'),
    )
  }

  return matches
})
</script>

<template>
  <main class="explore-view">
    <div class="explore-view__container">
      <header class="explore-intro">
        <div class="explore-intro__title">
          <p class="explore-intro__eyebrow">Jelajahi Wonosobo</p>
          <h1>Eksplorasi Daerah</h1>
        </div>
        <p class="explore-intro__description">
          Temukan lanskap Dieng, cita rasa khas, dan kesenian yang membentuk
          cerita Wonosobo.
        </p>
      </header>

      <section class="explore-controls" aria-label="Pencarian dan filter">
        <BaseInput
          v-model="searchQuery"
          class="explore-controls__search"
          label="Cari destinasi, kuliner, atau kesenian"
          placeholder="Contoh: Dieng, Mie Ongklok, Tari Lengger"
          :icon="Search"
          type="search"
        />

        <div class="explore-filters">
          <span class="explore-filters__label">Kategori</span>
          <div class="explore-filters__chips" role="group" aria-label="Filter kategori">
            <FilterChip
              v-for="category in exploreCategories"
              :key="category.value"
              :selected="selectedCategory === category.value"
              @update:selected="selectedCategory = category.value"
            >
              {{ category.label }}
            </FilterChip>
          </div>
        </div>
      </section>

      <section class="explore-results" aria-labelledby="explore-results-title">
        <div class="explore-results__heading">
          <p id="explore-results-title" aria-live="polite">
            Menampilkan <strong>{{ filteredItems.length }}</strong>
            pilihan
          </p>
          <label class="explore-sort">
            <span>Urutkan</span>
            <select v-model="sortOrder" aria-label="Urutkan pilihan">
              <option value="featured">Pilihan utama</option>
              <option value="name">Nama A–Z</option>
            </select>
          </label>
        </div>

        <div v-if="filteredItems.length" class="explore-grid">
          <ExploreCard
            v-for="item in filteredItems"
            :key="`${item.category}-${item.id}`"
            :item="item"
          />
        </div>
        <div v-else class="explore-empty" role="status">
          <BaseIcon :icon="Search" :size="24" />
          <h2>Tidak ada pilihan yang cocok</h2>
          <p>Coba kata kunci atau kategori lain.</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.explore-view {
  width: 100%;
  flex: 1;
  padding: 40px 0 88px;
}

.explore-view__container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.explore-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 32px;
}

.explore-intro__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.4;
}

.explore-intro h1 {
  margin: 0;
  color: var(--text-primary);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.explore-intro__description {
  max-width: 430px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
  text-align: right;
}

.explore-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}

.explore-controls__search {
  max-width: 760px;
  min-width: 0;
}

.explore-filters {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}

.explore-filters__label {
  color: var(--text-muted);
  font-size: 13px;
}

.explore-filters__chips {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px;
}

.explore-results__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-default);
}

.explore-results__heading > p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 13px;
}

.explore-results__heading strong {
  color: var(--text-primary);
  font-weight: 500;
}

.explore-sort {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 12px;
}

.explore-sort select {
  min-height: 40px;
  padding: 0 32px 0 12px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--text-primary);
  font: inherit;
}

.explore-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

.explore-empty {
  display: flex;
  min-height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  color: var(--text-muted);
  text-align: center;
}

.explore-empty h2 {
  margin: 12px 0 4px;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
}

.explore-empty p {
  margin: 0;
  font-size: 14px;
}

@media (min-width: 640px) {
  .explore-view {
    padding-top: 56px;
  }

  .explore-view__container {
    padding-inline: 32px;
  }

  .explore-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .explore-view__container {
    padding-inline: 48px;
  }

  .explore-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .explore-intro {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .explore-intro h1 {
    font-size: 32px;
  }

  .explore-intro__description {
    max-width: 36rem;
    text-align: left;
  }

  .explore-filters {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .explore-filters__chips {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding: 2px 2px 8px;
    scrollbar-width: thin;
  }

  .explore-results__heading {
    align-items: flex-start;
  }
}
</style>
