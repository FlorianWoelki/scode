<template>
  <CKEditor :editor="editor" v-model="editorData" :config="editorConfig" class="markdown" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import Quill from 'quill';
import QuillMarkdown from 'quilljs-markdown';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default defineComponent({
  components: {
    CKEditor: CKEditor.component,
  },

  props: {
    content: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Hello</p>',
      editorConfig: {
        toolbar: [],
      },
    };
  },
});
</script>

<style>
@import '../styles/markdown.scss';

</style>
