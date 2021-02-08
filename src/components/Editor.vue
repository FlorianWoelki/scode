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
      const { firstChild } = e.target as HTMLElement;

      if (firstChild && firstChild.nodeType === 3) exec('formatBlock', '<p>');
      else if (editor.value!.innerHTML === '<br>') editor.value!.innerHTML = '';

      if (/<div><br><\/div>/gm.test(editor.value!.innerHTML)) {
        editor.value!.innerHTML = editor.value!.innerHTML.replace(/<div><br><\/div>/gm, '<p><br></p>');
        placeCaretAtEnd(editor.value!);
      }

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

    const boldPattern = /(\*|_){2}(.+?)(?:\1){2}/g;
    const italicPattern = /(\*|_){1}(.+?)(?:\1){1}/g;
    const unorderedListPattern = /^\s{0,9}(-|\*){1}\s/;
    const orderedListPattern = /^\s{0,9}(\d)+\.\s/g;
    const headerPattern = /^(#){1,6}\s/g;
    const inlineCodePattern = /(`){1}(.+?)(`){1}/g;
    const strikethroughPattern = /(?:~|_){2}(.+?)(?:~|_){2}/g;

    const replaceHeaderCharacters = (target: HTMLElement): void => {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(/[#]{1,6}/g, '').replace('&nbsp;', '<br>');
        placeCaretAtEnd(target);
      }, 1);
    };

    const replaceUnorderedListCharacters = (target: HTMLElement): void => {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(/\*/gm, '').replace(/^(&nbsp;)(?!\w)/gm, '<br>');
        placeCaretAtEnd(target);
      }, 1);
    };

    const replaceOrderedListCharacters = (target: HTMLElement): void => {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(/1\./gm, '').replace('&nbsp;', '<br>');
        placeCaretAtEnd(target);
      }, 1);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const selection = document.getSelection()!;
      const currentInput = selection.anchorNode!.textContent!;

      if (e.key.toLowerCase() === ' ') {
        /* if (currentInput.startsWith('*')) {
          nextTick(() => exec('insertUnorderedList'));
          replaceUnorderedListCharacters(target);
        }

        if (currentInput.startsWith('1.')) {
          nextTick(() => exec('insertOrderedList'));
          replaceOrderedListCharacters(target);
        } */

        /* if (/_[A-Za-z0-9]+_/gim.test(currentInput)) {
          const italic = /_(.*?)_/gm;
          const html = target.innerHTML.replace(italic, '<i>$1</i>');
          nextTick(() => exec('italic'));
          target.innerHTML = html;
          placeCaretAtEnd(target);
        } else if (queryCommandValue('italic') !== 'false') {
          nextTick(() => exec('italic'));
        } */

        // strikethrough
        const strikethroughMatch = strikethroughPattern.exec(currentInput);
        if (strikethroughMatch) {
          const [annotatedText, matchedText] = strikethroughMatch;
          if (!currentInput.match(/^([~_ \n]+)$/g)) {
            setTimeout(() => {
              target.innerHTML = target.innerHTML.replace(annotatedText, `<del>${matchedText}</del>`);
              placeCaretAtEnd(target);
            }, 0);
          }
        }

        // inline code
        const inlineCodeMatch = inlineCodePattern.exec(currentInput);
        if (inlineCodeMatch) {
          const [annotatedText] = inlineCodeMatch;
          setTimeout(() => {
            const message = annotatedText.replace(/`/g, '');
            target.innerHTML = target.innerHTML.replace(currentInput.substring(inlineCodeMatch.index), `<code>${message}</code>`);
            placeCaretAtEnd(target);
          }, 0);
        }

        // headers
        const headerMatch = headerPattern.exec(currentInput);
        if (headerMatch) {
          const size = headerMatch[0].trim().length;
          setTimeout(() => {
            target.innerHTML = target.innerHTML.replace(currentInput, currentInput.slice(size + 1));
            placeCaretAtEnd(target);
            nextTick(() => exec('formatBlock', `<h${size}>`));
          }, 0);
        }

        // ordered list
        const orderedListMatch = orderedListPattern.exec(currentInput);
        if (orderedListMatch) {
          setTimeout(() => {
            const depth = currentInput.split('. ')[0].split('').filter(e => /\s/gi.test(e)).length;
            const replaceText = currentInput.split('. ').splice(1, 1).join('');
            target.innerHTML = target.innerHTML.replace(currentInput, replaceText);
            placeCaretAtEnd(target);
            nextTick(() => {
              exec('insertOrderedList');
              placeCaretAtEnd(target);
            });
          }, 0);
        }

        // unordered list
        const unorderedListMatch = unorderedListPattern.exec(currentInput);
        if (unorderedListMatch) {
          if (currentInput.split('- ')[1] || currentInput.split('* ')[1]) {
            setTimeout(() => {
              const offsetText = /^\s{0,9}(\*){1}\s/.test(currentInput) ? currentInput.replace('*', '-') : currentInput;
              // const depth = offsetText.split('- ')[0].split('').filter((e) => /\s/gi.test(e)).length;
              const replaceText = offsetText.split('- ').length > 1 ? offsetText.split('- ').splice(1, 1).join('') : offsetText;
              target.innerHTML = target.innerHTML.replace(currentInput, replaceText);
              placeCaretAtEnd(target);
              nextTick(() => {
                exec('insertUnorderedList');
                placeCaretAtEnd(target);
              });
            }, 0);
          }
        }

        // italic
        const italicMatch = italicPattern.exec(currentInput);
        if (italicMatch) {
          const [annotatedText, , matchedText] = italicMatch;
          if (currentInput[italicMatch.index] !== currentInput[italicMatch.index + 1]) {
            setTimeout(() => {
              target.innerHTML = target.innerHTML.replace(annotatedText, `<i>${matchedText}</i>`);
              placeCaretAtEnd(target);
            }, 0);
          }
        } else if (queryCommandValue('italic') !== 'false') {
          nextTick(() => exec('italic'));
        }

        // bold
        const boldMatch = boldPattern.exec(currentInput);
        if (boldMatch) {
          const [annotatedText, , matchedText] = boldMatch;
          if (!currentInput.match(/^([*_ \n]+)$/g)) {
            setTimeout(() => {
              target.innerHTML = target.innerHTML.replace(annotatedText, `<strong>${matchedText}</strong>`);
              placeCaretAtEnd(target);
            }, 0);
          }
        } else if (queryCommandValue('bold') !== 'false') {
          nextTick(() => exec('bold'));
        }

        // const html = target.innerHTML.replace(boldPattern, '<strong>$1</strong>');
        // nextTick(() => exec('bold'));
        // target.innerHTML = html;
        // placeCaretAtEnd(target);
        /* } else if (queryCommandValue('bold') !== 'false') {
          nextTick(() => exec('bold'));
        } */

        /* if (currentInput.startsWith('######')) {
          nextTick(() => exec('formatBlock', '<h6>'));
          replaceHeaderCharacters(target);
        } else if (currentInput.startsWith('#####')) {
          nextTick(() => exec('formatBlock', '<h5>'));
          replaceHeaderCharacters(target);
        } else if (currentInput.startsWith('####')) {
          nextTick(() => exec('formatBlock', '<h4>'));
          replaceHeaderCharacters(target);
        } else if (currentInput.startsWith('###')) {
          nextTick(() => exec('formatBlock', '<h3>'));
          replaceHeaderCharacters(target);
        } else if (currentInput.startsWith('##')) {
          nextTick(() => exec('formatBlock', '<h2>'));
          replaceHeaderCharacters(target);
        } else if (currentInput.startsWith('#')) {
          nextTick(() => exec('formatBlock', '<h1>'));
          replaceHeaderCharacters(target);
        } */
      }

      /* if (currentInput === '' && queryCommandValue('insertUnorderedList') === 'false') {
        nextTick(() => exec('formatBlock', '<p>'));
      } */
    };

    return {
      editor,
      handleInput,
      handleKeydown,
    };
  },
});
</script>
