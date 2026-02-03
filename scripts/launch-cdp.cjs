const { chromium } = require('playwright');
const { execSync } = require('child_process');

const USER_DATA = 'C:\\Users\\noble\\AppData\\Local\\Google\\Chrome\\User Data';

async function run() {
  // 1. Chrome 프로세스 전부 종료
  console.log('[1] Chrome 종료 중...');
  try { execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' }); } catch(e) {}

  // 2. lockfile 삭제
  try { require('fs').unlinkSync(USER_DATA + '\\lockfile'); } catch(e) {}

  // 3. 대기
  await new Promise(r => setTimeout(r, 3000));
  console.log('[2] Chrome 종료 완료');

  // 4. Playwright로 Chrome 실행 (기존 프로필 사용)
  console.log('[3] Playwright로 Chrome 실행...');
  const context = await chromium.launchPersistentContext(USER_DATA, {
    channel: 'chrome',
    headless: false,
    args: ['--start-maximized'],
    viewport: null
  });

  console.log('[OK] Chrome 실행 성공! 로그인 세션 유지됨.');

  // 테스트: X 프로필 접속
  const page = await context.newPage();
  await page.goto('https://x.com/re171113', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: 'C:/Users/noble/projects/withAi/kdrama-kitchen/x-cdp-test.png' });
  console.log('[OK] X 프로필 스크린샷 저장: x-cdp-test.png');

  // context를 닫지 않고 유지 — 이후 스크립트에서 사용
  // await context.close();
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
