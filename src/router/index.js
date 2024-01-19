import { createRouter, createWebHistory } from 'vue-router'
//import AboutView from '@/views/AboutView.vue'
import useAuthStore from '@/stores/authStore.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //1. use exact-active-class="non-existing-class" to disable some unwanted highlighting,
  //e.g. the home MUSIC logo text in the AppHeader
  linkExactActiveClass: 'text-yellow-500',
  routes: [
    {
      path: '/', //2. this is a path route e.g. to="/"
      name: 'home', //3. this is a named route e.g. :to="{ name: 'home', path: '/' }" where path is optional, and dynamic for your flexibility
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // 4. route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/manage',
      //alias: 'manage-old', //5.b alias the old route to a new route,
      name: 'manage',
      beforeEnter: (to, from, next) => {
        //7.b specific routing guard, but harder to access stores and states
        console.log('specific routing guard', to, from)
        next() //must call next() to continue
      },
      meta: {
        requiresAuth: true //7.e meta data for specific routes
      },
      component: () => import('../views/ManageView.vue')
    },
    {
      path: '/manage-old', //5.a redirect the old route to a new route, better for SEO
      redirect: { name: 'manage' }
    },
    {
      name: 'song',
      path: '/song/:id',
      component: () => import('../views/SongView.vue')
    },
    {
      //6. catch all route, must be the last one
      path: '/:catchAll(.*)*',
      //6.a to redirect to home page
      redirect: { name: 'home' }
      //6.b to show a 404 not found page
      //name: 'not-found',
      //component: () => import('../views/NotFoundView.vue')
    }
  ]
})

//7.a Global routing guard, for performaning checks on EVERY route
router.beforeEach((to, from, next) => {
  console.log('global routing guard', to, from)
  to.meta.requiresAuth && !useAuthStore().isAuth ? next({ name: 'home' }) : next()
})

export default router
