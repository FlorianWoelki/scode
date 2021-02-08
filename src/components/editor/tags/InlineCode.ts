import { TagAction } from '../TagAction';

export class InlineCode extends TagAction {
  public pattern = /(`){1}(.+?)(`){1}/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);

    if (!match) {
      return;
    }

    const [annotatedText] = match;
    setTimeout(() => {
      const message = annotatedText.replace(/`/g, '');
      target.innerHTML = target.innerHTML.replace(input.substring(match.index), `<code>${message}</code>`);
      this.placeCaretAtEnd(target);
    }, 0);
  }
}
