export type BlockType = {
  type: 'code' | 'markdown';
  value: string;
  rawValue?: string;
  isOptionsShowing?: boolean;
  isDeleteHovering?: boolean;
  language?: string;
};
