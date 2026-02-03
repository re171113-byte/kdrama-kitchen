const { chromium } = require('playwright');

// === 트윗 데이터 ===
const TWEETS = [
  {
    id: 'mandu',
    text: `doctor slump understood something most dramas don't.\n\nhealing isn't a montage. it's sitting on a kitchen floor, folding dumplings with someone who gets your silence.\n\nha-neul and jeong-woo didn't fix each other. they just made mandu.\n\n#DoctorSlump #KoreanFood`,
    reply: `full recipe + video tutorial here:\nhttps://kdrama-kitchen.vercel.app/posts/doctor-slump-mandu`,
    verify: 'doctor slump understood something'
  },
  {
    id: 'bossam',
    text: `marry my husband has the most satisfying revenge arc in kdrama.\n\nbut here's what nobody talks about — the bossam scene. ji-won eating late-night pork wraps with people who actually care about her.\n\nthat's not a meal. that's freedom.\n\n#MarryMyHusband #KoreanFood`,
    reply: `full recipe + video tutorial here:\nhttps://kdrama-kitchen.vercel.app/posts/marry-my-husband-bossam`,
    verify: 'marry my husband has the most'
  }
];

const PROFILE = 'https://x.com/re171113';
const COMPOSE = 'https://x.com/compose/post';
const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function shot(page, name) {
  const path = `${DIR}/${name}.png`;
  await page.screenshot({ path });
  console.log(`    screenshot: ${name}.png`);
}

async function clickPostButton(page, label) {
  // 방법 1: Ctrl+Enter 단축키
  console.log(`    [${label}] 시도 1: Ctrl+Enter`);
  await page.keyboard.press('Control+Enter');
  await sleep(3000);

  // compose가 닫혔는지 확인
  const still1 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still1) { console.log(`    [${label}] Ctrl+Enter 성공`); return; }

  // 방법 2: JS 직접 클릭
  console.log(`    [${label}] 시도 2: JS click`);
  await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="tweetButton"]');
    if (btn) btn.click();
  });
  await sleep(3000);

  const still2 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still2) { console.log(`    [${label}] JS click 성공`); return; }

  // 방법 3: dispatchEvent
  console.log(`    [${label}] 시도 3: dispatchEvent`);
  await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="tweetButton"]');
    if (btn) {
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
  });
  await sleep(3000);

  const still3 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still3) { console.log(`    [${label}] dispatchEvent 성공`); return; }

  console.log(`    [${label}] ⚠️ 3가지 방법 모두 실패`);
}

async function postTweet(page, text) {
  await page.goto(COMPOSE, { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  const editor = page.locator('[data-testid="tweetTextarea_0"]').first();
  await editor.waitFor({ timeout: 10000 });
  await editor.click();
  await sleep(500);

  // 줄 단위로 입력
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      await page.keyboard.press('Enter');
    } else {
      await page.keyboard.type(lines[i], { delay: 15 });
      if (i < lines.length - 1) await page.keyboard.press('Enter');
    }
  }
  await sleep(1000);

  // 게시 버튼 — 3단계 폴백
  await clickPostButton(page, '메인');
  await sleep(2000);
}

async function verifyOnProfile(page, searchText) {
  await page.goto(PROFILE, { waitUntil: 'domcontentloaded' });
  await sleep(5000);
  const body = await page.textContent('body');
  return body.includes(searchText);
}

async function postReply(page, tweet) {
  // 프로필에서 해당 트윗 찾기
  const articles = page.locator('article[data-testid="tweet"]');
  const count = await articles.count();

  for (let i = 0; i < count; i++) {
    const text = await articles.nth(i).textContent();
    if (text.includes(tweet.verify)) {
      // 답글 버튼 클릭
      const replyBtn = articles.nth(i).locator('[data-testid="reply"]');
      await replyBtn.click();
      await sleep(2000);

      // 답글 입력
      const editor = page.locator('[data-testid="tweetTextarea_0"]').first();
      await editor.waitFor({ timeout: 5000 });

      const lines = tweet.reply.split('\n');
      for (let j = 0; j < lines.length; j++) {
        await page.keyboard.type(lines[j], { delay: 15 });
        if (j < lines.length - 1) await page.keyboard.press('Enter');
      }
      await sleep(1000);

      // 답글 게시 — 3단계 폴백
      await clickPostButton(page, '답글');
      await sleep(2000);
      return true;
    }
  }
  return false;
}

async function run() {
  // 글자수 사전 검증
  for (const t of TWEETS) {
    const len = t.text.length;
    console.log(`[검증] ${t.id}: ${len}자`);
    if (len > 280) {
      console.error(`❌ ${t.id} 글자수 초과 (${len}/280). 중단.`);
      return;
    }
  }

  console.log('\n[1/6] Chrome 실행 (복사 프로필)...');
  const context = await chromium.launchPersistentContext(
    'C:\\Users\\noble\\ChromeX',
    {
      channel: 'chrome',
      headless: false,
      args: ['--disable-blink-features=AutomationControlled'],
      viewport: { width: 1280, height: 800 },
    }
  );
  const page = await context.newPage();

  for (let idx = 1; idx < 2; idx++) { // 보쌈 게시
    const tweet = TWEETS[idx];
    console.log(`\n====== ${tweet.id.toUpperCase()} ======`);

    // 메인 트윗 게시
    console.log(`[2/6] 메인 트윗 작성 중...`);
    await postTweet(page, tweet.text);
    await shot(page, `x-${tweet.id}-1-posted`);

    // 프로필에서 확인
    console.log(`[3/6] 프로필에서 확인 중...`);
    const found = await verifyOnProfile(page, tweet.verify);
    await shot(page, `x-${tweet.id}-2-verify`);

    if (!found) {
      console.error(`❌ ${tweet.id} 트윗이 프로필에 없음. 중단.`);
      await page.close();
      return;
    }
    console.log(`✅ ${tweet.id} 트윗 확인됨!`);

    // 셀프 리플 게시
    console.log(`[4/6] 셀프 리플(링크) 게시 중...`);
    const replied = await postReply(page, tweet);
    await shot(page, `x-${tweet.id}-3-reply`);

    if (replied) {
      console.log(`✅ ${tweet.id} 셀프 리플 완료!`);
    } else {
      console.log(`⚠️ ${tweet.id} 셀프 리플 실패 (트윗을 찾지 못함)`);
    }

    // 다음 트윗 전 대기
    if (idx < TWEETS.length - 1) {
      console.log(`\n[대기] 다음 트윗까지 30초 대기...`);
      await sleep(30000);
    }
  }

  // 최종 확인
  console.log('\n[5/6] 최종 프로필 확인...');
  await page.goto(PROFILE, { waitUntil: 'domcontentloaded' });
  await sleep(5000);
  await shot(page, 'x-final');

  console.log('[6/6] 완료!');
  await page.close();
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
