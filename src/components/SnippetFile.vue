<template>
  <div
    class="px-8 py-5 cursor-pointer hover:bg-gray-900"
    :class="{ 'bg-gray-900': isSelected }"
    @click="$emit('click')"
  >
    <div
      class="flex items-center space-x-2"
      :class="{ 'text-gray-100': isSelected, 'text-gray-500': !isSelected }"
    >
      <p class="text-xl">{{ name }}</p>
    </div>
    <p class="mt-1 text-sm text-gray-600">{{ trimmedContent }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  emits: ['click'],

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
    const trimmedContent = computed(() => `${props.content.slice(0, 50)}...`);

    return {
      trimmedContent,
    };
  },
});
</script>
