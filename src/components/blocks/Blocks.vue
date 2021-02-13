<template>
  <div class="space-y-10">
    <div v-for="(block, index) in blocks" :key="index" class="relative" :class="{ 'bg-gray-700': block.isDeleteHovering }">
      <CodeBlock
        v-if="block.type === 'code'"
        :value="block.value" :language="block.language"
        @focus="toggleOptions(block)"
        @blur="toggleOptions(block)"
      />
      <MarkdownBlock
        v-else
        :value="block.value"
        @focus="toggleOptions(block)"
        @blur="toggleOptions(block)"
      />
      <div
        v-if="block.isOptionsShowing"
        class="absolute top-0 right-0 -mr-6 text-gray-700 cursor-pointer hover:text-gray-500"
        @mouseenter="block.isDeleteHovering = true"
        @mouseleave="block.isDeleteHovering = false"
        @mousedown.prevent.stop="deleteBlock(block)"
      >
        <TrashIcon class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeBlock from './CodeBlock.vue';
import MarkdownBlock from './markdownBlock/MarkdownBlock.vue';
import TrashIcon from '../../assets/icons/trash.svg';
import { BlockType } from '../ContentDisplay.vue';

export default defineComponent({
  emits: ['deleteBlock'],

  components: {
    CodeBlock,
    MarkdownBlock,
    TrashIcon,
  },

  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },

  setup(_, { emit }) {
    const toggleOptions = (block: BlockType) => {
      block.isOptionsShowing = !block.isOptionsShowing;
    };

    const deleteBlock = (block: BlockType) => {
      emit('deleteBlock', block);
    };

    return {
      toggleOptions,
      deleteBlock,
    };
  },
});
</script>
