import fs from 'fs';
import path from 'path';

export const readFile = (pathToFile) => {
    const dirName = process.cwd();
    const fullPath = path.resolve(dirName, pathToFile);
    return fs.readFileSync(fullPath, 'utf-8');
}

export const getExtension = (fileName) => {
    const result = fileName.split('.');
    return result.at(-1);
}