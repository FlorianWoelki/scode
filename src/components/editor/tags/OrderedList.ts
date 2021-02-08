import { nextTick } from 'vue';
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
      const replaceText = input.split('. ').splice(1, 1).join('');
      target.innerHTML = target.innerHTML.replace(input, replaceText);
      this.placeCaretAtEnd(target);
      nextTick(() => {
        this.exec('insertOrderedList');
        this.placeCaretAtEnd(target);
      });
    }, 0);
  }
}
