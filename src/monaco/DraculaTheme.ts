export default {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      foreground: '6272a4',
      token: 'comment',
    },
    {
      foreground: 'f1fa8c',
      token: 'string',
    },
    {
      foreground: 'bd93f9',
      token: 'constant.numeric',
    },
    {
      foreground: 'bd93f9',
      token: 'constant.language',
    },
    {
      foreground: 'bd93f9',
      token: 'constant.character',
    },
    {
      foreground: 'bd93f9',
      token: 'constant.other',
    },
    {
      foreground: 'ffb86c',
      token: 'variable.other.readwrite.instance',
    },
    {
      foreground: 'ff79c6',
      token: 'constant.character.escaped',
    },
    {
      foreground: 'ff79c6',
      token: 'constant.character.escape',
    },
    {
      foreground: 'ff79c6',
      token: 'string source',
    },
    {
      foreground: 'ff79c6',
      token: 'string source.ruby',
    },
    {
      foreground: 'ff5555',
      token: 'source.ruby string.regexp.classic.ruby',
    },
    {
      foreground: 'ff5555',
      token: 'source.ruby string.regexp.mod-r.ruby',
    },
    {
      foreground: 'ff79c6',
      token: 'keyword',
    },
    {
      foreground: 'ff79c6',
      token: 'storage',
    },
    {
      foreground: '8be9fd',
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: '8be9fd',
      fontStyle: 'italic',
      token: 'storage.type.namespace',
    },
    {
      foreground: 'ff79c6',
      fontStyle: 'italic',
      token: 'storage.type.class',
    },
    {
      foreground: '8be9fd',
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'underline',
      token: 'meta.path',
    },
    {
      foreground: '8be9fd',
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: '50fa7b',
      token: 'entity.name.function',
    },
    {
      foreground: 'ffb86c',
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: 'ff79c6',
      token: 'entity.name.tag',
    },
    {
      foreground: '50fa7b',
      token: 'entity.other.attribute-name',
    },
    {
      foreground: '8be9fd',
      token: 'support.function',
    },
    {
      foreground: '6be5fd',
      token: 'support.constant',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'support.type',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'support.class',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'support.other.namespace',
    },
    {
      foreground: 'f8f8f0',
      background: 'ff79c6',
      token: 'invalid',
    },
    {
      foreground: 'f8f8f0',
      background: 'bd93f9',
      token: 'invalid.deprecated',
    },
    {
      foreground: 'cfcfc2',
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: '6272a4',
      token: 'meta.diff',
    },
    {
      foreground: '6272a4',
      token: 'meta.diff.header',
    },
    {
      foreground: 'ff79c6',
      token: 'markup.deleted',
    },
    {
      foreground: '50fa7b',
      token: 'markup.inserted',
    },
    {
      foreground: 'e6db74',
      token: 'markup.changed',
    },
    {
      foreground: 'bd93f9',
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: 'e6db74',
      token: 'entity.name.filename',
    },
    {
      foreground: 'f83333',
      token: 'message.error',
    },
    {
      foreground: 'eeeeee',
      token:
        'punctuation.definition.string.begin.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: 'eeeeee',
      token:
        'punctuation.definition.string.end.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: '8be9fd',
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: 'f1fa8c',
      token: 'meta.structure.dictionary.value.json string.quoted.double.json',
    },
    {
      foreground: '50fa7b',
      token:
        'meta meta meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: 'ffb86c',
      token: 'meta meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: 'ff79c6',
      token: 'meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: 'bd93f9',
      token: 'meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: '50fa7b',
      token: 'meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: 'ffb86c',
      token: 'meta meta.structure.dictionary.value string',
    },
    {
      foreground: 'ffb86c',
      fontStyle: 'italic',
      token: 'markup.strike',
    },
    {
      foreground: 'ffb86c',
      fontStyle: 'bold',
      token: 'markup.bold',
    },
    {
      foreground: 'ffb86c',
      fontStyle: 'italic',
      token: 'markup.italic',
    },
    {
      foreground: '8be9fd',
      token: 'markup.heading',
    },
    {
      foreground: 'ff79c6',
      token: 'punctuation.definition.list_item.markdown',
    },
    {
      foreground: '6272a4',
      fontStyle: 'italic',
      token: 'markup.quote',
    },
    {
      foreground: '6272a4',
      background: '6272a4',
      fontStyle: 'italic',
      token: 'punctuation.definition.blockquote.markdown',
    },
    {
      foreground: '6272a4',
      token: 'meta.separator',
    },
    {
      foreground: '50fa7b',
      token: 'text.html.markdown markup.raw.inline',
    },
    {
      foreground: 'bd93f9',
      fontStyle: 'underline',
      token: 'markup.underline',
    },
    {
      foreground: 'cfcfc2',
      token: 'markup.raw.block',
    },
    {
      foreground: 'f8f8f2',
      token: 'markup.raw.block.fenced.markdown source',
    },
    {
      foreground: '6272a4',
      fontStyle: 'italic',
      token: 'punctuation.definition.fenced.markdown',
    },
    {
      foreground: '6272a4',
      fontStyle: 'italic',
      token: 'variable.language.fenced.markdown',
    },
    {
      foreground: '6272a4',
      fontStyle: 'italic',
      token: 'variable.language.fenced.markdown',
    },
    {
      foreground: 'ff79c6',
      token: 'punctuation.accessor',
    },
    {
      foreground: 'ff79c6',
      token: 'meta.function.return-type',
    },
    {
      foreground: 'ffffff',
      token: 'punctuation.section.block.begin',
    },
    {
      foreground: 'ffffff',
      token: 'punctuation.section.block.end',
    },
    {
      foreground: 'ff79c6',
      token: 'punctuation.section.embedded.begin',
    },
    {
      foreground: 'ff79c6',
      token: 'punctuation.section.embedded.end',
    },
    {
      foreground: 'ff79c6',
      token: 'punctuation.separator.namespace',
    },
    {
      foreground: '50fa7b',
      token: 'variable.function',
    },
    {
      foreground: 'ffffff',
      token: 'variable.other',
    },
    {
      foreground: 'bd93f9',
      token: 'variable.language',
    },
    {
      foreground: '8be9fd',
      token: 'entity.name.module.ruby',
    },
    {
      foreground: 'bd93f9',
      token: 'entity.name.constant.ruby',
    },
    {
      foreground: 'ffffff',
      token: 'support.function.builtin.ruby',
    },
    {
      foreground: 'ff79c6',
      token: 'storage.type.namespace.cs',
    },
    {
      foreground: '8be9fd',
      token: 'entity.name.namespace.cs',
    },
  ],
  colors: {
    'editor.foreground': '#f8f8f2',
    'editor.background': '#1F2937',
    'editor.selectionBackground': '#44475a',
    'editor.lineHighlightBackground': '#1F2937',
    'editorCursor.foreground': '#f8f8f0',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.activeBackground': '#9D550FB0',
    // 'editor.selectionHighlightBorder': '#222218',
  },
};
