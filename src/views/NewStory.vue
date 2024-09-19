<script setup>
import { onMounted, onUnmounted, ref, onBeforeUnmount, watch } from 'vue';
import axios from 'axios'

import AppHeader from '../components/Header.vue'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
const editor = ref(null);
const editorRef = ref(null); // 用于存储 DOM 引用

onMounted(() => {
    editor.value = new EditorJS({
        holder: editorRef.value, // 使用 ref 而不是 ID
        autofocus: true,
        tools: {
            header: {
                class: Header,
                config: {
                    levels: [1, 2, 3, 4], // 可转换的标题
                    defaultLevel: 1, // 默认标题 // 默认创建的标题
                }
            },
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: '/uploadFile',
                        byUrl: '/uploadUrl'
                    }
                }
            },
            list: {
                class: List,
                inlineToolbar: true, // 配置是否启用工具栏
            },
            code: {
                class: CodeTool,
            },
            table: {
                class: Table,
                inlineToolbar: true, // 启用表格工具栏
            }
        }
    });
});

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy(); // 确保在组件卸载时销毁编辑器实例
    }
});

const saveData = () => {
    editor.value.save().then((outputData) => {
        console.log('Article data:', outputData);
        // axios.post('/api/save-article', outputData)
        //     .then(response => {
        //         console.log('Saved successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Save failed:', error);
        //     });
    }).catch((error) => {
        console.error('Saving failed:', error);
    });
};
</script>

<template>
    <AppHeader />

    <div class="container">
        <div class="col-lg-12 px-0" ref="editorRef"></div>
        <button type="button" class="btn btn-outline-dark" @click="saveData">保存文章</button>
    </div>
</template>

<style scoped></style>
