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
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Remarkable } from 'remarkable';
import tagActions from './tags';

export default defineComponent({
  emits: ['input', 'keypress'],

  props: {
    startValue: {
      type: String,
      default: '',
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const editor = ref<HTMLElement | null>(null);
    const md = new Remarkable();
    md.block.ruler.disable(['footnote', 'table', 'code']);

    onMounted(() => {
      if (props.isFocused) {
        setTimeout(() => {
          editor.value!.focus();
        }, 0);
      }
    });

    const exec = (command: string, value?: string) => {
      return document.execCommand(command, false, value);
    };

    watch(() => props.startValue, (newValue) => {
      editor.value!.innerHTML = md.render(props.startValue);
    });

    onMounted(() => {
      editor.value!.innerHTML = md.render(props.startValue);
    });

    const handleInput = (e: InputEvent) => {
      const { firstChild } = e.target as HTMLElement;

      if (firstChild && firstChild.nodeType === 3) exec('formatBlock', '<p>');
      else if (editor.value!.innerHTML === '<br>') editor.value!.innerHTML = '';

      if (/<div><br><\/div>/gm.test(editor.value!.innerHTML)) {
        editor.value!.innerHTML = editor.value!.innerHTML.replace(/<div><br><\/div>/gm, '<p><br></p>');
        placeCaretAtEnd(editor.value!);
      }

      emit('input', editor.value!);
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
      const selection = document.getSelection()!;
      const currentInput = selection.anchorNode!.textContent!;

      if (currentInput.match(/[\d\w]/gi)) {
        for (const tagAction of tagActions) {
          tagAction.run(currentInput, target);
        }
      }

      emit('keypress', e);
    };

    return {
      editor,
      handleInput,
      handleKeydown,
    };
  },
});
</script>
