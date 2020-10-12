const df = require("durable-functions");

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const iterations = req.query['iterations'] || 1;
    const instanceId = await client.startNew('TestsOrchestrator', undefined, iterations);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};