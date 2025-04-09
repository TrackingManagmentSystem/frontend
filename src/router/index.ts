import { Store } from '@/store'
import { useAuthStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes,
})

export default router

declare module 'vue-router' {
  interface RouteMeta {
    // requiresAuth?: boolean
    middleware?: string[];
  }
}

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | Tracking Managment System`
  next()
})

router.beforeEach(async ($to, $from, $next) => {
  const { isLogged } = useAuthStore(Store);
  if (
    $to.meta &&
    $to.meta.middleware &&
    $to.meta.middleware?.includes('auth') &&
    !isLogged
  ) {
    $next({ name: 'Signin' });
    return;
  }

  $next()
})

router.beforeEach(async (to, from, next) => {
  if (to.query.code) {
    const authStore = useAuthStore(Store);
    const platform = (to.query.code as string).startsWith('TG') ? 'mercado-livre' : 'shopee';
    await authStore.parseCodeToAccessToken({ platform, params: to.query });
  }
  next()
})
