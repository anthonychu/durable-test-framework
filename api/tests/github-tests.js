describe('GitHub', () => {

  describe('home page', () => {

    it('should have the correct title', async (page) => {
      await page.goto("https://github.com/");
      const title = await page.title();

      assert.match(title, /^GitHub/i);
    });

    it('should have a free trial button', async (page) => {
      await page.goto("https://github.com/");
      const link = await page.$x('//a[contains(text(), "Start a free trial")]');

      assert.isNotNull(link);
    });
  });
});

