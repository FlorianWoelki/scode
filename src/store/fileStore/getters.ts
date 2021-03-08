import { GetterTree } from 'vuex';
import { File } from '../../db/File';
import { FileStoreGettersTypes, FileStoreStateTypes, IRootState } from '../interfaces';

export default {
  lastUsedCodeLanguage(state: any): string {
    const currentFile: File | undefined = state.selectedFile;
    if (currentFile) {
      const codeBlocks = currentFile.blocks.filter((block) => block.type === 'code');
      return codeBlocks.length > 0 ? codeBlocks[codeBlocks.length - 1].language! : 'python';
    }

    return 'python';
  },
} as GetterTree<FileStoreStateTypes, IRootState> & FileStoreGettersTypes;
