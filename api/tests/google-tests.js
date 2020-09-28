describe('Google', () => {

  describe('home page', () => {

    it('should have the correct title', async (page) => {
      await page.goto("https://www.google.com/");
      const title = await page.title();

      assert.strictEqual('Google', title);
    });

    it('should have an input box', async (page) => {
      await page.goto("https://www.google.com/");
      const input = await page.$('input[name=q]');

      assert.isNotNull(input);
    });
  });

  describe('search', (page) => {
    it('should be able to find something from microsoft.com', async (page) => {
      await page.goto("https://www.google.com/");
      await page.type('input[name=q]', 'azure functions');
      await Promise.all([page.type('input[name=q]', String.fromCharCode(13)), page.waitForSelector("cite")]);
      const elements = await page.$x("//cite[contains(text(), 'microsoft.com')]");

      assert.isNotEmpty(elements);
    });
  });
});

