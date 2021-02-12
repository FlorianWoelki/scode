<template>
  <div class="flex items-start space-x-2">
    <CodeIcon class="w-5 h-5 mt-2 text-gray-600" />
    <h1 class="flex flex-col w-full text-2xl text-gray-400">
      <input class="w-full bg-transparent focus:outline-none" v-model="nameInput" @keydown.enter="saveFileName">
      <span class="text-xs text-gray-600">last edited 3 minutes ago</span>
    </h1>
  </div>

  <div class="mt-8">
    <Editor :value="markdownContent" @add-code="addMonacoEditor" />

    <MonacoEditor v-for="(index, monacoEditor) in monacoEditors" :key="index" :value="monacoEditor.value" />

    <button v-if="isBlockMenuOpen" class="fixed inset-0 z-40 w-full h-full cursor-default focus:outline-none" tabindex="-1" @click="toggleAddBlockMenu"></button>
    <div class="relative z-50 inline-block">
      <button
        type="button"
        class="mt-4 hover:text-gray-600 focus:outline-none"
        :class="{ 'text-gray-600': isBlockMenuOpen, 'text-gray-700': !isBlockMenuOpen }"
        @click="toggleAddBlockMenu"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
      <div v-show="isBlockMenuOpen" class="absolute bottom-0 -mb-24 text-sm text-gray-400 bg-gray-700 rounded-sm shadow-lg w-52">
        <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600">Add markdown block</div>
        <div class="px-4 py-3 mb-1 cursor-pointer hover:bg-gray-600">Add code block</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CodeIcon from '../assets/icons/code.svg';
import MonacoEditor from './MonacoEditor.vue';
import Editor from './editor/Editor.vue';
import PlusIcon from '../assets/icons/plus.svg';

type MonacoEditorType = {
  value: string;
};

export default defineComponent({
  emits: ['saveFileName'],

  components: {
    CodeIcon,
    PlusIcon,
    MonacoEditor,
    Editor,
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
    const monacoEditors = ref<MonacoEditorType[]>([]);
    const isBlockMenuOpen = ref(false);

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

    const addMonacoEditor = () => {
      monacoEditors.value.push({
        value: '',
      });
    };

    const toggleAddBlockMenu = () => {
      isBlockMenuOpen.value = !isBlockMenuOpen.value;
    };

    return {
      nameInput,
      autoAdjustTextArea,
      markdownInput,
      saveFileName,
      addMonacoEditor,
      monacoEditors,
      toggleAddBlockMenu,
      isBlockMenuOpen,
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
