<template>
  <div class="flex flex-col items-center justify-center mx-auto cursor-pointer">
    <div
      class="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-lg"
      :class="{ 'border-2 border-gray-400': isSelected }"
    >
      <p class="font-light text-white">{{ nameSlug }}</p>
    </div>
    <p class="mt-1 text-sm font-light text-gray-400">{{ isSelected ? name : '&nbsp;' }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const nameSlug = computed((): string => {
      const match = props.name.match(/[A-Z]/g);
      if (match && match.length >= 2) {
        return match[0] + match[1];
      } else {
        return props.name.substr(0, 2).toUpperCase();
      }
    });

    return {
      nameSlug,
    };
  },
});
</script>
