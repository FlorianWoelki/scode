import { createStore } from 'vuex';
import { File } from '../db/File';
import fileStore from './files';

export default createStore({
  modules: {
    fileStore,
  },
  state: {
    selectedFile: undefined,
  } as { selectedFile: File | undefined },
  mutations: {
    setSelectedFile(state, file: File): void {
      state.selectedFile = file;
    },
  },
});
