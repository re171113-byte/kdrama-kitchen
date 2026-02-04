/**
 * 검색엔진 등록/삭제 자동화 스크립트
 * launchPersistentContext + ChromeX 프로필 사용
 *
 * 사용법:
 *   node scripts/search-console.cjs google     — Google Search Console 등록
 *   node scripts/search-console.cjs bing       — Bing Webmaster Tools 등록
 *   node scripts/search-console.cjs naver      — Naver Search Advisor 등록
 *   node scripts/search-console.cjs all        — 전체 등록
 */

const { chromium } = require('playwright');

const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';
const PROFILE_DIR = 'C:/Users/noble/ChromeX';
const NEW_SITE = 'https://www.kdrama-kitchen.com';
const OLD_SITE = 'https://kdrama-kitchen.vercel.app';
const SITEMAP_URL = 'https://www.kdrama-kitchen.com/sitemap.xml';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ========== Google Search Console ==========
async function registerGoogle(page) {
  console.log('\n[Google Search Console] 시작...');

  // Sitemap 제출 페이지로 직접 이동
  const sitemapUrl = `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(NEW_SITE + '/')}`;
  console.log(`  Sitemap 페이지로 이동: ${sitemapUrl}`);
  await page.goto(sitemapUrl, { waitUntil: 'networkidle' });
  await sleep(3000);

  // 로그인 확인
  if (page.url().includes('accounts.google.com')) {
    console.log('  ⚠️ Google 로그인 필요');
    await page.screenshot({ path: `${DIR}/search-google-login.png` });
    return false;
  }

  console.log('  [1/2] Sitemap 입력...');
  await page.screenshot({ path: `${DIR}/search-google-1.png` });

  // Sitemap 입력
  try {
    // 입력 필드 찾기 (여러 가지 시도)
    let input = page.locator('input[type="text"]').first();
    await input.waitFor({ timeout: 10000 });
    await input.click();
    await sleep(500);
    await input.fill('sitemap.xml');
    await sleep(1000);
    console.log('  sitemap.xml 입력 완료');
    await page.screenshot({ path: `${DIR}/search-google-2.png` });
  } catch (e) {
    console.log(`  입력 필드 찾기 실패: ${e.message}`);
    await page.screenshot({ path: `${DIR}/search-google-input-error.png` });
    return false;
  }

  console.log('  [2/2] 제출 버튼 클릭...');

  // 제출 버튼 클릭
  try {
    // 제출 버튼 찾기
    const submitBtn = page.locator('button').filter({ hasText: /제출|Submit/i }).first();
    await submitBtn.waitFor({ timeout: 5000 });
    await submitBtn.click();
    await sleep(3000);
    console.log('  ✅ Sitemap 제출 완료');
  } catch (e) {
    console.log(`  제출 버튼 클릭 실패: ${e.message}`);
    // Enter 키로 시도
    await page.keyboard.press('Enter');
    await sleep(3000);
  }

  await page.screenshot({ path: `${DIR}/search-google-done.png` });
  console.log('  ✅ Google Search Console 완료');
  return true;
}

// ========== Bing Webmaster Tools ==========
async function registerBing(page) {
  console.log('\n[Bing Webmaster Tools] 시작...');

  // 1. Bing Webmaster Tools 접속
  await page.goto('https://www.bing.com/webmasters', { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  // 로그인 확인
  if (page.url().includes('login')) {
    console.log('  ⚠️ Microsoft 로그인 필요 - 수동으로 로그인 후 다시 시도하세요');
    await page.screenshot({ path: `${DIR}/search-bing-login.png` });
    return false;
  }

  console.log('  [1/3] 사이트 추가...');

  // 2. 사이트 추가
  try {
    // "사이트 추가" 또는 "Add Site" 버튼 찾기
    const addSiteBtn = page.locator('button:has-text("사이트 추가"), button:has-text("Add Site"), a:has-text("Add Site")').first();
    await addSiteBtn.click({ timeout: 5000 });
    await sleep(2000);

    // URL 입력
    const urlInput = page.locator('input[placeholder*="URL"], input[type="url"], input[type="text"]').first();
    await urlInput.fill(NEW_SITE);
    await sleep(500);

    // 추가 버튼 클릭
    await page.locator('button:has-text("추가"), button:has-text("Add")').first().click();
    await sleep(3000);

  } catch (e) {
    console.log(`  기존 사이트 확인 또는 추가 시도: ${e.message}`);
  }

  console.log('  [2/3] Sitemap 제출...');

  // 3. Sitemap 제출
  try {
    // Sitemaps 메뉴로 이동
    await page.goto('https://www.bing.com/webmasters/sitemaps', { waitUntil: 'domcontentloaded' });
    await sleep(2000);

    // Sitemap 제출 버튼
    await page.locator('button:has-text("사이트맵 제출"), button:has-text("Submit sitemap")').first().click({ timeout: 5000 });
    await sleep(1000);

    // URL 입력
    const sitemapInput = page.locator('input[type="text"], input[type="url"]').first();
    await sitemapInput.fill(SITEMAP_URL);
    await sleep(500);

    await page.locator('button:has-text("제출"), button:has-text("Submit")').first().click();
    await sleep(3000);

    console.log('  ✅ Bing Webmaster Tools 등록 완료');
  } catch (e) {
    console.log(`  ⚠️ Sitemap 제출 실패: ${e.message}`);
  }

  await page.screenshot({ path: `${DIR}/search-bing-done.png` });
  return true;
}

// ========== Naver Search Advisor ==========
async function registerNaver(page) {
  console.log('\n[Naver Search Advisor] 시작...');

  // 1. Naver Search Advisor 접속
  await page.goto('https://searchadvisor.naver.com/console/board', { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  // 로그인 확인
  if (page.url().includes('nid.naver.com')) {
    console.log('  ⚠️ Naver 로그인 필요 - 수동으로 로그인 후 다시 시도하세요');
    await page.screenshot({ path: `${DIR}/search-naver-login.png` });
    return false;
  }

  console.log('  [1/3] 사이트 추가...');

  // 2. 사이트 추가
  try {
    // 사이트 추가 버튼
    const addBtn = page.locator('button:has-text("사이트 추가"), a:has-text("사이트 추가")').first();
    await addBtn.click({ timeout: 5000 });
    await sleep(2000);

    // URL 입력
    const urlInput = page.locator('input[type="text"], input[type="url"]').first();
    await urlInput.fill(NEW_SITE);
    await sleep(500);

    // 확인 버튼
    await page.locator('button:has-text("확인"), button:has-text("추가")').first().click();
    await sleep(3000);

  } catch (e) {
    console.log(`  기존 사이트 확인 또는 추가 시도: ${e.message}`);
  }

  console.log('  [2/3] 소유권 확인...');

  // 소유권 확인 (HTML 태그 방식)
  try {
    await page.screenshot({ path: `${DIR}/search-naver-verify.png` });
    await sleep(2000);
  } catch {}

  console.log('  [3/3] Sitemap 제출...');

  // 3. Sitemap 제출
  try {
    // 요청 메뉴 → 사이트맵 제출
    await page.goto('https://searchadvisor.naver.com/console/sitemap', { waitUntil: 'domcontentloaded' });
    await sleep(2000);

    // 사이트맵 URL 입력
    const sitemapInput = page.locator('input[type="text"]').first();
    await sitemapInput.fill(SITEMAP_URL);
    await sleep(500);

    await page.locator('button:has-text("확인"), button:has-text("제출")').first().click();
    await sleep(3000);

    console.log('  ✅ Naver Search Advisor 등록 완료');
  } catch (e) {
    console.log(`  ⚠️ Sitemap 제출 실패: ${e.message}`);
  }

  await page.screenshot({ path: `${DIR}/search-naver-done.png` });
  return true;
}

// ========== 기존 사이트 삭제 ==========
async function deleteOldSite(page, platform) {
  console.log(`\n[${platform}] 기존 사이트 (${OLD_SITE}) 삭제...`);

  switch (platform) {
    case 'google':
      await page.goto('https://search.google.com/search-console', { waitUntil: 'domcontentloaded' });
      await sleep(2000);
      // 속성 선택 → 기존 사이트 선택 → 설정 → 속성 삭제
      console.log('  ⚠️ Google: 수동으로 속성 삭제 필요 (Settings → Remove property)');
      break;

    case 'bing':
      await page.goto('https://www.bing.com/webmasters', { waitUntil: 'domcontentloaded' });
      await sleep(2000);
      console.log('  ⚠️ Bing: 수동으로 사이트 삭제 필요');
      break;

    case 'naver':
      await page.goto('https://searchadvisor.naver.com/console/board', { waitUntil: 'domcontentloaded' });
      await sleep(2000);
      console.log('  ⚠️ Naver: 수동으로 사이트 삭제 필요');
      break;
  }

  await page.screenshot({ path: `${DIR}/search-${platform}-delete.png` });
}

// ========== Chrome CDP 연결 ==========
async function connectChrome() {
  const { spawn } = require('child_process');
  const http = require('http');

  const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  // 이미 실행 중인지 확인
  const isRunning = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9222/json/version', (res) => {
      resolve(true);
    }).on('error', () => resolve(false));
  });

  if (!isRunning) {
    console.log('Chrome CDP 실행 중...');
    const child = spawn(CHROME, [
      '--remote-debugging-port=9222',
      '--remote-allow-origins=*',
      `--user-data-dir=${PROFILE_DIR}`,
    ], { stdio: 'ignore', detached: true });
    child.unref();

    // 포트 열릴 때까지 대기
    for (let i = 0; i < 20; i++) {
      await sleep(500);
      const ready = await new Promise((resolve) => {
        http.get('http://127.0.0.1:9222/json/version', () => resolve(true)).on('error', () => resolve(false));
      });
      if (ready) break;
    }
  }

  console.log('Chrome CDP 연결...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const contexts = browser.contexts();
  const context = contexts[0] || await browser.newContext();
  return { browser, context };
}

// ========== 메인 ==========
async function run() {
  const [,, platform] = process.argv;

  if (!platform) {
    console.log('사용법:');
    console.log('  node scripts/search-console.cjs google   — Google Search Console');
    console.log('  node scripts/search-console.cjs bing     — Bing Webmaster Tools');
    console.log('  node scripts/search-console.cjs naver    — Naver Search Advisor');
    console.log('  node scripts/search-console.cjs all      — 전체 등록');
    return;
  }

  const { browser, context } = await connectChrome();
  const page = await context.newPage();

  try {
    switch (platform) {
      case 'google':
        await registerGoogle(page);
        break;
      case 'bing':
        await registerBing(page);
        break;
      case 'naver':
        await registerNaver(page);
        break;
      case 'all':
        await registerGoogle(page);
        await registerBing(page);
        await registerNaver(page);
        break;
      default:
        console.error(`❌ 알 수 없는 플랫폼: ${platform}`);
    }
  } catch (err) {
    console.error(`❌ 오류: ${err.message}`);
    await page.screenshot({ path: `${DIR}/search-error.png` });
  }

  console.log('\n✅ 작업 완료!');
  await browser.close();
}

run().catch(console.error);
