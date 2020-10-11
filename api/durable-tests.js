const fs = require('fs');
const path = require('path');
const chai = require('chai');

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

function discoverTests() {
  const testsFolder = `${__dirname}/Tests`;
  const files = fs.readdirSync(testsFolder);

  for (let file of files) {
    file = path.join(testsFolder, file).replace(/\.js$/, '');
    currentFile = file;
    require(currentFile);
  }
}

discoverTests();
module.exports = durableTests;