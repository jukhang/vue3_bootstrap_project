<script setup>

import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import AppSiderbar from '../components/Siderbar.vue'

import { ref, onMounted } from 'vue';
import { Popover } from 'bootstrap';
import axios from 'axios';

const page = ref(1);
const loading = ref(false);

const popoverContent = `
  <div>
    <div class="d-flex align-items-center">
      <img src="https://github.com/mdo.png" alt="mdo" width="30" height="30" class="rounded-circle">
      <button class="btn btn-primary btn-sm me-2">Follow</button>
    </div>
    <strong>longfellow</strong>
    <p>Followers: 123</p>
    <p>A brief description about the user.</p>
  </div>
`;

const avatar = ref(null);
const name = ref(null);

const showPopover = (event) => {
  const popover = Popover.getInstance(event.currentTarget) || new Popover(event.currentTarget, {
    content: popoverContent,
    html: true,
    placement: 'top',
    delay: { "show": 100, "hide": 100 }  // 添加延迟时间
  });
  popover.show();
};

const hidePopover = (event) => {
  const popover = Popover.getInstance(event.currentTarget);
  if (popover) {
    popover.hide();
  }
};

const initializePopovers = () => {
  const popoverTriggerList = document.querySelectorAll('.cursor-pointer');
  popoverTriggerList.forEach(trigger => {
    new Popover(trigger, {
      content: popoverContent.value,
      html: true,
      placement: 'top',
      delay: { "show": 100, "hide": 100 },  // 添加延迟时间
    });
  });
};

const articles = ref([]); // 存储多篇文章数据

// 获取文章数据
const fetchArticles = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/articles'); // 根据实际接口调整
    articles.value = response.data.data; // 假设返回的是文章数组
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// 格式化发布日期
const formattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

onMounted(() => {
  fetchArticles();
  initializePopovers(); // 合并初始化逻辑
});


</script>

<template>

  <div class="container">

    <AppHeader />

    <div class="p-4 p-md-5 mb-4 mt-4 custom_rounded text-body-emphasis bg-body-secondary blog-cover">
      <div class="col-lg-12 px-0">
        <h1 class="">How build high-quality system with best practices.</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently
          about what’s most interesting in this post’s contents.</p>
        <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue reading...</a></p>
      </div>
    </div>

    <div class="row mb-4 mt-4">
      <div class="col-md-4">
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
            <h3 class="mb-0">Featured post</h3>
            <div class="mb-1 text-body-secondary">Nov 12</div>
            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
              Continue reading
              <svg class="bi">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
            <h3 class="mb-0">Post title</h3>
            <div class="mb-1 text-body-secondary">Nov 11</div>
            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
              Continue reading
              <svg class="bi">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
            <h3 class="mb-0">Post title</h3>
            <div class="mb-1 text-body-secondary">Nov 11</div>
            <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
              Continue reading
              <svg class="bi">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-md-8">
        <div v-for="(articleItem, index) in articles" :key="index">
          <div class="row align-items-stretch mt-3">
            <div class="col-md-8 d-flex flex-column">
              <article class="blog-post border-bottom flex-grow-1">
                <h5 class="display-5 link-body-emphasis mb-3 mt-3">
                  <router-link :to="`/post/${articleItem.url}`" class="text-decoration-none">{{ articleItem.title
                    }}</router-link>
                </h5>
                <p class="blog-post-meta d-flex align-items-center">
                  <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle me-2"
                    ref="avatar">
                  <router-link :to="`/u/${articleItem.author}`" class="me-2 cursor-pointer">
                    {{ articleItem.author }}
                  </router-link>
                  <span>{{ formattedDate(articleItem.publishedDate) }}</span>
                </p>

                <p class="content-clamp">{{ articleItem.content }}</p>
              </article>
            </div>
            <div class="col-md-4 d-flex align-items-stretch pt-5 pb-1">
              <div class="w-100">
                <img src="/article_cover.jpeg" class="img-fluid custom-rounded-1 w-100 h-100"
                  style="object-fit: cover;">
              </div>
            </div>
          </div>
          <div ref="bottomObserver" class="observer"></div>
        </div>
      </div>

      <AppSiderbar />
    </div>

    <AppFooter />
  </div>
</template>

<style>
.text-decoration-none {
  font-size: 32px !important;
  color: #000000 !important;
  font-weight: 320 !important;
}

.blog-cover {
  background-image: url('/blog-cover.webp');
  background-size: cover;
  background-position: center;
  height: 400px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor-pointer {
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 300;
}

.border-dashed {
  border: none;
  /* border-bottom: 2px dashed #bdbdbd; */
  border-bottom: 3px dotted #bdbdbd;
  margin: 20px 0;
}

.content-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-clamp: 2;
}

.custom-rounded-1 {
  border-radius: 10px !important;
}
</style>