import { ISpace } from '.';

export class Space implements ISpace {
  public id!: number;
  public name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    if (id) this.id = id;
  }
}
