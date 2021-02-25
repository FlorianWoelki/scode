import db, { IFile } from '.';
import { BlockType } from '../components/blocks/BlockType';

export class File implements IFile {
  public id!: string;
  public name: string;
  public blocks: BlockType[];
  public createdAt: Date;

  constructor(name: string, blocks: BlockType[], id?: string, createdAt?: Date) {
    this.name = name;
    this.blocks = blocks;
    this.createdAt = createdAt || new Date();
    if (id) this.id = id;
  }

  public save() {
    return db.transaction('rw', db.files, () => {
      db.files.put(new File(this.name, this.blocks, this.id)).then((id) => {
        this.id = id;
      });
    });
  }
}
