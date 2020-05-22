import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Unsupported format of file: '${format}!'`);
  }
};

export default parseData;
