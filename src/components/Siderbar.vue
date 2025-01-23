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

      <div class="px-4 mb-3 bg-body-tertiary sidebar-section">
        <ol class="list-unstyled py-3">
          <a href="https://x.com/green_pook" class="icon-link pe-3">
            <div class="icon-circle">
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="20" fill="#1991db" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z"
                  fill="white"
                />
              </svg>
            </div>
          </a>
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

.icon-link {
  display: inline-block;
  text-decoration: none;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background-color: #1991db; /* Twitter 品牌色 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.icon-circle:hover {
  background-color: #1991db; /* 悬停时颜色变深 */
}

.icon-circle svg {
  width: 48px;
  height: 48px;
  fill: #1991db; /* 图标颜色 */
}
</style>
