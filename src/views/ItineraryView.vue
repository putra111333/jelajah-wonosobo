<script setup>
import { computed, ref } from 'vue'
import {
  CalendarDays,
  CircleAlert,
  Clock3,
  MapPin,
  Plus,
  Route,
  Trash2,
} from 'lucide-vue-next'
import BaseBadge from '../components/ui/BaseBadge.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import BaseIcon from '../components/ui/BaseIcon.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseSelect from '../components/ui/BaseSelect.vue'
import {
  artsHighlights,
  culinaryHighlights,
  featuredDestinations,
} from '../data/wonosoboData'
import { useItinerary } from '../composables/useItinerary'

const itinerary = useItinerary()
const selectedDay = ref(1)
const showAddForm = ref(false)
const selectedItemKey = ref('')
const formError = ref('')

const categories = {
  wisata: { label: 'Wisata', items: featuredDestinations },
  kuliner: { label: 'Kuliner', items: culinaryHighlights },
  kesenian: { label: 'Kesenian', items: artsHighlights },
}

const allOptions = computed(() =>
  Object.entries(categories).flatMap(([category, group]) =>
    group.items.map((item) => ({
      value: `${category}:${item.id}`,
      label: `${item.name} · ${group.label}`,
    })),
  ),
)
const availableOptions = computed(() => {
  const saved = new Set(itinerary.itemKeys.value)
  return allOptions.value.filter((option) => !saved.has(option.value))
})
const durationOptions = Array.from({ length: 7 }, (_, index) => ({
  value: String(index + 1),
  label: `${index + 1} hari`,
}))
const days = computed(() =>
  Array.from({ length: itinerary.durationDays.value }, (_, index) => index + 1),
)
const activeDay = computed(() =>
  Math.min(selectedDay.value, itinerary.durationDays.value),
)
const dayOptions = computed(() =>
  days.value.map((day) => ({ value: String(day), label: `Hari ${day}` })),
)
const dateModel = computed({
  get: () => itinerary.startDate.value,
  set: (value) => {
    itinerary.setStartDate(value)
  },
})
const durationModel = computed({
  get: () => String(itinerary.durationDays.value),
  set: (value) => {
    if (itinerary.setDurationDays(value)) {
      selectedDay.value = Math.min(selectedDay.value, Number(value))
    }
  },
})
const plannedItems = computed(() =>
  itinerary.itemKeys.value.map((key) => {
    const [category, slug] = key.split(':')
    const group = categories[category]
    const item = group?.items.find((entry) => entry.id === slug) ?? null
    return {
      key,
      category,
      categoryLabel: group?.label ?? 'Tujuan',
      item,
      day: itinerary.itemDays.value[key] ?? 1,
    }
  }),
)
const dayItems = computed(() =>
  plannedItems.value.filter((plannedItem) => plannedItem.day === activeDay.value),
)
const estimatedCost = computed(() =>
  plannedItems.value.reduce((sum, plannedItem) => {
    const amount = plannedItem.item?.price?.match(/\d[\d.]*/)
    return sum + (amount ? Number(amount[0].replace(/\./g, '')) : 0)
  }, 0),
)
const formattedCost = computed(() =>
  estimatedCost.value
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(estimatedCost.value)
    : 'Belum tersedia',
)
const formattedDate = computed(() =>
  new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${itinerary.startDate.value}T00:00:00`)),
)

function scheduledTime(index) {
  const times = ['08.00', '11.00', '14.00', '17.00', '19.00']
  return `${times[index] ?? '09.00'} WIB`
}

function addDestination() {
  formError.value = ''
  if (!selectedItemKey.value) {
    formError.value = 'Pilih tujuan yang ingin ditambahkan.'
    return
  }

  if (itinerary.addItem(selectedItemKey.value, activeDay.value)) {
    selectedItemKey.value = ''
    showAddForm.value = false
    return
  }

  formError.value =
    itinerary.error.value || 'Tujuan tersebut sudah ada di rencana perjalanan.'
}

function removeDestination(key) {
  itinerary.removeItem(key)
}

function moveDestination(key, day) {
  itinerary.setItemDay(key, day)
}
</script>

<template>
  <main class="itinerary-view">
    <div class="itinerary-view__container">
      <header class="itinerary-intro">
        <div>
          <p class="itinerary-intro__eyebrow">Rancang perjalananmu</p>
          <h1>Rencana Jelajah</h1>
        </div>
        <p class="itinerary-intro__description">
          Susun singgah di alam, kuliner, dan budaya Wonosobo sesuai ritme
          perjalananmu.
        </p>
      </header>

      <section class="itinerary-settings" aria-label="Tanggal dan durasi perjalanan">
        <BaseInput
          v-model="dateModel"
          label="Tanggal mulai"
          type="date"
          :icon="CalendarDays"
        />
        <BaseSelect
          v-model="durationModel"
          label="Durasi perjalanan"
          :options="durationOptions"
          :icon="Clock3"
        />
        <div class="itinerary-settings__note">
          <BaseIcon :icon="Route" :size="18" />
          <span>
            {{ itinerary.itemCount.value }} tujuan dalam
            {{ itinerary.durationDays.value }} hari
          </span>
        </div>
      </section>

      <p v-if="itinerary.error.value" class="itinerary-alert" role="alert">
        <BaseIcon :icon="CircleAlert" :size="16" />
        {{ itinerary.error.value }}
      </p>

      <div class="itinerary-layout">
        <section class="itinerary-plan" aria-labelledby="itinerary-days-title">
          <div class="itinerary-plan__heading">
            <div>
              <p class="itinerary-plan__eyebrow">Perjalananmu</p>
              <h2 id="itinerary-days-title">Jadwal perjalanan</h2>
            </div>
            <span class="itinerary-plan__count">
              {{ itinerary.itemCount.value }}
              {{ itinerary.itemCount.value === 1 ? 'tujuan' : 'tujuan' }}
            </span>
          </div>

          <div class="itinerary-days" role="tablist" aria-label="Pilih hari perjalanan">
            <button
              v-for="day in days"
              :key="day"
              class="itinerary-days__tab"
              :class="{ 'itinerary-days__tab--active': activeDay === day }"
              type="button"
              role="tab"
              :aria-selected="activeDay === day"
              @click="selectedDay = day"
            >
              Hari {{ day }}
              <span>
                {{ plannedItems.filter((item) => item.day === day).length }}
              </span>
            </button>
          </div>

          <div v-if="dayItems.length" class="itinerary-timeline">
            <article
              v-for="(plannedItem, index) in dayItems"
              :key="plannedItem.key"
              class="itinerary-stop"
            >
              <span class="itinerary-stop__marker" aria-hidden="true" />
              <p class="itinerary-stop__time">{{ scheduledTime(index) }}</p>
              <div class="itinerary-stop__card">
                <div class="itinerary-stop__top">
                  <BaseBadge variant="brand">{{ plannedItem.categoryLabel }}</BaseBadge>
                  <div class="itinerary-stop__actions">
                    <label class="itinerary-stop__move">
                      <span>Pindahkan ke</span>
                      <BaseSelect
                        :model-value="String(plannedItem.day)"
                        :options="dayOptions"
                        :aria-label="`Pindahkan ${plannedItem.item?.name ?? 'tujuan'} ke hari lain`"
                        @update:model-value="moveDestination(plannedItem.key, $event)"
                      />
                    </label>
                    <button
                      class="itinerary-stop__remove"
                      type="button"
                      :aria-label="`Hapus ${plannedItem.item?.name ?? 'tujuan'} dari rencana`"
                      @click="removeDestination(plannedItem.key)"
                    >
                      <BaseIcon :icon="Trash2" :size="17" />
                    </button>
                  </div>
                </div>
                <template v-if="plannedItem.item">
                  <RouterLink
                    class="itinerary-stop__title"
                    :to="`/explore/${plannedItem.category}/${plannedItem.item.id}`"
                  >
                    {{ plannedItem.item.name }}
                  </RouterLink>
                  <p class="itinerary-stop__meta">
                    <BaseIcon :icon="MapPin" :size="14" />
                    {{ plannedItem.item.location }}
                    <span aria-hidden="true">·</span>
                    {{ plannedItem.item.price }}
                  </p>
                </template>
                <p v-else class="itinerary-stop__unavailable">
                  Detail tujuan ini sudah tidak tersedia. Hapus untuk
                  membersihkan rencana.
                </p>
              </div>
            </article>
          </div>
          <div v-else class="itinerary-empty">
            <span class="itinerary-empty__icon">
              <BaseIcon :icon="Route" :size="22" />
            </span>
            <h3>Belum ada tujuan untuk Hari {{ activeDay }}</h3>
            <p>Tambahkan tempat yang ingin kamu singgahi pada hari ini.</p>
          </div>

          <div class="itinerary-add">
            <BaseButton
              v-if="!showAddForm"
              variant="outline"
              class="itinerary-add__trigger"
              @click="showAddForm = true"
            >
              <template #leading><BaseIcon :icon="Plus" :size="17" /></template>
              Tambah Destinasi
            </BaseButton>
            <form v-else class="itinerary-add__form" @submit.prevent="addDestination">
              <BaseSelect
                v-model="selectedItemKey"
                label="Pilih tujuan"
                placeholder="Pilih wisata, kuliner, atau kesenian"
                :options="availableOptions"
                :error="formError"
              />
              <div class="itinerary-add__actions">
                <BaseButton type="submit" :disabled="!availableOptions.length">
                  <template #leading><BaseIcon :icon="Plus" :size="17" /></template>
                  Tambahkan
                </BaseButton>
                <BaseButton variant="ghost" @click="showAddForm = false">
                  Batal
                </BaseButton>
              </div>
            </form>
          </div>
        </section>

        <aside class="itinerary-summary" aria-labelledby="itinerary-summary-title">
          <p class="itinerary-summary__eyebrow">Ringkasan perjalanan</p>
          <h2 id="itinerary-summary-title">Wonosobo menantimu</h2>
          <p class="itinerary-summary__date">
            <BaseIcon :icon="CalendarDays" :size="16" />
            Mulai {{ formattedDate }}
          </p>
          <div class="itinerary-summary__rows">
            <div>
              <span>Durasi</span>
              <strong>{{ itinerary.durationDays.value }} hari</strong>
            </div>
            <div>
              <span>Destinasi</span>
              <strong>{{ itinerary.itemCount.value }} tempat</strong>
            </div>
            <div class="itinerary-summary__total">
              <span>Estimasi tiket & kuliner</span>
              <strong>{{ formattedCost }}</strong>
            </div>
          </div>
          <p class="itinerary-summary__disclaimer">
            Estimasi memakai harga indikatif pada kartu tujuan. Biaya aktual,
            transportasi, dan kebutuhan pribadi dapat berbeda.
          </p>
          <RouterLink class="itinerary-summary__explore" to="/explore">
            Cari tujuan lain
          </RouterLink>
        </aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.itinerary-view {
  width: 100%;
  flex: 1;
  padding: 48px 0 96px;
}

.itinerary-view__container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.itinerary-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
}

.itinerary-intro__eyebrow,
.itinerary-plan__eyebrow,
.itinerary-summary__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.4;
}

.itinerary-intro h1 {
  margin: 0;
  color: var(--text-primary);
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-wrap: balance;
}

.itinerary-intro__description {
  max-width: 380px;
  margin: 0;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.6;
  text-align: right;
}

.itinerary-settings {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  align-items: end;
  gap: 20px;
  margin-bottom: 28px;
  padding: 20px 24px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
}

.itinerary-settings__note {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  white-space: nowrap;
}

.itinerary-settings__note :deep(.lucide) {
  color: var(--color-primary);
}

.itinerary-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: -8px 0 24px;
  color: var(--error);
  font-size: 14px;
}

.itinerary-layout {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(290px, 5fr);
  align-items: start;
  gap: 24px;
}

.itinerary-plan,
.itinerary-summary {
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.itinerary-plan {
  min-width: 0;
  padding: 28px;
}

.itinerary-plan__heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.itinerary-plan__heading h2,
.itinerary-summary h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.itinerary-plan__count {
  color: var(--text-muted);
  font-size: 13px;
}

.itinerary-days {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 4px;
  overflow-x: auto;
  border-radius: var(--radius-full);
  background: var(--bg-surface-tint);
  scrollbar-width: thin;
}

.itinerary-days__tab {
  display: inline-flex;
  min-height: 40px;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-secondary);
  font: 500 14px/1 var(--font-sans);
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;
}

.itinerary-days__tab:hover {
  background: var(--bg-surface);
}

.itinerary-days__tab--active,
.itinerary-days__tab--active:hover {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.itinerary-days__tab span {
  min-width: 20px;
  padding: 3px 6px;
  border-radius: var(--radius-full);
  background: rgba(5, 31, 32, 0.08);
  font-size: 11px;
  text-align: center;
}

.itinerary-days__tab--active span {
  background: rgba(255, 255, 255, 0.16);
}

.itinerary-timeline {
  position: relative;
  display: grid;
  gap: 16px;
  padding-left: 18px;
}

.itinerary-timeline::before {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 5px;
  width: 1px;
  background: var(--border-strong);
  content: '';
}

.itinerary-stop {
  position: relative;
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  align-items: start;
  column-gap: 12px;
}

.itinerary-stop__marker {
  position: absolute;
  top: 5px;
  left: -18px;
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
}

.itinerary-stop:first-child .itinerary-stop__marker {
  background: var(--color-primary);
}

.itinerary-stop__time {
  margin: 3px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.itinerary-stop__card {
  min-width: 0;
  padding: 16px 18px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.itinerary-stop__card:hover {
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.itinerary-stop__top,
.itinerary-stop__actions {
  display: flex;
  align-items: center;
}

.itinerary-stop__top {
  justify-content: space-between;
  gap: 10px;
}

.itinerary-stop__actions {
  gap: 8px;
}

.itinerary-stop__move {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 12px;
}

.itinerary-stop__move span {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.itinerary-stop__move :deep(.base-field) {
  width: 104px;
}

.itinerary-stop__move :deep(.base-field__control) {
  min-height: 36px;
  padding-inline: 12px;
  box-shadow: none;
}

.itinerary-stop__move :deep(.base-field__select) {
  font-size: 12px;
}

.itinerary-stop__move :deep(.base-field__chevron) {
  width: 14px;
  height: 14px;
}

.itinerary-stop__remove {
  display: inline-grid;
  width: 36px;
  height: 36px;
  flex: none;
  place-items: center;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;
}

.itinerary-stop__remove:hover {
  background: var(--error-bg);
  color: var(--error);
}

.itinerary-stop__title {
  display: inline-block;
  margin-top: 12px;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-decoration: none;
}

.itinerary-stop__title:hover {
  color: var(--color-primary);
}

.itinerary-stop__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
}

.itinerary-stop__meta :deep(.lucide) {
  flex: none;
}

.itinerary-stop__unavailable {
  margin: 12px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.itinerary-empty {
  display: flex;
  min-height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  text-align: center;
}

.itinerary-empty__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--bg-surface-tint);
  color: var(--color-primary);
}

.itinerary-empty h3 {
  margin: 14px 0 4px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
}

.itinerary-empty p {
  max-width: 320px;
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.itinerary-add {
  margin: 20px 0 0 18px;
}

.itinerary-add__trigger {
  width: 100%;
  min-height: 48px;
  border-style: dashed;
}

.itinerary-add__form {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-surface-tint);
}

.itinerary-add__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.itinerary-summary {
  position: sticky;
  top: 96px;
  padding: 24px;
}

.itinerary-summary h2 {
  font-size: 22px;
}

.itinerary-summary__date {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0 20px;
  color: var(--text-secondary);
  font-size: 13px;
}

.itinerary-summary__date :deep(.lucide) {
  color: var(--color-primary);
}

.itinerary-summary__rows {
  display: grid;
  gap: 14px;
  padding: 18px 0;
  border-top: 1px solid var(--border-default);
  border-bottom: 1px solid var(--border-default);
}

.itinerary-summary__rows > div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-secondary);
  font-size: 13px;
}

.itinerary-summary__rows strong {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.itinerary-summary__rows .itinerary-summary__total {
  align-items: flex-start;
  padding-top: 8px;
}

.itinerary-summary__total strong {
  font-size: 20px;
  letter-spacing: -0.02em;
}

.itinerary-summary__disclaimer {
  margin: 14px 0 18px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
}

.itinerary-summary__explore {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 180ms ease;
}

.itinerary-summary__explore:hover {
  background: var(--color-primary-hover);
}

@media (min-width: 640px) {
  .itinerary-view__container {
    padding-inline: 32px;
  }
}

@media (max-width: 900px) {
  .itinerary-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .itinerary-summary {
    position: static;
  }
}

@media (max-width: 639px) {
  .itinerary-view {
    padding: 32px 0 72px;
  }

  .itinerary-intro {
    display: block;
    margin-bottom: 24px;
  }

  .itinerary-intro h1 {
    font-size: 36px;
  }

  .itinerary-intro__description {
    margin-top: 12px;
    text-align: left;
  }

  .itinerary-settings {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    padding: 18px;
  }

  .itinerary-settings__note {
    min-height: auto;
  }

  .itinerary-plan {
    padding: 20px 16px;
  }

  .itinerary-plan__heading h2 {
    font-size: 21px;
  }

  .itinerary-plan__count {
    font-size: 12px;
  }

  .itinerary-stop {
    grid-template-columns: 1fr;
    row-gap: 6px;
  }

  .itinerary-stop__time {
    margin-top: 0;
  }

  .itinerary-stop__card {
    padding: 14px;
  }

  .itinerary-stop__top {
    align-items: flex-start;
  }

  .itinerary-stop__move :deep(.base-field) {
    width: 90px;
  }

  .itinerary-add {
    margin-left: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .itinerary-days__tab,
  .itinerary-stop__card,
  .itinerary-stop__remove,
  .itinerary-summary__explore {
    transition-duration: 0.01ms;
  }
}
</style>
