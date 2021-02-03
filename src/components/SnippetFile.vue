<template>
  <div
    class="px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-900"
    :class="{ 'bg-gray-900 border border-gray-700': isSelected }"
    @click="$emit('click')"
  >
    <div
      class="flex items-center space-x-2"
      :class="{ 'text-gray-100': isSelected, 'text-gray-500': !isSelected }"
    >
      <CodeIcon class="w-5 h-5" />
      <p class="text-xl">{{ name }}</p>
    </div>
    <p class="text-sm text-gray-600">{{ trimmedContent }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import CodeIcon from '../assets/icons/code.svg';

export default defineComponent({
  emits: ['click'],
  components: {
    CodeIcon,
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const trimmedContent = computed(() => `${props.content.slice(0, 70)}...`);

    return {
      trimmedContent,
    };
  },
});
</script>
