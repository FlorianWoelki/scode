import { File } from '../../db/File';

export default {
  files: [
    {
      id: '123abc',
      name: 'Code something',
      content: `# Hello World
This content represents a small test content file.

def loop():
  for i in range(0, 10):
    print(i)`,
      createdAt: new Date(),
    },
  ] as File[],
};
