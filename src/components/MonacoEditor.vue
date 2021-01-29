<template>
  <div v-if="isLoading" class="flex items-center justify-center mt-4">
    <svg class="w-6 h-6 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  <div class="w-full h-auto mt-4 rounded-lg" ref="monacoElement"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';
import DraculaTheme from '../monaco/DraculaTheme';

export default defineComponent({
  setup() {
    const monacoElement = ref<HTMLElement | null>(null);
    const isLoading = ref(true);

    onMounted(() => {
      loader.init().then((monaco) => {
        isLoading.value = false;
        if (monacoElement.value) {
          const editor = monaco.editor.create(monacoElement.value, {
            value: 'console.log("Hello World");',
            language: 'typescript',
            automaticLayout: true,
            selectOnLineNumbers: true,
            theme: 'vs-dark',
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingStrategy: 'advanced',
            overviewRulerLanes: 0,
          });

          monaco.editor.defineTheme('Dracula', DraculaTheme as monaco.editor.IStandaloneThemeData);
          monaco.editor.setTheme('Dracula');

          const updateHeight = () => {
            const contentHeight = Math.min(1000, editor.getContentHeight());
            monacoElement.value!.style.width = '100%';
            monacoElement.value!.style.height = `${contentHeight}px`;
            editor.layout({ width: 1000, height: contentHeight });
          };

          editor.onDidContentSizeChange(updateHeight);
          updateHeight();
        }
      });
    });

    return {
      monacoElement,
      isLoading,
    };
  },
});
</script>
