﻿const tests = require('../durable-tests');
const puppeteer = require('puppeteer');

const storageBaseUrl = process.env.STORAGE_BASE_URL;

module.exports = async function (context) {
    const { testId, runId } = context.bindings.testData;
    const test = tests[testId];
    if (!test) {
        return { testId, passed: false, exception: 'test not found' };
    }

    let result = {
        testId,
        runId,
        screenshotUrl: `${storageBaseUrl}/screenshots/${runId}.png`,
        description: test.description
    };

    const browser = await puppeteer.launch();
    try {
        const browserContext = await browser.createIncognitoBrowserContext();
        const page = await browserContext.newPage();
        await Promise.resolve(test.fn(page));
        result.passed = true;
        context.log(`${test.description}: passed`);
        const screenshotBuffer = await page.screenshot({ fullPage: false });
        context.bindings.screenshot = screenshotBuffer;
    } catch (ex) {
        result.passed = false;
        result.exception = ex.toString();
        context.log.error(`${test.description}: failed - ${ex.toString()}`);
    } finally {
        await browser.close();
    }
    
    context.bindings.signalRMessage = {
        target: "testCompleted",
        arguments: [ result ]
    };
    return result;
};