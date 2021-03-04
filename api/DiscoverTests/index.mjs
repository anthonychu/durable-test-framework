import tests from '../durable-tests.mjs';

export default async function (context) {
    const testIds = [];
    for (let i = 0; i < context.bindings.iterations; i++) {
        testIds.push(...Object.keys(tests));
    }
    return testIds;
};