import { Strikethrough } from './Strikethrough';
import { InlineCode } from './InlineCode';
import { Header } from './Header';
import { OrderedList } from './OrderedList';
import { UnorderedList } from './UnorderedList';
import { Italic } from './Italic';
import { Bold } from './Bold';

export default [
  new Strikethrough(),
  new InlineCode(),
  new Header(),
  new OrderedList(),
  new UnorderedList(),
  new Italic(),
  new Bold(),
];
