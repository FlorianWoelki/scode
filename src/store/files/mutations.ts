import { File } from '../../db/File';

export default {
  addFile(state: any, file: File): void {
    state.files.push(file);
  },
  setSelectedFile(state: any, file: File): void {
    state.selectedFile = file;
  },
  updateFile(state: any, { id, file }: { id: string, file: File }): void {
    const foundFileIndex = state.files.findIndex((file: File) => file.id === id);
    if (foundFileIndex !== -1) {
      state.files[foundFileIndex] = {
        ...state.files[foundFileIndex],
        ...file,
      };
    }
  },
};
