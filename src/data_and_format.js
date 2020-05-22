import fs from 'fs';
import path from 'path';
import process from 'process';

const readFile = (pathToFile) => {
  const configPath = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(configPath, 'utf8');
  return data;
};
const getFormatOfFile = (pathToFile) => {
  const format = path.extname(pathToFile);
  return format;
};

export {
  readFile,
  getFormatOfFile,
};
