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
        <p v-if="files.length === 0" class="flex items-center justify-center text-sm italic text-gray-600">No files created</p>
        <SnippetFile
          v-else
          v-for="file in files"
          :key="file.id"
          :name="file.name"
          :content="file.content"
          :isSelected="file.id === $store.state.selectedFile?.id"
          @click="setSelectedFile(file)"
        />
      </div>
    </div>

    <div class="col-span-3 bg-gray-800 p-7">
      <ContentDisplay
        v-if="$store.state.selectedFile"
        :title="$store.state.selectedFile.name"
        :markdownContent="$store.state.selectedFile.content"
      />
      <p v-else class="flex items-center justify-center text-sm italic text-gray-600">No selected file</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import CollectionIcon from '../assets/icons/collection.svg';
import PlusIcon from '../assets/icons/plus.svg';
import XIcon from '../assets/icons/x.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import FolderIcon from '../assets/icons/folder.svg';
import SnippetFile from '../components/SnippetFile.vue';
import ContentDisplay from '../components/ContentDisplay.vue';

export default defineComponent({
  components: {
    CollectionIcon,
    PlusIcon,
    FolderOpenIcon,
    FolderIcon,
    XIcon,
    SnippetFile,
    ContentDisplay,
  },
  setup() {
    const store = useStore();

    const isAddingFile = ref(false);
    const addFileInputField = ref<HTMLElement | null>(null);

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

    const setSelectedFile = (file: File): void => {
      store.commit('setSelectedFile', file);
    };

    return {
      openAddFileInputField,
      closeAddFileInputField,
      isAddingFile,
      addFileInputField,
      setSelectedFile,
      files: computed(() => store.state.fileStore.files),
    };
  },
});
</script>
