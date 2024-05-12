import { describe, test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
describe.each(['plain', 'json', 'stylish'])('%s format', (diffType) => {
  const result = fs.readFileSync(getFixturePath(`expected_file_${diffType}.txt`), 'utf-8');

  test.each(['json', 'yml'])('should be equal [.%s]', (extname) => {
    const beforePath = getFixturePath(`file1.${extname}`);
    const afterPath = getFixturePath(`file2.${extname}`);
    expect(genDiff(beforePath, afterPath, diffType)).toEqual(result);
  });
});

describe('default format [stylish]', () => {
  const result = fs.readFileSync(getFixturePath('expected_file_stylish.txt'), 'utf-8');
  test.each(['json', 'yml'])('should be equal [.%s]', (extname) => {
    const beforePath = getFixturePath(`file1.${extname}`);
    const afterPath = getFixturePath(`file2.${extname}`);
    expect(genDiff(beforePath, afterPath)).toEqual(result);
  });
});