import { getClient } from "durable-functions";

export default async function (context, req) {
    const client = getClient(context);
    const iterations = parseInt(req.query['iterations'] ?? '1');
    const instanceId = await client.startNew('TestsOrchestrator', undefined, iterations);

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};