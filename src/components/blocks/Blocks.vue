<template>
  <div class="space-y-10">
    <div v-for="(block, index) in blocks" :key="index">
      <CodeBlock v-if="block.type === 'code'" :value="block.value" :language="block.language" />
      <MarkdownBlock v-else :value="block.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeBlock from './CodeBlock.vue';
import MarkdownBlock from './markdownBlock/MarkdownBlock.vue';

export default defineComponent({
  components: {
    CodeBlock,
    MarkdownBlock,
  },

  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
});
</script>
