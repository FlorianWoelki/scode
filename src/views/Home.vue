<template>
  <div class="grid h-screen grid-cols-12">
    <div class="z-10 col-span-3 bg-gray-800 shadow-2xl">
      <div class="grid h-full grid-cols-12">
        <!-- CODE SPACES -->
        <div class="col-span-3 p-1 mt-6 space-y-4">
          <Space
            v-for="space in spaces"
            :key="space"
            :name="space.name"
            :isSelected="selectedSpace ? space.id === selectedSpace.id : false"
            @click="selectSpace(space)"
          />
          <PlusIcon class="flex justify-center w-8 h-8 mx-auto text-gray-600" />
        </div>

        <!-- CODE SNIPPETS -->
        <div class="relative col-span-9 border-l border-gray-700">
          <p v-if="!selectedSpace" class="absolute inset-0 flex items-center justify-center italic text-gray-600 mt-7">No space selected</p>
          <div v-else>
            <div class="flex items-center justify-between pt-7 px-7">
              <div class="flex items-center space-x-2">
                <FolderOpenIcon class="w-5 h-5 text-gray-600" />
                <p class="text-base text-gray-400">{{ selectedSpace.name }}</p>
              </div>
              <PlusIcon class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" @click="addFile" />
            </div>

            <div class="mt-4">
              <p v-if="files.length === 0" class="flex items-center justify-center text-sm italic text-gray-600">No file selected</p>
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
        <template #button>
          <ClipboardList class="w-6 h-6" />
        </template>

        <div class="p-4 text-gray-300">
          <h1 class="text-2xl text-gray-200">Scode Shortcuts</h1>

          <ul class="mt-6 space-y-4">
            <li v-for="(value, key) in shortcuts" :key="key">
              <div class="grid grid-cols-2">
                <div v-if="value.isCtrlAndShift">
                  <span class="key">Ctrl</span>
                  +
                  <span class="key">Shift</span>
                  +
                  <span class="key">{{ value.key }}</span>
                </div>
                <div v-else>
                  <span class="key">{{ value.key }}</span>
                </div>

                <div class="text-gray-400">
                  {{ value.description }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </ModalButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { uuid } from 'vue-uuid';
import PlusIcon from '../assets/icons/plus.svg';
import ClipboardList from '../assets/icons/clipboard-list.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import SnippetFile from '../components/SnippetFile.vue';
import Space from '../components/Space.vue';
import ContentDisplay from '../components/ContentDisplay.vue';
import ModalButton from '../components/ui/ModalButton.vue';
import { IFile, ISpace } from '../db';
import { AllActionTypes } from '../store/action-types';
import { AllMutationTypes } from '../store/mutation-types';
import shortcuts from '../util/shortcuts';

export default defineComponent({
  components: {
    PlusIcon,
    FolderOpenIcon,
    SnippetFile,
    ContentDisplay,
    ClipboardList,
    ModalButton,
    Space,
  },

  setup() {
    const store = useStore();
    const isShortcutModalOpen = ref(false);

    store.dispatch(AllActionTypes.LOAD_FILES);
    store.dispatch(AllActionTypes.LOAD_SPACES);

    const selectedSpace = computed(() => store.state.spaceStore.selectedSpace) as ComputedRef<ISpace>;

    const addFile = (): void => {
      const file = {
        id: uuid.v4(),
        spaceId: selectedSpace.value.id,
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

    const selectSpace = (space: ISpace): void => {
      store.commit(AllMutationTypes.SELECT_SPACE, space);
    };

    const files = computed(() => {
      const selectedSpace = store.state.spaceStore.selectedSpace as ISpace | undefined;
      if (selectedSpace) {
        const storeFiles = store.state.fileStore.files as IFile[];
        return storeFiles.filter((file) => file.spaceId === selectedSpace.id);
      }
      return [];
    });

    return {
      addFile,
      setSelectedFile,
      saveFileName,
      deleteFile,
      isShortcutModalOpen,
      shortcuts,
      selectSpace,
      files,
      selectedSpace,
      spaces: computed(() => store.state.spaceStore.spaces),
      selectedFile: computed(() => store.state.fileStore.selectedFile),
    };
  },
});
</script>

<style lang="postcss">
.key {
  @apply bg-indigo-400 text-indigo-900 px-2 py-1 rounded;
}
</style>
