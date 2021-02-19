import Dexie from 'dexie';
import { BlockType } from '../components/blocks/BlockType';

export interface IFile {
  id: string;
  name: string;
  // parent;
  blocks: BlockType[]
  createdAt: Date;
}

class ScodeDatabase extends Dexie {
  public files: Dexie.Table<IFile, string>;

  constructor() {
    super('scode');
    this.version(1).stores({
      files: 'id, name, content, createdAt',
    });
    this.files = this.table('files');
  }
}

export default new ScodeDatabase();
