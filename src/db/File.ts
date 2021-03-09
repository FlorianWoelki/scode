import db, { IFile } from '.';
import { BlockType } from '../components/blocks/BlockType';

export class File implements IFile {
  public id!: string;
  public spaceId!: number;
  public name: string;
  public blocks: BlockType[];
  public createdAt: Date;

  constructor(name: string, blocks: BlockType[], spaceId: number, id?: string, createdAt?: Date) {
    this.name = name;
    this.blocks = blocks;
    this.createdAt = createdAt || new Date();
    this.spaceId = spaceId;
    if (id) this.id = id;
  }

  public save() {
    return db.transaction('rw', db.files, () => {
      db.files.update(this.id, { name: this.name, blocks: this.blocks });
    });
  }
}
