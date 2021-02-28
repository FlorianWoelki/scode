import Dexie from 'dexie';
import { BlockType } from '../components/blocks/BlockType';
import { File } from './File';

export interface IFile {
  id: string;
  name: string;
  // parent;
  blocks: BlockType[]
  createdAt: Date;

  save(): Dexie.Promise;
}

class ScodeDatabase extends Dexie {
  public files: Dexie.Table<IFile, string>;

  constructor() {
    super('scode');
    this.version(1).stores({
      files: 'id, name, content, createdAt',
    });
    this.files = this.table('files');
    this.files.mapToClass(File);
  }
}

export default new ScodeDatabase();
