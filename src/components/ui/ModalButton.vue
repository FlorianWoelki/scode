<template>
  <button @click="isModalOpen = true">
    <slot name="button"></slot>

    <Teleport to="body">
      <div v-if="isModalOpen" tabindex="0" class="fixed inset-0 z-40 w-full h-full overflow-auto bg-black bg-opacity-30 focus:outline-none" @click="isModalOpen = false">
        <div class="relative z-50 max-w-lg px-3 py-12 mx-auto">
          <div class="relative bg-gray-600 rounded shadow">
            <slot></slot>
          </div>
        </div>
      </div>
    </Teleport>
  </button>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const isModalOpen = ref(false);

    return {
      isModalOpen,
    };
  },
});
</script>
