# design.md — Design System Specification

> Sumber acuan: (1) referensi landing page wisata "Indotravi" untuk gaya visual, layout, radius, shadow, dan komponen; (2) palet warna hijau forest 6 warna sebagai **single source of truth** seluruh kode warna.
> Nilai bertanda **(derived)** adalah turunan/tint dari palet utama karena tidak tercantum di file palet. Seluruh nilai bersifat konkret dan siap dipakai di CSS/Tailwind.
> Rasio kontras dihitung dengan rumus WCAG 2.1 (nilai dibulatkan).

---

## 1. Design Direction & Visual Principles

### 1.1 Karakter Visual
Gaya: **Minimalist–Modern, Editorial, Immersive Photography-led, Soft-Elevated**.

- **Photography-first:** foto lanskap penuh-bleed menjadi elemen visual utama (hero, bento grid, kartu paket). UI "meminjam" kekuatan foto, bukan berkompetisi dengannya.
- **Clean & airy:** latar sangat terang, banyak white space, tipografi besar bergaya editorial dengan bobot ringan (Regular/Medium) dan letter-spacing rapat.
- **Soft geometry:** sudut membulat besar (16–32px) pada kartu, bentuk **pill (full radius)** pada tombol, input, nav, dan badge.
- **Subtle glassmorphism:** dipakai *hanya* di atas foto (navbar, search bar, bar harga kartu): blur + putih/hijau-gelap transparan.
- **Elevasi lembut:** shadow besar, blur tinggi, opasitas sangat rendah, tidak ada border tebal atau shadow keras.
- **Warna:** palet hijau forest monokromatik (dari hampir-hitam kehijauan sampai mint pucat) menggantikan hitam/abu-abu pada referensi, sehingga terasa alami, tenang, dan selaras dengan tema wisata alam.

### 1.2 Prinsip Desain Wajib (5)

1. **Foto sebagai pahlawan.** Setiap section harus punya jangkar visual berupa foto berkualitas tinggi. Teks di atas foto wajib memakai overlay gradien agar kontras ≥ 4.5:1.
2. **Satu bahasa bentuk.** Kartu/kontainer = radius 24px; elemen interaktif kecil (button, input, badge, chip) = pill (`9999px`). Jangan mencampur sudut tajam dan membulat.
3. **Hierarki lewat skala & white space, bukan dekorasi.** Perbedaan level informasi dibuat dengan ukuran, bobot, dan jarak, bukan border, garis, atau warna berlebihan.
4. **Warna terbatas & bermakna.** Maksimal 1 warna aksi utama per viewport (hijau `#235347`); aksen mint `#8EB69B` hanya untuk highlight, ikon aktif, dan elemen di atas permukaan gelap.
5. **Elevasi halus & konsisten.** Hanya gunakan token shadow yang didefinisikan (Bagian 4.4). Elemen yang "mengambang" (stat cards, nav) selalu memakai shadow lembut, tidak pernah hard shadow.

---

## 2. Color System & Design Tokens

### 2.1 Palet Sumber (Single Source of Truth)

| Nama Palet | Hex | RGB | Luminance relatif |
|---|---|---|---|
| Forest 950 | `#051F20` | 5, 31, 32 | 0.011 |
| Forest 900 | `#0B2B26` | 11, 43, 38 | 0.019 |
| Forest 800 | `#163832` | 22, 56, 50 | 0.032 |
| Forest 700 | `#235347` | 35, 83, 71 | 0.070 |
| Sage 400 | `#8EB69B` | 142, 182, 155 | 0.416 |
| Mint 100 | `#DAF1DE` | 218, 241, 222 | 0.831 |

### 2.2 Brand Colors

| Token | Hex / RGB | Penggunaan |
|---|---|---|
| `--color-primary` | `#235347` / 35,83,71 | Tombol utama, link aktif, ikon utama, fokus UI utama |
| `--color-primary-hover` | `#163832` / 22,56,50 | Hover tombol/link primary |
| `--color-primary-active` | `#0B2B26` / 11,43,38 | State pressed/active primary |
| `--color-primary-contrast` | `#FFFFFF` | Teks/ikon di atas primary |
| `--color-secondary` | `#DAF1DE` / 218,241,222 | Tombol sekunder (fill), chip aktif, highlight ringan, latar ikon |
| `--color-secondary-hover` | `#C6E6CC` (derived) / 198,230,204 | Hover secondary |
| `--color-secondary-active` | `#B3DBBB` (derived) / 179,219,187 | Active secondary |
| `--color-secondary-contrast` | `#163832` | Teks di atas secondary |
| `--color-accent` | `#8EB69B` / 142,182,155 | Aksen: ikon aktif di area gelap, rating bintang area gelap, progress, garis highlight, link di footer saat hover |
| `--color-accent-hover` | `#7AA689` (derived) / 122,166,137 | Hover aksen |
| `--color-accent-active` | `#679577` (derived) / 103,149,119 | Active aksen |
| `--color-ink` | `#051F20` / 5,31,32 | Tombol CTA gelap ("View more"), footer, overlay, teks heading |

### 2.3 Neutral / Surface Colors

| Token | Hex / RGB | Penggunaan |
|---|---|---|
| `--bg-page` | `#F5FAF6` (derived) / 245,250,246 | Background utama halaman (pengganti off-white `#F7F8FB` di referensi) |
| `--bg-surface` | `#FFFFFF` / 255,255,255 | Kartu, stat card, panel, dropdown |
| `--bg-surface-tint` | `#EAF6ED` (derived) / 234,246,237 | Surface alternatif, hover baris, item daftar aktif ringan |
| `--bg-inverse` | `#051F20` / 5,31,32 | Footer dan section gelap |
| `--bg-inverse-raised` | `#0B2B26` / 11,43,38 | Input/kartu di atas footer gelap |
| `--border-default` | `#D5E6D9` (derived) / 213,230,217 | Border kartu, divider, input default |
| `--border-strong` | `#8EB69B` / 142,182,155 | Border input hover, outline tombol |
| `--border-inverse` | `#235347` / 35,83,71 | Divider di area gelap |
| `--text-primary` | `#051F20` / 5,31,32 | Heading dan body utama |
| `--text-secondary` | `#3F5A53` (derived) / 63,90,83 | Paragraf deskripsi, label sekunder |
| `--text-muted` | `#5E766C` (derived) / 94,118,108 | Caption, placeholder, metadata (tanggal, subtitle kartu) |
| `--text-inverse` | `#DAF1DE` / 218,241,222 | Teks utama di atas surface gelap |
| `--text-inverse-muted` | `#8EB69B` / 142,182,155 | Teks sekunder di atas surface gelap |
| `--text-on-image` | `#FFFFFF` | Teks di atas foto (wajib dengan overlay gradien) |

### 2.4 Semantic Colors (selaras dengan palet hijau forest)

| Token | Hex / RGB | Penggunaan |
|---|---|---|
| `--success` | `#237A4B` / 35,122,75 | Teks/ikon sukses, pembayaran berhasil |
| `--success-bg` | `#E3F4E8` / 227,244,232 | Latar alert/badge sukses |
| `--warning` | `#8A5A0B` / 138,90,11 | Teks/ikon peringatan |
| `--warning-fill` | `#E0A030` / 224,160,48 | Ikon/indikator peringatan (non-teks) |
| `--warning-bg` | `#FFF3DC` / 255,243,220 | Latar alert peringatan |
| `--error` | `#B3261E` / 179,38,30 | Teks error, border input error |
| `--error-bg` | `#FDE8E6` / 253,232,230 | Latar alert error |
| `--info` | `#1F6F8B` / 31,111,139 | Teks/ikon informasi |
| `--info-bg` | `#E3F1F6` / 227,241,246 | Latar alert info |
| `--rating` | `#F5B83D` / 245,184,61 | Ikon bintang rating (non-teks) |

### 2.5 Catatan Kontras Aksesibilitas (WCAG 2.1)

Standar: AA teks normal ≥ 4.5:1, teks besar (≥ 24px atau ≥ 18.66px bold) ≥ 3:1, UI/ikon ≥ 3:1, AAA teks normal ≥ 7:1.

| Teks | Latar | Rasio | Level |
|---|---|---|---|
| `#051F20` | `#FFFFFF` | ~16.9:1 | AAA |
| `#051F20` | `#F5FAF6` | ~15.9:1 | AAA |
| `#051F20` | `#DAF1DE` | ~14.4:1 | AAA |
| `#051F20` | `#8EB69B` | ~7.6:1 | AAA |
| `#FFFFFF` | `#235347` (primary button) | ~8.8:1 | AAA |
| `#FFFFFF` | `#163832` (primary hover) | ~12.8:1 | AAA |
| `#DAF1DE` | `#051F20` | ~14.4:1 | AAA |
| `#DAF1DE` | `#0B2B26` | ~12.7:1 | AAA |
| `#DAF1DE` | `#163832` | ~10.7:1 | AAA |
| `#DAF1DE` | `#235347` | ~7.3:1 | AAA |
| `#8EB69B` | `#051F20` | ~7.6:1 | AAA |
| `#8EB69B` | `#0B2B26` | ~6.7:1 | AA |
| `#8EB69B` | `#163832` | ~5.7:1 | AA |
| `#3F5A53` (text-secondary) | `#FFFFFF` | ~7.5:1 | AAA |
| `#5E766C` (text-muted) | `#FFFFFF` | ~4.9:1 | AA |
| `#5E766C` (text-muted) | `#F5FAF6` | ~4.6:1 | AA |
| `#235347` (link/teks primary) | `#FFFFFF` | ~8.8:1 | AAA |

**Aturan penting:**
- ❌ `#8EB69B` di atas `#FFFFFF` atau `#DAF1DE` **gagal** AA (≈ 2.3:1 / 1.9:1). Jangan dipakai untuk teks; hanya untuk dekorasi/ikon besar di atas permukaan gelap.
- ❌ `#8EB69B` di atas `#235347` hanya ~3.9:1: hanya untuk teks besar/ikon, bukan teks kecil.
- `--text-muted` adalah batas terendah yang diizinkan untuk teks kecil. Jangan lebih terang.
- Teks di atas foto: gunakan overlay `linear-gradient(to top, rgba(5,31,32,0.75), rgba(5,31,32,0) 60%)` agar kontras teks putih ≥ 4.5:1.
- Fokus keyboard wajib terlihat (lihat Bagian 5.3) dengan kontras indikator ≥ 3:1.

### 2.6 CSS Custom Properties

```css
:root {
  /* Palet sumber */
  --forest-950: #051F20;
  --forest-900: #0B2B26;
  --forest-800: #163832;
  --forest-700: #235347;
  --sage-400:   #8EB69B;
  --mint-100:   #DAF1DE;

  /* Brand */
  --color-primary: #235347;
  --color-primary-hover: #163832;
  --color-primary-active: #0B2B26;
  --color-secondary: #DAF1DE;
  --color-secondary-hover: #C6E6CC;
  --color-secondary-active: #B3DBBB;
  --color-accent: #8EB69B;
  --color-accent-hover: #7AA689;
  --color-accent-active: #679577;
  --color-ink: #051F20;

  /* Surface & text */
  --bg-page: #F5FAF6;
  --bg-surface: #FFFFFF;
  --bg-surface-tint: #EAF6ED;
  --bg-inverse: #051F20;
  --bg-inverse-raised: #0B2B26;
  --border-default: #D5E6D9;
  --border-strong: #8EB69B;
  --border-inverse: #235347;
  --text-primary: #051F20;
  --text-secondary: #3F5A53;
  --text-muted: #5E766C;
  --text-inverse: #DAF1DE;
  --text-inverse-muted: #8EB69B;

  /* Semantic */
  --success: #237A4B; --success-bg: #E3F4E8;
  --warning: #8A5A0B; --warning-bg: #FFF3DC; --warning-fill: #E0A030;
  --error:   #B3261E; --error-bg:   #FDE8E6;
  --info:    #1F6F8B; --info-bg:    #E3F1F6;
  --rating:  #F5B83D;
}
```

---

## 3. Typography System

### 3.1 Pilihan Font

Referensi memakai **geometric/neo-grotesque sans-serif** modern dengan heading berbobot ringan dan letter-spacing rapat (mirip *General Sans / Satoshi / Inter Tight*).

- **Heading & Body (satu keluarga):** **`Inter`** (atau `Inter Tight` untuk heading display). Alternatif setara: `Plus Jakarta Sans`, `Manrope`.
- **Fallback stack:** `'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- **Pairing:** heading ringan–medium (400/500) dengan tracking negatif; body regular (400) dengan tracking normal; label/button medium (500).
- Gunakan `font-feature-settings: "ss01", "cv11"` bila tersedia; aktifkan `-webkit-font-smoothing: antialiased`.

### 3.2 Skala Tipografi (Desktop ≥ 1024px)

| Role | Ukuran | rem | Weight | Line-height | Letter-spacing | Catatan pemakaian |
|---|---|---|---|---|---|---|
| **Display / Hero** | 72px | 4.5rem | 500 | 1.05 (76px) | -0.03em | Judul hero, maks. 2 baris, center |
| **H1** | 56px | 3.5rem | 500 | 1.1 (62px) | -0.025em | Judul halaman internal |
| **H2** | 48px | 3rem | 500 | 1.1 (53px) | -0.02em | Judul section ("Indonesian tourism") |
| **H3** | 32px | 2rem | 500 | 1.2 (38px) | -0.015em | Judul sub-section, judul step aktif |
| **H4** | 20px | 1.25rem | 500 | 1.3 (26px) | -0.01em | Judul kartu (blog, nama paket, destinasi) |
| **Body Large** | 18px | 1.125rem | 400 | 1.6 (29px) | 0 | Deskripsi section, lead paragraph |
| **Body Regular** | 16px | 1rem | 400 | 1.6 (26px) | 0 | Paragraf default, testimoni |
| **Small** | 14px | 0.875rem | 400 | 1.5 (21px) | 0 | Deskripsi kartu, link footer |
| **Caption** | 12px | 0.75rem | 400 | 1.4 (17px) | 0.01em | Tanggal, metadata, label statistik |
| **Overline / Eyebrow** | 14px | 0.875rem | 400 | 1.4 | 0 | Label di atas heading ("Best location", "Tour packages") warna `--text-muted` |
| **Label / Button** | 14px | 0.875rem | 500 | 1 (14px) | 0.005em | Teks tombol, nav, chip, tab |
| **Stat Number** | 28px | 1.75rem | 500 | 1.1 | -0.02em | Angka statistik ("10M+") |
| **Price** | 24px | 1.5rem | 500 | 1.2 | -0.01em | Harga di kartu paket |

### 3.3 Skala Responsif (Mobile < 640px)

| Role | Mobile | Line-height |
|---|---|---|
| Display / Hero | 40px (2.5rem) | 1.1 |
| H1 | 36px | 1.15 |
| H2 | 32px | 1.15 |
| H3 | 24px | 1.25 |
| H4 | 18px | 1.3 |
| Body Large / Regular | 16px | 1.6 |
| Small / Caption | 14px / 12px | 1.5 / 1.4 |

Tablet (640–1023px): Display 56px, H1 44px, H2 40px, H3 28px.

### 3.4 Aturan Tipografi
- Maks. lebar baris paragraf: **60–70 karakter** (`max-width: 36rem` untuk deskripsi section).
- Heading **tidak** pernah bold (700+); gunakan 500 maksimum agar tetap elegan.
- Deskripsi section kanan (sejajar judul) memakai `Body Regular`, warna `--text-muted`, rata kanan blok maks. 380px.
- Gunakan `text-wrap: balance` pada heading.

---

## 4. Layout, Grid & Spacing Scale

### 4.1 Container & Grid

| Breakpoint | Lebar viewport | Kolom | Gutter | Margin samping | Max-width container |
|---|---|---|---|---|---|
| **Mobile** | < 640px | 4 | 16px | 16px | 100% |
| **Tablet** | 640–1023px | 8 | 24px | 32px | 100% |
| **Desktop** | 1024–1439px | 12 | 24px | 48px | 100% |
| **Wide** | ≥ 1440px | 12 | 24px | auto | **1200px** (konten), frame halaman 1440px |

- Halaman dibungkus **frame** terpusat (maks. 1440px) dengan background `--bg-page`; hero dan footer **full-bleed** di dalam frame, dengan radius bawah/atas 32px.
- Konten section memakai container 1200px, `margin-inline: auto`.

### 4.2 Pola Layout per Section (dari referensi)

| Section | Layout Desktop | Layout Mobile |
|---|---|---|
| **Hero** | Foto full-width, tinggi 640px, radius bawah `32px`, judul center, search bar pill di bawah judul | Tinggi 560px, search bar jadi kartu vertikal |
| **Stat cards** | 4 kartu sejajar, lebar sama (~ 150px + gap 20px), **overlap -48px** ke bawah hero, center | Grid 2×2, overlap -32px |
| **Section header** | Eyebrow + H2 di kiri, deskripsi di kanan (2 kolom, `align-items: end`) | Ditumpuk vertikal |
| **Bento destinasi** | 12 kolom, 2 baris: baris 1 = 7 kol + 5 kol; baris 2 = 5 kol + 7 kol; tinggi baris 1 = 280px, baris 2 = 240px; gap 20px | 1 kolom, tinggi 240px, gap 16px |
| **How it works** | 2 kolom: kiri foto portrait (5 kol, rasio ~ 3:4), kanan daftar step (6 kol) dengan offset 1 kol | Ditumpuk; foto di atas |
| **Paket tur** | 3 kolom sama lebar, rasio kartu 4:5.5 (tinggi ~ 400px), gap 24px, tombol "View more" center di bawah | Carousel horizontal scroll-snap, kartu 80% lebar |
| **Testimoni** | 2 kolom: kiri profil + panah (4 kol), kanan kutipan + ikon kutip besar (8 kol) | Ditumpuk |
| **Blog** | 2 kolom sama lebar, gap 24px | 1 kolom |
| **Footer** | 5 kolom: 3 kolom link (@2 kol) + newsletter (4 kol) | Link 2×2, newsletter di atas |

### 4.3 Skala Spasi (basis 4px)

| Token | px | Penggunaan |
|---|---|---|
| `--space-1` | 4px | Jarak ikon–teks kecil |
| `--space-2` | 8px | Gap antar chip, ikon–label |
| `--space-3` | 12px | Padding badge, gap kecil dalam kartu |
| `--space-4` | 16px | Padding tombol (horizontal kecil), gap kolom mobile |
| `--space-5` | 20px | Gap bento grid, gap stat card |
| `--space-6` | 24px | Padding kartu, gutter grid |
| `--space-8` | 32px | Padding kartu besar, jarak judul–konten |
| `--space-10` | 40px | Jarak antar blok dalam section |
| `--space-12` | 48px | Jarak section header ke konten |
| `--space-16` | 64px | Padding footer vertikal, jarak antar grup besar |
| `--space-20` | 80px | Jarak section (tablet) |
| `--space-24` | 96px | — |
| `--space-30` | 120px | **Jarak antar-section desktop** |

**Aturan spasi:**
- Jarak antar-section: **120px** desktop, **96px** tablet, **72px** mobile.
- Section header → konten: **48px** (desktop), **32px** (mobile).
- Eyebrow → H2: **8px**. H2 → paragraf: **16px**.
- Padding kartu konten (blog, panel): **16px** (area gambar) + **24px** (area teks).
- Overlay teks pada foto: padding **20px** dari tepi kiri/bawah.
- Tombol "View more" berjarak **48px** dari grid di atasnya.

### 4.4 Border Radius

| Token | Nilai | Penggunaan |
|---|---|---|
| `--radius-xs` | 8px | Thumbnail kecil, avatar kotak, tag kecil |
| `--radius-sm` | 12px | Item daftar step, tooltip |
| `--radius-md` | 16px | Stat card, input dropdown dalam panel, bar harga di kartu |
| `--radius-lg` | 24px | **Kartu foto, kartu blog, panel, bento tile** (default kartu) |
| `--radius-xl` | 32px | Hero (sudut bawah), footer (sudut atas), frame besar |
| `--radius-full` | 9999px | **Tombol, search bar, navbar, badge, chip, input, avatar, ikon bulat** |

### 4.5 Shadow / Elevasi

| Token | Nilai | Penggunaan |
|---|---|---|
| `--shadow-none` | `none` | Elemen datar |
| `--shadow-xs` | `0 1px 2px rgba(5,31,32,0.06)` | Input, chip |
| `--shadow-sm` | `0 4px 12px rgba(5,31,32,0.06)` | Item daftar aktif (step "Find your destination"), tombol floating kecil |
| `--shadow-md` | `0 12px 32px rgba(5,31,32,0.08)` | **Stat card, kartu blog, kartu paket** (default kartu) |
| `--shadow-lg` | `0 24px 64px rgba(5,31,32,0.12)` | Panel foto besar ("How it works"), dropdown, modal |
| `--shadow-nav` | `0 8px 24px rgba(5,31,32,0.18)` | Navbar & search bar di atas hero |
| `--shadow-page` | `0 32px 96px rgba(5,31,32,0.10)` | Frame halaman (jika ditampilkan sebagai mockup) |

### 4.6 Elemen Visual Pendukung
- **Overlay gradien foto:** `linear-gradient(180deg, rgba(5,31,32,0) 40%, rgba(5,31,32,0.75) 100%)`.
- **Overlay hero:** `linear-gradient(180deg, rgba(5,31,32,0.35) 0%, rgba(5,31,32,0.10) 50%, rgba(5,31,32,0.45) 100%)`.
- **Glass (di atas foto, tema gelap):** `background: rgba(5,31,32,0.35); backdrop-filter: blur(16px); border: 1px solid rgba(218,241,222,0.18);`
- **Glass (di atas foto, tema terang):** `background: rgba(255,255,255,0.16); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.28);`
- **Rasio gambar:** Hero 16:7; bento 7:4 / 5:4; paket 4:5.5; blog 16:9 (area gambar); foto "How it works" 3:4.
- Gambar selalu `object-fit: cover`, `border-radius` mengikuti kontainer.

---

## 5. Core Component Specifications

### 5.1 Buttons

**Dasar (semua varian):** `display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 9999px; font: 500 14px/1 Inter; transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 120ms ease;`

| Ukuran | Tinggi | Padding horizontal | Font |
|---|---|---|---|
| `sm` | 36px | 16px | 13px |
| `md` (default) | 44px | 24px | 14px |
| `lg` | 52px | 32px | 16px |

**Primary** (CTA utama)

| State | Background | Teks | Lainnya |
|---|---|---|---|
| Default | `#235347` | `#FFFFFF` | — |
| Hover | `#163832` | `#FFFFFF` | `box-shadow: var(--shadow-sm)` |
| Focus | `#235347` | `#FFFFFF` | Focus ring (5.3) |
| Active | `#0B2B26` | `#FFFFFF` | `transform: scale(0.98)` |
| Disabled | `#DAF1DE` | `#5E766C` | `cursor: not-allowed; opacity: 1` tanpa shadow |

**Dark CTA** (setara tombol hitam "View more" / "Login" pada referensi)

| State | Background | Teks |
|---|---|---|
| Default | `#051F20` | `#FFFFFF` |
| Hover | `#0B2B26` | `#FFFFFF` |
| Active | `#163832` | `#FFFFFF` |
| Disabled | `#D5E6D9` | `#5E766C` |

**Secondary** (fill lembut)

| State | Background | Teks |
|---|---|---|
| Default | `#DAF1DE` | `#163832` |
| Hover | `#C6E6CC` | `#0B2B26` |
| Active | `#B3DBBB` | `#0B2B26` |
| Disabled | `#EAF6ED` | `#5E766C` |

**Outline / Ghost**

| State | Background | Teks | Border |
|---|---|---|---|
| Outline default | transparent | `#235347` | `1px solid #8EB69B` |
| Outline hover | `#EAF6ED` | `#163832` | `1px solid #235347` |
| Outline active | `#DAF1DE` | `#0B2B26` | `1px solid #235347` |
| Outline disabled | transparent | `#5E766C` | `1px solid #D5E6D9` |
| Ghost default | transparent | `#235347` | none |
| Ghost hover | `#EAF6ED` | `#163832` | none |
| Ghost active | `#DAF1DE` | `#0B2B26` | none |

**Search button di atas foto (Light)** — tombol putih pill (referensi: "Search"): background `#FFFFFF`, teks `#051F20`, hover `#DAF1DE`, active `#C6E6CC`, tinggi 44px, padding 24px.

**Icon button (panah testimoni, sosial):** 40×40px, `radius-full`; default `transparent` ikon `#5E766C`; aktif/hover ikon `#051F20` dengan background `#EAF6ED`; disabled ikon `#B8CCBF`.

### 5.2 Cards & Containers

#### a) Stat Card
- Background `#FFFFFF`, radius `16px`, shadow `--shadow-md`, padding `20px 24px`, lebar min. 150px, tinggi ~ 64px.
- Angka: Stat Number 28px/500 `#051F20`; label: Caption 12px `#5E766C`, center-aligned.
- Posisi: overlap bawah hero (`margin-top: -48px`), gap 20px.
- Hover: `translateY(-2px)` + `--shadow-lg` (opsional, 200ms).

#### b) Destination Tile (bento)
- Foto `cover`, radius `24px`, overflow hidden, shadow `--shadow-md`.
- Overlay gradien bawah (4.6). Teks overlay pojok kiri-bawah (padding 20px): lokasi Caption 12px `rgba(255,255,255,0.85)`; nama tur H4 16–18px/500 `#FFFFFF`.
- Hover: foto `scale(1.04)` (600ms ease-out), overlay sedikit menguat; fokus: ring 5.3.
- Seluruh tile dapat diklik (`<a>`).

#### c) Tour Package Card
- Rasio 4:5.5, radius `24px`, foto full-bleed, shadow `--shadow-md`.
- **Badge durasi** kiri-atas (12px dari tepi): pill glass gelap `rgba(5,31,32,0.35)` blur 12px, teks `#FFFFFF` Caption 12px/500, padding `4px 10px`.
- **Badge rating** kanan-atas: pill glass sama + ikon bintang `#F5B83D` 12px + angka putih.
- **Bar bawah (glass)** inset 12px dari tepi, radius `16px`, padding `12px 16px`, `rgba(5,31,32,0.40)` + blur 16px: baris atas tanggal Caption 12px `rgba(255,255,255,0.8)`; baris bawah nama paket 16px/500 putih (kiri) dan harga 24px/500 putih (kanan, `$285`).
- Hover: `translateY(-4px)`, `--shadow-lg`, foto `scale(1.03)`.

#### d) Blog Card
- Background `#FFFFFF`, radius `24px`, shadow `--shadow-md`, padding `12px`; gambar radius `16px` rasio 16:9 di dalam padding.
- Konten: padding `20px 12px 12px`; tanggal Caption 12px `#5E766C`; judul H4 20px/500 `#051F20` (maks. 2 baris); ringkasan Small 14px `#5E766C` (maks. 2 baris, ellipsis).
- Hover: judul berubah `#235347`, shadow `--shadow-lg`.

#### e) Step / Feature List Item ("How it works")
- Layout: ikon 40×40px (radius 12px, background `#EAF6ED`, ikon `#235347` 20px) + teks (judul Body 16px/500; deskripsi Caption 12px `#5E766C`, max 2–3 baris).
- Padding `16px 20px`, radius `16px`, gap antar item 8px.
- **Active:** background `#FFFFFF`, `--shadow-sm`, border `1px solid #D5E6D9`. **Inactive:** transparent, tanpa shadow. Hover inactive: background `#EAF6ED`.

#### f) Feature Panel (foto besar + overlay search)
- Foto portrait, radius `24px`, shadow `--shadow-lg`; panel bawah gelap `#051F20` dengan mini-search (Date/Budget/Guest + tombol Search putih) dan teks deskripsi putih Small 14px; padding 20px.

#### g) Testimonial
- Avatar 44px bulat + nama (Body 16px/500) + jabatan (Caption `#5E766C`); kutipan Body Regular 16–18px `#051F20`, `max-width: 560px`, line-height 1.6.
- Ikon kutip besar dekoratif 72px, warna `#DAF1DE` di belakang teks (z-index rendah).
- Kontrol: dua icon button panah (disabled = ikon pucat).

### 5.3 Form Inputs

**Dasar:** tinggi `48px`, radius `9999px` (pill) untuk field tunggal; radius `16px` untuk textarea, font 14–16px, padding horizontal `20px`, ikon leading 18px `#5E766C`, jarak ikon–teks 10px.

| State | Background | Border | Teks / Placeholder | Lainnya |
|---|---|---|---|---|
| Default | `#FFFFFF` | `1px solid #D5E6D9` | teks `#051F20` / placeholder `#5E766C` | `--shadow-xs` |
| Hover | `#FFFFFF` | `1px solid #8EB69B` | sama | — |
| Focus | `#FFFFFF` | `1px solid #235347` | sama | `box-shadow: 0 0 0 4px rgba(142,182,155,0.45)` |
| Filled | `#FFFFFF` | `1px solid #D5E6D9` | `#051F20` | — |
| Error | `#FFFFFF` | `1px solid #B3261E` | teks `#051F20` | ring `0 0 0 4px rgba(179,38,30,0.15)`; pesan error Caption 12px `#B3261E` + ikon, 6px di bawah field |
| Success | `#FFFFFF` | `1px solid #237A4B` | — | ikon centang `#237A4B` |
| Disabled | `#EAF6ED` | `1px solid #D5E6D9` | `#5E766C` | `cursor: not-allowed` |

- **Label:** Label 14px/500 `#051F20`, 8px di atas field. **Helper text:** Caption 12px `#5E766C`.
- **Select / Dropdown:** gaya sama dengan input + chevron kanan 16px; menu: background `#FFFFFF`, radius `16px`, `--shadow-lg`, padding 8px; opsi tinggi 40px, radius 12px, hover `#EAF6ED`, terpilih `#DAF1DE` teks `#163832`.
- **Search bar hero (komposit):** pill tunggal lebar ~ 560px, tinggi 56px, glass (4.6) di atas foto; 3 segmen (Date, Budget, Guest) dipisah divider vertikal `rgba(255,255,255,0.25)` tinggi 24px; teks/ikon putih Small 14px + chevron; tombol "Search" putih pill di ujung kanan (inset 6px). Hover segmen: background `rgba(255,255,255,0.12)`; focus: ring putih 2px.
- **Newsletter (di footer gelap):** pill tinggi 48px, background `#0B2B26`, border `1px solid #235347`, placeholder `#8EB69B`, teks `#DAF1DE`; tombol "Submit" di dalam (inset 4px) background `#235347` teks `#DAF1DE`, hover `#8EB69B` teks `#051F20`. Focus: border `#8EB69B` + ring `rgba(142,182,155,0.35)`.

**Focus ring global (semua elemen interaktif):** `outline: 2px solid #8EB69B; outline-offset: 3px;` — pada permukaan gelap gunakan `#DAF1DE`. Jangan pernah `outline: none` tanpa pengganti.

### 5.4 Navigation

#### Navbar (di atas hero)
- Struktur: **Logo kiri — menu pill tengah — language switch + tombol Login kanan.** Posisi absolute di atas hero, padding atas 24px, container 1200px.
- **Menu pill:** tinggi 44px, glass (4.6 gelap), `radius-full`, `--shadow-nav`, padding `4px`; item teks Label 14px/500, padding `10px 20px`, warna `rgba(255,255,255,0.7)`.
  - Hover: teks `#FFFFFF`. **Active:** teks `#FFFFFF` + background `rgba(255,255,255,0.16)` pill.
- **Language switch:** dua bulatan 28px ("ID | EN"); aktif = putih `#FFFFFF` teks `#051F20`; non-aktif transparan teks putih.
- **Login:** tombol putih pill (lihat 5.1), tinggi 40px.
- **Logo:** wordmark putih (di hero) / `#051F20` (di halaman terang), 20px/600.
- **Sticky variant (setelah scroll > 80px):** menjadi bar `rgba(245,250,246,0.85)` + blur 16px, shadow `--shadow-sm`, teks `#3F5A53`, item aktif background `#DAF1DE` teks `#163832`.
- **Mobile:** hamburger icon button 44px; menu fullscreen drawer background `#051F20`, item 24px/500 `#DAF1DE`, divider `#235347`.

#### Footer
- Background `#051F20`, radius atas `32px` (frame), padding `64px 48px 32px`.
- Kolom: judul kolom Label 14px/500 `#DAF1DE`; link Small 14px `#8EB69B` (default), hover `#DAF1DE` + underline offset 4px; jarak antar link 12px.
- Newsletter (kanan): judul Label `#DAF1DE`, deskripsi Caption `#8EB69B`, input pill (5.3); di bawahnya ikon sosial bulat 32px background `#163832`, ikon `#DAF1DE`, hover background `#235347`.
- Divider atas copyright: `1px solid #163832`; copyright Caption 12px `#8EB69B`, center, padding-top 32px.

### 5.5 Badges, Tags & Elemen Khas

| Komponen | Spesifikasi |
|---|---|
| **Badge durasi/rating (di foto)** | Glass gelap `rgba(5,31,32,0.35)`, blur 12px, teks putih 12px/500, padding `4px 10px`, `radius-full`, tinggi 24px |
| **Badge status (di halaman terang)** | Tinggi 24px, padding `4px 10px`, `radius-full`, 12px/500; varian: Neutral (`#EAF6ED` / `#163832`), Brand (`#DAF1DE` / `#163832`), Success (`#E3F4E8` / `#237A4B`), Warning (`#FFF3DC` / `#8A5A0B`), Error (`#FDE8E6` / `#B3261E`), Info (`#E3F1F6` / `#1F6F8B`) |
| **Chip filter** | Tinggi 36px, padding `0 16px`, `radius-full`; default: bg `#FFFFFF` border `#D5E6D9` teks `#3F5A53`; hover: border `#8EB69B`; selected: bg `#235347` teks `#FFFFFF`; disabled: bg `#EAF6ED` teks `#5E766C` |
| **Rating** | Ikon bintang 12–16px `#F5B83D` + angka 12–14px/500 (di foto = putih; di terang = `#051F20`) |
| **Eyebrow label** | Teks 14px/400 `#5E766C` tepat di atas H2; opsional titik 6px `#8EB69B` di depan |
| **Ikon** | Gaya **outline/line, stroke 1.5px**, ukuran 20/24px, ujung membulat (set: Lucide / Phosphor Light). Ikon dalam wadah 40px radius 12px background `#EAF6ED`, warna ikon `#235347` |
| **Avatar** | Bulat, 40–44px, `object-fit: cover`, border `2px solid #FFFFFF` |
| **Pagination/Carousel dots** | 6px bulat; aktif `#235347` (lebar 20px pill), non-aktif `#D5E6D9` |
| **Quote mark dekoratif** | Glyph kutip besar 72–96px, warna `#DAF1DE`, `aria-hidden="true"` |

### 5.6 Motion
- Durasi: micro 120–180ms, hover 200ms, reveal section 500–600ms. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveal saat scroll: `opacity 0→1`, `translateY(16px→0)`, stagger 80ms antar kartu.
- Wajib menghormati `prefers-reduced-motion: reduce` (nonaktifkan scale/translate, sisakan fade singkat).

---

## 6. Do's & Don'ts (Guardrails)

### ✅ Do's
1. **Gunakan hanya token warna** dari Bagian 2; jangan menulis hex baru di komponen.
2. **Pakai foto lanskap berkualitas tinggi** dengan saturasi natural; kompres ke WebP/AVIF, sertakan `alt` yang deskriptif.
3. **Berikan overlay gradien** pada setiap teks di atas foto dan verifikasi kontras ≥ 4.5:1.
4. **Gunakan radius sesuai peran:** kartu 24px, hero/footer 32px, tombol/input/badge pill.
5. **Jaga white space lega:** jarak antar-section 120px (desktop), padding kartu minimal 16px.
6. **Gunakan heading ringan–medium (400–500)** dengan letter-spacing negatif untuk karakter editorial.
7. **Terapkan satu CTA primer per section** (primary hijau `#235347` atau dark `#051F20`).
8. **Sediakan state lengkap** (default, hover, focus, active, disabled) untuk setiap elemen interaktif, termasuk focus ring yang terlihat.
9. **Gunakan glassmorphism hanya di atas foto** (navbar, search bar, badge, bar harga).
10. **Pertahankan ritme layout bento** (7/5 lalu 5/7) dan tinggi baris yang berbeda agar komposisi terasa dinamis namun rapi.
11. **Gunakan ikon line 1.5px** yang konsisten dan ukuran dari skala 16/20/24px.
12. **Uji dengan `prefers-reduced-motion`, keyboard navigation, dan zoom 200%.**

### ❌ Don'ts
1. **Jangan** memakai hitam murni `#000000` atau abu-abu netral; gunakan `#051F20` dan turunan hijau.
2. **Jangan** memakai `#8EB69B` sebagai warna teks di atas putih/mint (gagal AA).
3. **Jangan** menambah warna aksen baru (ungu, oranye, biru terang) di luar token semantic.
4. **Jangan** memakai border tebal (>1px), garis dekoratif berlebihan, atau shadow keras (`0 2px 0`, hitam pekat).
5. **Jangan** menggunakan font bold (700+) pada heading atau teks all-caps panjang.
6. **Jangan** mencampur sudut tajam (0–4px) dengan kartu membulat; tidak ada kartu bersudut persegi.
7. **Jangan** menerapkan glass/blur di atas latar solid terang (tidak terbaca dan tidak sesuai estetika).
8. **Jangan** menumpuk lebih dari 2 baris pada judul kartu atau lebih dari 3 baris pada deskripsi.
9. **Jangan** menaruh teks langsung di atas foto tanpa overlay atau menggunakan foto stok yang berisi teks/watermark.
10. **Jangan** memakai gradien warna warni, animasi berlebihan (bounce, spin), atau ikon bergaya filled/3D yang tidak konsisten.
11. **Jangan** membuat layout padat; hindari >4 kolom pada desktop dan >1 kolom pada mobile (kecuali grid 2×2 stat dan carousel).
12. **Jangan** menghapus `outline` fokus tanpa pengganti, dan jangan menggunakan warna saja untuk menyampaikan status (sertakan ikon/teks).

---

## Lampiran: Tailwind Config Ringkas

```js
// tailwind.config.js (extend)
module.exports = {
  theme: {
    extend: {
      colors: {
        forest: { 950: '#051F20', 900: '#0B2B26', 800: '#163832', 700: '#235347' },
        sage: { 400: '#8EB69B' },
        mint: { 100: '#DAF1DE', 200: '#C6E6CC', 300: '#B3DBBB' },
        surface: { page: '#F5FAF6', card: '#FFFFFF', tint: '#EAF6ED' },
        line: { DEFAULT: '#D5E6D9' },
        ink: { DEFAULT: '#051F20', secondary: '#3F5A53', muted: '#5E766C' },
        success: { DEFAULT: '#237A4B', bg: '#E3F4E8' },
        warning: { DEFAULT: '#8A5A0B', bg: '#FFF3DC', fill: '#E0A030' },
        error:   { DEFAULT: '#B3261E', bg: '#FDE8E6' },
        info:    { DEFAULT: '#1F6F8B', bg: '#E3F1F6' },
      },
      borderRadius: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
      boxShadow: {
        xs: '0 1px 2px rgba(5,31,32,0.06)',
        sm: '0 4px 12px rgba(5,31,32,0.06)',
        md: '0 12px 32px rgba(5,31,32,0.08)',
        lg: '0 24px 64px rgba(5,31,32,0.12)',
        nav: '0 8px 24px rgba(5,31,32,0.18)',
      },
      fontFamily: { sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'] },
      maxWidth: { container: '1200px' },
    },
  },
};
```
