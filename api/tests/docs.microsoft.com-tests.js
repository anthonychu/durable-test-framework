describe('Microsoft Docs', () => {

  describe('home page', () => {
    it('should have the correct title', async (page) => {
      await page.goto("https://docs.microsoft.com/");
      const title = await page.title();

      assert.match(title, /Microsoft Docs/i);
    });
  });

  describe('Azure home page', () => {

    it('should have the correct title', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/");
      const title = await page.title();

      assert.match(title, /^Azure Documentation/i);
    });

    it('should include Azure Functions', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/");
      const links = await page.$x('//h3[contains(text(), "Azure Functions")]');

      assert.isNotEmpty(links);
    });

  });

  it('Azure Functions landing page should include quickstart links', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/");
    const headings = await page.$x('//h3[contains(text(), "Quickstart")]');

    assert.isNotEmpty(headings);
  });

  it('Azure Functions overview should mention Durable Functions', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-overview");
    const hasDurable = await page.$eval('main', (el) => el.textContent.includes('Durable Functions'));

    assert.isTrue(hasDurable);
  });

  it('Python functions developer guide should include section on scaling', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-reference-python#scaling-and-concurrency");
    const headings = await page.$x('//h2[contains(text(), "Scaling and concurrency")]');

    assert.isNotEmpty(headings);
  });

  it('Azure Functions continuous deployment page should mention Azure Repos', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-continuous-deployment");
    const hasText = await page.$eval('main', (el) => el.textContent.includes('Azure Repos'));

    assert.isTrue(hasText);
  });

  it('Azure Functions Kubernetes page should mention KEDA', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-kubernetes-keda");
    const hasText = await page.$eval('main', (el) => el.textContent.includes('KEDA'));

    assert.isTrue(hasText);
  });

  it('Azure Functions monitoring page should include a diagram', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-monitoring?tabs=cmd#view-telemetry-in-monitor-tab");
    const img = await page.$("img[src='media/functions-monitoring/monitor-tab-ai-invocations.png']");

    assert.isNotNull(img);
  });

  it('Azure Functions premium page should have a section on max scale out', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-premium-plan#region-max-scale-out");
    const headings = await page.$x('//h2[contains(text(), "Region Max Scale Out")]');

    assert.isNotEmpty(headings);
  });

  it('Azure Functions SignalR bindings page should have a section on authentication', async (page) => {
    await page.goto("https://docs.microsoft.com/azure/azure-functions/functions-bindings-signalr-service-input?tabs=csharp#authenticated-tokens");
    const headings = await page.$x('//h2[contains(text(), "Authenticated tokens")]');

    assert.isNotEmpty(headings);
  });

  it('Azure Functions learn module should have the right title', async (page) => {
    await page.goto("https://docs.microsoft.com/learn/modules/develop-test-deploy-azure-functions-with-visual-studio/");
    const title = await page.title();

    assert.match(title, /Azure Function/i);
  });

  it('Durable Functions learn module should have the right title', async (page) => {
    await page.goto("https://docs.microsoft.com/learn/modules/create-long-running-serverless-workflow-with-durable-functions/");
    const title = await page.title();

    assert.match(title, /Durable Functions/i);
  });

  it('Learn TV should have a schedule', async (page) => {
    await page.goto("https://docs.microsoft.com/learn/tv/");
    const div = await page.$('div.schedule-holder');

    assert.isNotNull(div);
  });

  it('Microsoft Learn should have the right title', async (page) => {
    await page.goto("https://docs.microsoft.com/learn/");
    const title = await page.title();

    assert.match(title, /^Microsoft Learn/i);
  });

  describe('Static Web Apps', () => {

    it('should include quickstart links on landing page', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/");
      const headings = await page.$x('//h3[contains(text(), "Quickstart")]');
  
      assert.isNotEmpty(headings);
    });
  
    it('should have the right title', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/");
      const title = await page.title();
  
      assert.match(title, /Static Web Apps/i);
    });

    it('should include a section on cloning the repo in the quickstart', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript#clone-the-repository");
      const headings = await page.$x('//h2[contains(text(), "Clone the repository")]');
  
      assert.isNotEmpty(headings);
    });

    it('should include a section on the login route in the authentication docs', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/authentication-authorization#login");
      const headings = await page.$x('//h2[contains(text(), "Login")]');
  
      assert.isNotEmpty(headings);
    });

    it('should include a screenshot on the deploying VuePress page', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/publish-vuepress#create-the-application");
      const img = await page.$("img[src='media/publish-vuepress/create-in-portal.png']");
  
      assert.isNotNull(img);
    });

    it('should include a screenshot on the deploying Gatsby page', async (page) => {
      await page.goto("https://docs.microsoft.com/en-ca/azure/static-web-apps/publish-gatsby#build");
      const img = await page.$("img[src='media/publish-gatsby/build-details.png']");
  
      assert.isNotNull(img);
    });

    it('should include a screenshot on the local development page', async (page) => {
      await page.goto("https://docs.microsoft.com/azure/static-web-apps/local-development#debugging-the-api");
      const img = await page.$("img[src='media/local-development/breakpoint-set.png']");
  
      assert.isNotNull(img);
    });
  });
});
