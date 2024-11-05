<script setup>

import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'

import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const router = useRouter()
const route = useRoute(); // 使用 useRoute 来访问路由参数
const username = ref('')

onMounted(() => {
    // 检查路由参数
    if (route?.params?.username) {
        username.value = route.params.username // 获取用户名
        console.log(username.value)
    } else {
        username.value = null // 如果路由参数不存在，设置为 null
        console.log('null')
    }
})

const user = {
    name: "John Doe",
    avatar: "https://github.com/mdo.png",
    joinDate: "January 2022",
    memberId: "#12345",
    favorites: 42,
    likes: 128
}

const activeTab = ref('all')

const setActiveTab = (tab) => {
    activeTab.value = tab
}

const activeTabTitle = computed(() => {
    switch (activeTab.value) {
        case 'all':
            return 'All Articles'
        case 'favorites':
            return 'Favorites'
        case 'comments':
            return 'Comments'
        default:
            return 'All Articles'
    }
})

const navItems = ['概览', '个人信息', '个人创作', '我的消息'];
const sidebarItems = ['基本信息', '个人收藏', '我的签署', '收件地址'];
const activeNav = ref('个人信息');
const activeSidebar = ref('基本信息');
</script>

<template>
    <div class="container">
        <AppHeader />

        <div class="row justify-content-center">
            <div class="col-md-12">
                <div>
                    <!-- Top Navigation -->
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">个人中心</a>
                            <div class="navbar-nav">
                                <a class="nav-link list-group-item list-group-item-action border-0 rounded"
                                    v-for="item in sidebarItems" :key="item" :class="{ active: activeSidebar === item }"
                                    @click="activeSidebar = item">
                                    {{ item }}
                                </a>
                            </div>
                        </div>
                    </nav>

                    <div class="container-fluid mt-3">
                        <div class="row">
                            <!-- Sidebar -->
                            <div class="col-md-2">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action border-0 rounded"
                                        v-for="item in sidebarItems" :key="item"
                                        :class="{ active: activeSidebar === item }" @click="activeSidebar = item">
                                        {{ item }}
                                    </a>
                                </div>
                            </div>

                            <!-- Main Content -->
                            <div class="col-md-10">
                                <div class="card border-0">
                                    <div class="d-flex align-items-center mb-4">
                                        <img src="https://github.com/mdo.png" alt="User Avatar"
                                            class="rounded-circle me-3" style="width: 100px; height: 100px;">
                                        <div>
                                            <h3>longfellow</h3>
                                            <p class="text-muted">暂未维护个人简介内容。</p>
                                        </div>
                                    </div>

                                    <!-- Basic Info -->
                                    <h3>基本信息</h3>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <strong>开发者类型：</strong> 岗位
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <strong>应用开发者：</strong> 学生
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <strong>行业：</strong>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <strong>社交通讯：</strong>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <strong>兴趣方向：</strong>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <strong>广告投放和流量变现：</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>

<style></style>