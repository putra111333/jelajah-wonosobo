<script setup>
import { computed, ref } from 'vue'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Plus,
  Ticket,
} from 'lucide-vue-next'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseIcon from '../ui/BaseIcon.vue'
import { useItinerary } from '../../composables/useItinerary'

const props = defineProps({
  category: {
    type: String,
    required: true,
    validator: (value) => ['wisata', 'kuliner', 'kesenian'].includes(value),
  },
  item: {
    type: Object,
    default: null,
  },
  relatedItems: {
    type: Array,
    default: () => [],
  },
})

const itinerary = useItinerary()
const actionError = ref('')

const categoryConfig = {
  wisata: {
    label: 'Wisata Alam',
    rankLabel: 'Wisata Populer',
    descriptionHeading: 'Informasi Wisata',
    informationHeading: 'Informasi Praktis',
    relatedHeading: 'Rekomendasi Wisata Lainnya',
    priceIcon: Ticket,
    hoursIcon: Clock3,
    priceLabel: 'Harga tiket',
    hoursLabel: 'Jam buka',
    locationLabel: 'Alamat lengkap',
  },
  kuliner: {
    label: 'Kuliner',
    rankLabel: 'Kuliner Khas',
    descriptionHeading: 'Deskripsi Kuliner',
    informationHeading: 'Informasi Kuliner',
    relatedHeading: 'Rekomendasi Kuliner Lainnya',
    priceIcon: Ticket,
    hoursIcon: Clock3,
    priceLabel: 'Harga rata-rata',
    hoursLabel: 'Jam buka',
    locationLabel: 'Lokasi',
  },
  kesenian: {
    label: 'Kesenian & Budaya',
    rankLabel: 'Warisan Budaya',
    descriptionHeading: 'Cerita Singkat Kesenian',
    informationHeading: 'Informasi Event',
    relatedHeading: 'Rekomendasi Kesenian Lainnya',
    priceIcon: Ticket,
    hoursIcon: CalendarDays,
    priceLabel: 'Tiket masuk',
    hoursLabel: 'Jadwal',
    locationLabel: 'Lokasi pentas',
  },
}

const config = computed(() => categoryConfig[props.category])
const itemKey = computed(() =>
  props.item ? `${props.category}:${props.item.id}` : '',
)
const isAdded = computed(() => itinerary.itemKeys.value.includes(itemKey.value))
const informationRows = computed(() => {
  if (!props.item) return []

  return [
    {
      icon: config.value.priceIcon,
      label: props.item.priceLabel || config.value.priceLabel,
      value: props.item.price,
    },
    {
      icon: config.value.hoursIcon,
      label: config.value.hoursLabel,
      value: props.item.openingHours,
    },
    {
      icon: MapPin,
      label: config.value.locationLabel,
      value: props.item.address,
    },
  ]
})

const mapUrl = computed(() => {
  if (!props.item?.address) return ''
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.item.address)}`
})

function addToPlan() {
  if (!itemKey.value || isAdded.value) return

  itinerary.addItem(itemKey.value)
  actionError.value = itinerary.error.value
}
</script>

<template>
  <main class="experience-detail">
    <div class="experience-detail__container">
      <nav class="experience-detail__breadcrumb" aria-label="Breadcrumb">
        <RouterLink to="/explore">
          <BaseIcon :icon="ArrowLeft" :size="16" />
          Kembali ke Eksplorasi
        </RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ config.label }}</span>
        <template v-if="item">
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ item.name }}</span>
        </template>
      </nav>

      <section v-if="item" class="experience-detail__grid">
        <div class="experience-detail__primary">
          <div
            class="experience-detail__hero"
            :class="`experience-detail__art--${item.visual}`"
          >
            <img
              v-if="item.image"
              class="experience-detail__hero-image"
              :src="item.image"
              :alt="item.imageAlt || item.name"
            />
            <span
              v-else
              class="experience-detail__hero-placeholder"
              aria-hidden="true"
            />
            <span
              v-if="item.image"
              class="photo-overlay experience-detail__photo-overlay"
              aria-hidden="true"
            />
            <BaseBadge
              class="experience-detail__rank"
              :variant="item.image ? 'glass' : 'neutral'"
              glass-tone="dark"
            >
              #{{ item.rank }} {{ config.rankLabel }}
            </BaseBadge>
            <div class="experience-detail__photo-tags">
              <BaseBadge
                :variant="item.image ? 'glass' : 'neutral'"
                glass-tone="dark"
              >
                {{ item.category || config.label }}
              </BaseBadge>
              <BaseBadge
                :variant="item.image ? 'glass' : 'neutral'"
                glass-tone="dark"
              >
                {{ item.location }}
              </BaseBadge>
            </div>
          </div>

          <div class="experience-detail__intro">
            <p class="experience-detail__eyebrow">{{ item.category || config.label }}</p>
            <h1>{{ item.name }}</h1>
            <h2>{{ config.descriptionHeading }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>

        <aside class="experience-info" aria-labelledby="experience-info-title">
          <h2 id="experience-info-title">{{ config.informationHeading }}</h2>
          <dl class="experience-info__rows">
            <div
              v-for="row in informationRows"
              :key="row.label"
              class="experience-info__row"
            >
              <span class="experience-info__icon" aria-hidden="true">
                <BaseIcon :icon="row.icon" :size="18" />
              </span>
              <div>
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </div>
          </dl>
          <p v-if="item.detailsNote" class="experience-info__note">
            {{ item.detailsNote }}
          </p>
          <a
            v-if="mapUrl"
            class="experience-info__map"
            :href="mapUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BaseIcon :icon="MapPin" :size="16" />
            Buka di Google Maps
          </a>
          <BaseButton
            class="experience-info__action"
            variant="primary"
            type="button"
            :disabled="isAdded"
            @click="addToPlan"
          >
            <template #leading>
              <BaseIcon :icon="isAdded ? Check : Plus" :size="18" />
            </template>
            {{ isAdded ? 'Sudah di Rencana Jelajah' : 'Tambah ke Rencana Jelajah' }}
          </BaseButton>
          <p v-if="isAdded" class="experience-info__confirmation" role="status">
            {{ item.name }} ditambahkan ke rencana jelajah Anda.
          </p>
          <p v-if="actionError" class="experience-info__error" role="alert">
            {{ actionError }}
          </p>
        </aside>

        <section class="experience-story" aria-labelledby="experience-story-title">
          <p class="experience-detail__eyebrow">{{ config.label }}</p>
          <h2 id="experience-story-title">Sejarah dan cerita</h2>
          <p>{{ item.history }}</p>
        </section>

        <section
          v-if="item.gallery?.length"
          class="experience-gallery"
          aria-labelledby="experience-gallery-title"
        >
          <div class="experience-section-heading">
            <div>
              <p class="experience-detail__eyebrow">Momen pilihan</p>
              <h2 id="experience-gallery-title">Galeri</h2>
            </div>
            <p>Kenali lebih dekat {{ item.name }}.</p>
          </div>
          <div class="experience-gallery__grid">
            <figure
              v-for="photo in item.gallery"
              :key="photo.id"
              class="experience-gallery__item"
            >
              <div
                class="experience-gallery__visual"
                :class="`experience-detail__art--${photo.visual}`"
              >
                <img
                  v-if="photo.image"
                  :src="photo.image"
                  :alt="photo.imageAlt"
                />
                <span v-else aria-hidden="true" />
              </div>
              <figcaption>{{ photo.caption }}</figcaption>
            </figure>
          </div>
        </section>
      </section>

      <section v-else class="experience-detail__not-found" role="status">
        <p class="experience-detail__eyebrow">{{ config.label }}</p>
        <h1>Detail belum tersedia</h1>
        <p>Periksa kembali alamat halaman atau pilih pengalaman lain.</p>
        <RouterLink to="/explore">Kembali ke Eksplorasi</RouterLink>
      </section>

      <section
        v-if="item && relatedItems.length"
        class="experience-related"
        :aria-labelledby="`related-${category}-title`"
      >
        <div class="experience-section-heading">
          <div>
            <p class="experience-detail__eyebrow">Jelajahi lagi</p>
            <h2 :id="`related-${category}-title`">{{ config.relatedHeading }}</h2>
          </div>
        </div>
        <div class="experience-related__list">
          <RouterLink
            v-for="related in relatedItems"
            :key="related.id"
            class="experience-related__card"
            :to="`/explore/${category}/${related.id}`"
          >
            <div
              class="experience-related__visual"
              :class="`experience-detail__art--${related.visual}`"
            >
              <img
                v-if="related.image"
                :src="related.image"
                :alt="related.imageAlt || related.name"
              />
              <span v-else aria-hidden="true" />
            </div>
            <div class="experience-related__copy">
              <p>{{ related.category || config.label }}</p>
              <h3>{{ related.name }}</h3>
              <span>Lihat detail</span>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.experience-detail {
  width: 100%;
  flex: 1;
  padding: 28px 0 88px;
}

.experience-detail__container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.experience-detail__breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: var(--text-muted);
  font-size: 12px;
}

.experience-detail__breadcrumb a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
}

.experience-detail__grid {
  display: grid;
  grid-template-areas:
    'primary info'
    'story info'
    'gallery info';
  grid-template-columns: minmax(0, 7fr) minmax(300px, 5fr);
  align-items: start;
  gap: 24px;
}

.experience-detail__primary {
  grid-area: primary;
  min-width: 0;
}

.experience-detail__hero {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 7;
  min-height: 260px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  isolation: isolate;
}

.experience-detail__hero-image,
.experience-detail__hero-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.experience-detail__hero-placeholder,
.experience-gallery__visual > span,
.experience-related__visual > span {
  display: block;
  background:
    radial-gradient(ellipse at 75% 30%, rgba(218, 241, 222, 0.62), transparent 25%),
    linear-gradient(155deg, var(--sage-400), var(--forest-700) 62%, var(--forest-950));
}

.experience-detail__art--lake .experience-detail__hero-placeholder,
.experience-detail__art--lake .experience-gallery__visual > span,
.experience-detail__art--lake .experience-related__visual > span,
.experience-detail__art--carica .experience-detail__hero-placeholder,
.experience-detail__art--carica .experience-gallery__visual > span,
.experience-detail__art--carica .experience-related__visual > span {
  background:
    radial-gradient(ellipse at 56% 68%, rgba(218, 241, 222, 0.7), transparent 28%),
    linear-gradient(155deg, var(--mint-100), var(--forest-700) 66%, var(--forest-950));
}

.experience-detail__art--sunrise .experience-detail__hero-placeholder,
.experience-detail__art--sunrise .experience-gallery__visual > span,
.experience-detail__art--sunrise .experience-related__visual > span {
  background:
    radial-gradient(ellipse at 52% 34%, rgba(245, 184, 61, 0.42), transparent 23%),
    linear-gradient(155deg, var(--sage-400), var(--forest-800) 58%, var(--forest-950));
}

.experience-detail__art--volcanic .experience-detail__hero-placeholder,
.experience-detail__art--volcanic .experience-gallery__visual > span,
.experience-detail__art--volcanic .experience-related__visual > span {
  background:
    radial-gradient(ellipse at 48% 65%, rgba(142, 182, 155, 0.58), transparent 30%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.experience-detail__art--culinary .experience-detail__hero-placeholder,
.experience-detail__art--culinary .experience-gallery__visual > span,
.experience-detail__art--culinary .experience-related__visual > span {
  background:
    radial-gradient(ellipse at 55% 60%, rgba(218, 241, 222, 0.68), transparent 26%),
    linear-gradient(145deg, var(--sage-400), var(--forest-800));
}

.experience-detail__art--culture .experience-detail__hero-placeholder,
.experience-detail__art--culture .experience-gallery__visual > span,
.experience-detail__art--culture .experience-related__visual > span {
  background:
    radial-gradient(ellipse at 30% 38%, rgba(218, 241, 222, 0.45), transparent 24%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.experience-detail__photo-overlay {
  z-index: 0;
}

.experience-detail__rank,
.experience-detail__photo-tags {
  position: absolute;
  z-index: 1;
}

.experience-detail__rank {
  top: 16px;
  right: 16px;
}

.experience-detail__photo-tags {
  bottom: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.experience-detail__intro {
  padding: 20px 4px 0;
}

.experience-detail__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

.experience-detail__intro h1,
.experience-detail__not-found h1 {
  margin: 0;
  color: var(--text-primary);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.experience-detail__intro h2 {
  margin: 16px 0 6px;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.experience-detail__intro > p:last-child,
.experience-story > p:last-child {
  max-width: 680px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.experience-info {
  position: sticky;
  top: 104px;
  grid-area: info;
  padding: 24px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.experience-info h2 {
  margin: 0 0 12px;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.experience-info__rows {
  margin: 0;
}

.experience-info__row {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-default);
}

.experience-info__icon {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-tint);
  color: var(--color-primary);
}

.experience-info dt {
  margin: 0 0 3px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.4;
}

.experience-info dd {
  margin: 0;
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.5;
}

.experience-info__note {
  margin: 12px 0;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.5;
}

.experience-info__map {
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  border-radius: var(--radius-full);
  background: var(--forest-800);
  color: var(--text-on-image);
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 180ms ease;
}

.experience-info__map:hover {
  background: var(--forest-700);
}

.experience-info__action {
  width: 100%;
  margin-top: 8px;
  white-space: normal;
  line-height: 1.3;
}

.experience-info__confirmation {
  margin: 10px 0 0;
  color: var(--color-primary);
  font-size: 12px;
  line-height: 1.5;
}

.experience-info__error {
  margin: 10px 0 0;
  color: var(--error);
  font-size: 12px;
  line-height: 1.5;
}

.experience-story {
  grid-area: story;
  padding: 24px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.experience-story h2,
.experience-section-heading h2 {
  margin: 0 0 10px;
  color: var(--text-primary);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.experience-gallery {
  grid-area: gallery;
}

.experience-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
}

.experience-section-heading p {
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
}

.experience-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.experience-gallery__item {
  min-width: 0;
  margin: 0;
}

.experience-gallery__visual {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  background-color: var(--bg-surface-tint);
}

.experience-gallery__visual > img,
.experience-gallery__visual > span {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.experience-gallery__item figcaption {
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.4;
}

.experience-related {
  margin-top: 56px;
}

.experience-related__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.experience-related__card {
  overflow: hidden;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
  color: inherit;
  text-decoration: none;
  transition:
    box-shadow 180ms ease,
    transform 180ms ease;
}

.experience-related__card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.experience-related__visual {
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.experience-related__visual > img,
.experience-related__visual > span {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.experience-related__copy {
  padding: 16px;
}

.experience-related__copy p {
  margin: 0 0 6px;
  color: var(--text-muted);
  font-size: 11px;
}

.experience-related__copy h3 {
  margin: 0 0 12px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;
}

.experience-related__copy > span {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
}

.experience-detail__not-found {
  max-width: 680px;
  margin: 48px auto;
  padding: 32px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.experience-detail__not-found > p:not(.experience-detail__eyebrow) {
  color: var(--text-secondary);
  line-height: 1.6;
}

.experience-detail__not-found > a {
  color: var(--color-primary);
  font-weight: 500;
}

@media (min-width: 640px) {
  .experience-detail__container {
    padding-inline: 32px;
  }
}

@media (min-width: 1024px) {
  .experience-detail__container {
    padding-inline: 48px;
  }
}

@media (max-width: 639px) {
  .experience-detail {
    padding-top: 20px;
  }

  .experience-detail__breadcrumb {
    margin-bottom: 16px;
  }

  .experience-detail__grid {
    grid-template-areas:
      'primary'
      'info'
      'story'
      'gallery';
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .experience-detail__hero {
    aspect-ratio: 4 / 3;
    min-height: 250px;
    border-radius: var(--radius-lg);
  }

  .experience-detail__intro {
    padding: 16px 4px 0;
  }

  .experience-detail__intro h1,
  .experience-detail__not-found h1 {
    font-size: 28px;
  }

  .experience-info {
    position: static;
    padding: 20px;
  }

  .experience-story {
    padding: 20px;
  }

  .experience-gallery__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .experience-gallery__item:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  .experience-related__list {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    margin-inline: -16px;
    padding: 0 16px 12px;
    scroll-snap-type: x mandatory;
  }

  .experience-related__card {
    min-width: 80%;
    scroll-snap-align: start;
  }

  .experience-section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
  }

  .experience-detail__not-found {
    margin: 32px 0;
    padding: 24px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience-info__map,
  .experience-related__card {
    transition: none;
  }

  .experience-related__card:hover {
    transform: none;
  }
}
</style>
