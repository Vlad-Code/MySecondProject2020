const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const parseFile = (configFile) => {
  const configPath = path.resolve('/home/vladislav/', configFile);
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  return yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
};

export default parseFile;
