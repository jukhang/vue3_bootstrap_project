<template>
  <div class="profile-banner-cropper">
    <!-- 背景图预览区域 -->
    <div class="banner-preview" :style="{
      height: '240px',
      backgroundColor: '#e9ecef',
      overflow: 'hidden',
      position: 'relative'
    }">
      <!-- 当前背景图 -->
      <img v-if="preview" :src="preview" alt="Banner preview" class="w-100 h-100"
        style="width: 100%; object-fit: cover; object-position: center;" />

      <!-- 上传按钮 -->
      <div v-if="!preview" class="upload-prompt d-flex align-items-center justify-content-center w-100 h-100">
        <button class="btn btn-dark" @click="triggerFileInput">
          <i class="bi bi-image me-2"></i>
          添加背景图片
        </button>
      </div>

      <!-- 编辑按钮 -->
      <div v-if="preview" class="banner-actions position-absolute top-0 end-0 p-3">
        <button class="btn btn-dark btn-sm me-2" @click="triggerFileInput">
          <i class="bi bi-pencil me-1"></i>
          更换
        </button>
        <button class="btn btn-dark btn-sm" @click="removeBanner">
          <i class="bi bi-trash me-1"></i>
          删除
        </button>
      </div>
    </div>

    <!-- 图片编辑模态框 -->
    <div class="modal fade" ref="cropperModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" style="width: 800px; max-width: 95vw;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">裁剪图片</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" style="height: 400px;">
            <VueCropper style="width: 100%; height: 100%;" ref="cropper" :img="option.img"
              :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info"
              :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" :fixed="option.fixed"
              :fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
              :original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full"
              :enlarge="option.enlarge" :mode="option.mode"></VueCropper>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmCrop">应用</button>
          </div>
        </div>
      </div>
    </div>

    <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="d-none">
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { VueCropper } from 'vue-cropper'
import { Modal } from 'bootstrap'
import 'vue-cropper/dist/index.css'

const option = reactive({
  img: '', // 裁剪图片的地址 url 地址, base64, blob
  outputSize: 1, // 裁剪生成图片的质量
  outputType: 'jpeg', // 裁剪生成图片的格式 jpeg, png, webp
  info: false, // 裁剪框的大小信息
  canScale: true, // 图片是否允许滚轮缩放
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 750, // 默认生成截图框宽度
  autoCropHeight: 340, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  fixed: true, // 是否开启截图框宽高固定比例，这个如果设置为true，截图框会是固定比例缩放的，如果设置为false，则截图框的狂宽高比例就不固定了
  fixedNumber: [16, 9], // 截图框的宽高比例 [ 宽度 , 高度 ]
  canMove: true, // 上传图片是否可以移动
  canMoveBox: false, // 截图框能否拖动
  original: true, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  full: true, // 是否输出原图比例的截图
  enlarge: '2', // 图片根据截图框输出比例倍数
  mode: 'contain', // 图片默认渲染方式 contain , cover, 100px, 100% auto
})

// Props and Emits
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

// Refs
const fileInput = ref(null)
const cropper = ref(null)
const cropperModal = ref(null)
const preview = ref(props.modelValue)
const modalInstance = ref(null)

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    option.img = e.target.result
    modalInstance.value.show()
  }
  reader.readAsDataURL(file)
}

// 裁剪器准备就绪
const cropperReady = () => {
  // 可以在这里进行额外的初始化操作
}

// 确认裁剪
const confirmCrop = () => {
  // 获取裁剪后的图片
  cropper.value.getCropData((data) => {
    preview.value = data
    emit('update:modelValue', data)
    closeModal()
  })
}

// 关闭模态框
const closeModal = () => {
  modalInstance.value.hide()
}

// 删除背景图
const removeBanner = () => {
  if (confirm('确定要删除背景图片吗？')) {
    preview.value = null
    emit('update:modelValue', null)
  }
}

// 生命周期钩子
onMounted(() => {
  modalInstance.value = new Modal(cropperModal.value, {
    backdrop: 'static',
    keyboard: false
  })
})
</script>

<style scoped>
.modal-dialog {
  max-width: 95vw;
}
</style>