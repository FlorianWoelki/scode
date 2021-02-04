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
      const quillEditor = new Quill(editor.value, {});
      /* eslint-disable-next-line */
      new QuillMarkdown(quillEditor);
    });

    return {
      editor,
    };
  },
});
</script>

<style lang="scss">
@import '../styles/markdown.scss';

.ql-editor {
  @apply focus:outline-none text-white markdown;
}
</style>
