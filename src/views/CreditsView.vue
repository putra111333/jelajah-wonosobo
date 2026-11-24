<script setup>
import { ArrowUpRight, BookOpen, Image, ShieldCheck } from 'lucide-vue-next'
import BaseBadge from '../components/ui/BaseBadge.vue'
import BaseIcon from '../components/ui/BaseIcon.vue'

const sources = [
  {
    name: 'Dinas Pariwisata & Kebudayaan Kab. Wonosobo',
    tag: 'Data resmi',
    description:
      'Acuan informasi operasional, tarif kawasan wisata Dieng, dan kalender kegiatan budaya.',
    icon: ShieldCheck,
  },
  {
    name: 'Portal Resmi Pemerintah Kab. Wonosobo',
    tag: 'Referensi',
    description:
      'Rujukan profil wilayah, letak geografis dataran tinggi, dan informasi akses regional.',
    icon: BookOpen,
  },
  {
    name: 'Komunitas Pelestari Seni Bundengan & Lengger',
    tag: 'Budaya',
    description:
      'Acuan narasi sejarah kesenian tradisional dan dokumentasi pertunjukan lokal.',
    icon: BookOpen,
  },
]

const assetCredits = [
  {
    category: 'Wisata',
    name: 'Panorama Telaga Warna Dieng',
    source: 'Wikimedia Commons / Arsip Dieng',
    license: 'CC BY-SA 4.0',
  },
  {
    category: 'Kuliner',
    name: 'Sajian Mie Ongklok & Sate Sapi',
    source: 'Dokumentasi Kuliner Nusantara',
    license: 'Kredit diperlukan',
  },
  {
    category: 'Kesenian',
    name: 'Pementasan Tari Lengger',
    source: 'Dokumentasi Budaya Wonosobo',
    license: 'Kredit diperlukan',
  },
]
</script>

<template>
  <main class="credits-view">
    <div class="credits-view__container">
      <header class="credits-intro">
        <p class="credits-intro__eyebrow">Transparansi & apresiasi</p>
        <h1>Referensi & Kredit Aset</h1>
        <p class="credits-intro__description">
          Daftar sumber informasi daerah, kurasi data destinasi, serta kredit
          dokumentasi media yang digunakan pada aplikasi Jelajah Wonosobo.
        </p>
      </header>

      <section class="credits-sources" aria-labelledby="credits-sources-title">
        <div class="credits-sources__list">
          <div class="credits-section-heading">
            <p class="credits-section-heading__eyebrow">Sumber informasi</p>
            <h2 id="credits-sources-title">Sumber Data & Informasi Daerah</h2>
          </div>

          <article
            v-for="source in sources"
            :key="source.name"
            class="credits-source-card"
          >
            <span class="credits-source-card__icon">
              <BaseIcon :icon="source.icon" :size="19" />
            </span>
            <div class="credits-source-card__copy">
              <h3>{{ source.name }}</h3>
              <p>{{ source.description }}</p>
            </div>
            <BaseBadge variant="brand">{{ source.tag }}</BaseBadge>
          </article>
        </div>

        <aside class="credits-note" aria-labelledby="credits-note-title">
          <span class="credits-note__icon">
            <BaseIcon :icon="ShieldCheck" :size="20" />
          </span>
          <p class="credits-section-heading__eyebrow">Catatan penggunaan</p>
          <h2 id="credits-note-title">Informasi yang bertanggung jawab</h2>
          <p>
            Jadwal, harga, dan akses dapat berubah. Pastikan kembali kepada
            pengelola atau sumber resmi sebelum berkunjung.
          </p>
          <p>
            Kredit aset di bawah mengikuti rancangan kurasi. Detail pemilik,
            tautan sumber, dan lisensi perlu diverifikasi saat foto final
            digunakan.
          </p>
          <a class="credits-note__link" href="#kredit-media">
            Lihat kredit media
            <BaseIcon :icon="ArrowUpRight" :size="16" />
          </a>
        </aside>
      </section>

      <section
        id="kredit-media"
        class="credits-assets"
        aria-labelledby="credits-assets-title"
      >
        <div class="credits-assets__heading">
          <div class="credits-section-heading">
            <p class="credits-section-heading__eyebrow">Apresiasi kreator</p>
            <h2 id="credits-assets-title">Kredit Foto & Dokumentasi Media</h2>
          </div>
          <p>
            Setiap aset visual harus menyertakan atribusi dan lisensi yang sesuai
            dengan ketentuan pemiliknya.
          </p>
        </div>

        <div class="credits-asset-table" role="table" aria-label="Daftar kredit media">
          <div class="credits-asset-table__head" role="row">
            <span role="columnheader">Aset</span>
            <span role="columnheader">Kategori</span>
            <span role="columnheader">Sumber</span>
            <span role="columnheader">Lisensi</span>
          </div>
          <article
            v-for="asset in assetCredits"
            :key="asset.name"
            class="credits-asset-row"
            role="row"
          >
            <div class="credits-asset-row__name" role="cell">
              <span class="credits-asset-row__icon">
                <BaseIcon :icon="Image" :size="17" />
              </span>
              <span>{{ asset.name }}</span>
            </div>
            <div class="credits-asset-row__category" role="cell">
              <BaseBadge variant="neutral">{{ asset.category }}</BaseBadge>
            </div>
            <div class="credits-asset-row__source" role="cell">
              {{ asset.source }}
            </div>
            <div class="credits-asset-row__license" role="cell">
              {{ asset.license }}
            </div>
          </article>
        </div>
        <p class="credits-assets__disclaimer">
          Catatan: nama sumber dan status lisensi di atas merupakan contoh
          referensi kurasi dari mockup. Verifikasi pemilik hak cipta dan izin
          penggunaan sebelum publikasi.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.credits-view {
  width: 100%;
  flex: 1;
  padding: 48px 0 96px;
}

.credits-view__container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 16px;
}

.credits-intro {
  max-width: 760px;
  margin-bottom: 48px;
}

.credits-intro__eyebrow,
.credits-section-heading__eyebrow {
  margin: 0 0 8px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.4;
}

.credits-intro h1 {
  margin: 0;
  color: var(--text-primary);
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-wrap: balance;
}

.credits-intro__description {
  max-width: 620px;
  margin: 16px 0 0;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.credits-sources {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(280px, 5fr);
  align-items: start;
  gap: 24px;
}

.credits-sources__list {
  display: grid;
  gap: 14px;
}

.credits-section-heading {
  margin-bottom: 8px;
}

.credits-section-heading h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.credits-source-card {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  align-items: start;
  gap: 14px;
  padding: 18px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.credits-source-card__icon,
.credits-note__icon,
.credits-asset-row__icon {
  display: grid;
  flex: none;
  place-items: center;
  background: var(--bg-surface-tint);
  color: var(--color-primary);
}

.credits-source-card__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
}

.credits-source-card__copy h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.credits-source-card__copy p {
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.55;
}

.credits-note {
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.credits-note__icon {
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  border-radius: var(--radius-full);
}

.credits-note h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.credits-note > p:not(.credits-section-heading__eyebrow) {
  margin: 12px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.credits-note__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}

.credits-note__link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.credits-assets {
  margin-top: 72px;
}

.credits-assets__heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 24px;
}

.credits-assets__heading > p {
  max-width: 380px;
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
  text-align: right;
}

.credits-asset-table {
  overflow: hidden;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-md);
}

.credits-asset-table__head,
.credits-asset-row {
  display: grid;
  grid-template-columns: minmax(220px, 1.4fr) minmax(100px, 0.7fr) minmax(200px, 1.2fr) minmax(130px, 0.7fr);
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
}

.credits-asset-table__head {
  background: var(--bg-surface-tint);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
}

.credits-asset-row + .credits-asset-row {
  border-top: 1px solid var(--border-default);
}

.credits-asset-row__name {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.credits-asset-row__icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
}

.credits-asset-row__source,
.credits-asset-row__license {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.credits-assets__disclaimer {
  max-width: 720px;
  margin: 14px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.6;
}

@media (min-width: 640px) {
  .credits-view__container {
    padding-inline: 32px;
  }
}

@media (max-width: 850px) {
  .credits-sources {
    grid-template-columns: minmax(0, 1fr);
  }

  .credits-asset-table__head {
    display: none;
  }

  .credits-asset-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px 16px;
  }

  .credits-asset-row__source,
  .credits-asset-row__license {
    grid-column: 1 / -1;
    padding-left: 44px;
  }
}

@media (max-width: 639px) {
  .credits-view {
    padding: 32px 0 72px;
  }

  .credits-intro {
    margin-bottom: 32px;
  }

  .credits-intro h1 {
    font-size: 36px;
  }

  .credits-intro__description {
    margin-top: 12px;
    font-size: 15px;
  }

  .credits-section-heading h2 {
    font-size: 22px;
  }

  .credits-source-card {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 12px;
    padding: 16px;
  }

  .credits-source-card > :deep(.base-badge) {
    grid-column: 2;
    justify-self: start;
  }

  .credits-note {
    padding: 20px;
  }

  .credits-assets {
    margin-top: 56px;
  }

  .credits-assets__heading {
    display: block;
  }

  .credits-assets__heading > p {
    margin-top: 12px;
    text-align: left;
  }

  .credits-asset-row {
    padding: 16px;
  }

  .credits-asset-row__source,
  .credits-asset-row__license {
    padding-left: 0;
  }
}
</style>
