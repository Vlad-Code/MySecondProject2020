import getResultStylish from './stylish';
import getPlain from './plain';
import getJson from './json';

const getResult = (parsedData1, parsedData2, diff, format) => {
  switch (format) {
    case 'stylish':
      return getResultStylish(parsedData1, parsedData2, diff, '  ');
    case 'plain':
      return getPlain(diff, parsedData1, parsedData2);
    case 'json':
      return getJson(diff, parsedData1, parsedData2);
    default:
      throw new Error('Unknown state!');
  }
};

export default getResult;
