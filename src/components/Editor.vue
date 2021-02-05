<template>
  <div
    ref="editor"
    contenteditable="true"
    @input="handleInput"
    @keydown="handleKeydown"
    class="markdown focus:outline-none"
  ></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const editor = ref<HTMLElement | null>(null);

    const exec = (command: string, value?: string) => {
      return document.execCommand(command, false, value);
    };

    const queryCommandValue = (command: string) => {
      return document.queryCommandValue(command);
    };

    watch(() => props.value, (newValue) => {
      editor.value!.innerHTML = newValue;
    });

    onMounted(() => {
      editor.value!.innerHTML = props.value;
    });

    const handleInput = (e: InputEvent | KeyboardEvent) => {
      const { firstChild, innerText } = e.target as HTMLElement;

      if (firstChild && firstChild.nodeType === 3) exec('formatBlock', '<p>');
      else if (editor.value!.innerHTML === '<br>') editor.value!.innerHTML = '';

      emit('input', editor.value!.innerHTML);
    };

    const placeCaretAtEnd = (dom: HTMLElement) => {
      let range: Range;
      let sel: Selection | null;
      dom.focus();
      if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
        range = document.createRange();
        range.selectNodeContents(dom);
        range.collapse(false);
        sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      } else if (typeof document.body.createTextRange !== 'undefined') {
        range = document.body.createTextRange();
        range.moveToElementText(dom);
        range.collapse(false);
        range.select();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const currentInput = document.getSelection()!.anchorNode!.textContent!;

      if (/(\*\*)$/gm.test(currentInput)) {
        nextTick(() => exec('bold'));
      }
      if (/(_)$/gm.test(currentInput)) {
        nextTick(() => exec('italic'));
      }

      if (e.key.toLowerCase() === ' ') {
        if (currentInput.startsWith('>')) {
          nextTick(() => exec('formatBlock', 'blockquote'));
        }

        if (currentInput.startsWith('######')) {
          nextTick(() => exec('formatBlock', '<h6>'));
        } else if (currentInput.startsWith('#####')) {
          nextTick(() => exec('formatBlock', '<h5>'));
        } else if (currentInput.startsWith('####')) {
          nextTick(() => exec('formatBlock', '<h4>'));
        } else if (currentInput.startsWith('###')) {
          nextTick(() => exec('formatBlock', '<h3>'));
        } else if (currentInput.startsWith('##')) {
          nextTick(() => exec('formatBlock', '<h2>'));
        } else if (currentInput.startsWith('#')) {
          nextTick(() => exec('formatBlock', '<h1>'));
        }
      }

      if (currentInput === '') {
        nextTick(() => exec('formatBlock', '<p>'));
      }
    };

    return {
      editor,
      handleInput,
      handleKeydown,
    };
  },
});
</script>
