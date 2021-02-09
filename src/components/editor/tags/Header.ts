import { nextTick } from 'vue';
import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class Header extends TagAction {
  public pattern = /^(#){1,6}\s/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    const [start, end] = getSelectionOffset(target);
    const size = match[0].trim().length;
    setTimeout(() => {
      nextTick(() => {
        this.exec('formatBlock', `<h${size}>`);
        target.innerHTML = target.innerHTML.replace(/#{1,6}\s/g, '');
        setSelectionOffset(target, start - size, end - size);
      });
    }, 0);
  }
}
