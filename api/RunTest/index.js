const tests = require('../durable-tests');
const puppeteer = require('puppeteer');

const storageBaseUrl = process.env.STORAGE_BASE_URL;
const browserTask = puppeteer.launch();

module.exports = async function (context) {
    const { testId, runId } = context.bindings.testData;
    const test = tests[testId];
    if (!test) {
        return { testId, passed: false, exception: 'test not found' };
    }

    const result = {
        testId,
        runId,
        screenshotUrl: `${storageBaseUrl}/screenshots/${runId}.png`,
        description: test.description
    };

    const browser = await browserTask;
    const browserContext = await browser.createIncognitoBrowserContext();
    const page = await browserContext.newPage();
    
    try {
        await page.setViewport({
            width: 1280,
            height: 720
        });

        await Promise.resolve(test.fn(page));
        result.passed = true;
        context.log(`${test.description}: passed`);
    } catch (ex) {
        result.passed = false;
        result.exception = ex.toString();
        context.log.error(`${test.description}: failed - ${ex.toString()}`);
    } finally {
        try {
            const screenshotBuffer = await page.screenshot({ fullPage: false });
            context.bindings.screenshot = screenshotBuffer;
        } catch {}
        await browserContext.close();
    }
    
    context.bindings.signalRMessage = {
        target: "testCompleted",
        arguments: [ result ]
    };
    return result;
};