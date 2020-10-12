const durableTests = require("../durable-tests");

const tests = require('../durable-tests');

module.exports = async function (context) {
    const testIds = [];
    for (let i = 0; i < context.bindings.iterations; i++) {
        testIds.push(...Object.keys(tests));
    }
    return testIds;
};