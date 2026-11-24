export const homeContent = {
  eyebrow: 'Jawa Tengah, Indonesia',
  title: 'Mengenal Wonosobo: Negeri di Atas Awan',
  description:
    'Jelajahi Dieng, sambut sunrise Sikunir, cicipi kuliner khas, dan kenali budaya lokal Wonosobo.',
  stats: [
    { value: '4', label: 'Destinasi pilihan' },
    { value: '3', label: 'Kuliner lokal' },
    { value: '3', label: 'Kesenian daerah' },
    { value: '3', label: 'Paket jelajah' },
  ],
}

function createGallery(itemName, visual, captions) {
  return captions.map((caption, index) => ({
    id: `${visual}-${index + 1}`,
    image: '',
    imageAlt: `${caption} - ${itemName}`,
    caption,
    visual,
  }))
}

export const featuredDestinations = [
  {
    id: 'dieng-plateau',
    name: 'Dataran Tinggi Dieng',
    category: 'Wisata Alam',
    rank: 1,
    location: 'Kejajar',
    description:
      'Jelajahi lanskap pegunungan, candi, dan udara sejuk di dataran tinggi.',
    history:
      'Dataran Tinggi Dieng dikenal sebagai kawasan vulkanik pegunungan yang menyimpan telaga, kawah, dan kompleks candi Hindu kuno. Lanskap serta kehidupan masyarakatnya menjadikan Dieng salah satu tujuan utama di Wonosobo.',
    priceLabel: 'Harga tiket',
    price: 'Mulai Rp 15.000/orang',
    openingHours: 'Setiap hari, 07.00–17.00 WIB',
    address: 'Kawasan Dataran Tinggi Dieng, Kecamatan Kejajar, Wonosobo.',
    detailsNote:
      'Jam operasional dan harga dapat berubah; konfirmasi kembali sebelum berkunjung.',
    image: '',
    imageAlt: 'Ilustrasi lanskap Dataran Tinggi Dieng',
    visual: 'mountain',
    aspect: 'wide',
    gallery: createGallery('Dataran Tinggi Dieng', 'mountain', [
      'Lanskap dataran tinggi',
      'Kompleks candi Dieng',
      'Kawah dan telaga Dieng',
    ]),
  },
  {
    id: 'telaga-warna',
    name: 'Telaga Warna',
    category: 'Wisata Alam',
    rank: 4,
    location: 'Dieng',
    description:
      'Singgahi telaga vulkanik yang menjadi salah satu ikon kawasan Dieng.',
    history:
      'Telaga Warna terbentuk di kawasan vulkanik Dieng. Kandungan mineral dan pantulan cahaya membuat warna permukaan airnya tampak berubah, sementara perbukitan di sekelilingnya menjadi jalur pandang untuk menikmati panorama.',
    priceLabel: 'Harga tiket',
    price: 'Sekitar Rp 22.000/orang',
    openingHours: 'Setiap hari, 07.00–17.00 WIB',
    address: 'Dieng, Kecamatan Kejajar, Kabupaten Wonosobo, Jawa Tengah.',
    detailsNote:
      'Harga dan jam kunjungan merupakan perkiraan; periksa informasi pengelola sebelum berangkat.',
    image: '',
    imageAlt: 'Ilustrasi Telaga Warna di Dieng',
    visual: 'lake',
    aspect: 'compact',
    gallery: createGallery('Telaga Warna', 'lake', [
      'Panorama Telaga Warna',
      'Jalur pandang perbukitan',
      'Lanskap kawasan Dieng',
    ]),
  },
  {
    id: 'bukit-sikunir',
    name: 'Bukit Sikunir',
    category: 'Wisata Alam',
    rank: 2,
    location: 'Desa Sembungan',
    description:
      'Mulai pagi dengan perjalanan menuju salah satu titik pandang sunrise.',
    history:
      'Bukit Sikunir berada di dekat Desa Sembungan, salah satu desa tertinggi di Pulau Jawa. Pendakian singkat menuju puncaknya dikenal sebagai cara menikmati matahari terbit dan bentang pegunungan Dieng.',
    priceLabel: 'Harga tiket',
    price: 'Sekitar Rp 15.000/orang',
    openingHours: 'Setiap hari, mulai sekitar 04.00 WIB',
    address: 'Desa Sembungan, Kecamatan Kejajar, Kabupaten Wonosobo.',
    detailsNote:
      'Waktu terbaik bergantung pada cuaca; siapkan pakaian hangat dan konfirmasi tarif sebelum berkunjung.',
    image: '',
    imageAlt: 'Ilustrasi matahari terbit di Bukit Sikunir',
    visual: 'sunrise',
    aspect: 'compact',
    gallery: createGallery('Bukit Sikunir', 'sunrise', [
      'Matahari terbit dari Sikunir',
      'Jalur menuju puncak',
      'Pegunungan Dieng dari Sembungan',
    ]),
  },
  {
    id: 'kawah-sikidang',
    name: 'Kawah Sikidang',
    category: 'Wisata Alam',
    rank: 3,
    location: 'Dieng',
    description:
      'Kenali bentang alam vulkanik yang mudah dijangkau di dataran Dieng.',
    history:
      'Kawah Sikidang merupakan kawasan geotermal aktif di dataran Dieng. Uap dan aktivitas kawah membentuk lanskap vulkanik yang khas; tetap berada di jalur kunjungan dan ikuti petunjuk keselamatan setempat.',
    priceLabel: 'Harga tiket',
    price: 'Mulai Rp 20.000/orang',
    openingHours: 'Setiap hari, 07.00–17.00 WIB',
    address: 'Kawasan Dieng, akses melalui Kecamatan Kejajar, Wonosobo.',
    detailsNote:
      'Tarif dan akses dapat berubah mengikuti kondisi kawah; patuhi arahan petugas.',
    image: '',
    imageAlt: 'Ilustrasi kawasan Kawah Sikidang',
    visual: 'volcanic',
    aspect: 'wide',
    gallery: createGallery('Kawah Sikidang', 'volcanic', [
      'Bentang Kawah Sikidang',
      'Jalur kunjungan kawah',
      'Lanskap geotermal Dieng',
    ]),
  },
]

export const culinaryHighlights = [
  {
    id: 'mie-ongklok',
    name: 'Mie Ongklok Longkrang',
    rank: 1,
    location: 'Wonosobo',
    description:
      'Mi berkuah kental dengan kol, daun kucai, dan taburan bawang goreng.',
    history:
      'Mie ongklok adalah hidangan khas Wonosobo. Mi dan sayur dicelupkan menggunakan ongklok, lalu disajikan dengan kuah kental berbumbu yang sering disantap bersama sate sapi.',
    priceLabel: 'Harga rata-rata',
    price: 'Sekitar Rp 15.000/porsi',
    openingHours: 'Setiap hari, 09.00–17.00 WIB',
    address: 'Jl. Pasukan Ronggolawe No. 14, Kabupaten Wonosobo.',
    detailsNote:
      'Harga dan jam layanan merupakan perkiraan; cek langsung ke tempat makan sebelum berkunjung.',
    image: '',
    imageAlt: 'Ilustrasi semangkuk mie ongklok',
    visual: 'culinary',
    category: 'Kuliner khas',
    gallery: createGallery('Mie Ongklok Longkrang', 'culinary', [
      'Semangkuk mie ongklok',
      'Kuah kental dan sayuran',
      'Suasana warung lokal',
    ]),
  },
  {
    id: 'carica-dieng',
    name: 'Manisan Carica Dieng',
    rank: 2,
    location: 'Dataran Tinggi Dieng',
    description:
      'Buah carica pegunungan yang diolah menjadi manisan segar.',
    history:
      'Carica tumbuh di lingkungan sejuk dataran tinggi Dieng. Buahnya diolah menjadi manisan dengan sirup ringan dan dikenal sebagai salah satu buah tangan khas kawasan pegunungan Wonosobo.',
    priceLabel: 'Harga rata-rata',
    price: 'Sekitar Rp 20.000/kemasan',
    openingHours: 'Umumnya setiap hari, 08.00–17.00 WIB',
    address: 'Kawasan Dieng, Kecamatan Kejajar, Kabupaten Wonosobo.',
    detailsNote:
      'Harga dan jam toko berbeda-beda; periksa informasi penjual setempat.',
    image: '',
    imageAlt: 'Ilustrasi manisan carica',
    visual: 'carica',
    category: 'Oleh-oleh',
    gallery: createGallery('Manisan Carica Dieng', 'carica', [
      'Buah carica pegunungan',
      'Manisan carica dalam sirup',
      'Produk oleh-oleh Dieng',
    ]),
  },
  {
    id: 'tempe-kemul',
    name: 'Tempe Kemul',
    rank: 3,
    location: 'Wonosobo',
    description:
      'Tempe berbalut adonan berbumbu yang renyah, cocok dinikmati hangat.',
    history:
      'Tempe kemul merupakan camilan khas Wonosobo. Potongan tempe dibalut adonan tepung berbumbu dan digoreng hingga renyah, lalu biasa disantap hangat bersama cabai atau minuman lokal.',
    priceLabel: 'Harga rata-rata',
    price: 'Sekitar Rp 5.000/porsi',
    openingHours: 'Umumnya setiap hari, 07.00–18.00 WIB',
    address: 'Sentra kuliner dan pasar lokal di Kabupaten Wonosobo.',
    detailsNote:
      'Harga dan jam layanan berbeda-beda menurut penjual.',
    image: '',
    imageAlt: 'Ilustrasi tempe kemul',
    visual: 'culinary',
    category: 'Camilan lokal',
    gallery: createGallery('Tempe Kemul', 'culinary', [
      'Tempe kemul hangat',
      'Adonan berbumbu',
      'Camilan khas Wonosobo',
    ]),
  },
]

export const artsHighlights = [
  {
    id: 'tari-lengger',
    name: 'Tari Topeng Lengger',
    rank: 1,
    location: 'Kabupaten Wonosobo',
    description:
      'Seni pertunjukan tradisional Wonosobo yang memadukan tari dan musik.',
    history:
      'Tari Lengger tumbuh sebagai seni pertunjukan masyarakat Wonosobo dan wilayah Banyumasan. Gerak tari, topeng, serta iringan musik tradisional menjadi bagian dari cerita dan perayaan budaya setempat.',
    priceLabel: 'Tiket masuk',
    price: 'Mengikuti agenda pertunjukan',
    openingHours: 'Sesuai jadwal pentas dan agenda budaya',
    address: 'Lokasi pertunjukan mengikuti agenda di Kabupaten Wonosobo.',
    detailsNote:
      'Jadwal, lokasi, dan tiket dapat berbeda untuk setiap pertunjukan.',
    image: '',
    imageAlt: 'Ilustrasi pertunjukan Tari Topeng Lengger',
    visual: 'culture',
    category: 'Seni pertunjukan',
    gallery: createGallery('Tari Topeng Lengger', 'culture', [
      'Pertunjukan Tari Lengger',
      'Kostum dan topeng penari',
      'Iringan musik tradisional',
    ]),
  },
  {
    id: 'bundengan',
    name: 'Bundengan Wonosobo',
    rank: 2,
    location: 'Kabupaten Wonosobo',
    description:
      'Musik tradisional dengan alat khas yang berawal dari tudung bambu.',
    history:
      'Bundengan berawal dari tudung bambu yang digunakan sebagai pelindung. Bagian rangkanya dikembangkan menjadi alat musik yang menghasilkan bunyi perkusi dan senar, lalu dikenal sebagai kesenian khas Wonosobo.',
    priceLabel: 'Tiket masuk',
    price: 'Mengikuti agenda pertunjukan',
    openingHours: 'Sesuai jadwal pentas dan agenda budaya',
    address: 'Lokasi pertunjukan mengikuti agenda di Kabupaten Wonosobo.',
    detailsNote:
      'Jadwal dan tiket bergantung pada acara atau komunitas penyelenggara.',
    image: '',
    imageAlt: 'Ilustrasi alat musik bundengan',
    visual: 'culture',
    category: 'Musik tradisional',
    gallery: createGallery('Bundengan Wonosobo', 'culture', [
      'Alat musik Bundengan',
      'Pementasan Bundengan',
      'Detail tudung bambu',
    ]),
  },
  {
    id: 'ruwatan-rambut-gimbal',
    name: 'Ruwatan Rambut Gimbal',
    rank: 3,
    location: 'Dataran Tinggi Dieng',
    description:
      'Tradisi masyarakat Dieng yang menjadi bagian dari perayaan budaya.',
    history:
      'Ruwatan rambut gimbal merupakan tradisi masyarakat Dieng yang dilaksanakan sesuai permintaan anak dan keluarga. Prosesi ini menjadi bagian penting dari warisan budaya serta perayaan masyarakat setempat.',
    priceLabel: 'Tiket masuk',
    price: 'Mengikuti agenda acara',
    openingHours: 'Pada waktu dan rangkaian acara tertentu',
    address: 'Kawasan Dieng, Kecamatan Kejajar, Kabupaten Wonosobo.',
    detailsNote:
      'Prosesi tidak berlangsung setiap hari; cek agenda resmi sebelum merencanakan kunjungan.',
    image: '',
    imageAlt: 'Ilustrasi tradisi ruwatan rambut gimbal',
    visual: 'culture',
    category: 'Tradisi Dieng',
    gallery: createGallery('Ruwatan Rambut Gimbal', 'culture', [
      'Prosesi ruwatan Dieng',
      'Perayaan budaya masyarakat',
      'Tradisi di dataran tinggi',
    ]),
  },
]

export const journeySteps = [
  {
    id: 'choose',
    title: 'Pilih tujuan',
    description:
      'Mulai dari wisata alam Dieng, kuliner khas, atau kesenian Wonosobo.',
    icon: 'compass',
    detail: 'Racik perjalanan sesuai minat dan waktu yang tersedia.',
  },
  {
    id: 'plan',
    title: 'Susun rencana',
    description:
      'Atur tempat singgah, urutan perjalanan, dan waktu terbaik untuk berkunjung.',
    icon: 'route',
    detail: 'Gabungkan beberapa titik di Dieng dalam satu rute yang nyaman.',
  },
  {
    id: 'enjoy',
    title: 'Nikmati perjalanan',
    description:
      'Jelajahi alam, cicipi hidangan lokal, dan kenali tradisi setempat.',
    icon: 'sparkles',
    detail: 'Sisakan waktu untuk menikmati suasana dan cerita warga lokal.',
  },
]

export const tourPackages = [
  {
    id: 'dieng-sehari',
    name: 'Sehari di Dieng',
    duration: '1 Hari',
    rating: '4.9',
    date: 'Mulai dari',
    price: 'Rp 285 rb',
    image: '',
    imageAlt: 'Ilustrasi perjalanan sehari di Dieng',
    visual: 'mountain',
  },
  {
    id: 'sunrise-sikunir',
    name: 'Sunrise Sikunir',
    duration: '2 Hari',
    rating: '4.8',
    date: 'Mulai dari',
    price: 'Rp 450 rb',
    image: '',
    imageAlt: 'Ilustrasi perjalanan sunrise di Sikunir',
    visual: 'sunrise',
  },
  {
    id: 'rasa-budaya',
    name: 'Rasa & Budaya',
    duration: '1 Hari',
    rating: '4.9',
    date: 'Mulai dari',
    price: 'Rp 325 rb',
    image: '',
    imageAlt: 'Ilustrasi wisata kuliner dan budaya Wonosobo',
    visual: 'culture',
  },
]

export const testimonials = [
  {
    id: 'sari',
    quote:
      'Pagi di Dieng terasa istimewa. Panduan rutenya membantu kami menikmati banyak tempat tanpa terburu-buru.',
    name: 'Sari Puspita',
    role: 'Wisatawan, Semarang',
    initials: 'SP',
  },
  {
    id: 'adi',
    quote:
      'Saya jadi tahu cerita di balik Mie Ongklok dan kesenian Lengger. Wonosobo punya banyak hal untuk dikenang.',
    name: 'Adi Pratama',
    role: 'Wisatawan, Yogyakarta',
    initials: 'AP',
  },
  {
    id: 'maya',
    quote:
      'Rencana perjalanan ke Sikunir jadi lebih mudah. Pemandangan dan suasana desanya benar-benar berkesan.',
    name: 'Maya Larasati',
    role: 'Wisatawan, Jakarta',
    initials: 'ML',
  },
]

export const searchOptions = {
  budgets: [
    { value: '', label: 'Semua anggaran' },
    { value: 'under-500', label: 'Di bawah Rp 500 rb' },
    { value: '500-1000', label: 'Rp 500 rb – 1 jt' },
    { value: 'over-1000', label: 'Di atas Rp 1 jt' },
  ],
  guests: [
    { value: '1', label: '1 orang' },
    { value: '2', label: '2 orang' },
    { value: '3', label: '3 orang' },
    { value: '4+', label: '4+ orang' },
  ],
}
