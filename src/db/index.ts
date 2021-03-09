import Dexie from 'dexie';
import { BlockType } from '../components/blocks/BlockType';
import { File } from './File';
import { Space } from './Space';

export interface IFile {
  id: string;
  spaceId: number;
  name: string;
  blocks: BlockType[]
  createdAt: Date;

  save(): Dexie.Promise;
}

export interface ISpace {
  id: number;
  name: string;
}

class ScodeDatabase extends Dexie {
  public files: Dexie.Table<IFile, string>;
  public spaces: Dexie.Table<ISpace, string>;

  constructor() {
    super('scode');

    this.version(4).stores({
      files: 'id, spaceId, name, content, createdAt, blocks',
      spaces: '++id, name',
    });
    this.files = this.table('files');
    this.files.mapToClass(File);

    this.spaces = this.table('spaces');
    this.spaces.mapToClass(Space);
  }
}

export default new ScodeDatabase();
