import { createRouter, createWebHistory } from 'vue-router'
import WeeklyPlanPage from '../pages/WeeklyPlanPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weekly-plan',
      component: WeeklyPlanPage,
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: () => import('../pages/FavoritesPage.vue'),
    },
  ],
})

export default router
