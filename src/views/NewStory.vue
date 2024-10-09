<template>
  <div class="container">
    <AppHeader />
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div id="editor"></div>
        <input type="hidden" id="body" />
        <button button class="btn btn-primary btn-lg" type="button" id="submit" :disabled="true">提交</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import AppHeader from '../components/Header.vue'

import { onMounted, ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import ImageTool from '@editorjs/image';
import editorjsCodecup from '@calumk/editorjs-codecup';

const editor = ref(null);
const isSubmitDisabled = ref(true);

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editor',
    autofocus: true,
    // placeholder: '开始写作...',
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: '请输入标题',
          levels: [1, 2, 3, 4, 5],
          defaultLevel: 1,
        },
        shortcut: 'CMD+SHIFT+H',
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: '输入引语',
          captionPlaceholder: '输入引语作者等信息',
        },
        shortcut: 'CMD+SHIFT+O',
      },
      delimiter: {
        class: Delimiter,
        shortcut: 'CMD+SHIFT+D',
      },
      list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L',
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        config: {
          titlePlaceholder: '标题',
          messagePlaceholder: '内容',
        },
      },
      marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      code: {
        class: editorjsCodecup,
        shortcut: 'CMD+SHIFT+C',
        config: {

        }
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C',
      },
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: '', // 解析 url 的后端地址
        },
      },
      embed: Embed,
      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T',
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: '', // Your backend file uploader endpoint
            byUrl: '', // Your endpoint that provides uploading by Url
          },
          additionalRequestData: {
            // 比如 Laravel 的 csrf_token： '_token': '',
          },
        },
        shortcut: 'CMD+SHIFT+I',
      },
    },
    i18n: {
      messages: {
        // i18n messages (same as your original code)
      },
    },
    data: {
      blocks: [
        {
          type: 'header',
          data: {
            text: ''
          }
        }
      ]
    },
    onReady: () => {
      console.log('Editor.js is ready to work!');
    },
    onChange: (api, event) => {
      editor.value.save()
        .then((savedData) => {
          document.getElementById("body").value = JSON.stringify(savedData);
          isSubmitDisabled.value = savedData.blocks.length === 0;
        })
        .catch((error) => {
          console.error('Saving error', error);
        });
    },
  });
});
</script>

<style>
/* Add your styles here */
</style>
