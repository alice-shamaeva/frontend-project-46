import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const readFile = (pathToFile) => {
  const dirName = process.cwd();
  const fullPath = path.resolve(dirName, pathToFile);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (fileName) => {
  const result = fileName.split('.');
  return result.at(-1);
};

const getDifferentObject = (object1, object2) => (
  _.sortBy(_.union(_.keys(object1), _.keys(object2))).map((key) => {
    if (!_.has(object2, key) && _.has(object1, key)) {
      const oldValue = object1[key];

      return {
        action: 'deleted',
        key,
        oldValue,
      };
    }

    if (!_.has(object1, key) && _.has(object2, key)) {
      const newValue = object2[key];

      return {
        action: 'added',
        key,
        newValue,
      };
    }
    const oldValue = object1[key];
    const newValue = object2[key];
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return {
        action: 'nested',
        key,
        children: getDifferentObject(oldValue, newValue),
      };
    }
    if (!_.isEqual(oldValue, newValue)) {
      return {
        action: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    return {
      action: 'unchanged',
      key,
      oldValue,
    };
  })
);

export { readFile, getExtension, getDifferentObject };
