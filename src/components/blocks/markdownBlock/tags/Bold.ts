import { nextTick } from 'vue';
import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class Bold extends TagAction {
  public pattern = /(\*|_){2}(.+?)(?:\1){2}/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      if (this.queryCommandValue('bold') !== 'false') {
        nextTick(() => this.exec('bold'));
      }
      return;
    }

    const [start, end] = getSelectionOffset(target);
    const [annotatedText, , matchedText] = match;
    if (!input.match(/^([*_ \n]+)$/g)) {
      setTimeout(() => {
        target.innerHTML = target.innerHTML.replace(annotatedText, `<strong>${matchedText}</strong>`);
        setSelectionOffset(target, start - 3, end - 3); // 4 = extracharacters
        // this.placeCaretAtEnd(target);
      }, 0);
    }
  }
}
