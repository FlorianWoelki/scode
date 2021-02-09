import { nextTick } from 'vue';
import { TagAction } from '../TagAction';

export class Header extends TagAction {
  public pattern = /^(#){1,6}\s/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    const size = match[0].trim().length;
    setTimeout(() => {
      nextTick(() => {
        this.exec('formatBlock', `<h${size}>`);
        target.innerHTML = target.innerHTML.replace(/#{1,6}\s/g, '');
        // target.innerHTML = target.innerHTML.replace(input, '');
        this.placeCaretAtEnd(target);
      });
    }, 0);
  }
}
