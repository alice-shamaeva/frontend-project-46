import _ from 'lodash';

const stringify = (value) => (_.isObject(value) ? '[complex value]' : value);

const templates = {
  deleted: ({ path }) => `Property '${path}' was deleted`,
  added: ({ path, value }) => (
      `Property '${path}' was added with value: ${stringify(value)}`
  ),
  changed: ({ path, deletedValue, addedValue }) => (
      `Property ${path} was changed from ${stringify(deletedValue)} to ${stringify(addedValue)}`
  ),
  nested: ({ path, children, formatter }) => (
      formatter(children, path)
  ),
  unchanged: () => null,
};


const getPlain = (ast, path = '') => ast.map(({ key, type, ...node }) => {
  const newPath = path ? `${path}.${key}` : `${key}`;
  const options = {
    path: newPath,
    ...node,
    formatter: getPlain,
  };
  return templates[type](options);
}).filter(Boolean).join('\n');


export default getPlain;
