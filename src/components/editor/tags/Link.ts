import { TagAction } from '../TagAction';

export class Link extends TagAction {
  public pattern = /(?:\[(.+?)\])(?:\((.+?)\))/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    const hrefText = input.match(/(?:\[(.*?)\])/g)![0].replace(/\[|\]/g, '');
    const hrefLink = input.match(/(?:\((.*?)\))/g)![0].replace(/(|)/g, '');

    setTimeout(() => {
      target.innerHTML = target.innerHTML.replace(input, `<a href="${hrefLink}">${hrefText}</a>`);
      this.placeCaretAtEnd(target);
    }, 0);
  }
}
