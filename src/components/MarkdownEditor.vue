<template>
  <div ref="editor"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Quill from 'quill';
import QuillMarkdown from 'quilljs-markdown';

export default defineComponent({
  setup() {
    const editor = ref<any>(null);

    onMounted(() => {
      const quillEditor = new Quill(editor.value, {
        placeholder: 'Write your markdown here...',
      });
      /* eslint-disable-next-line */
      new QuillMarkdown(quillEditor);

      if (!quillEditor.root.classList.contains('markdown')) {
        quillEditor.root.classList.add('markdown');
      }
    });

    return {
      editor,
    };
  },
});
</script>

<style>
@import '../styles/markdown.scss';

.ql-editor {
  @apply focus:outline-none text-white;
}
.ql-editor.ql-blank::before {
  @apply text-gray-500;
}
.ql-clipboard {
  @apply hidden;
}
</style>
