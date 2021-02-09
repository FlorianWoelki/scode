import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class InlineCode extends TagAction {
  public pattern = /(`){1}(.+?)(`){1}/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);

    if (!match) {
      return;
    }

    const [start, end] = getSelectionOffset(target);
    const [annotatedText] = match;
    setTimeout(() => {
      const message = annotatedText.replace(/`/g, '');
      target.innerHTML = target.innerHTML.replace(input.substring(match.index), `<code>${message}</code>&nbsp;`);
      setSelectionOffset(target, start - 1, end - 1);
      // this.placeCaretAtEnd(target);
    }, 0);
  }
}
