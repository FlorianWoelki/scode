import { ActionTree } from 'vuex';
import { ActionTypes, FileStoreActionTypes, FileStoreStateTypes, MutationTypes } from '.';
import { IRootState } from '..';
import db, { IFile } from '../../db';

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
