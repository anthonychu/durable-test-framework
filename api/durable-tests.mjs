import fs from 'fs';
import path from 'path';
import chai from 'chai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const durableTests = {};
let currentFile = '';
let currentContext = [];

global.assert = chai.assert;
global.describe = function (description, fn) {
  currentContext.push(description);
  // console.log(description);
  fn();
  currentContext.splice(-1, 1);
};

global.it = function (description, fn) {
  const test = {
    fn,
    description: [...currentContext, description].join(' ')
  };
  const testId = `${currentFile}-${test.description}`;
  // console.log(testId);
  durableTests[testId] = test;
}

async function discoverTests() {
  const testsFolder = `${__dirname}/Tests`;
  const files = fs.readdirSync(testsFolder);

  for (let file of files) {
    file = path.join(testsFolder, file);
    currentFile = file;
    await import(currentFile);
  }
}

await discoverTests();

export default durableTests;