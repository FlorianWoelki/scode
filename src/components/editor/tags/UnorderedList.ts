import { nextTick } from 'vue';
import { TagAction } from '../TagAction';

export class UnorderedList extends TagAction {
  public pattern = /^\s{0,9}(-|\*){1}\s/;

  public run(input: string, target: HTMLElement): void {
    const match = this.pattern.exec(input);
    if (!match) {
      return;
    }

    console.log(input.split('* '));
    if (!(input.split('- ')[1]) && !(input.split('* ')[1])) {
      return;
    }

    setTimeout(() => {
      const offsetText = /^\s{0,9}(\*){1}\s/.test(input) ? input.replace('*', '-') : input;
      // const depth = offsetText.split('- ')[0].split('').filter((e) => /\s/gi.test(e)).length;
      const replaceText = offsetText.split('- ').length > 1 ? offsetText.split('- ').splice(1, 1).join('') : offsetText;
      target.innerHTML = target.innerHTML.replace(input, replaceText);
      this.placeCaretAtEnd(target);
      nextTick(() => {
        this.exec('insertUnorderedList');
        this.placeCaretAtEnd(target);
      });
    }, 0);
  }
}
