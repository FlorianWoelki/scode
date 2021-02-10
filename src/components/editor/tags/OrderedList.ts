import { nextTick } from 'vue';
import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class OrderedList extends TagAction {
  public pattern = /^\s{0,9}(\d)+\.\s/g;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    setTimeout(() => {
      const depth = input.split('. ')[0].split('').filter(e => /\s/gi.test(e)).length;
      // const replaceText = input.split('. ').splice(0, 1).join('');
      const [start, end] = getSelectionOffset(target);
      target.innerHTML = target.innerHTML.replace(input.slice(0, 2), '');
      nextTick(() => {
        this.exec('insertOrderedList');
        setSelectionOffset(target, start - 2, end - 2);
      });
    }, 0);
  }
}
