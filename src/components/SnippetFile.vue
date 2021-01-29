<template>
  <div
    class="px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-900"
    :class="{ 'bg-gray-900 border border-gray-700': isSelected }"
  >
    <div
      class="flex items-center space-x-2"
      :class="{ 'text-gray-100': isSelected, 'text-gray-500': !isSelected }"
    >
      <CodeIcon class="w-5 h-5" />
      <p class="text-xl">Code a For Loop</p>
    </div>
    <p class="text-sm text-gray-600">def for_loop(): for i in range(0, 10): print(i)</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeIcon from '../assets/icons/code.svg';

export default defineComponent({
  components: {
    CodeIcon,
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
