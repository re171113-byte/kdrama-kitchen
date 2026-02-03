const { chromium } = require('playwright');

(async () => {
  const context = await chromium.launchPersistentContext(
    'C:\\Users\\noble\\ChromeX',
    { channel: 'chrome', headless: false, viewport: { width: 1280, height: 800 } }
  );
  const page = await context.newPage();
  await page.goto('https://x.com/home', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 8000));
  console.log('URL:', page.url());
  await page.screenshot({ path: 'C:/Users/noble/projects/withAi/kdrama-kitchen/x-login-check.png' });
  console.log('Screenshot saved');
  await context.close();
})().catch(e => console.error(e.message));
