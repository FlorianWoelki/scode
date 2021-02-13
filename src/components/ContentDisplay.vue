<template>
  <div class="flex items-start space-x-2">
    <CodeIcon class="w-5 h-5 mt-2 text-gray-600" />
    <h1 class="flex flex-col w-full text-2xl text-gray-400">
      <input class="w-full bg-transparent focus:outline-none" v-model="nameInput" @keydown.enter="saveFileName">
      <span class="text-xs text-gray-600">last edited 3 minutes ago</span>
    </h1>
  </div>

  <div class="relative mt-8">
    <Blocks :blocks="blocks" />

    <button v-if="isBlockMenuOpen" class="fixed inset-0 z-40 w-full h-full cursor-default focus:outline-none" tabindex="-1" @click="toggleAddBlockMenu"></button>
    <div class="absolute bottom-0 left-0 z-50 inline-block -mb-16 -ml-10">
      <button
        type="button"
        class="hover:text-gray-600 focus:outline-none"
        :class="{ 'text-gray-600': isBlockMenuOpen, 'text-gray-700': !isBlockMenuOpen }"
        @click="toggleAddBlockMenu"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
      <div v-show="isBlockMenuOpen" class="absolute -mb-24 text-sm text-gray-400 bg-gray-700 rounded-sm shadow-lg w-52">
        <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600" @click="addMarkdownBlock">Add markdown block</div>
        <div
          class="px-4 py-3 mb-1 cursor-pointer hover:bg-gray-600"
          :class="{ 'bg-gray-600': isCodeBlockDropdownOpen }"
          @click="toggleCodeBlockDropdown"
        >Add code block</div>

        <div v-if="isCodeBlockDropdownOpen" class="absolute bottom-0 right-0 text-sm text-gray-400 bg-gray-700 rounded-sm -mb-36 -mr-52 w-52">
          <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600" @click="addCodeBlock('python')">Python</div>
          <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600" @click="addCodeBlock('typescript')">JS/TS</div>
          <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600" @click="addCodeBlock('html')">HTML</div>
          <div class="px-4 py-3 mb-1 cursor-pointer hover:bg-gray-600" @click="addCodeBlock('css')">CSS</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CodeIcon from '../assets/icons/code.svg';
import Blocks from './blocks/Blocks.vue';
import PlusIcon from '../assets/icons/plus.svg';

export type BlockType = {
  type: 'code' | 'markdown';
  value: string;
  isOptionsShowing?: boolean;
  isDeleteHovering?: boolean;
  language?: string;
};

export default defineComponent({
  emits: ['saveFileName'],

  components: {
    CodeIcon,
    PlusIcon,
    Blocks,
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
    const blocks = ref<BlockType[]>([]);
    const isBlockMenuOpen = ref(false);
    const isCodeBlockDropdownOpen = ref(false);

    blocks.value.push({
      value: props.markdownContent,
      type: 'markdown',
    });

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

    const addMarkdownBlock = () => {
      blocks.value.push({
        value: '',
        type: 'markdown',
      });
      isBlockMenuOpen.value = false;
    };

    const addCodeBlock = (language: string) => {
      blocks.value.push({
        value: '',
        type: 'code',
        language,
      });
      isBlockMenuOpen.value = false;
      isCodeBlockDropdownOpen.value = false;
    };

    const toggleAddBlockMenu = () => {
      isBlockMenuOpen.value = !isBlockMenuOpen.value;

      if (isCodeBlockDropdownOpen.value) {
        isCodeBlockDropdownOpen.value = false;
      }
    };

    const toggleCodeBlockDropdown = () => {
      isCodeBlockDropdownOpen.value = !isCodeBlockDropdownOpen.value;
    };

    return {
      nameInput,
      autoAdjustTextArea,
      markdownInput,
      saveFileName,
      addCodeBlock,
      addMarkdownBlock,
      blocks,
      toggleAddBlockMenu,
      isBlockMenuOpen,
      toggleCodeBlockDropdown,
      isCodeBlockDropdownOpen,
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
