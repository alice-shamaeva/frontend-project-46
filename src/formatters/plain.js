const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (value === false || value === true || value === null || value.isNumber) {
    return `${value}`
  }
  return `'${value}'`;
};

const templates = {
  deleted: ({ path }) => `Property '${path}' was removed`,
  added: ({ path, value }) => (
      `Property '${path}' was added with value: ${stringify(value.newValue)}`
  ),
  changed: ({ path, value }) => (
      `Property '${path}' was updated. From ${stringify(value.oldValue)} to ${stringify(value.newValue)}`
  ),
  nested: ({ path, value, formatter }) => (
      formatter(value.children, path)
  ),
  unchanged: () => null,
};

const getPlain = (ast, path = '') => ast.map(({ key, action, ...node }) => {
  const newPath = path ? `${path}.${key}` : `${key}`;
  const options = {
    path: newPath,
    value: node,
    formatter: getPlain,
  };

  return templates[action](options);
}).filter(Boolean).join('\n');


export default getPlain;
