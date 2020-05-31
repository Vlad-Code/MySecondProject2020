import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unsupported extension of path to file: '${extension}!'`);
  }
};

export default parseData;
