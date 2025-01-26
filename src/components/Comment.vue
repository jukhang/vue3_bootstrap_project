<script setup>
defineOptions({
  name: 'AppComment'
})

import config from '@/config' // 引入配置文件

import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import Vditor from 'vditor'
import axios from 'axios'
import 'vditor/dist/index.css'
import CommentItem from '../components/CommentItem.vue'

const route = useRoute() // 获取路由对象
const vditor = ref(null)
const article_uuid = ref('') // 获取 UUID 参数
const comments = ref([])

const fetchComments = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/comment`, {
      params: {
        article_uuid: article_uuid.value // 将文章 ID 作为查询参数传递
      }
    }) // 假设文章ID为1
    comments.value = response.data.data
    console.log(comments.value)
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

onMounted(() => {
  if (route?.params?.url) {
    article_uuid.value = route.params.url // 获取 url
  } else {
    article_uuid.value = null // 如果路由参数不存在，设置为 null
  }

  fetchComments()

  vditor.value = new Vditor('vditor', {
    height: 'auto',
    minHeight: 200,
    width: '50vw',
    toolbarConfig: {
      pin: true
    },

    cache: {
      enable: false
    },
    after: () => {
      vditor.value.setValue('欢迎发表您的见解！')
    }
  })
})

// 设置默认高度
onMounted(() => {})
</script>

<template>
  <div class="border-top py-3 border-bottom">
    <div>
      <div class="card-header pt-3">
        <h3>最新评论</h3>
      </div>
      <div class="card-body pb-3 m-3">
        <div class="row">
          <div class="col">
            <div v-for="comment in comments" :key="comment.id">
              <CommentItem :comment="comment" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer pb-3 m-3">
        <!-- 评论输入框 -->
        <div class="d-flex flex-start w-100" id="vditor"></div>

        <div class="float-end pt-2 pb-2">
          <button type="button" class="btn btn-primary btn-sm me-3" @click="postComment">
            Post comment
          </button>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="cancelComment">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
