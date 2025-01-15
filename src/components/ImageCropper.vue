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
            <img v-if="currentPreview" :src="currentPreview" alt="Banner preview" class="w-100 h-100"
                style="width: 100%; object-fit: cover; object-position: center;" />

            <!-- 上传按钮 -->
            <div v-if="!currentPreview"
                class="upload-prompt d-flex align-items-center justify-content-center w-100 h-100">
                <button class="btn btn-dark" @click="triggerFileInput">
                    <i class="bi bi-image me-2"></i>
                    添加背景图片
                </button>
            </div>

            <!-- 编辑按钮 -->
            <div v-if="currentPreview" class="banner-actions position-absolute top-0 end-0 p-3">
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
        <div class="modal fade" ref="editorModal" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" style="width: 800px; max-width: 95vw;">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <button type="button" class="btn-close" @click="closeEditor"></button> -->
                    </div>
                    <div class="modal-body p-0">
                        <div class="editor-container position-relative">
                            <!-- 完整图片展示区域 -->
                            <div class="image-container" ref="imageContainer" :style="{
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: '#000',
                                height: '500px'
                            }">
                                <!-- 暗色遮罩 - 上部分 -->
                                <div class="overlay-top" :style="{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    height: `${(500 - 240) / 2}px`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    zIndex: 1
                                }"></div>

                                <!-- 暗色遮罩 - 下部分 -->
                                <div class="overlay-bottom" :style="{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: `${(500 - 240) / 2}px`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    zIndex: 1
                                }"></div>

                                <!-- 可拖动的图片 -->
                                <img v-if="editingImage" :src="editingImage" ref="editingImageRef"
                                    @mousedown="startDrag" @touchstart="startDrag" :style="{
                                        position: 'absolute',
                                        left: '0',
                                        top: '0',
                                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100})`,
                                        maxWidth: 'none',
                                        cursor: isDragging ? 'grabbing' : 'grab',
                                        userSelect: 'none',
                                        touchAction: 'none'
                                    }" @load="initializeImage" />

                                <!-- 预览窗口边框 -->
                                <div class="crop-frame" :style="{
                                    position: 'absolute',
                                    left: '0',
                                    right: '0',
                                    height: '240px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    border: '2px solid #fff',
                                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.2)',
                                    zIndex: 1,
                                    pointerEvents: 'none'
                                }"></div>
                            </div>

                            <!-- 缩放控制 -->
                            <!-- <div class="zoom-control p-3 bg-light border-top">
                                <div class="d-flex align-items-center justify-content-center gap-3">
                                    <i class="bi bi-zoom-out"></i>
                                    <input type="range" class="form-range" style="width: 240px;" min="100" max="240"
                                        v-model="zoom">
                                    <i class="bi bi-zoom-in"></i>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeEditor">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="applyChanges">
                            应用
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 隐藏的文件输入 -->
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="d-none">
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'

const emit = defineEmits(['update:modelValue'])

// DOM引用
const fileInput = ref(null)
const editorModal = ref(null)
const editingImageRef = ref(null)
const imageContainer = ref(null)

// 状态变量
const currentPreview = ref(null)
const editingImage = ref(null)
const modalInstance = ref(null)
const position = reactive({ x: 0, y: 0 })
const dragStart = reactive({ x: 0, y: 0 })
const zoom = ref(100)
const isDragging = ref(false)

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
        editingImage.value = e.target.result
        position.x = 0
        position.y = 0
        zoom.value = 100
        modalInstance.value.show()

        // 创建一个新的图片元素
        const img = new Image()
        img.src = e.target.result

        // 检查图片是否已经加载过
        if (img.complete) {
            // 如果图片已经加载过，直接调用 initializeImage
            editingImageRef.value = img
            initializeImage()
        } else {
            img.onload = () => {
                // 确保图片加载完成后调用 initializeImage
                editingImageRef.value = img
                initializeImage()
            }
        }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
}

// 初始化图片位置
const initializeImage = () => {
    if (!editingImageRef.value || !imageContainer.value) return

    const img = editingImageRef.value
    const container = imageContainer.value

    // 确保图片和容器元素已经正确加载
    if (!img.complete || !container.offsetWidth || !container.offsetHeight) {
        requestAnimationFrame(initializeImage) // 再次尝试初始化
        return
    }

    // 计算初始位置，使图片居中对齐预览窗口
    const containerHeight = container.offsetHeight
    const imageHeight = img.offsetHeight * (zoom.value / 100)
    position.y = (containerHeight - imageHeight) / 2

    // 水平居中
    const containerWidth = container.offsetWidth
    const imageWidth = img.offsetWidth * (zoom.value / 100)
    position.x = (containerWidth - imageWidth) / 2

    // 更新图片位置
    updateImagePosition()
}

// 更新图片位置
const updateImagePosition = () => {
    if (!editingImageRef.value || !imageContainer.value) return

    const img = editingImageRef.value
    img.style.position = 'absolute'
    img.style.left = `${position.x}px`
    img.style.top = `${position.y}px`
    img.style.transform = `scale(${zoom.value / 100})`
}


// 拖拽相关方法
const startDrag = (e) => {
    e.preventDefault()
    isDragging.value = true

    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY

    dragStart.x = clientX - position.x
    dragStart.y = clientY - position.y

    if (e.type === 'mousedown') {
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', stopDrag)
    } else {
        document.addEventListener('touchmove', handleDrag, { passive: false })
        document.addEventListener('touchend', stopDrag)
    }
}

const handleDrag = (e) => {
    if (!isDragging.value) return

    e.preventDefault()
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY

    position.x = clientX - dragStart.x
    position.y = clientY - dragStart.y

    // 限制图片不超出边界
    const img = editingImageRef.value
    const container = imageContainer.value
    const imageWidth = img.offsetWidth * (zoom.value / 100)
    const imageHeight = img.offsetHeight * (zoom.value / 100)
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    const maxX = 0
    const maxY = 0
    const minX = -(imageWidth - containerWidth)
    const minY = -(imageHeight - containerHeight)

    position.x = Math.max(minX, Math.min(position.x, maxX))
    position.y = Math.max(minY, Math.min(position.y, maxY))
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', handleDrag)
    document.removeEventListener('touchend', stopDrag)
}

// 应用更改
const applyChanges = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const container = imageContainer.value

    // 设置canvas尺寸为预览窗口大小
    canvas.width = container.offsetWidth
    canvas.height = 240 // 固定高度

    // 计算裁剪区域的位置
    const cropY = (container.offsetHeight - 240) / 2

    // 绘制裁剪后的图片
    ctx.drawImage(
        editingImageRef.value,
        position.x,
        position.y - cropY, // 调整Y轴位置以对齐预览窗口
        editingImageRef.value.width * (zoom.value / 100),
        editingImageRef.value.height * (zoom.value / 100)
    )

    // 更新预览图
    currentPreview.value = canvas.toDataURL()
    emit('update:modelValue', currentPreview.value)

    closeEditor()
}

// 关闭编辑器
const closeEditor = () => {
    modalInstance.value.hide()
}

// 删除背景图
const removeBanner = () => {
    if (confirm('确定要删除背景图片吗？')) {
        currentPreview.value = null
        editingImage.value = null
        emit('update:modelValue', null)
    }
}

// 生命周期钩子
onMounted(() => {
    modalInstance.value = new Modal(editorModal.value, {
        backdrop: 'static',
        keyboard: false
    })
})

onUnmounted(() => {
    modalInstance.value?.dispose()
})
</script>

<style scoped>
.form-range::-webkit-slider-thumb {
    cursor: pointer;
}

.form-range::-moz-range-thumb {
    cursor: pointer;
}

.modal-dialog {
    margin: 1.75rem auto;
}

@media (max-width: 576px) {
    .modal-dialog {
        margin: 1rem;
    }
}

.image-container {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container img {
    width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
    /* 确保图像始终从中心开始显示 */
    /* transition: transform 0.3s ease; */
    /* 添加平滑的缩放过渡效果 */
}

/* 增加图像缩放效果 */
.image-container:hover img {
    transform: scale(1.2);
    /* 在悬停时，缩放图片 */
}
</style>