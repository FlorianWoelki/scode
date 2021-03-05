interface Shortcut {
  isCtrlAndShift: boolean;
  keyCode: number;
  description: string;
  key: string;
  monacoKeyCode?: number;
}

type Shortcuts = 'addCodeBlock' | 'addMarkdownBlock' | 'moveBlockUp' | 'moveBlockDown' | 'deleteBlock';

export default {
  addCodeBlock: {
    description: 'Adds a code block to your document',
    isCtrlAndShift: true,
    keyCode: 33,
    key: 'C',
  },
  addMarkdownBlock: {
    description: 'Adds a markdown block to your document',
    isCtrlAndShift: true,
    keyCode: 43,
    key: 'M',
  },
  moveBlockUp: {
    description: 'Move selected block up',
    isCtrlAndShift: true,
    keyCode: 38,
    monacoKeyCode: 16,
    key: 'Up',
  },
  moveBlockDown: {
    description: 'Move selected block down',
    isCtrlAndShift: true,
    keyCode: 40,
    monacoKeyCode: 18,
    key: 'Down',
  },
  deleteBlock: {
    description: 'Delete selected block',
    isCtrlAndShift: true,
    keyCode: 20,
    key: 'Delete',
  },
} as Record<Shortcuts, Shortcut>;
