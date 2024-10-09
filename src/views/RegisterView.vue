<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const isLoggedIn = ref(false);  // 响应式变量
const username = ref('')
const password = ref('')

// 处理登录请求
const handleLogin = async () => {
    try {
        // 发起 POST 请求，假设接口为 '/api/login'
        const response = await axios.post('/api/login', {
            username: username.value,
            password: password.value,
        })

        if (response.data.success) {
            // 如果登录成功，更新登录状态并保存 token
            isLoggedIn.value = true
            localStorage.setItem('token', response.data.token)
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
        <div class=" container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                    alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">

                                    <form>

                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <img src="/header.png" alt="Logo" width="240" height="80">
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your
                                            account</h5>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="email" id="form2Example17"
                                                class="form-control form-control-lg" />
                                            <label class="form-label" for="form2Example17">phone</label>
                                        </div>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="email" id="form2Example17"
                                                class="form-control form-control-lg" />
                                            <label class="form-label" for="form2Example17">Email address</label>
                                        </div>

                                        <div data-mdb-input-init class="form-outline mb-4">
                                            <input type="password" id="form2Example27"
                                                class="form-control form-control-lg" />
                                            <label class="form-label" for="form2Example27">Password</label>
                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button data-mdb-button-init data-mdb-ripple-init
                                                class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                                        </div>

                                        <a class="small text-muted" href="#!">Forgot password?</a>
                                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Has an account?
                                            <router-link to="/login" style="color: #393f81;">Login here</router-link>
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
    background-image: url('/blog-login.webp');
    background-size: cover;
    background-position: center;
}
</style>
