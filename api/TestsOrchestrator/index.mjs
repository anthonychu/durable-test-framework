import { orchestrator } from "durable-functions";
import { v4 as uuidv4 } from 'uuid';

export default orchestrator(function* (context) {
    const iterations = parseInt(context.df.getInput());
    const testIds = yield context.df.callActivity('DiscoverTests', iterations);

    if (!context.df.isReplaying) {
        context.log(`${testIds.length} tests discovered`);
    }

    const tests = testIds.map(testId => context.df.callActivity('RunTest', {
        testId,
        runId: uuidv4()
    }));
    const results = yield context.df.Task.all(tests);

    if (!context.df.isReplaying) {
        context.log(results);
    }

    return {
        passed: results.filter(r => r.passed).length,
        failed: results.filter(r => !r.passed).length
    };
});
