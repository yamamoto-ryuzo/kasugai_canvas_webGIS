const { chromium } = require('playwright');
(async () => {
  let browser;
  try { browser = await chromium.launch({ channel: 'msedge' }); }
  catch (e) { browser = await chromium.launch(); }
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto('http://localhost:8611/index.html', { waitUntil: 'networkidle' });
  await page.waitForSelector('.pcard', { timeout: 10000 });
  const cards0 = await page.locator('.pcard').count();
  console.log('cards initial:', cards0);
  // card contents check
  const first = await page.locator('.pcard').first().innerText();
  console.log('first card has 更新:', /更新:/.test(first), '| fmt chips:', await page.locator('.pcard .chip.fmt').count(), '| engine links:', await page.locator('.pcard .engines a').count());
  const imgs = await page.locator('.pthumb img').count();
  console.log('thumbnails:', imgs);
  // search: filter by "QGIS"
  await page.fill('#psearch', 'QGIS');
  await page.waitForTimeout(300);
  console.log('cards after search "QGIS":', await page.locator('.pcard').count());
  // search: format "geoparquet"
  await page.fill('#psearch', 'geoparquet');
  await page.waitForTimeout(300);
  console.log('cards after search "geoparquet":', await page.locator('.pcard').count());
  // no-match
  await page.fill('#psearch', 'zzzz_nothing');
  await page.waitForTimeout(300);
  console.log('empty msg:', await page.locator('.pempty').count());
  // tag chip filter
  await page.fill('#psearch', '');
  await page.locator('#ptags .chip', { hasText: '最小構成' }).click();
  await page.waitForTimeout(300);
  console.log('cards after tag 最小構成:', await page.locator('.pcard').count());
  await page.locator('#ptags .chip.active').click(); // clear
  await page.waitForTimeout(300);
  // screenshot full page
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.fill('#psearch', '3dtiles');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'verify/issue1/search_3dtiles.png', fullPage: true });
  await page.fill('#psearch', '');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'verify/issue1/all_cards.png', fullPage: true });
  console.log('JS errors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
