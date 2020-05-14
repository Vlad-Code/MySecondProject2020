import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (dataAndFormat) => {
  switch (dataAndFormat.format) {
    case '.json':
      return JSON.parse(dataAndFormat.data);
    case '.yml':
      return yaml.safeLoad(dataAndFormat.data);
    case '.ini':
      return ini.parse(dataAndFormat.data);
    default:
      throw new Error('Unknown state!');
  }
};

export default parseData;
