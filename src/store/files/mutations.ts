import { File } from '../../db/File';

export default {
  addFile(state: any, file: File): void {
    state.files.push(file);
  },
  setSelectedFile(state: any, file: File): void {
    state.selectedFile = file;
  },
};
