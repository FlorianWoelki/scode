import { MutationTree } from 'vuex';
import { File } from '../../db/File';
import { FileStoreMutationsTypes, FileStoreStateTypes } from '../interfaces';
import { MutationTypes } from './mutation-types';

export default {
  [MutationTypes.CREATE_FILE](state: any, file: File): void {
    state.files.push(file);
  },
  [MutationTypes.SET_SELECTED_FILE](state: any, file: File | undefined): void {
    state.selectedFile = file;
  },
  [MutationTypes.UPDATE_FILE](state: any, { id, file }: { id: string, file: File }): void {
    const foundFileIndex = state.files.findIndex((file: File) => file.id === id);
    if (foundFileIndex !== -1) {
      state.files[foundFileIndex] = {
        ...state.files[foundFileIndex],
        ...file,
      };
    }
  },
  [MutationTypes.DELETE_FILE](state: any, id: string) {
    const foundFileIndex = state.files.findIndex((file: File) => file.id === id);
    if (foundFileIndex !== -1) {
      state.files.splice(foundFileIndex, 1);
    }
  },
} as MutationTree<FileStoreStateTypes> & FileStoreMutationsTypes;
