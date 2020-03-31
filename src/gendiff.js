const fs = require('fs');

const path = require('path');

const gendiff = (firstConfig, secondConfig) => {
  const object1 = JSON.parse(fs.readFileSync(`${path.resolve('/home/vladislav/', `${firstConfig}`)}`));
  const object2 = JSON.parse(fs.readFileSync(`${path.resolve('/home/vladislav/', `${secondConfig}`)}`));
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  const checkfirstConfig = keysOfObject1.reduce((acc, key) => {
    if (!keysOfObject2.includes(key)) {
      acc.push(`-${key}: ${object1[key]}`);
    }
    if (keysOfObject2.includes(key)) {
      if (object2[key] === object1[key]) {
        acc.push(` ${key}: ${object2[key]}`);
      } else {
        acc.push(`+${key}: ${object2[key]}`);
        acc.push(`-${key}: ${object1[key]}`);
      }
    }
    return acc;
  }, []);
  const result = keysOfObject2.reduce((acc, key) => {
    if (!keysOfObject1.includes(key)) {
      acc.push(`+${key}: ${object2[key]}`);
    }
    return acc;
  }, checkfirstConfig);
  return `{\n ${result.join('\n ')}\n}`;
};

export default gendiff;
