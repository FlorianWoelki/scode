export type BlockType = {
  type: 'code' | 'markdown';
  savedValue: string;
  cachedValue?: string;
  isFocused?: boolean;
  isOptionsShowing?: boolean;
  isDeleteHovering?: boolean;
  shouldForceUpdate?: boolean;
  language?: string;
};
