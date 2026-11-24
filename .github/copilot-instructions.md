# Project Rules & Design System Guardrails

- **Tech Stack**: Vue 3 (`<script setup>`), Vue Router, Tailwind CSS, Lucide Icons (`lucide-vue-next`).
- **Source of Truth**: Selalu ikuti spesifikasi warna, tipografi, radius, shadow, dan komponen di `#file:docs/design.md`.
- **Strict Color Rules**: DILARANG menggunakan `#000000` atau abu-abu netral (`gray-*`, `slate-*`). Gunakan palet Forest (`#051F20` s/d `#235347`), Sage (`#8EB69B`), Mint (`#DAF1DE`), dan Surface (`#F5FAF6`, `#FFFFFF`, `#EAF6ED`). Jangan gunakan `#8EB69B` untuk teks kecil di atas latar putih/terang (gagal WCAG AA).
- **Typography Rules**: Gunakan font `Inter`. Heading maksimal font-weight `500` (`font-medium`), JANGAN PERNAH `font-bold` (`700+`) pada heading. Terapkan letter-spacing negatif sesuai skala di `design.md`.
- **Shape & Glassmorphism**: Kartu/kontainer menggunakan radius `24px` (`rounded-lg`), Hero/Footer `32px` (`rounded-xl`), dan semua tombol/input/badge/nav menggunakan `9999px` (`rounded-full`). Glassmorphism (`backdrop-blur-md`) HANYA boleh dipakai di atas foto/gambar.
- **Responsive Mobile-First**: Setiap halaman wajib adaptif untuk Mobile (`<640px`), Tablet (`640-1023px`), dan Desktop (`>=1024px`, max-width container `1200px`).
