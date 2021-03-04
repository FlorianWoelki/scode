<template>
  <div class="grid h-screen grid-cols-12">
    <div class="z-10 col-span-3 bg-gray-800 shadow-2xl">
      <div class="grid h-full grid-cols-12">
        <!-- CODE SPACES -->
        <div class="col-span-3 p-1 mt-6 space-y-4">
          <div class="flex flex-col items-center justify-center mx-auto">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-600 border-2 border-gray-400 rounded-lg">
              <p class="font-light text-white">JS</p>
            </div>
            <p class="mt-1 text-sm font-light text-gray-400">JavaScript</p>
          </div>
          <div class="flex flex-col items-center justify-center mx-auto">
            <div class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-lg">
              <p class="font-light text-white">JS</p>
            </div>
          </div>
          <PlusIcon class="flex justify-center w-8 h-8 mx-auto text-gray-600" />
        </div>

        <!-- CODE SNIPPETS -->
        <div class="col-span-9 border-l border-gray-700">
          <div class="flex items-center justify-between pt-7 px-7">
            <div class="flex items-center space-x-2">
              <FolderOpenIcon class="w-5 h-5 text-gray-600" />
              <p class="text-base text-gray-400">JavaScript</p>
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
              :content="file.blocks.length > 0 ? file.blocks[0].savedValue || '' : ''"
              :isSelected="file.id === selectedFile?.id"
              @click="setSelectedFile(file)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="relative col-span-9 pb-32 bg-gray-800">
      <div class="w-7/12 m-auto py-7">
        <ContentDisplay
          v-if="selectedFile"
          :file="selectedFile"
          @saveFileName="saveFileName(selectedFile.id, $event)"
          @deleteFile="deleteFile(selectedFile.id)"
        />
        <p v-else class="absolute inset-0 flex items-center justify-center italic text-gray-600">No selected file</p>
      </div>

      <ModalButton
        class="absolute bottom-0 right-0 p-4 mb-6 mr-6 text-white bg-indigo-700 rounded-full cursor-pointer hover:bg-indigo-800 focus:outline-none"
      >
        <ClipboardList class="w-6 h-6" />
      </ModalButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { uuid } from 'vue-uuid';
import PlusIcon from '../assets/icons/plus.svg';
import ClipboardList from '../assets/icons/clipboard-list.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import SnippetFile from '../components/SnippetFile.vue';
import ContentDisplay from '../components/ContentDisplay.vue';
import ModalButton from '../components/ui/ModalButton.vue';
import { IFile } from '../db';
import { AllActionTypes } from '../store/action-types';
import { AllMutationTypes } from '../store/mutation-types';

export default defineComponent({
  components: {
    PlusIcon,
    FolderOpenIcon,
    SnippetFile,
    ContentDisplay,
    ClipboardList,
    ModalButton,
  },

  setup() {
    const store = useStore();
    const isShortcutModalOpen = ref(false);

    store.dispatch(AllActionTypes.LOAD_FILES);

    const addFile = (): void => {
      const file = {
        id: uuid.v4(),
        name: 'undefined',
        blocks: [{
          type: 'markdown',
          savedValue: '',
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
      store.dispatch(AllActionTypes.DELETE_FILE, id);
    };

    return {
      addFile,
      setSelectedFile,
      saveFileName,
      deleteFile,
      isShortcutModalOpen,
      files: computed(() => store.state.fileStore.files),
      selectedFile: computed(() => store.state.fileStore.selectedFile),
    };
  },
});
</script>
