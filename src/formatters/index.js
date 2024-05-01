import getStylish from './stylish';
import getPlain from './plain';

export default function makeFormat(tree, formatName) {
  switch (formatName) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Output format is not correct');
  }
}
