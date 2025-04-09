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

router.beforeEach((to, from, next) => {
  console.log('from :>> ', from);
  console.log('from.name :>> ', from.name);
  console.log('to :>> ', to);
  console.log('to.query :>> ', to.query);
  if (to.query.code) {
    if (!from.name) {
      const referrer = document.referrer;
      if (referrer) {
        console.log('External referrer:', referrer);
        //   await authStore.parseCodeToAccessToken({ platform, params })
      }
    }
  }
  next()
})
