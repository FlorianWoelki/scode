import { nextTick } from 'vue';
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

    const [annotatedText, , matchedText] = match;
    if (input[match.index] !== input[match.index + 1]) {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(annotatedText, `<i>${matchedText}</i>`);
        this.placeCaretAtEnd(target);
      }, 0);
    }
  }
}
