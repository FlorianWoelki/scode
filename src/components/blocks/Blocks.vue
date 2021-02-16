<template>
  <div class="space-y-10">
    <div v-for="(block, index) in blocks" :key="index" class="relative" :class="{ 'bg-gray-700': block.isDeleteHovering }">
      <CodeBlock
        v-if="block.type === 'code'"
        :value="block.value"
        :language="block.language"
        @focus="toggleOptions(block)"
        @blur="toggleOptions(block)"
        @input="changeContent($event, block)"
      />
      <MarkdownBlock
        v-else
        :startValue="block.value"
        @focus="toggleOptions(block)"
        @blur="toggleOptions(block)"
        @input="changeContent($event, block)"
      />
      <div
        v-if="block.isOptionsShowing"
        class="absolute top-0 right-0 -mr-6 space-y-3"
        @mouseenter="block.isDeleteHovering = true"
        @mouseleave="block.isDeleteHovering = false"
      >
        <ChevronUp
          class="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-500"
          :class="{ 'cursor-not-allowed hover:text-gray-700': isFirstBlock(block) }"
          @mousedown.prevent.stop="moveBlockUp(block)"
        />
        <ChevronDown
          class="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-500"
          :class="{ 'cursor-not-allowed hover:text-gray-700': isLastBlock(block) }"
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

  setup(props, { emit }) {
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      emDelimiter: '*',
    });

    const toggleOptions = (block: BlockType) => {
      block.isOptionsShowing = !block.isOptionsShowing;
    };

    const deleteBlock = (block: BlockType) => {
      (document.activeElement as HTMLElement).blur();
      block.isOptionsShowing = false;
      block.isDeleteHovering = false;
      emit('deleteBlock', block);
    };

    const moveBlockUp = (block: BlockType) => {
      if (isFirstBlock(block)) {
        return;
      }

      (document.activeElement as HTMLElement).blur();
      block.isOptionsShowing = false;
      block.isDeleteHovering = false;
      emit('moveBlockUp', block);
    };

    const moveBlockDown = (block: BlockType) => {
      if (isLastBlock(block)) {
        return;
      }

      (document.activeElement as HTMLElement).blur();
      block.isOptionsShowing = false;
      block.isDeleteHovering = false;
      emit('moveBlockDown', block);
    };

    const changeContent = (target: HTMLElement | string, block: BlockType) => {
      if (block.type === 'code') {
        block.rawValue = target as string;
      } else {
        setTimeout(() => {
          const markdown = turndownService.turndown(target);
          block.rawValue = markdown;
        }, 0);
      }
    };

    const isLastBlock = (block: BlockType) => {
      return props.blocks.lastIndexOf(block) === props.blocks.length - 1;
    };

    const isFirstBlock = (block: BlockType) => {
      return props.blocks.length > 0 && props.blocks[0] === block;
    };

    return {
      toggleOptions,
      deleteBlock,
      moveBlockUp,
      moveBlockDown,
      changeContent,
      isLastBlock,
      isFirstBlock,
    };
  },
});
</script>