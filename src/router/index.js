import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NewStory from '@/views/NewStory.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ArticleView from '@/views/ArticleView.vue'
import UserHomeView from '@/views/UserHomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hot',
      name: '热门文章',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HotView.vue')
    },
    {
      path: '/tech',
      name: '教程',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TechView.vue')
    },
    {
      path: '/finance',
      name: '风化物投资',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FinanceView.vue')
    },
    {
      path: '/creator',
      name: '创作者中心',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreatorView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/post/:url',
      name: 'post',
      component: ArticleView,
      props: true, // 传递路由参数
    },
    {
      path: '/new-story',
      name: 'write',
      component: NewStory
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/u/:username', // 动态路由，使用用户名作为参数
      name: '用户首页',
      component: UserHomeView,
      beforeEnter: (to, from, next) => {
        // 检查 username 参数是否存在
        if (!to.params.username) {
          next({ name: '404' })
        } else {
          next()
        }
      },
    },
    {
      path: '/404', // 动态路由，使用用户名作为参数
      name: '404',
      component: NotFoundView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 特殊路由处理
  if (to.path === '/u/' || to.path === '/u') {
    next('/404')
    return
  }

  next()
})
export default router
