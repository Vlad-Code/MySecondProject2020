import fs from 'fs';
import path from 'path';

const getDataAndFormat = (pathToFile) => {
  const configPath = path.resolve('/home/vladislav/', pathToFile);
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf8');
  return { data, format };
};

export default getDataAndFormat;
