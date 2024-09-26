<script setup>

import { ref, onMounted } from 'vue';

defineOptions({
  name: 'AppHeader'
});

// 响应式变量
const isLoggedIn = ref(true);

</script>

<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <img src="/header.png" alt="Logo" width="180" height="60">
        </router-link>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-3 link-dark fs-6">首页</router-link></li>
          <li><router-link to="/hot" class="nav-link px-3 link-dark fs-6">热门文章</router-link></li>
          <li><router-link to="/tech" class="nav-link px-3 link-dark fs-6">大模型</router-link></li>
          <li><router-link to="/finance" class="nav-link px-3 link-dark fs-6">财经</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/finance" class="nav-link px-3 link-dark fs-6">创作者中心</router-link>
          </li>
          <li><router-link to="/about" class="nav-link px-3 link-dark fs-6">关于</router-link></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>

        <div v-if="!isLoggedIn"
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <button type="button"
            class="btn btn-outline-dark col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
            @click="$router.push('/login')">登录</button>
          <!-- <button type="button" class="btn btn-outline-dark col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" @click="$router.push('/signup')">注册</button> -->
        </div>
        <div v-else class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" @click=" $router.push('/new-story')">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" version="1.2" fill="none" viewBox="0 0 24 24"
              aria-label="Write">
              <path fill="currentColor"
                d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z">
              </path>
              <path stroke="currentColor"
                d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2">
              </path>
            </svg>
          </div>
          <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <svg fill="#000000" height="26" width="26" version="1.2" baseProfile="tiny" id="Layer_1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"
              xml:space="preserve">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path
                    d="M222.987,510c31.418,0,57.529-22.646,62.949-52.5H160.038C165.458,487.354,191.569,510,222.987,510z">
                  </path>
                  <path
                    d="M432.871,352.059c-22.25-22.25-49.884-32.941-49.884-141.059c0-79.394-57.831-145.269-133.663-157.83h-4.141 c4.833-5.322,7.779-12.389,7.779-20.145c0-16.555-13.42-29.975-29.975-29.975s-29.975,13.42-29.975,29.975 c0,7.755,2.946,14.823,7.779,20.145h-4.141C120.818,65.731,62.987,131.606,62.987,211c0,108.118-27.643,118.809-49.893,141.059 C-17.055,382.208,4.312,434,47.035,434H398.93C441.568,434,463.081,382.269,432.871,352.059z">
                  </path>
                </g>
              </g>
            </svg>
          </div>
          <div class="dropdown text-end">
            <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
              data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
              <li><a class="dropdown-item" href="#">主页</a></li>
              <li><a class="dropdown-item" href="#">设置</a></li>
              <li><a class="dropdown-item" href="#">收藏</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Premium</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<style scoped></style>
