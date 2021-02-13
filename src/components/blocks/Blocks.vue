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
        @input="changeMarkdownContent($event, block)"
      />
      <div
        v-if="block.isOptionsShowing"
        class="absolute top-0 right-0 -mr-6 space-y-3"
        @mouseenter="block.isDeleteHovering = true"
        @mouseleave="block.isDeleteHovering = false"
      >
        <ChevronUp
          class="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-500"
          @mousedown.prevent.stop="moveBlockUp(block)"
        />
        <ChevronDown
          class="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-500"
          @mousedown.prevent.stop="moveBlockDown(block)"
        />
        <TrashIcon
          class="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-500"
          @mousedown.prevent.stop="deleteBlock(block)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TurndownService from 'turndown';
import CodeBlock from './CodeBlock.vue';
import MarkdownBlock from './markdownBlock/MarkdownBlock.vue';
import TrashIcon from '../../assets/icons/trash.svg';
import ChevronUp from '../../assets/icons/chevron-up.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import { BlockType } from '../ContentDisplay.vue';

export default defineComponent({
  emits: ['deleteBlock', 'moveBlockUp', 'moveBlockDown'],

  components: {
    CodeBlock,
    MarkdownBlock,
    TrashIcon,
    ChevronDown,
    ChevronUp,
  },

  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },

  setup(_, { emit }) {
    const turndownService = new TurndownService({
      headingStyle: 'atx',
    });

    const toggleOptions = (block: BlockType) => {
      block.isOptionsShowing = !block.isOptionsShowing;
    };

    const deleteBlock = (block: BlockType) => {
      emit('deleteBlock', block);
    };

    const moveBlockUp = (block: BlockType) => {
      (document.activeElement as HTMLElement).blur();
      block.isOptionsShowing = false;
      block.isDeleteHovering = false;
      emit('moveBlockUp', block);
    };

    const moveBlockDown = (block: BlockType) => {
      (document.activeElement as HTMLElement).blur();
      block.isOptionsShowing = false;
      block.isDeleteHovering = false;
      emit('moveBlockDown', block);
    };

    const changeMarkdownContent = (target: HTMLElement, block: BlockType) => {
      const markdown = turndownService.turndown(target);
      block.markdownValue = markdown;
    };

    return {
      toggleOptions,
      deleteBlock,
      moveBlockUp,
      moveBlockDown,
      changeMarkdownContent,
    };
  },
});
</script>
