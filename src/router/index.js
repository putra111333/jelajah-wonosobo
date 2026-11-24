import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExploreView from '../views/ExploreView.vue'
import ExploreDetailView from '../views/ExploreDetailView.vue'
import DetailWisataView from '../views/DetailWisataView.vue'
import DetailKulinerView from '../views/DetailKulinerView.vue'
import DetailKesenianView from '../views/DetailKesenianView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import CreditsView from '../views/CreditsView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        overPhoto: true,
      },
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      meta: {
        title: 'Eksplorasi',
        description: 'Temukan destinasi dan pengalaman pilihan di Wonosobo.',
      },
    },
    {
      path: '/explore/wisata/:slug',
      name: 'detail-wisata',
      component: DetailWisataView,
      meta: {
        title: 'Detail Wisata',
      },
    },
    {
      path: '/explore/kuliner/:slug',
      name: 'detail-kuliner',
      component: DetailKulinerView,
      meta: {
        title: 'Detail Kuliner',
      },
    },
    {
      path: '/explore/kesenian/:slug',
      name: 'detail-kesenian',
      component: DetailKesenianView,
      meta: {
        title: 'Detail Kesenian',
      },
    },
    {
      path: '/explore/:category/:itemId',
      name: 'explore-detail',
      component: ExploreDetailView,
      meta: {
        title: 'Detail Eksplorasi',
      },
    },
    {
      path: '/plan',
      name: 'plan',
      component: ItineraryView,
      meta: {
        title: 'Rencana Jelajah',
        description: 'Susun perjalanan yang sesuai dengan waktu dan minat Anda.',
      },
    },
    {
      path: '/credits',
      name: 'credits',
      component: CreditsView,
      meta: {
        title: 'Referensi & Kredit',
        description: 'Referensi dan kredit aset untuk konten Jelajah Wonosobo.',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: ComingSoonView,
      meta: {
        title: 'Login',
        description: 'Fitur akun untuk menyimpan rencana perjalanan sedang disiapkan.',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
