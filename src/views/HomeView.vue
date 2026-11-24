<script setup>
import { computed, reactive, ref } from 'vue'
import {
  ArrowDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPinned,
  Route,
  Search,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-vue-next'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseIcon from '../components/ui/BaseIcon.vue'
import DestinationTile from '../components/ui/DestinationTile.vue'
import StatCard from '../components/ui/StatCard.vue'
import TourPackageCard from '../components/ui/TourPackageCard.vue'
import {
  artsHighlights,
  culinaryHighlights,
  featuredDestinations,
  homeContent,
  journeySteps,
  searchOptions,
  testimonials,
  tourPackages,
} from '../data/wonosoboData'

const activeStepIndex = ref(0)
const activeTestimonialIndex = ref(0)
const destinationsSection = ref(null)
const searchFilters = reactive({
  date: '',
  budget: '',
  guests: '2',
})

const currentTestimonial = computed(
  () => testimonials[activeTestimonialIndex.value],
)

const stepIcons = {
  compass: Compass,
  route: Route,
  sparkles: Sparkles,
}

function moveTestimonial(direction) {
  activeTestimonialIndex.value =
    (activeTestimonialIndex.value + direction + testimonials.length) %
    testimonials.length
}

function searchDestinations() {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  destinationsSection.value?.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <main class="home-view">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero__landscape" aria-hidden="true">
        <span class="home-hero__ridge home-hero__ridge--back" />
        <span class="home-hero__ridge home-hero__ridge--front" />
      </div>
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">{{ homeContent.eyebrow }}</p>
        <h1 id="home-title" class="home-hero__title">
          {{ homeContent.title }}
        </h1>
        <p class="home-hero__description">
          {{ homeContent.description }}
        </p>

        <form class="hero-search" @submit.prevent="searchDestinations">
          <label class="hero-search__field" for="visit-date">
            <BaseIcon :icon="CalendarDays" :size="20" />
            <span class="hero-search__field-copy">
              <span class="hero-search__label">Tanggal</span>
              <input
                id="visit-date"
                v-model="searchFilters.date"
                type="date"
                aria-label="Tanggal perjalanan"
              />
            </span>
          </label>

          <label class="hero-search__field" for="visit-budget">
            <BaseIcon :icon="Wallet" :size="20" />
            <span class="hero-search__field-copy">
              <span class="hero-search__label">Anggaran</span>
              <select id="visit-budget" v-model="searchFilters.budget">
                <option
                  v-for="option in searchOptions.budgets"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </span>
          </label>

          <label class="hero-search__field" for="visit-guests">
            <BaseIcon :icon="Users" :size="20" />
            <span class="hero-search__field-copy">
              <span class="hero-search__label">Pengunjung</span>
              <select id="visit-guests" v-model="searchFilters.guests">
                <option
                  v-for="option in searchOptions.guests"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </span>
          </label>

          <BaseButton class="hero-search__submit" type="submit" size="md">
            <template #leading>
              <BaseIcon :icon="Search" :size="16" />
            </template>
            Cari
          </BaseButton>
        </form>

        <a class="home-hero__discover" href="#featured-destinations">
          <span>Jelajahi pilihan Wonosobo</span>
          <BaseIcon :icon="ArrowDown" :size="16" />
        </a>
      </div>
      <span class="home-hero__caption" aria-hidden="true">
        Pegunungan Dieng, Wonosobo
      </span>
    </section>

    <section class="home-stats" aria-label="Sekilas tentang Wonosobo">
      <StatCard
        v-for="stat in homeContent.stats"
        :key="stat.label"
        :value="stat.value"
        :label="stat.label"
      />
    </section>

    <div class="home-content">
      <section
        id="featured-destinations"
        ref="destinationsSection"
        class="home-section"
        aria-labelledby="destinations-title"
      >
        <header class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Jelajahi alamnya</p>
            <h2 id="destinations-title" class="section-heading__title">
              Top Rank Wisata
            </h2>
          </div>
          <p class="section-heading__description">
            Dari kawah aktif hingga telaga dan puncak, temukan lanskap
            Wonosobo yang paling berkesan.
          </p>
        </header>

        <div class="destination-bento">
          <DestinationTile
            v-for="destination in featuredDestinations"
            :key="destination.id"
            class="destination-bento__tile"
            :title="destination.name"
            :location="destination.location"
            :image="destination.image"
            :image-alt="destination.imageAlt"
            :visual="destination.visual"
            :aspect="destination.aspect"
            href="/explore"
          />
        </div>
      </section>

      <section class="home-section local-stories" aria-labelledby="local-title">
        <header class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Rasa dan tradisi</p>
            <h2 id="local-title" class="section-heading__title">
              Cerita lokal Wonosobo
            </h2>
          </div>
          <p class="section-heading__description">
            Lengkapi perjalanan dengan cita rasa khas dan kesenian yang tumbuh
            di tengah masyarakat.
          </p>
        </header>

        <div class="local-stories__grid">
          <section
            class="local-category"
            aria-labelledby="culinary-title"
          >
            <div class="local-category__heading">
              <h3 id="culinary-title">Top Rank Kuliner</h3>
              <BaseIcon :icon="MapPinned" :size="20" />
            </div>
            <article
              v-for="item in culinaryHighlights"
              :key="item.id"
              class="local-item"
            >
              <span
                class="local-item__visual"
                :class="`local-item__visual--${item.visual}`"
                aria-hidden="true"
              />
              <div class="local-item__copy">
                <p>{{ item.category }}</p>
                <h4>{{ item.name }}</h4>
                <span>{{ item.description }}</span>
              </div>
            </article>
          </section>

          <section
            class="local-category"
            aria-labelledby="arts-title"
          >
            <div class="local-category__heading">
              <h3 id="arts-title">Top Rank Kesenian</h3>
              <BaseIcon :icon="Sparkles" :size="20" />
            </div>
            <article
              v-for="item in artsHighlights"
              :key="item.id"
              class="local-item"
            >
              <span
                class="local-item__visual"
                :class="`local-item__visual--${item.visual}`"
                aria-hidden="true"
              />
              <div class="local-item__copy">
                <p>{{ item.category }}</p>
                <h4>{{ item.name }}</h4>
                <span>{{ item.description }}</span>
              </div>
            </article>
          </section>
        </div>
      </section>

      <section class="home-section how-it-works" aria-labelledby="how-title">
        <header class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Mudah direncanakan</p>
            <h2 id="how-title" class="section-heading__title">
              How it works
            </h2>
          </div>
          <p class="section-heading__description">
            Beberapa langkah sederhana untuk membuat perjalanan di Wonosobo
            terasa lebih terarah.
          </p>
        </header>

        <div class="how-it-works__layout">
          <div class="how-visual" role="img" aria-label="Ilustrasi pegunungan Dieng">
            <span class="how-visual__sun" aria-hidden="true" />
            <span class="how-visual__mountain how-visual__mountain--back" aria-hidden="true" />
            <span class="how-visual__mountain how-visual__mountain--front" aria-hidden="true" />
            <div class="how-visual__caption">
              <p>Mulai dari yang paling menarik</p>
              <h3>{{ journeySteps[activeStepIndex].detail }}</h3>
            </div>
          </div>

          <div class="journey-steps">
            <button
              v-for="(step, index) in journeySteps"
              :key="step.id"
              class="journey-step"
              :class="{ 'journey-step--active': activeStepIndex === index }"
              type="button"
              :aria-pressed="activeStepIndex === index"
              @click="activeStepIndex = index"
            >
              <span class="journey-step__icon">
                <BaseIcon :icon="stepIcons[step.icon]" :size="20" />
              </span>
              <span class="journey-step__copy">
                <span class="journey-step__title">{{ step.title }}</span>
                <span class="journey-step__description">
                  {{ step.description }}
                </span>
              </span>
              <BaseIcon
                class="journey-step__arrow"
                :icon="ChevronRight"
                :size="18"
              />
            </button>
          </div>
        </div>
      </section>

      <section class="home-section tour-recommendations" aria-labelledby="tours-title">
        <header class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Atur perjalananmu</p>
            <h2 id="tours-title" class="section-heading__title">
              Rekomendasi Jelajah
            </h2>
          </div>
          <p class="section-heading__description">
            Pilihan paket untuk menikmati Dieng, sunrise Sikunir, serta rasa
            dan budaya Wonosobo.
          </p>
        </header>

        <div class="tour-carousel" aria-label="Paket wisata rekomendasi">
          <TourPackageCard
            v-for="tour in tourPackages"
            :key="tour.id"
            class="tour-carousel__card"
            :name="tour.name"
            :image="tour.image"
            :image-alt="tour.imageAlt"
            :duration="tour.duration"
            :rating="tour.rating"
            :date="tour.date"
            :price="tour.price"
            :visual="tour.visual"
            href="/plan"
          />
        </div>
        <RouterLink class="tour-recommendations__more" to="/plan">
          Lihat semua rekomendasi
          <BaseIcon :icon="ChevronRight" :size="18" />
        </RouterLink>
      </section>

      <section class="home-section testimonials" aria-labelledby="testimonials-title">
        <header class="section-heading">
          <div>
            <p class="section-heading__eyebrow">Cerita perjalanan</p>
            <h2 id="testimonials-title" class="section-heading__title">
              Kata mereka
            </h2>
          </div>
        </header>

        <div class="testimonials__layout">
          <div class="testimonials__profile">
            <div class="testimonials__avatar" aria-hidden="true">
              {{ currentTestimonial.initials }}
            </div>
            <div class="testimonials__person">
              <p>{{ currentTestimonial.name }}</p>
              <span>{{ currentTestimonial.role }}</span>
            </div>
            <div class="testimonials__controls">
              <button
                type="button"
                aria-label="Testimoni sebelumnya"
                @click="moveTestimonial(-1)"
              >
                <BaseIcon :icon="ChevronLeft" :size="20" />
              </button>
              <button
                type="button"
                aria-label="Testimoni berikutnya"
                @click="moveTestimonial(1)"
              >
                <BaseIcon :icon="ChevronRight" :size="20" />
              </button>
            </div>
          </div>

          <div class="testimonials__quote-wrap" aria-live="polite">
            <span class="testimonials__quote-mark" aria-hidden="true">“</span>
            <blockquote class="testimonials__quote">
              {{ currentTestimonial.quote }}
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.home-view {
  width: 100%;
  flex: 1;
  padding-bottom: 72px;
}

.home-hero {
  position: relative;
  display: flex;
  min-height: 560px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 112px 16px 76px;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  background:
    radial-gradient(ellipse at 75% 22%, rgba(35, 83, 71, 0.62), transparent 44%),
    linear-gradient(135deg, var(--forest-950), var(--forest-800));
  color: var(--text-on-image);
  isolation: isolate;
}

.home-hero__landscape {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  opacity: 0.8;
}

.home-hero__ridge {
  position: absolute;
  right: -8%;
  bottom: -27%;
  left: -8%;
  display: block;
  height: 66%;
  border-radius: 50% 50% 0 0 / 28% 28% 0 0;
  transform: rotate(-6deg);
}

.home-hero__ridge--back {
  bottom: -34%;
  background: linear-gradient(145deg, var(--forest-700), var(--forest-900));
  transform: rotate(7deg);
}

.home-hero__ridge--front {
  right: -20%;
  bottom: -45%;
  left: 28%;
  background: linear-gradient(160deg, var(--forest-800), var(--forest-950) 72%);
}

.home-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: 900px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.home-hero__eyebrow {
  margin: 0 0 16px;
  color: var(--text-inverse);
  font-size: 14px;
  line-height: 1.4;
}

.home-hero__title {
  max-width: 850px;
  margin: 0;
  color: var(--text-on-image);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-wrap: balance;
}

.home-hero__description {
  max-width: 600px;
  margin: 16px 0 28px;
  color: rgba(218, 241, 222, 0.9);
  font-size: 16px;
  line-height: 1.6;
}

.hero-search {
  display: flex;
  width: 100%;
  max-width: 760px;
  align-items: center;
  padding: 6px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  box-shadow: var(--shadow-nav);
  color: var(--text-primary);
}

.hero-search__field {
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  color: var(--color-primary);
  text-align: left;
}

.hero-search__field + .hero-search__field::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1px;
  height: 28px;
  background: var(--border-default);
  content: '';
  transform: translateY(-50%);
}

.hero-search__field > :deep(.lucide) {
  flex: none;
}

.hero-search__field-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.hero-search__label {
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.2;
}

.hero-search__field input,
.hero-search__field select {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.4;
}

.hero-search__field input:focus-visible,
.hero-search__field select:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.hero-search__submit {
  flex: none;
}

.home-hero__discover {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: var(--text-inverse);
  font-size: 13px;
  text-decoration: none;
}

.home-hero__discover:hover {
  color: var(--text-on-image);
}

.home-hero__discover:focus-visible {
  outline-color: var(--text-inverse);
}

.home-hero__caption {
  position: absolute;
  right: 28px;
  bottom: 20px;
  color: rgba(218, 241, 222, 0.75);
  font-size: 11px;
}

.home-stats {
  position: relative;
  z-index: 2;
  display: grid;
  width: 100%;
  max-width: 1200px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: -32px auto 0;
  padding-inline: 16px;
}

.home-stats :deep(.stat-card) {
  min-width: 0;
  padding: 16px 12px;
}

.home-content {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.home-section {
  margin-top: 72px;
  scroll-margin-top: 96px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.section-heading__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.4;
}

.section-heading__title {
  margin: 0;
  color: var(--text-primary);
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  text-wrap: balance;
}

.section-heading__description {
  max-width: 36rem;
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
}

.destination-bento {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
}

.destination-bento :deep(.destination-bento__tile) {
  height: 240px;
  aspect-ratio: auto;
}

.local-stories__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

.local-category {
  padding: 20px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.local-category__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  color: var(--color-primary);
}

.local-category__heading h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.local-category__heading :deep(.lucide) {
  color: var(--color-primary);
}

.local-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.local-item + .local-item {
  border-top: 1px solid var(--border-default);
}

.local-item__visual {
  position: relative;
  display: block;
  width: 64px;
  height: 64px;
  flex: none;
  overflow: hidden;
  border-radius: var(--radius-md);
  background:
    radial-gradient(ellipse at 70% 30%, rgba(218, 241, 222, 0.35), transparent 32%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.local-item__visual--carica {
  background:
    radial-gradient(ellipse at 40% 55%, rgba(218, 241, 222, 0.35), transparent 28%),
    linear-gradient(145deg, var(--forest-800), var(--forest-950));
}

.local-item__visual--culture {
  background:
    radial-gradient(ellipse at 60% 40%, rgba(142, 182, 155, 0.35), transparent 30%),
    linear-gradient(145deg, var(--forest-700), var(--forest-950));
}

.local-item__copy {
  min-width: 0;
}

.local-item__copy p {
  margin: 0 0 3px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.4;
}

.local-item__copy h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.35;
}

.local-item__copy > span {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.how-it-works__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}

.how-visual {
  position: relative;
  display: flex;
  min-height: 360px;
  align-items: flex-end;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  padding: 24px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(ellipse at 70% 22%, rgba(218, 241, 222, 0.35), transparent 22%),
    linear-gradient(155deg, var(--forest-700), var(--forest-950) 72%);
  box-shadow: var(--shadow-lg);
  isolation: isolate;
}

.how-visual::before,
.how-visual::after {
  position: absolute;
  z-index: -1;
  right: -18%;
  bottom: -20%;
  left: -18%;
  height: 58%;
  border-radius: 50% 50% 0 0;
  content: '';
}

.how-visual::before {
  background: linear-gradient(145deg, var(--forest-800), var(--forest-950));
  transform: rotate(-9deg);
}

.how-visual::after {
  right: -24%;
  bottom: -34%;
  left: 16%;
  background: linear-gradient(160deg, var(--forest-700), var(--forest-950));
  transform: rotate(7deg);
}

.how-visual__sun {
  position: absolute;
  top: 18%;
  right: 20%;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: var(--mint-100);
  opacity: 0.75;
}

.how-visual__mountain {
  position: absolute;
  right: 8%;
  bottom: 27%;
  left: 8%;
  height: 35%;
  background: var(--forest-800);
  clip-path: polygon(0 100%, 28% 28%, 42% 60%, 66% 0, 100% 100%);
  opacity: 0.65;
}

.how-visual__mountain--front {
  right: -12%;
  bottom: 16%;
  left: 34%;
  height: 33%;
  background: var(--forest-950);
  clip-path: polygon(0 100%, 38% 18%, 54% 46%, 75% 0, 100% 100%);
  opacity: 0.7;
}

.how-visual__caption {
  position: relative;
  z-index: 1;
  max-width: 360px;
}

.how-visual__caption p {
  margin: 0 0 8px;
  color: var(--text-inverse-muted);
  font-size: 12px;
  line-height: 1.4;
}

.how-visual__caption h3 {
  margin: 0;
  color: var(--text-on-image);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.25;
}

.journey-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.journey-step {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.journey-step:hover:not(.journey-step--active) {
  background: var(--bg-surface-tint);
}

.journey-step--active {
  border-color: var(--border-default);
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
}

.journey-step__icon {
  display: inline-flex;
  width: 40px;
  height: 40px;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--bg-surface-tint);
  color: var(--color-primary);
}

.journey-step__copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.journey-step__title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.journey-step__description {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.journey-step__arrow {
  flex: none;
  color: var(--text-muted);
}

.tour-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  margin-inline: -16px;
  padding: 4px 16px 20px;
  scroll-padding-inline: 16px;
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;
  scrollbar-width: thin;
}

.tour-carousel :deep(.tour-carousel__card) {
  width: 80%;
  flex: 0 0 80%;
  scroll-snap-align: start;
}

.tour-recommendations__more {
  display: flex;
  width: fit-content;
  min-height: 44px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 24px auto 0;
  padding-inline: 24px;
  border-radius: var(--radius-full);
  background: var(--color-ink);
  color: var(--text-on-image);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.tour-recommendations__more:hover {
  background: var(--forest-900);
  box-shadow: var(--shadow-sm);
}

.testimonials__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}

.testimonials__profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonials__avatar {
  display: flex;
  width: 44px;
  height: 44px;
  flex: none;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-surface);
  border-radius: var(--radius-full);
  background: var(--color-secondary);
  color: var(--forest-800);
  font-size: 13px;
  font-weight: 500;
}

.testimonials__person {
  min-width: 0;
  flex: 1;
}

.testimonials__person p {
  margin: 0;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.testimonials__person span {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.4;
}

.testimonials__controls {
  display: flex;
  gap: 8px;
}

.testimonials__controls button {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.testimonials__controls button:hover {
  background: var(--bg-surface-tint);
  color: var(--text-primary);
}

.testimonials__quote-wrap {
  position: relative;
  display: flex;
  min-height: 160px;
  align-items: center;
}

.testimonials__quote-mark {
  position: absolute;
  top: -20px;
  left: -4px;
  color: var(--mint-100);
  font-size: 96px;
  font-weight: 500;
  line-height: 1;
  pointer-events: none;
}

.testimonials__quote {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
  line-height: 1.6;
}

@media (max-width: 639px) {
  .home-hero {
    padding: 72px 16px 12px;
  }

  .home-hero__eyebrow {
    margin-bottom: 8px;
  }

  .home-hero__description {
    max-width: 360px;
    margin: 8px 0 12px;
    font-size: 14px;
    line-height: 1.4;
  }

  .home-hero__title {
    font-size: clamp(36px, calc(10vw + 4px), 40px);
  }

  .hero-search {
    max-width: 440px;
    flex-direction: column;
    align-items: stretch;
    padding: 8px;
    border-radius: var(--radius-lg);
  }

  .hero-search__field {
    min-height: 44px;
    padding: 6px 10px;
  }

  .hero-search__field + .hero-search__field::before {
    top: 0;
    right: 12px;
    left: 12px;
    width: auto;
    height: 1px;
    transform: none;
  }

  .hero-search__submit {
    width: 100%;
    margin-top: 4px;
  }

  .home-hero__discover,
  .home-hero__caption {
    display: none;
  }
}

@media (min-width: 640px) {
  .home-hero {
    min-height: 600px;
    padding-inline: 32px;
  }

  .home-hero__title {
    font-size: 56px;
  }

  .home-stats {
    gap: 20px;
    padding-inline: 32px;
  }

  .home-stats :deep(.stat-card) {
    padding: 20px 16px;
  }

  .home-content {
    padding-inline: 32px;
  }

  .home-section {
    margin-top: 96px;
  }

  .section-heading {
    margin-bottom: 40px;
  }

  .section-heading__title {
    font-size: 40px;
    line-height: 1.1;
  }

  .destination-bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .destination-bento :deep(.destination-bento__tile) {
    height: 280px;
  }

  .local-stories__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .local-category {
    padding: 24px;
  }

  .how-it-works__layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    gap: 32px;
  }

  .how-visual {
    min-height: 0;
  }

  .journey-step {
    padding: 16px 20px;
  }

  .tour-carousel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    overflow: visible;
    margin: 0;
    padding: 0;
  }

  .tour-carousel :deep(.tour-carousel__card) {
    width: 100%;
  }

  .testimonials__layout {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    align-items: center;
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .home-hero {
    min-height: 640px;
    padding: 144px 48px 92px;
  }

  .home-hero__title {
    font-size: 72px;
    line-height: 1.05;
  }

  .home-hero__description {
    font-size: 18px;
  }

  .home-stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: -48px;
    padding-inline: 48px;
  }

  .home-stats :deep(.stat-card) {
    padding: 20px 24px;
  }

  .home-content {
    padding-inline: 48px;
  }

  .home-section {
    margin-top: 120px;
  }

  .section-heading {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 48px;
  }

  .section-heading__title {
    font-size: 48px;
  }

  .section-heading__description {
    max-width: 380px;
    text-align: right;
  }

  .destination-bento {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(1)),
  .destination-bento :deep(.destination-bento__tile:nth-child(2)) {
    grid-row: 1;
    height: 280px;
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(1)) {
    grid-column: span 7;
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(2)) {
    grid-column: span 5;
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(3)),
  .destination-bento :deep(.destination-bento__tile:nth-child(4)) {
    grid-row: 2;
    height: 240px;
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(3)) {
    grid-column: span 5;
  }

  .destination-bento :deep(.destination-bento__tile:nth-child(4)) {
    grid-column: span 7;
  }

  .how-it-works__layout {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 24px;
  }

  .how-visual {
    grid-column: span 5;
  }

  .journey-steps {
    grid-column: 7 / span 6;
  }

  .tour-carousel {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  .tour-carousel :deep(.tour-carousel__card) {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .journey-step,
  .testimonials__controls button {
    transition-duration: 0.01ms;
  }
}
</style>
