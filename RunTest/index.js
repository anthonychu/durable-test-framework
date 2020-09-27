const tests = require('../durable-tests');
const puppeteer = require('puppeteer');

module.exports = async function (context) {
    const { testId, runId } = context.bindings.testData;
    const test = tests[testId];
    if (!test) {
        return;
    }

    let result = {
        testId,
        screenshotUrl: `https://test20191217v3.blob.core.windows.net/screenshots/${runId}.png`,
        description: test.description
    };

    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await Promise.resolve(test.fn(page));
        result.passed = true;
        context.log(`${test.description}: passed`);
        const screenshotBuffer = await page.screenshot({ fullPage: true });
        context.bindings.screenshot = screenshotBuffer;
    } catch (ex) {
        result.passed = false;
        result.exception = ex.toString();
        context.log.error(`${test.description}: failed - ${ex.toString()}`);
    } finally {
        await browser.close();
    }
    return result;
};