<script setup>

import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import AppSiderbar from '../components/Siderbar.vue'

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter()
const username = ref('')

onMounted(() => {
    // 检查路由参数
    if (router.params.username) {
        username.value = router.params.username // 获取用户名
    }
})

</script>

<template>
    <div class="container">
        <AppHeader />

        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1>User Home</h1>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<style></style>