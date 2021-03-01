import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class Strikethrough extends TagAction {
  public pattern = /(?:~|_){2}(.+?)(?:~|_){2}/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    const [annotatedText, matchedText] = match;
    if (input.match(/^([~_ \n]+)$/g)) {
      return;
    }

    const [start, end] = getSelectionOffset(target);
    setTimeout(() => {
      target.innerHTML = target.innerHTML.replace(annotatedText, `<del>${matchedText}</del>`);
      setSelectionOffset(target, start - 3, end - 3);
      // this.placeCaretAtEnd(target);
    }, 0);
  }
}
