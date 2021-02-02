<template>
  <div class="grid h-screen grid-cols-5">
    <div class="col-span-1 bg-gray-700 p-7">
      <!-- SPACES HEADER -->
      <div class="flex items-center justify-between text-gray-400 uppercase">
        <div class="flex items-center space-x-2">
          <CollectionIcon class="w-5 h-5 text-gray-600" />
          <p class="text-xs font-bold tracking-wider">Spaces</p>
        </div>
        <div class="cursor-pointer hover:text-gray-300">
          <PlusIcon class="w-5 h-5" />
        </div>
      </div>

      <!-- DIRECTORIES AND SPACES -->
      <div class="mt-10 space-y-6">
        <div class="space-y-1">
          <div class="flex items-center mb-3 space-x-2 text-gray-100">
            <FolderOpenIcon class="w-5 h-5" />
            <p class="text-base">JavaScript</p>
          </div>
          <div class="flex items-center py-1 pl-8 space-x-2 bg-gray-800 border border-gray-600 rounded-lg">
            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
            <p class="text-base text-gray-100">Basics</p>
          </div>
          <div class="flex items-center py-1 pl-8 space-x-2">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <p class="text-base text-gray-500">Advanced</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center space-x-2 text-gray-500">
            <FolderIcon class="w-5 h-5" />
            <p class="text-base">C++</p>
          </div>
        </div>
        <div class="ml-1 space-y-2">
          <div class="flex items-center py-1 space-x-2">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <p class="text-base text-gray-500">AWS</p>
          </div>
        </div>
      </div>
    </div>

    <div class="z-10 col-span-1 bg-gray-800 shadow-2xl p-7">
      <!-- SNIPPETS HEADER -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <FolderOpenIcon class="w-5 h-5 text-gray-600" />
          <p class="text-base text-gray-400">JavaScript/Basics</p>
        </div>
        <PlusIcon class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" @click="openAddFileInputField" />
      </div>

      <div class="mt-10 space-y-4">
        <div v-show="isAddingFile" class="flex items-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg focus-within:border-gray-500">
          <input
            ref="addFileInputField"
            placeholder="Filename"
            type="text"
            class="w-full px-3 py-2 text-base placeholder-gray-600 bg-transparent focus:outline-none"
          >
          <div class="flex items-center pr-3 space-x-1">
            <PlusIcon class="w-5 h-5 cursor-pointer hover:text-gray-300" />
            <XIcon class="w-4 h-4 cursor-pointer hover:text-gray-300" @click="closeAddFileInputField" />
          </div>
        </div>
        <SnippetFile isSelected />
        <SnippetFile />
      </div>
    </div>

    <div class="col-span-3 bg-gray-800 p-7">
      <div class="flex items-start space-x-2">
        <CodeIcon class="w-5 h-5 mt-2 text-gray-600" />
        <h1 class="flex flex-col text-2xl text-gray-400">
          <span>Code a For Loop</span>
          <span class="text-xs text-gray-600">last edited 3 minutes ago</span>
        </h1>
      </div>

      <div class="mt-8">
        <textarea
          v-show=isMarkdownInputOpen
          ref="markdownTextarea"
          v-model="markdownInput"
          class="w-full px-2 py-1 text-gray-300 bg-gray-900 max-h-96 focus:outline-none"
          style="min-height: 5rem"
          @input="autoAdjustTextArea($event.target)"
          @blur="toggleMarkdownInput"
        ></textarea>
        <VueMarkdownIt v-show="!isMarkdownInputOpen" class="markdown" :source="markdownInput" @dblclick="toggleMarkdownInput" />
        <MonacoEditor />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import VueMarkdownIt from 'vue3-markdown-it';
import CollectionIcon from '../assets/icons/collection.svg';
import PlusIcon from '../assets/icons/plus.svg';
import XIcon from '../assets/icons/x.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import FolderIcon from '../assets/icons/folder.svg';
import CodeIcon from '../assets/icons/code.svg';
import SnippetFile from '../components/SnippetFile.vue';
import MonacoEditor from '../components/MonacoEditor.vue';

export default defineComponent({
  components: {
    VueMarkdownIt,
    CollectionIcon,
    PlusIcon,
    FolderOpenIcon,
    FolderIcon,
    XIcon,
    CodeIcon,
    SnippetFile,
    MonacoEditor,
  },
  setup() {
    const isMarkdownInputOpen = ref(false);
    const markdownInput = '# Hello Markdown';
    const markdownTextarea = ref<HTMLElement | null>(null);

    const isAddingFile = ref(false);
    const addFileInputField = ref<HTMLElement | null>(null);

    const toggleMarkdownInput = (): void => {
      isMarkdownInputOpen.value = !isMarkdownInputOpen.value;

      nextTick(() => {
        if (isMarkdownInputOpen.value && markdownTextarea.value) {
          autoAdjustTextArea(markdownTextarea.value);
          markdownTextarea.value.focus();
        }
      });
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

    const openAddFileInputField = (): void => {
      isAddingFile.value = true;
      nextTick(() => {
        if (addFileInputField.value) {
          addFileInputField.value.focus();
        }
      });
    };

    const closeAddFileInputField = (): void => {
      isAddingFile.value = false;
    };

    return {
      isMarkdownInputOpen,
      markdownInput,
      toggleMarkdownInput,
      autoAdjustTextArea,
      markdownTextarea,
      openAddFileInputField,
      closeAddFileInputField,
      isAddingFile,
      addFileInputField,
    };
  },
});
</script>

<style lang="scss">
@import '../styles/markdown.scss';
</style>
