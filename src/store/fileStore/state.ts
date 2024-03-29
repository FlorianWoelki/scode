import { BlockType } from '../../components/blocks/BlockType';
import { File } from '../../db/File';
import { FileStoreStateTypes } from '../interfaces/fileStore';

export default {
  selectedFile: undefined,
  files: [
    {
      id: '123abcdef',
      name: 'Some other test file',
      createdAt: new Date(),
      blocks: [
        {
          type: 'markdown',
          value: `# Morning
**test** test test **test**
## Some test
* Hllo
* test

\`test\` hello world`,
        },
        {
          type: 'code',
          language: 'python',
          savedValue: 'print("Hello World")',
        },
      ] as BlockType[],
    },
    {
      id: '123abc',
      name: 'Code something',
      createdAt: new Date(),
      blocks: [
        {
          type: 'markdown',
          savedValue: `# Hello World
This content represents a small test content file.

\`\`\`
def loop():
for i in range(0, 10):
print(i)
\`\`\``,
        },
      ] as BlockType[],
    },
  ] as File[],
} as FileStoreStateTypes;
