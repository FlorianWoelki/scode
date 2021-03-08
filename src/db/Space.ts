import { IFile, ISpace } from '.';

export class Space implements ISpace {
  public id!: number;
  public name: string;
  public files: IFile[];

  constructor(name: string, files: IFile[], id?: number) {
    this.name = name;
    this.files = files;
    if (id) this.id = id;
  }
}
