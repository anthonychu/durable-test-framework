const durableTests = require("../durable-tests");

const tests = require('../durable-tests');

module.exports = async function (context) {
    return Object.keys(tests);
};