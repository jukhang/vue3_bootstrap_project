<template>
  <div class="d-flex flex-start mt-4">
    <img
      class="rounded-circle shadow-1-strong me-3"
      :src="comment.avatar"
      alt="avatar"
      width="48"
      height="48"
    />
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1">
            {{ comment.author }} <span class="small">· 2 hours ago · </span>
            <!-- longfellow <span class="small">· 2 hours ago · </span> -->
            <a href="#!">
              <span class="small">#reply</span>
            </a>
          </p>
        </div>
        <p class="middle mb-0">
          {{ comment.content }}
        </p>
      </div>

      <div v-if="comment.children.length > 0" class="mt-4">
        <CommentItem v-for="child in comment.children" :key="child.id" :comment="child" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>
