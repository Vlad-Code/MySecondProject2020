import getResultStylish from './stylish';
import getPlain from './plain';
import getJson from './json';

const getResult = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getResultStylish(diff, '  ');
    case 'plain':
      return getPlain(diff);
    case 'json':
      return getJson(diff);
    default:
      throw new Error(`Unknown format of output: ${format}`);
  }
};

export default getResult;
