<template>
  <div class="grid h-screen grid-cols-12">
    <div class="col-span-2 bg-gray-700">
      <!-- SPACES HEADER -->
      <div class="flex items-center justify-between text-gray-400 uppercase pt-7 px-7">
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
          <div class="flex items-center mb-3 space-x-2 text-gray-100 mx-7">
            <FolderOpenIcon class="w-5 h-5" />
            <p class="text-base">JavaScript</p>
          </div>
          <div class="flex items-center py-2 pl-8 space-x-2 bg-gray-800">
            <div class="w-2 h-2 bg-green-400 rounded-full ml-7"></div>
            <p class="text-base text-gray-100">Basics</p>
          </div>
          <div class="flex items-center py-1 pl-8 space-x-2 mx-7">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <p class="text-base text-gray-500">Advanced</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center space-x-2 text-gray-500 mx-7">
            <FolderIcon class="w-5 h-5" />
            <p class="text-base">C++</p>
          </div>
        </div>
        <div class="ml-1 space-y-2">
          <div class="flex items-center py-1 space-x-2 mx-7">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <p class="text-base text-gray-500">AWS</p>
          </div>
        </div>
      </div>
    </div>

    <div class="z-10 col-span-2 bg-gray-800 shadow-2xl">
      <!-- SNIPPETS HEADER -->
      <div class="flex items-center justify-between pt-7 px-7">
        <div class="flex items-center space-x-2">
          <FolderOpenIcon class="w-5 h-5 text-gray-600" />
          <p class="text-base text-gray-400">JavaScript/Basics</p>
        </div>
        <PlusIcon class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" @click="addFile" />
      </div>

      <div class="mt-4">
        <p v-if="files.length === 0" class="flex items-center justify-center text-sm italic text-gray-600">No files created</p>
        <SnippetFile
          v-else
          v-for="file in files"
          :key="file.id"
          :name="file.name"
          :content="file.blocks.length > 0 ? file.blocks[0].value : ''"
          :isSelected="file.id === selectedFile?.id"
          @click="setSelectedFile(file)"
        />
      </div>
    </div>

    <div class="relative col-span-8 pb-32 bg-gray-800">
      <div class="w-7/12 m-auto py-7">
        <ContentDisplay
          v-if="selectedFile"
          :fileId="selectedFile.id"
          :name="selectedFile.name"
          :fileBlocks="selectedFile.blocks"
          @saveFileName="saveFileName(selectedFile.id, $event)"
          @deleteFile="deleteFile(selectedFile.id)"
        />
        <p v-else class="absolute inset-0 flex items-center justify-center italic text-gray-600">No selected file</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { uuid } from 'vue-uuid';
import CollectionIcon from '../assets/icons/collection.svg';
import PlusIcon from '../assets/icons/plus.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import FolderIcon from '../assets/icons/folder.svg';
import SnippetFile from '../components/SnippetFile.vue';
import ContentDisplay from '../components/ContentDisplay.vue';
import { IFile } from '../db';
import { AllActionTypes } from '../store/action-types';
import { AllMutationTypes } from '../store/mutation-types';

export default defineComponent({
  components: {
    CollectionIcon,
    PlusIcon,
    FolderOpenIcon,
    FolderIcon,
    SnippetFile,
    ContentDisplay,
  },
  setup() {
    const store = useStore();

    store.dispatch(AllActionTypes.LOAD_FILES);

    const addFile = (): void => {
      const file = {
        id: uuid.v4(),
        name: 'undefined',
        blocks: [{
          type: 'markdown',
          value: '',
        }],
        createdAt: new Date(),
      } as IFile;

      store.dispatch(AllActionTypes.CREATE_FILE, file);
      setSelectedFile(file);
    };

    const setSelectedFile = (file: IFile | undefined): void => {
      store.commit(AllMutationTypes.SET_SELECTED_FILE, file);
    };

    const saveFileName = (id: string, name: string): void => {
      store.dispatch(AllActionTypes.UPDATE_FILENAME, { id, name });
    };

    const deleteFile = (id: string): void => {
      setSelectedFile(undefined);
      store.commit(AllMutationTypes.DELETE_FILE, id);
    };

    return {
      addFile,
      setSelectedFile,
      saveFileName,
      deleteFile,
      files: computed(() => store.state.fileStore.files),
      selectedFile: computed(() => store.state.fileStore.selectedFile),
    };
  },
});
</script>
