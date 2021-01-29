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
        <div class="space-y-2">
          <div class="flex items-center space-x-2 text-gray-100">
            <FolderOpenIcon class="w-5 h-5" />
            <p class="text-base">JavaScript</p>
          </div>
          <div class="flex items-center py-1 pl-8 space-x-2 bg-gray-600 rounded-lg">
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
        <div class="space-y-2">
          <div class="flex items-center py-1 space-x-2">
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <p class="text-base text-gray-500">AWS</p>
          </div>
        </div>
      </div>
    </div>

    <div class="z-10 col-span-1 bg-gray-800 shadow-2xl p-7">
      <!-- SNIPPETS HEADER -->
      <div class="flex items-center space-x-2">
        <FolderOpenIcon class="w-5 h-5 text-gray-600" />
        <p class="text-base text-gray-400">JavaScript/Basics</p>
      </div>

      <div class="mt-10 space-y-4">
        <div class="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg">
          <div class="flex items-center space-x-2 text-gray-100">
            <CodeIcon class="w-5 h-5" />
            <p class="text-xl">Code a For Loop</p>
          </div>
          <p class="text-sm text-gray-600">def for_loop(): for i in range(0, 10): print(i)</p>
        </div>
        <div class="px-4 py-3">
          <div class="flex items-center space-x-2 text-gray-500">
            <CodeIcon class="w-5 h-5" />
            <p class="text-xl">Code a For Loop</p>
          </div>
          <p class="text-sm text-gray-600">def for_loop(): for i in range(0, 10): print(i)</p>
        </div>
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
        <p class="text-base text-gray-500">Some small markdown text to describe the instruction for this code snippet.</p>
      </div>
      <div class="mt-4 bg-gray-900 rounded-lg">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionIcon from '../assets/icons/collection.svg';
import PlusIcon from '../assets/icons/plus.svg';
import FolderOpenIcon from '../assets/icons/folder-open.svg';
import FolderIcon from '../assets/icons/folder.svg';
import CodeIcon from '../assets/icons/code.svg';

export default defineComponent({
  components: {
    CollectionIcon,
    PlusIcon,
    FolderOpenIcon,
    FolderIcon,
    CodeIcon,
  },
});
</script>
