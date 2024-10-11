<template>
    <div>
        <div class="sticky-wrapper" ref="wrapperRef">
            <div ref="stickyRef" :style="stickyStyle" :class="{ 'is-sticky': isSticky }">
                <slot></slot>
            </div>
        </div>
        <div v-if="isSticky" :style="placeholderStyle"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const wrapperRef = ref(null)
const stickyRef = ref(null)
const isSticky = ref(false)
const stickyTop = ref(0)
const stickyWidth = ref('auto')
const stickyHeight = ref('auto')

const stickyStyle = computed(() => ({
    position: isSticky.value ? 'fixed' : 'static',
    top: isSticky.value ? `${stickyTop.value}px` : 'auto',
    width: isSticky.value ? stickyWidth.value : 'auto',
    zIndex: isSticky.value ? '1000' : 'auto',
    transition: 'background-color 0.3s ease'
}))

const placeholderStyle = computed(() => ({
    height: stickyHeight.value,
    width: stickyWidth.value
}))

const checkSticky = () => {
    if (!wrapperRef.value || !stickyRef.value) return

    const wrapperRect = wrapperRef.value.getBoundingClientRect()
    const stickyRect = stickyRef.value.getBoundingClientRect()

    if (wrapperRect.top <= 0 && !isSticky.value) {
        isSticky.value = true
        stickyTop.value = 0
        stickyWidth.value = `${wrapperRect.width}px`
        stickyHeight.value = `${stickyRect.height}px`
    } else if (wrapperRect.top > 0 && isSticky.value) {
        isSticky.value = false
    }
}

const setInitialDimensions = () => {
    if (stickyRef.value) {
        const rect = stickyRef.value.getBoundingClientRect()
        stickyWidth.value = `${rect.width}px`
        stickyHeight.value = `${rect.height}px`
    }
}

onMounted(() => {
    setInitialDimensions()
    window.addEventListener('scroll', checkSticky)
    window.addEventListener('resize', setInitialDimensions)
    checkSticky() // 初始检查
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkSticky)
    window.removeEventListener('resize', setInitialDimensions)
})
</script>

<style scoped>
.sticky-wrapper {
    position: relative;
}

.is-sticky {
    background-color: rgba(255, 255, 255, 1);
}
</style>