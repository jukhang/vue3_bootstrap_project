<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import config from '@/config' // 引入配置文件

const router = useRouter() // 使用 Vue Router
const isLoggedIn = ref(false) // 响应式变量
const username = ref('')
const password = ref('')

// 处理登录请求
const handleLogin = async () => {
  try {
    // 发起 POST 请求，假设接口为 '/api/login'
    const response = await axios.post(`${config.API_BASE_URL}/login`, {
      username: username.value,
      password: password.value
    })

    if (response.data.code === 200) {
      // 如果登录成功，更新登录状态并保存 token
      isLoggedIn.value = true
      localStorage.setItem('token', response.data.data.access_token)
      localStorage.setItem('username', response.data.data.name)

      // 登录成功后跳转到首页
      router.push('/')
    } else {
      alert('登录失败，请检查用户名或密码')
    }
  } catch (error) {
    console.error('登录请求失败', error)
    alert('登录请求失败，请稍后再试')
  }
}

// 处理登出请求
const handleLogout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('token')
}

// 检查本地存储中的 token 是否存在，决定是否自动登录
if (localStorage.getItem('token')) {
  isLoggedIn.value = true
}
</script>

<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://s2.loli.net/2025/01/24/VUEHjkAObLrpKw1.webp"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <img src="/header.png" alt="Logo" width="240" height="80" />
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Sign into your account
                    </h5>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input
                        v-model="username"
                        type="username"
                        id="form2Example17"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example17">Username</label>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input
                        v-model="password"
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        @click="handleLogin"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-dark btn-lg btn-block"
                        type="button"
                      >
                        Login
                      </button>
                    </div>

                    <a class="small text-muted" href="#!">Forgot password?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Don't have an account?
                      <router-link to="/register" style="color: #393f81">Register here</router-link>
                    </p>
                    <a href="#!" class="small text-muted">Terms of use.</a>
                    <a href="#!" class="small text-muted">Privacy policy</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vh-100 {
  background-image: url('https://s2.loli.net/2025/01/24/YkJlsHPy8KSObAq.webp');
  background-size: cover;
  background-position: center;
}
</style>
