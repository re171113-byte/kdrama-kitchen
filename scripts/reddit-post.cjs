const { chromium } = require('playwright');

const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const POST = {
  subreddit: 'KoreanFood',
  title: 'Bossam (보쌈) — why adding instant coffee to the boiling water actually works',
  body: `i've been obsessed with making bossam at home for months now, and the biggest game changer was something my korean friend's mom told me — throw a spoonful of instant coffee into the boiling water with the pork belly.

sounds insane, right? but the tannins in the coffee neutralize the gamey pork smell way better than just using ginger and scallions alone. the meat comes out incredibly clean-tasting.

my method that finally worked:

- use pork belly with skin on (about 1kg / 2.2 lbs)
- bring water to a boil with doenjang, garlic, ginger, scallion, whole peppercorns, and 1 tbsp instant coffee
- simmer on LOW for about 60-70 minutes (don't boil hard or it gets tough)
- rest for 10 min before slicing against the grain

the wrapping setup matters just as much — fresh napa cabbage leaves, salted shrimp (saeujeot), sliced garlic, ssamjang, and if you want to be proper about it, some radish kimchi (musaengchae) on the side.

bossam is one of those dishes that looks simple but the details make all the difference. the coffee trick, the low simmer, slicing against the grain — skip any of these and it's just boiled pork.

what's your go-to trick for removing pork smell? i've heard some people use soju in the water too.`,
};

async function shot(page, name) {
  await page.screenshot({ path: `${DIR}/${name}.png` });
  console.log(`  screenshot: ${name}.png`);
}

async function run() {
  console.log('[0] Chrome 실행...');
  const context = await chromium.launchPersistentContext(
    'C:\\Users\\noble\\ChromeX',
    {
      channel: 'chrome',
      headless: false,
      args: ['--disable-blink-features=AutomationControlled'],
      viewport: { width: 1280, height: 900 },
    }
  );
  const page = await context.newPage();

  // 서브밋 페이지
  console.log('[1] r/KoreanFood 서브밋 페이지...');
  await page.goto(`https://www.reddit.com/r/${POST.subreddit}/submit?type=TEXT`, {
    waitUntil: 'domcontentloaded',
  });
  await sleep(5000);

  // 제목 입력
  console.log('[2] 제목 입력...');
  // Reddit 제목 필드: name="title" 또는 placeholder에 "제목" 포함
  const titleArea = page.locator('textarea[name="title"], textarea[placeholder*="제목"], textarea[placeholder*="Title"]').first();
  try {
    await titleArea.waitFor({ timeout: 10000 });
  } catch {
    // fallback: 보이는 textarea 중 reCAPTCHA 제외
    console.log('  제목 필드 fallback...');
    await page.evaluate(() => {
      const areas = document.querySelectorAll('textarea:not(.g-recaptcha-response)');
      for (const a of areas) {
        if (a.offsetHeight > 0) { a.focus(); a.click(); return; }
      }
    });
    await sleep(500);
    await page.keyboard.type(POST.title, { delay: 5 });
    console.log(`  제목 fallback 입력: ${POST.title.substring(0, 50)}...`);
  }
  if (await titleArea.isVisible().catch(() => false)) {
    await titleArea.click();
    await titleArea.fill(POST.title);
    console.log(`  제목: ${POST.title.substring(0, 50)}...`);
  }
  await sleep(500);

  // 본문 영역 클릭 — "본문 텍스트" placeholder 또는 에디터 영역
  console.log('[3] 본문 입력...');

  // 본문 에디터 찾기: 에디터 wrapper 클릭
  const editorArea = page.locator('div.md, div[slot="editor"], [data-lexical-editor="true"]').first();
  try {
    await editorArea.waitFor({ state: 'attached', timeout: 5000 });
    // 스크롤해서 보이게
    await editorArea.scrollIntoViewIfNeeded();
    await sleep(300);
    // JS로 포커스 + 클릭
    await page.evaluate(() => {
      const editors = document.querySelectorAll('[data-lexical-editor="true"], div[contenteditable="true"][role="textbox"]');
      for (const el of editors) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 50) { // 본문 에디터는 높이가 큼
          el.focus();
          el.click();
          return;
        }
      }
    });
    await sleep(500);
  } catch {
    console.log('  에디터 찾기 실패, Tab으로 이동');
    await titleArea.press('Tab');
    await sleep(300);
    await page.keyboard.press('Tab');
    await sleep(300);
  }

  // 타이핑 전에 제목 필드에서 벗어났는지 확인
  // 한번 더 본문 에디터 클릭 시도
  await page.locator('p[data-placeholder="본문 텍스트"]').first().click({ timeout: 3000 }).catch(() => {});
  await sleep(300);

  // 본문 타이핑
  await page.keyboard.type(POST.body, { delay: 2 });
  await sleep(1000);
  console.log('  본문 입력 완료');

  // 플레어 선택
  console.log('[4] 플레어 선택...');
  try {
    // "플레어 및 태그 추가" 버튼 클릭
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent.includes('플레어') || b.textContent.includes('Flair')) {
          b.click();
          return;
        }
      }
    });
    await sleep(2000);

    // Kimchee! 옵션 클릭
    await page.evaluate(() => {
      const labels = document.querySelectorAll('label, span, div');
      for (const el of labels) {
        if (el.textContent.trim() === 'Kimchee!' || el.textContent.includes('Kimchee!')) {
          el.click();
          return;
        }
      }
    });
    await sleep(500);

    // 추가 버튼 클릭
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent.trim() === '추가' || b.textContent.trim() === 'Apply') {
          b.click();
          return;
        }
      }
    });
    await sleep(1000);
    console.log('  Kimchee! 플레어 선택 완료');
  } catch (e) {
    console.log('  ⚠️ 플레어 선택 실패:', e.message.split('\n')[0]);
  }

  await shot(page, 'reddit-filled');

  // 게시
  console.log('[5] 게시...');
  try {
    await page.locator('button:has-text("게시하기")').first().click();
    await sleep(8000);
    console.log('  게시 버튼 클릭');
  } catch {
    console.log('  ⚠️ 게시 버튼 실패');
  }

  await shot(page, 'reddit-posted');
  const url = page.url();
  console.log(`  URL: ${url}`);
  if (url.includes('/comments/')) {
    console.log('✅ 포스트 게시 완료!');
  } else {
    console.log('⚠️ 게시 확인 필요');
  }

  await page.close();
  await context.close();
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
