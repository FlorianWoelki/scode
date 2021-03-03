import { ActionTree } from 'vuex';
import { BlockType } from '../../components/blocks/BlockType';
import db, { IFile } from '../../db';
import { FileStoreActionTypes, FileStoreStateTypes, IRootState } from '../interfaces';
import { AllMutationTypes } from '../mutation-types';
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
  [ActionTypes.LOAD_FILES]({ commit, dispatch }) {
    db.transaction('rw', db.files, async() => {
      const files = await db.files.toArray();
      files.map((file) => {
        if (typeof file.blocks === 'string') {
          file.blocks = JSON.parse(file.blocks as unknown as string);
        }

        file.blocks.map((block) => {
          block.savedValue = block.cachedValue || '';
          block.isFocused = false;
          block.isOptionsShowing = false;
          block.isDeleteHovering = false;
          return block;
        });

        return file;
      });
      commit(MutationTypes.LOAD_FILES, files);
    });
  },
  [ActionTypes.UPDATE_FILENAME]({ commit }, { id, name }: { id: string, name: string }) {
    db.transaction('rw', db.files, () => {
      setTimeout(() => {
        db.files.update(id, { name });
        commit(MutationTypes.UPDATE_FILE, { id, file: { name } });
      }, 0);
    });
  },
  [ActionTypes.UPDATE_FILE]({ commit }, file: IFile) {
    db.transaction('rw', db.files, () => {
      setTimeout(() => {
        db.files.update(file.id, { ...file, blocks: JSON.stringify(file.blocks) });
        commit(MutationTypes.UPDATE_FILE, { id: file.id, file });
      }, 0);
    });
  },
  [ActionTypes.DELETE_FILE]({ commit }, id: string) {
    db.transaction('rw', db.files, () => {
      db.files.delete(id);
      commit(MutationTypes.DELETE_FILE, id);
    });
  },
} as ActionTree<FileStoreStateTypes, IRootState> & FileStoreActionTypes;
