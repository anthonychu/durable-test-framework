const df = require("durable-functions");
const { v4: uuidv4 } = require('uuid');

module.exports = df.orchestrator(function* (context) {
    const testIds = yield context.df.callActivity('DiscoverTests');
    const tests = testIds.map(testId => {
        const data = {
            testId,
            runId: uuidv4()
        };
        return context.df.callActivity('RunTest', data);
    });
    const results = yield context.df.Task.all(tests);
    return results;
});