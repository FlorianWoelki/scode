<template>
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

    onMounted(() => {
      loader.init().then((monaco) => {
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
    };
  },
});
</script>
