import { computed, ref } from 'vue'
import {
  artsHighlights,
  culinaryHighlights,
  featuredDestinations,
} from '../data/wonosoboData'

const itemsStorageKey = 'wonosobo-plan-items'
const settingsStorageKey = 'wonosobo-plan-settings'
const maxDurationDays = 7
const knownItemKeys = new Set([
  ...featuredDestinations.map((item) => `wisata:${item.id}`),
  ...culinaryHighlights.map((item) => `kuliner:${item.id}`),
  ...artsHighlights.map((item) => `kesenian:${item.id}`),
])

const itemKeys = ref([])
const startDate = ref(getLocalDate())
const durationDays = ref(1)
const itemDays = ref({})
const error = ref('')
let initialized = false

function getLocalDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function normalizeDuration(value) {
  const duration = Number(value)
  if (!Number.isInteger(duration)) return 1
  return Math.min(maxDurationDays, Math.max(1, duration))
}

function initialize() {
  if (initialized) return
  initialized = true
  if (typeof window === 'undefined') return

  try {
    const storedItems = window.localStorage.getItem(itemsStorageKey)
    itemKeys.value = storedItems
      ? [...new Set(storedItems.split('\n').filter(Boolean))]
      : []
  } catch (caughtError) {
    error.value = 'Rencana jelajah tidak dapat dibaca dari penyimpanan perangkat.'
    console.error('Unable to read the saved Wonosobo itinerary.', caughtError)
  }

  try {
    const storedSettings = window.localStorage.getItem(settingsStorageKey)
    if (!storedSettings) return

    const settings = JSON.parse(storedSettings)
    if (isValidDate(settings.startDate)) startDate.value = settings.startDate
    durationDays.value = normalizeDuration(settings.durationDays)
    if (settings.itemDays && typeof settings.itemDays === 'object') {
      itemDays.value = Object.fromEntries(
        Object.entries(settings.itemDays)
          .filter(([key, day]) => knownItemKeys.has(key) && itemKeys.value.includes(key))
          .map(([key, day]) => [key, Math.min(durationDays.value, normalizeDuration(day))]),
      )
    }
  } catch (caughtError) {
    error.value = 'Pengaturan rencana jelajah tidak dapat dibaca.'
    console.error('Unable to read Wonosobo itinerary settings.', caughtError)
  }
}

function persistItems(nextKeys) {
  try {
    window.localStorage.setItem(itemsStorageKey, nextKeys.join('\n'))
    itemKeys.value = nextKeys
    error.value = ''
    return true
  } catch (caughtError) {
    error.value = 'Rencana belum dapat disimpan. Coba lagi di perangkat ini.'
    console.error('Unable to save the Wonosobo itinerary.', caughtError)
    return false
  }
}

function persistSettings(nextSettings) {
  try {
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(nextSettings))
    startDate.value = nextSettings.startDate
    durationDays.value = nextSettings.durationDays
    itemDays.value = nextSettings.itemDays
    error.value = ''
    return true
  } catch (caughtError) {
    error.value = 'Pengaturan rencana belum dapat disimpan di perangkat ini.'
    console.error('Unable to save Wonosobo itinerary settings.', caughtError)
    return false
  }
}

function updateSettings(changes) {
  const nextDuration = normalizeDuration(changes.durationDays ?? durationDays.value)
  const nextItemDays = Object.fromEntries(
    Object.entries(changes.itemDays ?? itemDays.value)
      .filter(([key]) => itemKeys.value.includes(key))
      .map(([key, day]) => [key, Math.min(nextDuration, normalizeDuration(day))]),
  )

  return persistSettings({
    startDate: changes.startDate ?? startDate.value,
    durationDays: nextDuration,
    itemDays: nextItemDays,
  })
}

function addItem(key, day = 1) {
  initialize()
  if (!knownItemKeys.has(key) || itemKeys.value.includes(key)) return false
  if (!persistItems([...itemKeys.value, key])) return false

  updateSettings({
    itemDays: { ...itemDays.value, [key]: Math.min(durationDays.value, normalizeDuration(day)) },
  })
  return true
}

function removeItem(key) {
  initialize()
  if (!itemKeys.value.includes(key)) return false

  const nextKeys = itemKeys.value.filter((savedKey) => savedKey !== key)
  if (!persistItems(nextKeys)) return false

  const nextItemDays = { ...itemDays.value }
  delete nextItemDays[key]
  updateSettings({ itemDays: nextItemDays })
  return true
}

function setStartDate(value) {
  initialize()
  if (!isValidDate(value)) return false
  return updateSettings({ startDate: value })
}

function setDurationDays(value) {
  initialize()
  return updateSettings({ durationDays: value })
}

function setItemDay(key, day) {
  initialize()
  if (!itemKeys.value.includes(key)) return false
  return updateSettings({ itemDays: { ...itemDays.value, [key]: day } })
}

function clearError() {
  error.value = ''
}

export function useItinerary() {
  initialize()

  return {
    itemKeys,
    startDate,
    durationDays,
    itemDays,
    error,
    itemCount: computed(() => itemKeys.value.length),
    addItem,
    removeItem,
    setStartDate,
    setDurationDays,
    setItemDay,
    clearError,
  }
}
