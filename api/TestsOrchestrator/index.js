const df = require("durable-functions");
const { v4: uuidv4 } = require('uuid');

module.exports = df.orchestrator(function* (context) {
    const testIds = yield context.df.callActivity('DiscoverTests');
    const tests = testIds.map(testId => context.df.callActivity('RunTest', {
        testId,
        runId: uuidv4()
    }));
    const results = yield context.df.Task.all(tests);
    return results;
});