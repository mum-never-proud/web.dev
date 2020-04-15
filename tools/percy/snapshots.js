const PercyScript = require('@percy/script');
const pagesToTest = [
  {
    url: '',
    title: 'Home page',
  },
  {
    url: 'learn',
    title: 'Learn page',
  },
  {
    url: 'measure',
    title: 'Measure page',
  },
  {
    url: 'blog',
    title: 'Blog page',
  },
  {
    url: 'about',
    title: 'About page',
  },
  {
    url: 'codelab-avoid-invisible-text',
    title: 'Codelab page',
  },
  {
    url: 'handbook/web-dev-components',
    title: 'Components page',
  },
  {
    url: 'authors',
    title: 'Authors page',
  },
  {
    url: 'tags',
    title: 'Tags page',
  },
  {
    url: 'podcasts',
    title: 'Podcasts page',
  },
  {
    url: '/newsletter/',
    title: 'Newsletter page',
  },
];

// A script to navigate our app and take snapshots with Percy.
PercyScript.run(
  async (browser, percySnapshot) => {
    for (page of pagesToTest) {
      await browser.goto(`http://localhost:8080/${page.url}`);
      // Wait for the SPA to update the active link in the top nav.
      await browser.waitFor(5000);
      await percySnapshot(`${page.title}`);
    }
  },
  // These flags remove Percy's single-process flag. Without these, any page
  // with an iframe will crash puppeteer (and percy).
  {args: ['--no-sandbox', '--disable-setuid-sandbox']},
);
