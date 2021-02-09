import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class Link extends TagAction {
  public pattern = /(?:\[(.+?)\])(?:\((.+?)\))/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    const matchedText = input.match(this.pattern)![0];
    const hrefText = input.match(/(?:\[(.*?)\])/g)![0].replace(/\[|\]/g, '');
    const hrefLink = input.match(/(?:\((.*?)\))/g)![0].replace(/(|)/g, '');

    const [start, end] = getSelectionOffset(target);
    setTimeout(() => {
      target.innerHTML = target.innerHTML.replace(input.substring(match.index, match.index + matchedText.length), `<a href="${hrefLink}">${hrefText}</a>`);
      console.log(start, end);
      setSelectionOffset(target, start - 2 - hrefLink.length, end - 2 - hrefLink.length);
      // this.placeCaretAtEnd(target);
    }, 0);
  }
}
