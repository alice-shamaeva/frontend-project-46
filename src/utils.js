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

export { readFile, getExtension };
