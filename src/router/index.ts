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

type CustomRouteType = {
  meta?: {
    middleware: string[];
  }
};

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

router.beforeEach(async ($to, $from, $next) => {
  const { isLogged } = useAuthStore(Store);
  if (
    $to.meta &&
    $to.meta.middleware &&
    Array.isArray($to.meta.middleware) &&
    $to.meta.middleware.includes('auth') &&
    !isLogged
  ) {
    // $next({
    //   name: constants.routes.login.name,
    //   query: { ...$to.query, redirectPath: $to.path }
    // });
    $next({ name: 'Signin' });
    return;
  }

  $next()
})
