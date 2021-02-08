export abstract class TagAction {
  public pattern!: RegExp;

  public abstract run(input: string, target: HTMLElement): void;

  protected placeCaretAtEnd(target: HTMLElement): void {
    let range: Range;
    let sel: Selection | null;
    target.focus();
    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  protected exec(command: string, value?: string) {
    return document.execCommand(command, false, value);
  }

  protected queryCommandValue(command: string): string {
    return document.queryCommandValue(command);
  }
}
