import { nextTick } from 'vue';
import { getSelectionOffset, setSelectionOffset } from '../selection';
import { TagAction } from '../TagAction';

export class UnorderedList extends TagAction {
  public pattern = /^\s{0,9}(-|\*){1}\s/;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    if (!(input.split('- ')[1]) && !(input.split('* ')[1])) {
      return;
    }

    setTimeout(() => {
      const [start, end, node] = getSelectionOffset(target);
      const offsetText = /^\s{0,9}(\*){1}\s/.test(node.textContent!) ? node.textContent!.replace('*', '-') : node.textContent!;
      // const depth = offsetText.split('- ')[0].split('').filter((e) => /\s/gi.test(e)).length;
      const replaceText = offsetText.split('- ').length > 1 ? offsetText.split('- ').splice(1, 2).join('') : offsetText;
      target.innerHTML = target.innerHTML.replace(`<p>${node.textContent}</p>`, `<ul><li>${replaceText}</li></ul>`);
      setSelectionOffset(target, start - 2, end - 2);
    }, 0);
  }
}
