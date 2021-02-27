import { ActionTree } from 'vuex';
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
} as ActionTree<FileStoreStateTypes, IRootState> & FileStoreActionTypes;
