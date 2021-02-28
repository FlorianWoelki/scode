import { ActionTree } from 'vuex';
import { BlockType } from '../../components/blocks/BlockType';
import db, { IFile } from '../../db';
import { FileStoreActionTypes, FileStoreStateTypes, IRootState } from '../interfaces';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

export default {
  [ActionTypes.CREATE_FILE]({ commit }, fileDetails): IFile {
    console.log(fileDetails);
    db.files.add(fileDetails, 'id').catch((error) => {
      console.error(error);
    });
    commit(MutationTypes.CREATE_FILE, fileDetails);
    return fileDetails;
  },
  [ActionTypes.LOAD_FILES]({ commit }) {
    db.transaction('rw', db.files, async() => {
      const files = await db.files.toArray();
      files.map((file) => {
        if (typeof file.blocks === 'string') {
          file.blocks = JSON.parse(file.blocks as unknown as string);
        }
        return file;
      });
      commit(MutationTypes.LOAD_FILES, files);
    });
  },
  [ActionTypes.UPDATE_FILE]({ commit }, { fileId, blocks }: { fileId: string, blocks: BlockType[] }) {
    db.transaction('rw', db.files, async() => {
      db.files.update(fileId, { blocks: JSON.stringify(blocks) });
    });
  },
} as ActionTree<FileStoreStateTypes, IRootState> & FileStoreActionTypes;
