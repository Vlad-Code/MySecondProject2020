import getDiff from './builddiff';
import getDataAndFormat from './data_and_format';
import parseData from './parsers';
import getResult from './formaters/index';

const gendiff = (pathToFile1, pathToFile2, format) => {
  const dataAndFormatOfFile1 = getDataAndFormat(pathToFile1);
  const dataAndFormatOfFile2 = getDataAndFormat(pathToFile2);
  const parsedContentOfFile1 = parseData(dataAndFormatOfFile1);
  const parsedContentOfFile2 = parseData(dataAndFormatOfFile2);
  const diff = getDiff(parsedContentOfFile1, parsedContentOfFile2);
  return getResult(parsedContentOfFile1, parsedContentOfFile2, diff, format);
};

export default gendiff;
