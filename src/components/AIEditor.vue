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
            <input type="text" class="title-input" placeholder="请输入标题" v-model="title" />
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

const title = ref('')
const aiEditor = ref(null)

onMounted(() => {
  aiEditor.value = new AiEditor({
    element: '#aiEditor',
    toolbarSize: 'medium', // 默认 small，可选 'small' | 'medium' | 'large'
    placeholder: '输入内容，支持 markdown 语法...',
    contentIsMarkdown: true,
    contentRetention: true,
    contentRetentionKey: 'editor-content',
    draggable: false,
    toolbarKeys: [
      // 'ai',
      // '|',
      'emoji',
      '|',
      'heading',
      'bold',
      'italic',
      'underline',
      'strike',
      'code',
      'subscript',
      'superscript',
      'hr',
      '|',
      'highlight',
      'font-color',
      'bullet-list',
      'ordered-list',
      'break',
      '|',
      'link',
      'image',
      'quote',
      'code-block',
      'table',
      '|',
      'undo',
      'redo',
      'fullscreen'
    ],
    textSelectionBubbleMenu: {
      enable: true,
      items: ['Bold', 'Italic', 'Underline', 'Strike', 'code']
    },
    image: {
      allowBase64: true,
      defaultSize: 1000 // 默认图片尺寸
      // customMenuInvoke: (editor) => {},
      // uploadUrl: 'https://your-domain/image/upload',
      // uploadFormName: 'image', //上传时的文件表单名称
      // uploadHeaders: {
      //   jwt: 'xxxxx',
      //   other: 'xxxx'
      // },
      // uploader: (file, uploadUrl, headers, formName) => {
      //   //可自定义图片上传逻辑
      // },
      // uploaderEvent: {
      //   onUploadBefore: (file, uploadUrl, headers) => {},
      //   onSuccess: (file, response) => {},
      //   onFailed: (file, response) => {},
      //   onError: (file, error) => {}
      // },
      // bubbleMenuItems: ['AlignLeft', 'AlignCenter', 'AlignRight', 'delete']
    }
  })
})

onUnmounted(() => {
  if (aiEditor.value) {
    aiEditor.value.destroy()
  }
})

const bannerImage = ref(null)

const handleBannerUpdate = (newValue) => {
  console.log('Banner updated:', newValue)
  console.log(bannerImage.value)
  // 这里可以处理图片更新后的逻辑
}

// 获取编辑器内容（Markdown 格式）
const getEditorContent = () => {
  if (aiEditor.value) {
    return aiEditor.value.getMarkdown()
  }
  return ''
}

// 暴露方法给父组件
defineExpose({
  title,
  getEditorContent
})
</script>

<style scoped>
.title-input {
  width: 100%;
  height: 64px;
  padding: 8px 12px;
  font-size: 32px;
  font-weight: bold;
  border: 0px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  box-shadow: none;
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
