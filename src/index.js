import makeFormat from './formatters/index.js';
import { getExtension, readFile } from './utils.js';
import getDifferentObject from './genDifference.js' 
import parse from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = readFile(filepath1);
  const dataFile2 = readFile(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const parseFile1 = parse(dataFile1, extension1);
  const parseFile2 = parse(dataFile2, extension2);
  const dataDiff = getDifferentObject(parseFile1, parseFile2);
  return makeFormat(dataDiff, format);
};

export default genDiff;
