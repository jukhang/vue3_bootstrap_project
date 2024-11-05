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
      path: '/u/:username', // 动态路由，使用用户名作为参数
      name: '用户首页',
      component: UserHomeView,
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
    // {
    //   path: '/404', // 动态路由，使用用户名作为参数
    //   name: '404',
    //   component: NotFoundView,
    // },
    // {
    //   path: '/:pathMatch(.*)*', // 通配符路径捕获所有未匹配路由
    //   redirect: '/404'
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
