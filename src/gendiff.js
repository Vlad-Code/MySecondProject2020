import path from 'path';
import getDiff from './buildDiff';
import readFile from './read_file';
import parseData from './parsers';
import getResult from './formaters/index';

const gendiff = (pathToFile1, pathToFile2, format) => {
  const contentOfFile1 = readFile(pathToFile1);
  const contentOfFile2 = readFile(pathToFile2);
  const extansionOfFile1 = path.extname(pathToFile1);
  const extansionOfFile2 = path.extname(pathToFile2);
  const parsedContentOfFile1 = parseData(contentOfFile1, extansionOfFile1);
  const parsedContentOfFile2 = parseData(contentOfFile2, extansionOfFile2);
  const diff = getDiff(parsedContentOfFile1, parsedContentOfFile2);
  return getResult(diff, format);
};

export default gendiff;
