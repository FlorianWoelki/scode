import { nextTick } from 'vue';
import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class Italic extends TagAction {
  public pattern = /(\*|_){1}(.+?)(?:\1){1}/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      if (this.queryCommandValue('italic') !== 'false') {
        nextTick(() => this.exec('italic'));
      }
      return;
    }

    const [start, end] = getSelectionOffset(target);
    const [annotatedText, , matchedText] = match;
    if (input[match.index] !== input[match.index + 1]) {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(annotatedText, `<i>${matchedText}</i>`);
        setSelectionOffset(target, start - 1, end - 1);
        // this.placeCaretAtEnd(target);
      }, 0);
    }
  }
}
