import _ from 'lodash';

const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (value === false || value === true || value === null || value === 0) {
    return `${value}`;
  }
  return `'${value}'`;
};

const getPlainFormat = (value, parent = '') => {
  switch(value.action) {
    case 'added':
      return `Property '${parent}${value.key}' was added with value: ${stringify(value.newValue)}`;
    case 'deleted':
      return `Property '${parent}${value.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${value.key}' was updated. From ${stringify(value.oldValue)} to ${stringify(value.newValue)}`;
    case 'nested':
      return value.children.map((val) => getPlainFormat(val, `${parent + value.key}.`))
          .filter((item) => item !== null).join('\n');
    default:
      throw new Error(`Unknown type: ${value.action}`);
  }
  
}

export default (plain) => `${plain.map((element) => getPlainFormat(element)).join('\n')}`;
