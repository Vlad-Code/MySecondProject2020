import fs from 'fs';
import path from 'path';
import process from 'process';

const readFile = (pathToFile) => {
  const configPath = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(configPath, 'utf8');
  return data;
};
const getExtensionOfPath = (pathToFile) => {
  const extension = path.extname(pathToFile);
  return extension;
};

export {
  readFile,
  getExtensionOfPath,
};
