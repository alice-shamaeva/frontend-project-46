import _ from 'lodash';

const getSpace = (depth, symbol) => {
  const space = '    ';
  if (!symbol) {
    return space.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${space.repeat(depth)} ${symbol}`;
};

const stringify = (value, level) => {
  function iter(currentValue, depth) {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object.entries(currentValue).map(([key, val]) => ` ${getSpace(depth + 1, ' ')} ${key}: ${iter(val, depth + 1)}`);
    return ['{', ...lines, `${getSpace(depth + 1)}}`].join('\n');
  }
  return iter(value, level);
};

export default function getStylish(tree) {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.action) {
        case 'deleted':
          return ` ${getSpace(depth, '-')} ${key.key}: ${stringify(key.oldValue, depth)}`.trimEnd();
        case 'added':
          return ` ${getSpace(depth, '+')} ${key.key}: ${stringify(key.newValue, depth)}`.trimEnd();
        case 'nested':
          return ` ${getSpace(depth, ' ')} ${key.key}: ${iter(key.children, depth + 1)}`.trimEnd();
        case 'changed':
          const deleted = ` ${getSpace(depth, '-')} ${key.key}: ${stringify(key.oldValue, depth)}`.trimEnd();
          const added = ` ${getSpace(depth, '+')} ${key.key}: ${stringify(key.newValue, depth)}`.trimEnd();
          return `${deleted}\n${added}`;
        default:
          return ` ${getSpace(depth, ' ')} ${key.key}: ${stringify(key.oldValue, depth)}`.trimEnd();
      }
    });
    return ['{', ...result, `${getSpace(depth)}}`].join('\n');
  };
  return iter(tree, 0);
}