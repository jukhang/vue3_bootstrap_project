<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import mk from 'markdown-it-katex'

import config from '@/config' // 引入配置文件
import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import AppComment from '../components/Comment.vue'
import ScrollSticky from '../components/ScrollSticky.vue'

// 初始化 editorjs-html
const route = useRoute() // 获取路由对象
const uuid = ref('') // 获取 UUID 参数
const article = ref(null)
const md_html = ref(null)

// 定义五种颜色
const colors = ['bg-primary', 'bg-info', 'bg-success', 'bg-danger', 'bg-warning']

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
md.use(mk, {
  throwOnError: false
})

const fetchArticle = async () => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/post/${uuid.value}`) // 发送请求到后端获取文章
    if (!response.ok) {
      throw new Error('获取文章失败')
    }
    const data = await response.json()
    article.value = data.data
  } catch (err) {
    console.log(err)
  } finally {
    md_html.value = md.render(article.value.content) // 将 Markdown 内容渲染为 HTML
  }
}

onMounted(() => {
  // 检查路由参数
  if (route?.params?.url) {
    uuid.value = route.params.url // 获取 url
  } else {
    uuid.value = null // 如果路由参数不存在，设置为 null
  }
  fetchArticle() // 组件挂载时获取文章数据
})
</script>

<template>
  <div class="container">
    <AppHeader />

    <div class="row justify-content-center">
      <div class="col-md-8" v-if="article">
        <!-- 封面图片 -->
        <div class="text-center mb-4">
          <img
            src="/article_cover.jpeg"
            alt="封面图片"
            class="img-fluid custom_rounded article-cover-image"
          />
        </div>

        <!-- 文章标题 -->
        <h2 class="display-8 fw-bold">
          {{ article.title }}
        </h2>

        <!-- 作者信息 -->
        <div class="d-flex align-items-center py-2">
          <img
            :src="`${article.authorAvatar}`"
            alt="作者头像"
            width="50"
            height="50"
            class="rounded-circle me-3"
          />
          <div>
            <h6 class="mb-0">作者：{{ article.author }}</h6>
            <small class="text-muted">Publish in {{ article.publishedDate }} · 5分钟阅读</small>
          </div>
        </div>

        <ScrollSticky>
          <!-- 分享和互动 -->
          <div
            class="d-flex justify-content-between align-items-center border-top border-bottom py-3"
          >
            <!-- 标签 -->
            <div>
              <span
                v-for="(tag, index) in article.tags"
                :key="index"
                :class="colors[index]"
                class="badge me-1"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 社交分享按钮 -->
            <div class="d-flex align-items-center">
              <!-- 点赞 -->
              <a href="#" class="d-flex align-items-center me-3 text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 1024 1024"
                  class="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M192 938.7H87.9c-48.4 0-87.9-39.5-87.9-88V386.6c0-48.5 39.5-87.9 87.9-87.9h125.4c11.6 0 22.7 4.7 30.8 13.1 8 8.4 12.3 19.6 11.9 31.2l-21.3 554.7c-0.9 22.8-19.8 41-42.7 41zM87.9 384c-1.4 0-2.6 1.2-2.6 2.6v464.1c0 1.4 1.2 2.6 2.6 2.6h63L169 384H87.9z"
                    fill="#5F6379"
                  />
                  <path
                    d="M810.4 938.7H275.7l24.6-640H418l72-201.8C510.7 38.9 566 0 627.5 0c42.4 0 82.6 18.4 110.3 50.4S778 124.8 772 166.7l-18.9 132h142.6c70.7 0 128.2 57.5 128.2 128.2l-1 9.3-84.4 379.4c-2.6 68.3-59.1 123.1-128.1 123.1z m-446.1-85.4h446.1c23.6 0 42.9-19.2 42.9-42.9l1-9.3L938.5 423c-2-21.8-20.4-39-42.7-39h-241l32.8-229.4c2.5-17.7-2.5-34.8-14.2-48.3s-28-20.9-45.9-20.9c-25.6 0-48.5 16.2-57.1 40.3L478.1 384h-95.7l-18.1 469.3z"
                    fill="#ff7070"
                  />
                </svg>
              </a>
              <!-- 评论 -->
              <a href="#" class="d-flex align-items-center me-3 text-decoration-none">
                <svg
                  fill="#000000"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 1.853c-8.133 0-14.75 5.663-14.75 12.624 0.045 2.863 1.132 5.465 2.896 7.45l-0.010-0.012c-0.608 2.418-1.844 4.491-3.525 6.104l-0.004 0.004c-0.22 0.225-0.355 0.534-0.355 0.873 0 0.691 0.56 1.252 1.252 1.252 0.089 0 0.175-0.009 0.259-0.027l-0.008 0.001c3.458-0.576 6.524-1.93 9.121-3.877l-0.054 0.039c1.547 0.517 3.328 0.816 5.179 0.817h0c8.133 0 14.75-5.664 14.75-12.625s-6.617-12.624-14.75-12.624zM16.5 24.602c-0.015 0-0.034 0-0.052 0-1.77 0-3.465-0.321-5.030-0.908l0.099 0.032c-0.045-0.011-0.1-0.020-0.155-0.025l-0.005-0c-0.085-0.025-0.182-0.041-0.283-0.045l-0.002-0c-0.074 0.005-0.142 0.016-0.207 0.033l0.008-0.002c-0.1 0.013-0.19 0.035-0.275 0.068l0.008-0.003c-0.079 0.039-0.146 0.081-0.209 0.129l0.003-0.002c-0.064 0.033-0.118 0.067-0.169 0.105l0.003-0.002c-1.371 1.186-3 2.115-4.789 2.69l-0.098 0.027c0.896-1.391 1.555-3.025 1.872-4.778l0.012-0.082c0.005-0.031-0.005-0.060-0.002-0.092 0.002-0.028 0.003-0.060 0.003-0.093 0-0.311-0.107-0.597-0.286-0.824l0.002 0.003c-0.019-0.023-0.025-0.051-0.046-0.073-1.617-1.608-2.626-3.826-2.652-6.28l-0-0.005c0-5.582 5.495-10.124 12.25-10.124s12.25 4.542 12.25 10.124-5.496 10.125-12.25 10.125zM25 10.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM16 16.75h-7c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h7c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"
                  ></path>
                </svg>
              </a>
              <!-- bookmark -->
              <a href="#" class="d-flex align-items-center me-3 text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6C4 3.79086 5.79086 2 8 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H8C6.89543 4 6 4.89543 6 6V20.0568L10.8375 16.6014C11.5329 16.1047 12.4671 16.1047 13.1625 16.6014L18 20.0568V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V20.0568C20 21.6836 18.1613 22.6298 16.8375 21.6843L12 18.2289L7.16248 21.6843C5.83874 22.6298 4 21.6836 4 20.0568V6Z"
                    fill="#000000"
                  />
                  <path
                    d="M17 3C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3V5H13C12.4477 5 12 5.44772 12 6C12 6.55228 12.4477 7 13 7H15V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H17V3Z"
                    fill="#000000"
                  />
                </svg>
              </a>
              <!-- 文章设置 -->
              <a href="#" class="d-flex align-items-center me-3 text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5 13C18.1814 13 18.7678 12.9988 19.2443 13.0473C19.7375 13.0974 20.2228 13.209 20.6667 13.5056C20.9943 13.7245 21.2755 14.0057 21.4944 14.3333C21.791 14.7772 21.9026 15.2625 21.9527 15.7557C22.0001 16.2209 22 16.7907 22 17.4514C22 18.0483 22.0132 18.6497 21.9527 19.2443C21.9026 19.7375 21.791 20.2228 21.4944 20.6667C21.2755 20.9943 20.9943 21.2755 20.6667 21.4944C20.2228 21.791 19.7375 21.9026 19.2443 21.9527C18.7791 22.0001 18.2093 22 17.5486 22C16.9517 22 16.3503 22.0132 15.7557 21.9527C15.2625 21.9026 14.7772 21.791 14.3333 21.4944C14.0057 21.2755 13.7245 20.9943 13.5056 20.6667C13.209 20.2228 13.0974 19.7375 13.0473 19.2443C12.9988 18.7678 13 18.1814 13 17.5C13 16.8186 12.9988 16.2322 13.0473 15.7557C13.0974 15.2625 13.209 14.7772 13.5056 14.3333C13.7245 14.0057 14.0057 13.7245 14.3333 13.5056C14.7772 13.209 15.2625 13.0974 15.7557 13.0473C16.2322 12.9988 16.8186 13 17.5 13Z"
                    fill="#323232"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.5 13C7.18141 13 7.76776 12.9988 8.24428 13.0473C8.73752 13.0974 9.22279 13.209 9.66671 13.5056C9.99428 13.7245 10.2755 14.0057 10.4944 14.3333C10.791 14.7772 10.9026 15.2625 10.9527 15.7557C11.0001 16.2209 11 16.7907 11 17.4514C11 18.0483 11.0132 18.6497 10.9527 19.2443C10.9026 19.7375 10.791 20.2228 10.4944 20.6667C10.2755 20.9943 9.99428 21.2755 9.66671 21.4944C9.22279 21.791 8.73752 21.9026 8.24428 21.9527C7.77912 22.0001 7.20932 22 6.54857 22C5.95171 22 5.35034 22.0132 4.75572 21.9527C4.26248 21.9026 3.77721 21.791 3.33329 21.4944C3.00572 21.2755 2.72447 20.9943 2.50559 20.6667C2.20898 20.2228 2.09745 19.7375 2.04727 19.2443C1.99879 18.7678 2 18.1814 2 17.5C2 16.8186 1.99879 16.2322 2.04727 15.7557C2.09745 15.2625 2.20898 14.7772 2.50559 14.3333C2.72447 14.0057 3.00572 13.7245 3.33329 13.5056C3.77721 13.209 4.26248 13.0974 4.75572 13.0473C5.23225 12.9988 5.81858 13 6.5 13Z"
                    fill="#323232"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.5 2C7.18141 2 7.76776 1.99879 8.24428 2.04727C8.73752 2.09745 9.22279 2.20898 9.66671 2.50559C9.99428 2.72447 10.2755 3.00572 10.4944 3.33329C10.791 3.77721 10.9026 4.26248 10.9527 4.75572C11.0001 5.22089 11 5.79069 11 6.45143C11 7.04829 11.0132 7.64966 10.9527 8.24428C10.9026 8.73752 10.791 9.22279 10.4944 9.66671C10.2755 9.99428 9.99428 10.2755 9.66671 10.4944C9.22279 10.791 8.73752 10.9026 8.24428 10.9527C7.77912 11.0001 7.20932 11 6.54857 11C5.95171 11 5.35034 11.0132 4.75572 10.9527C4.26248 10.9026 3.77721 10.791 3.33329 10.4944C3.00572 10.2755 2.72447 9.99428 2.50559 9.66671C2.20898 9.22279 2.09745 8.73752 2.04727 8.24428C1.99879 7.76776 2 7.18142 2 6.5C2 5.81858 1.99879 5.23225 2.04727 4.75572C2.09745 4.26248 2.20898 3.77721 2.50559 3.33329C2.72447 3.00572 3.00572 2.72447 3.33329 2.50559C3.77721 2.20898 4.26248 2.09745 4.75572 2.04727C5.23225 1.99879 5.81858 2 6.5 2Z"
                    fill="#323232"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5 3C18.5 2.44772 18.0523 2 17.5 2C16.9477 2 16.5 2.44772 16.5 3V5.5H14C13.4477 5.5 13 5.94772 13 6.5C13 7.05228 13.4477 7.5 14 7.5H16.5V10C16.5 10.5523 16.9477 11 17.5 11C18.0523 11 18.5 10.5523 18.5 10V7.5H21C21.5523 7.5 22 7.05228 22 6.5C22 5.94772 21.5523 5.5 21 5.5H18.5V3Z"
                    fill="#323232"
                  />
                </svg>
              </a>
              <!-- 分享 -->
              <a href="#" class="d-flex align-items-center text-decoration-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </ScrollSticky>

        <!-- 文章内容 -->
        <article class="content lh-lg py-3">
          <div class="markdown-body" v-html="md_html"></div>
        </article>

        <!-- 评论部分 -->
        <AppComment />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.article-cover-image {
  width: 100%;
  height: 240px;
  /* 固定高度 */
  object-fit: cover;
  /* 确保图片按照容器尺寸裁剪 */
  opacity: 0.8;
  /* 淡化效果 */
  transition: opacity 0.3s ease;
}

.article-cover-image:hover {
  opacity: 1;
  /* 悬停时恢复不透明 */
}

/* 重置公式容器的样式 */
.markdown-body {
  line-height: normal !important; /* 避免 line-height 影响公式渲染 */
}

/* 确保 KaTeX 公式的字体大小正常 */
.markdown-content .katex {
  font-size: 1.1em !important; /* 根据需要调整 */
  line-height: 1.1 !important; /* 确保行高正常 */
}

/* 修复上下标位置 */
.markdown-content .katex .mord + .msupsub .mord {
  position: relative !important;
  top: -0.1em !important; /* 根据需要微调 */
}
</style>
