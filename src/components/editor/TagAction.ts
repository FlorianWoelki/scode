import { getSelectionOffset } from './selection';

export abstract class TagAction {
  public pattern!: RegExp;

  public abstract run(input: string, target: HTMLElement): void;

  protected exec(command: string, value?: string) {
    return document.execCommand(command, false, value);
  }

  protected queryCommandValue(command: string): string {
    return document.queryCommandValue(command);
  }
}
