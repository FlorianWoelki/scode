interface Shortcut {
  isCtrlAndShift: boolean;
  keyCode: number;
  key?: string;
  monacoKeyCode?: number;
}

type Shortcuts = 'addCodeBlock' | 'addMarkdownBlock' | 'moveBlockUp' | 'moveBlockDown' | 'deleteBlock';

export default {
  addCodeBlock: {
    isCtrlAndShift: true,
    keyCode: 33,
    key: 'C',
  },
  addMarkdownBlock: {
    isCtrlAndShift: true,
    keyCode: 43,
    key: 'M',
  },
  moveBlockUp: {
    isCtrlAndShift: true,
    keyCode: 38,
    monacoKeyCode: 16,
  },
  moveBlockDown: {
    isCtrlAndShift: true,
    keyCode: 40,
    monacoKeyCode: 18,
  },
  deleteBlock: {
    isCtrlAndShift: true,
    keyCode: 20,
    key: 'Delete',
  },
} as Record<Shortcuts, Shortcut>;
