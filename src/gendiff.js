import getDiff from './builder_of_diff';
import { readFile, getFormatOfFile } from './data_and_format';
import parseData from './parsers';
import getResult from './formaters/index';

const gendiff = (pathToFile1, pathToFile2, format) => {
  const contentOfFile1 = readFile(pathToFile1);
  const contentOfFile2 = readFile(pathToFile2);
  const formatOfFile1 = getFormatOfFile(pathToFile1);
  const formatOfFile2 = getFormatOfFile(pathToFile2);
  const parsedContentOfFile1 = parseData(contentOfFile1, formatOfFile1);
  const parsedContentOfFile2 = parseData(contentOfFile2, formatOfFile2);
  const diff = getDiff(parsedContentOfFile1, parsedContentOfFile2);
  return getResult(parsedContentOfFile1, parsedContentOfFile2, diff, format);
};

export default gendiff;
