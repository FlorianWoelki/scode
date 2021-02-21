import { File } from '../../db/File';

export default {
  lastUsedCodeLanguage(state: any): string {
    const currentFile: File | undefined = state.selectedFile;
    if (currentFile) {
      const codeBlocks = currentFile.blocks.filter((block) => block.type === 'code');
      return codeBlocks.length > 0 ? codeBlocks[codeBlocks.length - 1].language! : 'python';
    }

    return 'python';
  },
};
