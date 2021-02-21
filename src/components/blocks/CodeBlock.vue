<template>
  <div v-if="isLoading" class="flex items-center justify-center">
    <svg class="w-6 h-6 text-gray-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  <div class="w-full mt-4" ref="monacoElement" style="max-height: 500px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import DraculaTheme from '../../monaco/DraculaTheme';

export default defineComponent({
  emits: ['focus', 'blur', 'input', 'keypress'],

  props: {
    value: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'typescript',
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const monacoElement = ref<HTMLElement | null>(null);
    const isLoading = ref(true);

    onMounted(() => {
      isLoading.value = false;
      if (monacoElement.value) {
        const editor = monaco.editor.create(monacoElement.value, {
          value: props.value,
          language: props.language,
          selectOnLineNumbers: true,
          theme: 'vs-dark',
          fontSize: 14,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalSliderSize: 17,
            horizontalScrollbarSize: 17,
            useShadows: false,
          },
        });

        editor.onDidBlurEditorText(() => {
          emit('blur');
        });
        editor.onDidFocusEditorText(() => {
          emit('focus');
        });
        editor.onDidChangeModelContent((event) => {
          emit('input', editor.getValue());
        });
        editor.onKeyDown((event) => {
          emit('keypress', event);
        });

        monaco.editor.defineTheme('Dracula', DraculaTheme as monaco.editor.IStandaloneThemeData);
        monaco.editor.setTheme('Dracula');

        if (props.isFocused) {
          editor.focus();
        }

        const updateHeight = () => {
          const contentHeight = Math.min(1000, editor.getContentHeight());
          monacoElement.value!.style.width = '100%';
          monacoElement.value!.style.height = `${contentHeight}px`;
          editor.layout();
        };

        editor.onDidContentSizeChange(updateHeight);
        updateHeight();
      }
    });

    return {
      monacoElement,
      isLoading,
    };
  },
});
</script>
