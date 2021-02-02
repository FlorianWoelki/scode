import { IFile } from '.';

export class File implements IFile {
  public id!: string;
  public name: string;
  public content: string;
  public createdAt: Date;

  constructor(name: string, content: string, id?: string, createdAt?: Date) {
    this.name = name;
    this.content = content;
    this.createdAt = createdAt || new Date();
    if (id) this.id = id;
  }
}
