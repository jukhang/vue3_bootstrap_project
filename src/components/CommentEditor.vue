<template>
  <div class="comment-editor">
    <!-- 工具栏 -->
    <div class="toolbar btn-toolbar mb-2" role="toolbar">
      <div class="btn-group me-2" role="group">
        <button
          v-for="tool in tools"
          :key="tool.name"
          class="btn btn-outline-secondary"
          :title="tool.title"
          @click="tool.action"
        >
          <i :class="'bi ' + tool.icon"></i>
        </button>
      </div>

      <!-- 表情选择器 -->
      <div class="btn-group">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-emoji-smile"></i>
        </button>
        <div class="dropdown-menu emoji-picker p-2">
          <div class="d-flex flex-wrap">
            <button
              v-for="emoji in emojis"
              :key="emoji"
              class="btn btn-sm"
              @click="insertEmoji(emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑和预览区域 -->
    <div class="editor-container">
      <!-- 输入区域 -->
      <textarea
        ref="textarea"
        v-model="content"
        class="form-control editor-input"
        :placeholder="placeholder"
        @input="updatePreview"
        @select="saveSelection"
        @keydown="handleKeydown"
      ></textarea>

      <!-- 实时预览 -->
      <div class="preview-area" ref="previewArea" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import katex from 'katex'

const textarea = ref(null)
const previewArea = ref(null)
const content = ref('')
const selection = ref({ start: 0, end: 0 })
const placeholder = '支持 Markdown 语法和 LaTeX 公式...'

// 工具栏配置
const tools = [
  {
    name: 'header',
    title: '标题',
    icon: 'bi-type-h1',
    action: () => insertText('# ')
  },
  {
    name: 'orderedList',
    title: '有序列表',
    icon: 'bi-list-ol',
    action: () => insertText('1. ')
  },
  {
    name: 'unorderedList',
    title: '无序列表',
    icon: 'bi-list-ul',
    action: () => insertText('- ')
  },
  {
    name: 'bold',
    title: '粗体',
    icon: 'bi-type-bold',
    action: () => insertText('**', '**')
  },
  {
    name: 'italic',
    title: '斜体',
    icon: 'bi-type-italic',
    action: () => insertText('*', '*')
  },
  {
    name: 'code',
    title: '代码块',
    icon: 'bi-code-square',
    action: () => insertText('```\n', '\n```')
  },
  {
    name: 'latex',
    title: 'LaTeX 公式',
    icon: 'bi-calculator',
    action: () => insertText('$', '$')
  },
  {
    name: 'quote',
    title: '引用',
    icon: 'bi-quote',
    action: () => insertText('> ')
  },
  {
    name: 'image',
    title: '图片',
    icon: 'bi-image',
    action: () => insertText('![alt text](', ')')
  }
]

// 表情列表
const emojis = ['😀', '😂', '🤣', '😊', '😍', '🤔', '👍', '👎', '❤️', '💪']

// 保存选区
const saveSelection = () => {
  if (!textarea.value) return
  selection.value = {
    start: textarea.value.selectionStart,
    end: textarea.value.selectionEnd
  }
}

// 恢复选区
const restoreSelection = () => {
  if (!textarea.value) return
  textarea.value.focus()
  textarea.value.setSelectionRange(selection.value.start, selection.value.end)
}

// 插入文本
const insertText = (before, after = '') => {
  if (!textarea.value) return

  const start = textarea.value.selectionStart
  const end = textarea.value.selectionEnd
  const text = content.value

  const selectedText = text.slice(start, end)
  const replacement = before + selectedText + after

  content.value = text.slice(0, start) + replacement + text.slice(end)

  // 设置新的光标位置
  nextTick(() => {
    textarea.value.focus()
    const newPosition = start + before.length + selectedText.length
    textarea.value.setSelectionRange(newPosition, newPosition)
  })
}

// 插入表情
const insertEmoji = (emoji) => {
  insertText(emoji)
}

// 处理按键事件
const handleKeydown = (e) => {
  // Tab 键处理
  if (e.key === 'Tab') {
    e.preventDefault()
    insertText('    ')
  }

  // Enter 键在列表中的处理
  if (e.key === 'Enter') {
    const text = content.value
    const pos = textarea.value.selectionStart
    const lastNewLine = text.lastIndexOf('\n', pos - 1)
    const currentLine = text.slice(lastNewLine + 1, pos)

    // 有序列表
    const orderedMatch = currentLine.match(/^(\d+)\.\s/)
    if (orderedMatch) {
      e.preventDefault()
      const num = parseInt(orderedMatch[1])
      insertText(`\n${num + 1}. `)
      return
    }

    // 无序列表
    if (currentLine.match(/^-\s/)) {
      e.preventDefault()
      insertText('\n- ')
      return
    }
  }
}

// 实时预览内容
const renderedContent = computed(() => {
  try {
    let rendered = marked(content.value)

    // 渲染 LaTeX
    rendered = rendered.replace(/\$([^\$]+)\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex)
      } catch (err) {
        return match
      }
    })

    return rendered
  } catch (err) {
    console.error('Rendering error:', err)
    return content.value
  }
})

// 更新预览
const updatePreview = () => {
  // 保存滚动位置
  const scrollRatio =
    textarea.value.scrollTop / (textarea.value.scrollHeight - textarea.value.clientHeight)

  // 同步预览区域的滚动
  if (previewArea.value) {
    const previewScrollHeight = previewArea.value.scrollHeight - previewArea.value.clientHeight
    previewArea.value.scrollTop = scrollRatio * previewScrollHeight
  }
}
</script>

<style scoped>
.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 400px;
}

.editor-input {
  height: 100%;
  resize: none;
  font-family: monospace;
}

.preview-area {
  height: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  overflow-y: auto;
  background-color: #fff;
}

.emoji-picker {
  width: 200px;
}

.emoji-picker button {
  font-size: 1.2rem;
  padding: 0.25rem;
}

/* Markdown 样式 */
.preview-area :deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.preview-area :deep(blockquote) {
  border-left: 3px solid #ced4da;
  margin: 0;
  padding-left: 1em;
  color: #6c757d;
}

.preview-area :deep(code) {
  background-color: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.preview-area :deep(pre) {
  background-color: #f8f9fa;
  padding: 1em;
  border-radius: 3px;
  overflow-x: auto;
}

.preview-area :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
