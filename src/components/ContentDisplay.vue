<template>
  <div class="flex items-start space-x-2">
    <CodeIcon class="w-5 h-5 mt-2 text-gray-600" />
    <h1 class="flex flex-col w-full text-2xl text-gray-400">
      <input class="w-full bg-transparent focus:outline-none" v-model="nameInput" @keydown.enter="saveFileName">
      <span class="text-xs text-gray-600">last edited 3 minutes ago</span>
    </h1>
  </div>

  <div class="mt-8">
    <MarkdownEditor class="mb-8" />

    <MonacoEditor />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue';
import CodeIcon from '../assets/icons/code.svg';
import MonacoEditor from './MonacoEditor.vue';
import MarkdownEditor from './MarkdownEditor.vue';

export default defineComponent({
  emits: ['saveFileName'],

  components: {
    CodeIcon,
    MonacoEditor,
    MarkdownEditor,
  },

  props: {
    markdownContent: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const nameInput = ref(props.name);

    const markdownInput = ref(props.markdownContent);

    watch(() => props.name, (newValue) => {
      nameInput.value = newValue;
    });
    watch(() => props.markdownContent, (newValue) => {
      markdownInput.value = newValue;
    });

    const saveFileName = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement;
      target.blur();
      emit('saveFileName', nameInput.value);
    };

    const autoAdjustTextArea = (element: HTMLElement): void => {
      element.style.height = 'inherit';

      const computed = window.getComputedStyle(element);

      const height = parseInt(computed.getPropertyValue('border-top-width'), 10) +
              parseInt(computed.getPropertyValue('padding-top'), 10) +
              element.scrollHeight +
              parseInt(computed.getPropertyValue('padding-bottom'), 10) +
              parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      element.style.height = `${height}px`;
    };

    return {
      nameInput,
      autoAdjustTextArea,
      markdownInput,
      saveFileName,
    };
  },
});
</script>

<style lang="scss">
@import '../styles/markdown.scss';

.monaco-aria-container {
  display: none;
}
</style>
