const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const ini = require('ini');

const parseFile = (configFile) => {
  const configPath = path.resolve('/home/vladislav/', configFile);
  const format = path.extname(configPath);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  if (format === '.ini') {
    return ini.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  return yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
};

export default parseFile;
