<script setup>
defineOptions({
  name: 'AppHeader'
});

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

const username = ref('')
const isLoggedIn = ref(false);  // 响应式变量

// 处理登出请求
const handleLogout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  // 跳转到登录页面或首页
  router.push('/')
}

// 检查本地存储中的 token 是否存在，决定是否自动登录
if (localStorage.getItem('token')) {
  isLoggedIn.value = true
}

onMounted(() => {
  const storedUsername = localStorage.getItem('username')
  if (storedUsername) {
    username.value = storedUsername // 将用户名赋值给响应式变量
  } else {
    username.value = null

  }
  console.log('Header中删除: ', username.value)
})
</script>

<template>

  <header class="py-2 mb-3 border-bottom">

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
        <div class="col-12 col-lg-auto mb-3 mb-lg-0">
          <a href="#" class="" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle img-zoom">
          </a>
          <ul class="dropdown-menu mt-3 text-small" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <router-link class="dropdown-item" :to="`/u/${username}`">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="me-2">
                  <path
                    d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                主页
              </router-link>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="me-2">
                  <path
                    d="M38.187 31.6671C38.188 32.8142 37.8488 33.9358 37.2124 34.8901C36.5759 35.8445 35.6708 36.5886 34.6114 37.0286C33.552 37.4685 32.386 37.5844 31.2608 37.3617C30.1355 37.1389 29.1016 36.5875 28.2897 35.7772C27.4778 34.9668 26.9244 33.9339 26.6996 32.8091C26.4747 31.6843 26.5884 30.518 27.0263 29.4578C27.4642 28.3976 28.2067 27.4911 29.1598 26.8528C30.1129 26.2146 31.2339 25.8733 32.381 25.8721C33.9189 25.8723 35.3938 26.4826 36.4823 27.569C37.5708 28.6554 38.1838 30.1292 38.187 31.6671V31.6671Z"
                    stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M54.146 37.7311L49.603 33.372C49.657 32.811 49.69 32.239 49.69 31.667C49.69 31.095 49.657 30.523 49.603 29.962L54.136 25.57C54.593 25.1303 54.8893 24.55 54.9772 23.9219C55.0651 23.2938 54.9397 22.6544 54.621 22.1061L51.772 17.1641C51.4535 16.6125 50.9597 16.1832 50.3692 15.9445C49.7787 15.7059 49.1253 15.6716 48.513 15.8471L42.46 17.6061C41.5397 16.9386 40.5524 16.3689 39.514 15.906L37.981 9.78105C37.8289 9.16394 37.474 8.61581 36.9731 8.2245C36.4723 7.83319 35.8546 7.62139 35.219 7.62306H29.511C28.8743 7.62387 28.2563 7.83793 27.7554 8.23107C27.2546 8.62421 26.9 9.17377 26.748 9.79205L25.237 15.8991C24.1987 16.3621 23.2114 16.9318 22.291 17.5991L16.227 15.8621C15.6164 15.6878 14.965 15.723 14.3767 15.9621C13.7884 16.2011 13.297 16.6303 12.981 17.1811L10.121 22.124C9.8039 22.6775 9.68087 23.3211 9.77147 23.9526C9.86206 24.584 10.1611 25.167 10.621 25.609L15.164 29.969C15.11 30.53 15.077 31.091 15.077 31.663C15.077 32.235 15.11 32.817 15.164 33.378L10.632 37.76C10.175 38.1996 9.87877 38.7797 9.79066 39.4076C9.70254 40.0355 9.82767 40.6747 10.146 41.223L12.995 46.1761C13.3142 46.7265 13.8086 47.1543 14.3993 47.391C14.99 47.6277 15.643 47.6597 16.254 47.4821L22.307 45.7341C23.23 46.3957 24.2169 46.9632 25.253 47.4281L26.785 53.5581C26.9402 54.1728 27.2964 54.718 27.7971 55.107C28.2977 55.496 28.914 55.7065 29.548 55.7051H35.251C35.8861 55.7043 36.5027 55.4916 37.0032 55.1007C37.5037 54.7098 37.8595 54.163 38.014 53.5471L39.525 47.4281C40.5598 46.9651 41.5435 46.3954 42.46 45.7281L48.535 47.4661C49.1457 47.641 49.7974 47.6063 50.3861 47.3676C50.9748 47.1289 51.4666 46.6999 51.783 46.1491L54.643 41.2071C54.9603 40.6554 55.0837 40.0134 54.9937 39.3834C54.9036 38.7534 54.6052 38.1717 54.146 37.7311V37.7311ZM32.381 37.4721C31.2343 37.4709 30.1138 37.1298 29.1608 36.492C28.2079 35.8542 27.4655 34.9482 27.0273 33.8886C26.589 32.829 26.4747 31.6632 26.6988 30.5387C26.9229 29.4141 27.4752 28.3812 28.2861 27.5705C29.097 26.7597 30.13 26.2075 31.2546 25.9837C32.3792 25.7598 33.5449 25.8743 34.6045 26.3127C35.664 26.7511 36.5699 27.4937 37.2075 28.4467C37.8452 29.3997 38.186 30.5204 38.187 31.667C38.1877 32.4296 38.0379 33.1849 37.7464 33.8895C37.4548 34.5942 37.0271 35.2344 36.4879 35.7736C35.9486 36.3128 35.3083 36.7404 34.6036 37.0318C33.8989 37.3232 33.1436 37.4728 32.381 37.4721V37.4721Z"
                    stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M38.187 31.6671C38.188 32.8142 37.8488 33.9358 37.2124 34.8901C36.5759 35.8445 35.6708 36.5886 34.6114 37.0286C33.552 37.4685 32.386 37.5844 31.2608 37.3617C30.1355 37.1389 29.1016 36.5875 28.2897 35.7772C27.4778 34.9668 26.9244 33.9339 26.6996 32.8091C26.4747 31.6843 26.5884 30.518 27.0263 29.4578C27.4642 28.3976 28.2067 27.4911 29.1598 26.8528C30.1129 26.2146 31.2339 25.8733 32.381 25.8721C33.9189 25.8723 35.3938 26.4826 36.4823 27.569C37.5708 28.6554 38.1838 30.1292 38.187 31.6671V31.6671Z"
                    stroke="#426AB2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                设置
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="me-2">
                  <path
                    d="M4 6C4 3.79086 5.79086 2 8 2H9C9.55228 2 10 2.44772 10 3C10 3.55228 9.55228 4 9 4H8C6.89543 4 6 4.89543 6 6V20.0568L10.8375 16.6014C11.5329 16.1047 12.4671 16.1047 13.1625 16.6014L18 20.0568V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V20.0568C20 21.6836 18.1613 22.6298 16.8375 21.6843L12 18.2289L7.16248 21.6843C5.83874 22.6298 4 21.6836 4 20.0568V6Z"
                    fill="#000000" />
                  <path
                    d="M17 3C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3V5H13C12.4477 5 12 5.44772 12 6C12 6.55228 12.4477 7 13 7H15V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H17V3Z"
                    fill="#000000" />
                </svg>
                收藏
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <svg fill="#FFC61B" height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 358.973 358.973" xml:space="preserve"
                  stroke="#FFC61B" class="me-2">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M331.537,298.998l-42.512-73.064c6.585-2.14,13.188-5.013,16.661-11.007c4.23-7.303,2.131-16.329,0.28-24.294 c-1.227-5.278-2.496-10.736-1.582-14.355c0.985-3.898,4.782-8.26,8.454-12.478c5.447-6.258,11.08-12.729,11.08-20.749 c0-7.757-5.763-15.122-11.337-22.245c-3.812-4.871-7.752-9.908-8.761-13.872c-0.921-3.621,0.338-9.082,1.555-14.363 c1.837-7.967,3.919-16.997-0.325-24.292c-4.244-7.295-13.123-9.947-20.957-12.288c-5.192-1.552-10.561-3.156-13.253-5.746 c-2.86-2.753-4.731-8.199-6.54-13.467c-2.735-7.962-5.563-16.194-12.752-20.038c-2.638-1.41-5.624-2.096-9.13-2.096 c-4.787,0-9.793,1.301-14.634,2.559c-4.433,1.152-8.619,2.241-12.137,2.241c-1.004,0-1.877-0.088-2.668-0.27 c-3.804-0.877-8.175-4.604-12.403-8.207C194.251,5.576,187.709,0,179.626,0c-9.939,0-22.043,9.695-30.052,16.111 c-1.657,1.327-3.68,2.947-4.562,3.523c-0.676,0.121-1.428,0.182-2.243,0.182c-3.511,0.001-7.688-1.077-12.109-2.218 c-4.826-1.246-9.816-2.533-14.588-2.533c-3.528,0-6.531,0.691-9.178,2.113c-7.182,3.858-9.995,12.096-12.715,20.063 c-1.799,5.271-3.66,10.721-6.514,13.478c-2.688,2.596-8.054,4.21-13.244,5.771c-7.83,2.355-16.704,5.024-20.936,12.327 c-4.23,7.303-2.131,16.328-0.28,24.291c1.228,5.278,2.497,10.737,1.583,14.361c-0.917,3.63-4.621,8.096-8.203,12.414 c-5.546,6.686-11.832,14.263-11.832,23.115c0,8.029,5.652,14.494,11.119,20.746c3.68,4.209,7.484,8.561,8.475,12.453 c0.921,3.62-0.338,9.081-1.555,14.361c-1.837,7.967-3.919,16.997,0.326,24.295c3.593,6.175,10.353,8.976,16.979,11.077 L27.424,299.58c-2.405,4.149-2.679,8.544-0.753,12.055c1.926,3.512,5.779,5.642,10.573,5.845l30.821,1.284 c4.619,0.194,11.072,3.933,13.537,7.842l16.447,26.099c2.511,3.983,6.205,6.269,10.136,6.269c4.081,0,7.826-2.424,10.275-6.651 c0.4-0.69,35.314-60.969,44.059-76.059c4.378,3.188,11.18,7.165,17.86,7.165c6.158,0,11.449-3.183,16.308-7.016 c3.919,6.752,14.594,25.292,43.91,75.682c2.452,4.215,6.194,6.824,10.268,6.824c0.001,0,0.001,0,0.001,0 c3.937,0,7.633-2.482,10.141-6.478l16.4-26.223c2.461-3.916,8.906-7.715,13.523-7.916l30.819-1.367 c4.792-0.21,8.641-2.358,10.562-5.872C334.231,307.547,333.949,303.143,331.537,298.998z M220.184,178.367l3.724,21.711 c0.499,2.913,0.071,4.665-0.447,5.279c-0.098,0.116-0.326,0.388-1.207,0.388c-0.655,0-2.084-0.175-4.301-1.34l-19.499-10.251 c-5.048-2.653-11.673-4.115-18.655-4.115c-6.982,0-13.607,1.462-18.654,4.115l-19.499,10.251c-2.216,1.165-3.647,1.34-4.301,1.34 c-0.88,0-1.109-0.271-1.207-0.387c-0.518-0.614-0.946-2.366-0.446-5.279l3.724-21.713c1.997-11.647-3.067-27.233-11.529-35.481 l-15.775-15.377c-2.365-2.306-2.911-4.103-2.701-4.748c0.209-0.645,1.707-1.777,4.976-2.252l21.801-3.168 c11.695-1.699,24.953-11.332,30.183-21.929l9.749-19.755c1.461-2.961,3.001-4.036,3.68-4.036c0.678,0,2.218,1.075,3.68,4.036 l9.75,19.755c5.23,10.597,18.488,20.229,30.183,21.929l21.8,3.168c3.268,0.475,4.767,1.608,4.976,2.252 c0.21,0.645-0.337,2.442-2.702,4.748l-15.774,15.376C223.25,151.133,218.186,166.719,220.184,178.367z" />
                  </g>
                </svg>
                会员
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a @click="handleLogout" class="dropdown-item">
                <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" id="sign-out-double-arrow"
                  data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line me-2">
                  <polyline id="primary" points="18 9 21 12 18 15"
                    style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </polyline>
                  <polyline id="primary-2" data-name="primary" points="13 9 16 12 13 15"
                    style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </polyline>
                  <line id="primary-3" data-name="primary" x1="16" y1="12" x2="7" y2="12"
                    style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </line>
                  <path id="primary-4" data-name="primary"
                    d="M14,19v1a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3h9a1,1,0,0,1,1,1V5"
                    style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                </svg>
                退出
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>

</template>


<style scoped></style>
