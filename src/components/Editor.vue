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
import { resolvePackageEntry } from 'vite';
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

    const queryCommandValue = (command: string): string => {
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
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const currentInput = document.getSelection()!.anchorNode!.textContent!;

      if (e.key.toLowerCase() === ' ') {
        if (currentInput.startsWith('*')) {
          nextTick(() => exec('formatBlock', 'div'));
          nextTick(() => exec('insertUnorderedList'));
          const ulify = /\*/gm;
          console.log(target.innerHTML);
          const html = target.innerHTML.replace(ulify, '<br>');
          target.innerHTML = html;
          placeCaretAtEnd(target);
        }

        if (/_[A-Za-z0-9]+_/gim.test(currentInput)) {
          const italic = /_(.*?)_/gm;
          const html = target.innerHTML.replace(italic, '<i>$1</i>');
          nextTick(() => exec('italic'));
          target.innerHTML = html;
          placeCaretAtEnd(target);
        } else if (queryCommandValue('italic') !== 'false') {
          nextTick(() => exec('italic'));
        }

        if (/\*\*(.*?)\*\*/gm.test(currentInput)) {
          const bold = /\*\*(.*?)\*\*/gm;
          const html = target.innerHTML.replace(bold, '<strong>$1</strong>');
          nextTick(() => exec('bold'));
          target.innerHTML = html;
          placeCaretAtEnd(target);
        } else if (queryCommandValue('bold') !== 'false') {
          nextTick(() => exec('bold'));
        }

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

      if (/[#]{1,6}\s/gm.test(currentInput)) {
        target.innerHTML = target.innerHTML.replace(/[#]{1,6}\s/g, '');
        placeCaretAtEnd(target);
      }

      if (currentInput === '' && queryCommandValue('insertUnorderedList') === 'false') {
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
