<template>
  <div class="editor-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="tool-btn" title="撤销" @click="undo">
          <i class="bi bi-arrow-counterclockwise"></i>
        </button>
        <button class="tool-btn" title="重做" @click="redo">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
        <div class="divider"></div>

        <button class="tool-btn" title="清除格式" @click="clearFormat">
          <i class="bi bi-text-paragraph"></i>
        </button>
        <div class="divider"></div>

        <button class="tool-btn dropdown" title="标题">
          <span>标题</span>
          <div class="dropdown-content">
            <div @click="insertHeading(1)">H1</div>
            <div @click="insertHeading(2)">H2</div>
            <div @click="insertHeading(3)">H3</div>
          </div>
        </button>

        <button class="tool-btn" title="粗体" @click="toggleBold">
          <i class="bi bi-type-bold"></i>
        </button>
        <button class="tool-btn" title="斜体" @click="toggleItalic">
          <i class="bi bi-type-italic"></i>
        </button>

        <button class="tool-btn" title="有序列表" @click="insertOrderedList">
          <i class="bi bi-list-ol"></i>
        </button>
        <button class="tool-btn" title="无序列表" @click="insertUnorderedList">
          <i class="bi bi-list-ul"></i>
        </button>

        <button class="tool-btn" title="目录" @click="insertToc">
          <i class="bi bi-list-check"></i>
        </button>

        <button class="tool-btn" title="引用" @click="insertQuote">
          <i class="bi bi-quote"></i>
        </button>

        <button class="tool-btn" title="代码块" @click="insertCode">
          <i class="bi bi-code-square"></i>
        </button>

        <button class="tool-btn" title="数学公式" @click="insertMath">
          <i class="bi bi-calculator"></i>
        </button>

        <button class="tool-btn" title="插入图片" @click="insertImage">
          <i class="bi bi-image"></i>
        </button>

        <button class="tool-btn" title="插入链接" @click="insertLink">
          <i class="bi bi-link-45deg"></i>
        </button>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="editor-content">
      <!-- 标题输入框 -->
      <input
        type="text"
        class="title-input"
        v-model="title"
        placeholder="请输入标题（最多 100 个字）"
        maxlength="100"
      />

      <!-- 正文编辑器 -->
      <div class="content-area">
        <textarea
          ref="editor"
          v-model="content"
          class="markdown-input"
          placeholder="请输入正文"
          @input="handleInput"
          @select="handleSelect"
          @keydown="handleKeydown"
        ></textarea>
        <div class="markdown-preview markdown-body" v-html="renderedContent"></div>
      </div>
    </div>

    <!-- 底部工具栏 -->
    <div class="bottom-toolbar">
      <div class="left">
        <span>字数：{{ wordCount }}</span>
        <span class="markdown-tip">Markdown 语法识别中</span>
      </div>
      <div class="right">
        <button class="draft-btn">存草稿</button>
        <button class="preview-btn">预览</button>
        <button class="publish-btn" :disabled="!canPublish">发布</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import katex from 'katex'

// 状态
const title = ref('')
const content = ref('')
const editor = ref(null)
const selection = ref({ start: 0, end: 0 })

// 编辑历史
const history = ref([])
const historyIndex = ref(-1)

// 渲染 Markdown
const renderedContent = computed(() => {
  try {
    // 配置 marked
    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: (code, lang) => {
        // 这里可以集成代码高亮
        return code
      }
    })

    let rendered = marked(content.value)

    // 处理数学公式
    rendered = rendered.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex, { displayMode: true })
      } catch (err) {
        return tex
      }
    })

    rendered = rendered.replace(/\$(.*?)\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex, { displayMode: false })
      } catch (err) {
        return tex
      }
    })

    return rendered
  } catch (err) {
    console.error('Rendering error:', err)
    return content.value
  }
})

// 字数统计
const wordCount = computed(() => {
  return content.value.length
})

// 是否可以发布
const canPublish = computed(() => {
  return title.value.trim() && content.value.trim()
})

// 处理选择
const handleSelect = (e) => {
  selection.value = {
    start: e.target.selectionStart,
    end: e.target.selectionEnd
  }
}

// 插入文本
const insertText = (before, after = '') => {
  const textarea = editor.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.slice(start, end)

  content.value =
    content.value.slice(0, start) + before + selectedText + after + content.value.slice(end)

  // 保存历史
  saveHistory()

  // 恢复光标
  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
  })
}

// 保存历史
const saveHistory = () => {
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(content.value)
  historyIndex.value++
}

// 撤销/重做
const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    content.value = history.value[historyIndex.value]
  }
}

const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    content.value = history.value[historyIndex.value]
  }
}

// 工具栏功能
const clearFormat = () => {
  const textarea = editor.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = content.value.slice(start, end)

  // 移除 Markdown 标记
  const cleaned = text.replace(/[#*_`~]/g, '')
  insertText(cleaned)
}

const insertHeading = (level) => {
  insertText('#'.repeat(level) + ' ')
}

const toggleBold = () => insertText('**', '**')
const toggleItalic = () => insertText('*', '*')
const insertOrderedList = () => insertText('1. ')
const insertUnorderedList = () => insertText('- ')
const insertQuote = () => insertText('> ')
const insertCode = () => insertText('```\n', '\n```')
const insertMath = () => insertText('$$\n', '\n$$')
const insertImage = () => insertText('![图片描述](', ')')
const insertLink = () => insertText('[链接文字](', ')')
const insertToc = () => insertText('[TOC]\n\n')

// 处理快捷键
const handleKeydown = (e) => {
  // Tab 键
  if (e.key === 'Tab') {
    e.preventDefault()
    insertText('    ')
  }

  // 保存
  if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    // 实现保存逻辑
  }

  // 其他快捷键...
}

// 自动保存
let autoSaveTimer
const handleInput = () => {
  if (autoSaveTimer) clearTimeout(autoSaveTimer)
  autoSaveTimer = setTimeout(() => {
    saveHistory()
  }, 1000)
}
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid #e5e6eb;
}

.toolbar {
  padding: 8px;
  border-bottom: 1px solid #e5e6eb;
  display: flex;
  align-items: center;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tool-btn {
  padding: 6px;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #1a1a1a;
}

.tool-btn:hover {
  background: #f7f8fa;
}

.divider {
  width: 1px;
  height: 16px;
  background: #e5e6eb;
  margin: 0 8px;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #e5e6eb;
  border-radius: 4px;
  padding: 4px 0;
  z-index: 1000;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content div {
  padding: 4px 12px;
  cursor: pointer;
}

.dropdown-content div:hover {
  background: #f7f8fa;
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title-input {
  border: none;
  padding: 16px;
  font-size: 24px;
  font-weight: 600;
  outline: none;
}

.content-area {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
}

.markdown-input {
  resize: none;
  border: none;
  outline: none;
  font-family: monospace;
  padding: 0;
  overflow-y: auto;
}

.markdown-preview {
  overflow-y: auto;
  padding: 0 16px;
}

.bottom-toolbar {
  padding: 12px 16px;
  border-top: 1px solid #e5e6eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.markdown-tip {
  color: #8590a6;
  margin-left: 16px;
}

.draft-btn,
.preview-btn,
.publish-btn {
  padding: 6px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.draft-btn {
  background: none;
  color: #8590a6;
}

.preview-btn {
  background: #f7f8fa;
  color: #1a1a1a;
}

.publish-btn {
  background: #056de8;
  color: #fff;
}

.publish-btn:disabled {
  background: #8590a6;
  cursor: not-allowed;
}

/* Markdown 样式 */
.markdown-body {
  font-size: 15px;
  line-height: 1.75;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  font-weight: 600;
  line-height: 1.5;
  margin: 1.5em 0 1em;
}

.markdown-body h1 {
  font-size: 24px;
}

.markdown-body h2 {
  font-size: 20px;
}

.markdown-body h3 {
  font-size: 18px;
}

.markdown-body p {
  margin: 1em 0;
}

.markdown-body code {
  background: #f6f6f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-body pre {
  background: #f6f6f6;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.markdown-body blockquote {
  border-left: 4px solid #e5e6eb;
  margin: 1em 0;
  padding-left: 1em;
  color: #646464;
}
</style>
