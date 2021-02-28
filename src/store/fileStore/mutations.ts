import { MutationTree } from 'vuex';
import { IFile } from '../../db';
import { FileStoreMutationsTypes, FileStoreStateTypes } from '../interfaces';
import { MutationTypes } from './mutation-types';

export default {
  [MutationTypes.CREATE_FILE](state: FileStoreStateTypes, file: IFile): void {
    state.files.push(file);
  },
  [MutationTypes.SET_SELECTED_FILE](state: FileStoreStateTypes, file: IFile | undefined): void {
    state.selectedFile = file;
  },
  [MutationTypes.UPDATE_FILE](state: FileStoreStateTypes, { id, file }: { id: string, file: IFile }): void {
    const foundFileIndex = state.files.findIndex((file: IFile) => file.id === id);
    if (foundFileIndex !== -1) {
      state.files[foundFileIndex] = {
        ...state.files[foundFileIndex],
        ...file,
      };
    }
  },
  [MutationTypes.DELETE_FILE](state: FileStoreStateTypes, id: string) {
    const foundFileIndex = state.files.findIndex((file: IFile) => file.id === id);
    if (foundFileIndex !== -1) {
      state.files.splice(foundFileIndex, 1);
    }
  },
  [MutationTypes.LOAD_FILES](state: FileStoreStateTypes, files: IFile[]) {
    state.files = files;
  },
} as MutationTree<FileStoreStateTypes> & FileStoreMutationsTypes;
