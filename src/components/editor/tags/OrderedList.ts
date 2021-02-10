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
      const [start, end, node] = getSelectionOffset(target);
      const depth = input.split('. ')[0].split('').filter(e => /\s/gi.test(e)).length;
      const replaceText = node.textContent!.split('. ').splice(1, 2).join('');
      target.innerHTML = target.innerHTML.replace(`<p>${node.textContent}</p>`, `<ol><li>${replaceText}</li></ol>`);
      setSelectionOffset(target, start - 3, end - 3);
    }, 0);
  }
}
