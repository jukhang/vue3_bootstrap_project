<template>
  <div id="aiEditor">
    <div class="aie-container">
      <div class="aie-container-header"></div>
      <div class="row justify-content-center mt-3">
        <div class="col-12 col-md-8">
          <!-- 小屏幕占满，中等屏幕占 8 列 -->
          <div class="profile-page mb-3">
            <ImageCropper v-model="bannerImage" @update:modelValue="handleBannerUpdate" />
          </div>
          <div class="mx-auto border-bottom pb-3">
            <input type="text" class="title-input" placeholder="请输入标题" />
          </div>
          <div class="aie-container-main my-3"></div>
          <div class="aie-container-footer my-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'
import { onMounted, onUnmounted, ref } from 'vue'

import ImageCropper from '../components/ImageCropper.vue'

// const divRef = ref(null)
let aiEditor = null

onMounted(() => {
  aiEditor = new AiEditor({
    element: '#aiEditor',
    toolbarSize: 'medium', // 默认 small，可选 'small' | 'medium' | 'large'
    placeholder: '输入内容，支持 markdown 语法...',
    contentIsMarkdown: true,
    contentRetention: true,
    contentRetentionKey: 'editor-content',
    draggable: true,
    toolbarKeys: [
      'ai',
      // 'brush',
      // 'eraser',
      '|',
      'emoji',
      'heading',
      // 'font-family',
      // 'font-size',
      // '|',
      'bold',
      'italic',
      'underline',
      'strike',
      'code',
      'subscript',
      'superscript',
      'hr',
      // 'todo',
      '|',
      'highlight',
      'font-color',
      // '|',
      // 'align',
      // 'line-height',
      // '|',
      'bullet-list',
      'ordered-list',
      // 'indent-decrease',
      // 'indent-increase',
      'break',
      '|',
      'link',
      'image',
      // 'video',
      // 'attachment',
      'quote',
      'code-block',
      'table',
      '|',
      'undo',
      'redo'
      // '|',
      // 'source-code',
      // 'printer',
      // 'fullscreen'
    ]
  })
})

onUnmounted(() => {
  if (aiEditor) {
    aiEditor.destroy()
  }
})

const bannerImage = ref(null)

const handleBannerUpdate = (newValue) => {
  console.log('Banner updated:', newValue)
  console.log(bannerImage.value)
  // 这里可以处理图片更新后的逻辑
}
</script>

<style scoped>
.title-input {
  width: 100%; /* 宽度占满父容器 */
  height: 64px; /* 设置高度 */
  padding: 8px 12px; /* 内边距 */
  font-size: 32px; /* 字体变大 */
  font-weight: bold; /* 字体加粗 */
  border: 0px solid #ccc; /* 边框 */
  border-radius: 4px; /* 圆角 */
  outline: none; /* 移除聚焦时的外边框 */
  box-sizing: border-box; /* 确保 padding 和 border 包含在宽度内 */
  box-shadow: none; /* 移除默认的阴影 */
  transition:
    border-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

input::placeholder {
  color: #868686; /* 占位符颜色 */
  font-weight: bold; /* 占位符字体加粗 */
  font-size: 28px; /* 占位符字体大小 */
  opacity: 1; /* 确保颜色不透明 */
}
</style>
