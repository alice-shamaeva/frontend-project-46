import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'stylish', readFixture('expected_file_stylish.txt')],
  ['yml', 'stylish', readFixture('expected_file_stylish.txt')],
  ['json', 'plain', readFixture('expected_file_plain.txt')],
  ['yml', 'plain', readFixture('expected_file_plain.txt')],
  ['json', 'json', readFixture('expected_file_json.txt')],
  ['yml', 'json', readFixture('expected_file_json.txt')],
])('all test gendiff', (extension, format, expected) => {
  expect(genDiff(getFixturePath(`file1.${extension}`), getFixturePath(`file2.${extension}`), format)).toEqual(expected);
});
