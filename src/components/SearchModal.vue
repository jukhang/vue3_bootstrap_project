<template>
  <div>
    <!-- 搜索输入框 -->
    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" @submit.prevent="handleSearch">
      <input
        type="search"
        class="form-control1"
        placeholder="Search..."
        aria-label="Search"
        v-model="searchQuery"
        @focus="showModal = true"
      />
    </form>

    <!-- 弹窗 -->
    <div v-if="showModal" class="modal-backdrop" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <button type="button" class="btn-close" @click="showModal = false"></button>
        </div>
        <div class="modal-body">
          <input
            type="search"
            class="form-control mb-3"
            placeholder="Search..."
            aria-label="Search"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <div v-if="searchResults.length > 0">
            <div v-for="result in searchResults" :key="result.id" class="search-result">
              <h6 v-html="highlight(result.title)"></h6>
              <p v-html="highlight(result.content)"></p>
            </div>
          </div>
          <div v-else>
            <p>No results found.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 搜索查询内容
const searchQuery = ref('')
// 控制弹窗显示
const showModal = ref(false)
// 搜索结果
const searchResults = ref([])

// 处理搜索逻辑
const handleSearch = () => {
  // 模拟搜索数据
  const mockData = [
    { id: 1, title: 'Vue 3 Tutorial', content: 'Learn Vue 3 from scratch.' },
    { id: 2, title: 'Bootstrap 5 Guide', content: 'Master Bootstrap 5 for responsive design.' },
    { id: 3, title: 'JavaScript Basics', content: 'Understand the fundamentals of JavaScript.' }
  ]

  // 过滤搜索结果
  searchResults.value = mockData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

// 高亮匹配文本
const highlight = (text) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
</script>

<style scoped>
/* 弹窗背景 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

/* 弹窗内容 */
.modal-content {
  background-color: rgba(255, 255, 255, 0.7); /* 白色透明背景 */
  padding: 20px;
  border-radius: 10px;
  width: 50%; /* 固定宽度 */
  max-width: 90%; /* 防止在小屏幕上过大 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 添加阴影 */
}

/* 弹窗标题 */
/* .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
} */

/* 关闭按钮 */
.modal-header .btn-close {
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
}

/* 高亮文本 */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* 搜索结果项 */
.search-result {
  margin-bottom: 15px;
}

.form-control1 {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  color: #333; /* 文字颜色 */
}

/* 输入框 */
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5); /* 边框透明 */
  border-radius: 5px;
  font-size: 1rem;
  background-color: transparent; /* 背景透明 */
  color: #333; /* 文字颜色 */
}

/* 输入框聚焦时的样式 */
.form-control:focus {
  border-color: rgba(255, 255, 255, 0.8); /* 聚焦时边框颜色 */
  outline: none; /* 移除默认聚焦轮廓 */
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* 添加聚焦阴影 */
}
</style>
