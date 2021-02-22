export type BlockType = {
  type: 'code' | 'markdown';
  value: string;
  isFocused?: boolean;
  rawValue?: string;
  isOptionsShowing?: boolean;
  isDeleteHovering?: boolean;
  shouldForceUpdate?: boolean;
  language?: string;
};
