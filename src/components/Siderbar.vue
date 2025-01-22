<script setup>
defineOptions({
  name: 'AppSiderbar'
})

import { ref, onMounted } from 'vue'
import axios from 'axios'

import config from '@/config' // 引入配置文件

// 定义一个响应式数据变量来存储文章列表
const recent_articles = ref([])
// 定义一个方法来获取数据
const fetchArticles = async () => {
  try {
    // 使用 axios 请求后端 API 获取文章数据
    const response = await axios.get(`${config.API_BASE_URL}/recent`)
    if (response.data.code === 200) {
      // 将返回的文章数据赋值给 articles
      recent_articles.value = response.data.data
      console.log('Fetched articles:', recent_articles.value)
    } else {
      console.error('Failed to fetch articles:', response.data.msg)
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

// 使用 onMounted 钩子来在组件挂载时获取数据
onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <div class="col-md-4">
    <div class="position-sticky" style="top: 2rem">
      <div class="p-4 mb-3 bg-body-tertiary sidebar-section">
        <h4 class="">About</h4>
        <p class="mb-0">一个自由表达、讨论和分享观点的场所。</p>
      </div>

      <div class="p-4 mb-3 bg-body-tertiary sidebar-section">
        <ol class="list-unstyled mb-0">
          <button type="button" class="btn btn-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-twitter"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"
              ></path>
            </svg>
          </button>
        </ol>
      </div>

      <div class="p-4 mb-3 bg-body-tertiary sidebar-section" v-if="recent_articles">
        <h4 class="mb-3">最近更新</h4>
        <ul class="list-unstyled">
          <li>
            <router-link
              v-for="article in recent_articles"
              :key="article.url"
              class="text-decoration-none"
              :to="`/post/${article.url}`"
            >
              <p class="mb-2 text-primary fs-6">
                {{ article.title }}
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-section {
  background-color: rgb(250, 250, 250) !important;
  border-radius: 15px !important;
}

.archive-list {
  color: black;
  text-decoration: none;
  font-family: monospace;
  font-variant-numeric: tabular-nums;
}
</style>
