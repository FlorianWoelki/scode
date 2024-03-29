<template>
  <h1 class="relative flex flex-col w-full text-2xl text-gray-400">
    <div class="absolute top-0 left-0 z-50 mt-2 -ml-7">
      <DotsVerticalIcon
        class="w-5 h-5 cursor-pointer hover:text-gray-600"
        :class="{ 'text-gray-700': !isFileMenuOpen, 'text-gray-600': isFileMenuOpen }"
        @click="toggleFileMenu"
      />
      <div v-show="isFileMenuOpen" class="absolute left-0 mt-2 text-sm text-gray-400 bg-gray-700 rounded-sm shadow-lg w-52">
        <div class="px-4 py-3 cursor-pointer hover:bg-gray-600" @click="deleteActiveFile">Delete file</div>
      </div>
    </div>
    <input
      class="w-full text-3xl bg-transparent focus:outline-none"
      v-model="nameInput"
      @keydown.enter="saveFileName"
      @blur="saveFileName"
      :maxlength="FILE_CONFIG.MAX_FILE_LENGTH"
    >
    <span class="text-xs text-gray-600">created on {{ createdDateOfFile }}</span>
  </h1>

  <div class="relative mt-8">
    <Blocks
      :blocks="blocks"
      :shouldForceUpdate="shouldForceUpdate"
      @deleteBlock="deleteBlock"
      @moveBlockUp="moveBlockUp"
      @moveBlockDown="moveBlockDown"
      @blur="updateValueOfBlocks"
      @keypress="handleShortcuts"
      @changeContent="updateBlocksInDatabase"
    />

    <button
      v-if="isBlockMenuOpen || isFileMenuOpen"
      class="fixed inset-0 z-40 w-full h-full cursor-default focus:outline-none" tabindex="-1"
      @click="isBlockMenuOpen ? toggleAddBlockMenu() : toggleFileMenu()"
    ></button>
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
        <div class="px-4 py-3 mt-1 cursor-pointer hover:bg-gray-600" @click="addMarkdownBlock()">Add markdown block</div>
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
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Blocks from './blocks/Blocks.vue';
import PlusIcon from '../assets/icons/plus.svg';
import DotsVerticalIcon from '../assets/icons/dots-vertical.svg';
import { BlockType } from './blocks/BlockType';
import { AllActionTypes } from '../store/action-types';
import { IFile } from '../db';
import shortcuts from '../util/shortcuts';
import { FILE_CONFIG } from '../util/config';

export default defineComponent({
  emits: ['saveFileName', 'deleteFile'],

  components: {
    PlusIcon,
    Blocks,
    DotsVerticalIcon,
  },

  props: {
    file: {
      type: Object as PropType<IFile>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const nameInput = ref(props.file.name);
    const blocksInput = ref(props.file.blocks);
    const blocks = ref<BlockType[]>([...blocksInput.value]);
    const isBlockMenuOpen = ref(false);
    const isCodeBlockDropdownOpen = ref(false);
    const isFileMenuOpen = ref(false);
    const shouldForceUpdate = ref(false);

    watch(() => props.file.name, (newValue) => {
      nameInput.value = newValue;
    });
    watch(() => props.file.blocks, (newValue) => {
      blocks.value = newValue;
    });

    const handleShortcuts = ({ event, block }: { event: KeyboardEvent, block: BlockType }) => {
      if (event.ctrlKey && event.shiftKey) {
        if (event.keyCode === shortcuts.addCodeBlock.keyCode || event.key === shortcuts.addCodeBlock.key) {
          const lastUsedCodeLanguage = store.getters['fileStore/lastUsedCodeLanguage'];
          addCodeBlock(lastUsedCodeLanguage);
        } else if (shortcuts.addMarkdownBlock.keyCode === event.keyCode || event.key === shortcuts.addMarkdownBlock.key) {
          addMarkdownBlock();
        } else if ((block.type === 'code' && event.keyCode === shortcuts.moveBlockUp.monacoKeyCode) || (block.type === 'markdown' && event.keyCode === shortcuts.moveBlockUp.keyCode)) { // Up Key
          moveBlockUp(block, true);
          shouldForceUpdate.value = !shouldForceUpdate.value;
        } else if ((block.type === 'code' && event.keyCode === shortcuts.moveBlockDown.monacoKeyCode) || (block.type === 'markdown' && event.keyCode === shortcuts.moveBlockDown.keyCode)) { // Down Key
          moveBlockDown(block, true);
          shouldForceUpdate.value = !shouldForceUpdate.value;
        } else if (event.key === shortcuts.deleteBlock.key || event.keyCode === shortcuts.deleteBlock.keyCode) { // remove key
          event.preventDefault();
          deleteBlock(block);
        }
      }
    };

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

    const addMarkdownBlock = (value?: string) => {
      blocks.value.push({
        savedValue: value || '',
        type: 'markdown',
        isFocused: true,
      });
      isBlockMenuOpen.value = false;
    };

    const addCodeBlock = (language: string) => {
      blocks.value.push({
        savedValue: '',
        type: 'code',
        isFocused: true,
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

    const deleteBlock = (block: BlockType) => {
      const filteredBlockIndex = blocks.value.indexOf(block);
      if (filteredBlockIndex !== -1) {
        blocks.value.splice(filteredBlockIndex, 1);
      }
      updateBlocksInDatabase(blocks.value);
    };

    const moveBlockUp = (block: BlockType, shouldFocus = false) => {
      const blockIndex = blocks.value.indexOf(block);
      if (blockIndex === 0) {
        return;
      }

      updateValueOfBlocks();

      const copiedBlock = block;
      deleteBlock(block);
      blocks.value.splice(blockIndex - 1, 0, copiedBlock);
      if (shouldFocus) {
        focusBlock(copiedBlock);
      }
      updateBlocksInDatabase(blocks.value);
    };

    const moveBlockDown = (block: BlockType, shouldFocus = false) => {
      const blockIndex = blocks.value.indexOf(block);
      if (blockIndex === blocks.value.length - 1) {
        return;
      }

      updateValueOfBlocks();

      const copiedBlock = block;
      deleteBlock(block);
      blocks.value.splice(blockIndex + 1, 0, copiedBlock);
      if (shouldFocus) {
        focusBlock(copiedBlock);
      }
      updateBlocksInDatabase(blocks.value);
    };

    const focusBlock = (block: BlockType) => {
      blocks.value.forEach((block) => {
        block.isFocused = false;
      });
      block.isFocused = true;
    };

    const updateValueOfBlocks = () => {
      blocks.value.map((block) => {
        block.savedValue = block.cachedValue || block.savedValue;
        return block;
      });
    };

    const toggleFileMenu = () => {
      isFileMenuOpen.value = !isFileMenuOpen.value;
    };

    const deleteActiveFile = () => {
      emit('deleteFile');
      isFileMenuOpen.value = false;
    };

    const updateBlocksInDatabase = (blocks: BlockType[]) => {
      store.dispatch(AllActionTypes.UPDATE_FILE, {
        id: props.file.id,
        // name: props.file.name,
        blocks: blocks,
      } as IFile);
    };

    const createdDateOfFile = computed((): string => {
      const date = props.file.createdAt;
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    });

    return {
      FILE_CONFIG,
      nameInput,
      autoAdjustTextArea,
      saveFileName,
      addCodeBlock,
      addMarkdownBlock,
      blocks,
      toggleAddBlockMenu,
      isBlockMenuOpen,
      toggleCodeBlockDropdown,
      isCodeBlockDropdownOpen,
      deleteBlock,
      moveBlockUp,
      moveBlockDown,
      updateValueOfBlocks,
      toggleFileMenu,
      isFileMenuOpen,
      deleteActiveFile,
      handleShortcuts,
      shouldForceUpdate,
      updateBlocksInDatabase,
      createdDateOfFile,
    };
  },
});
</script>

<style>
@import "../styles/markdown.css";

.monaco-aria-container {
  display: none;
}
</style>
