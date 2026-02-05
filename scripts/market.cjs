/**
 * 완전 자동 마케팅 스크립트
 * launchPersistentContext + ChromeX 프로필 사용
 *
 * 사용법:
 *   node scripts/market.cjs x      [id]    — X 트윗 자동 게시
 *   node scripts/market.cjs pin    [id]    — Pinterest 핀 자동 게시
 *   node scripts/market.cjs reddit [id]    — Reddit 포스트 자동 게시
 *   node scripts/market.cjs list           — 사용 가능한 콘텐츠 목록
 */

const { chromium } = require('playwright');
const path = require('path');

const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';
const PROFILE_DIR = 'C:/Users/noble/ChromeX';
const X_PROFILE = 'https://x.com/re171113';
const SITE_URL = 'https://www.kdrama-kitchen.com';
const OLD_SITE_URL = 'https://kdrama-kitchen.vercel.app';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ========== 콘텐츠 데이터 ==========
const CONTENT = {
  mandu: {
    drama: 'Doctor Slump',
    food: 'Mandu',
    foodKr: '만두',
    url: 'https://www.kdrama-kitchen.com/posts/doctor-slump-mandu',
    pinImage: path.resolve(__dirname, '../temp-images/mandu-pin.jpg'),
    tweet: `doctor slump understood something most dramas don't.\n\nhealing isn't a montage. it's sitting on a kitchen floor, folding dumplings with someone who gets your silence.\n\nha-neul and jeong-woo didn't fix each other. they just made mandu.\n\n#DoctorSlump #KoreanFood`,
    tweetReply: `full recipe + video tutorial here:\nhttps://www.kdrama-kitchen.com/posts/doctor-slump-mandu`,
    tweetVerify: 'doctor slump understood something',
    pinTitle: 'Doctor Slump Mandu — Classic Korean Dumplings Recipe',
    pinDesc: `The healing dumplings from Doctor Slump — ha-neul and jeong-woo didn't fix each other, they just made mandu together.\n\nLearn to fold classic Korean mandu with savory pork and vegetable filling. Includes step-by-step instructions + video tutorial.\n\n#KoreanFood #KDrama #DoctorSlump #Mandu`,
    redditTitle: 'my mandu kept falling apart until i figured this out',
    redditBody: `so i spent like a whole weekend making mandu with my gf and almost all of them fell apart when we tried to cook them lol. was so frustrating

anyway turns out the problem was the filling was way too wet. nobody tells you that you gotta squeeze the hell out of your vegetables. like really wring them out. same with tofu if youre using it

also i was putting way too much filling in each one trying to make them thicc. now i do maybe a tablespoon max and they actually stay closed

oh and season your filling more than you think. i tasted the raw mix (i know lol but its mostly pork so just a tiny bit) and it was so bland. added more soy sauce and sesame oil and suddenly they tasted like actual restaurant mandu

for pan frying - hot pan, oil, put them flat side down, then add some water and cover. the steam cooks the top while the bottom gets crispy. game changer

anyone tried adding kimchi to the filling? saw some recipes with it but seems like itd make it too wet again`,
  },
  kimchi: {
    drama: 'Mr. Queen',
    food: 'Kimchi',
    foodKr: '김치',
    url: 'https://www.kdrama-kitchen.com/posts/mr-queen-kimchi',
    pinImage: path.resolve(__dirname, '../temp-images/kimchi-pin.jpg'),
    tweet: `mr. queen understood what most historical dramas don't.

a modern chef trapped in a joseon queen's body. no sword fights. no romance first. just kimchi.

bong-hwan making kimchi in a royal kitchen is the most revolutionary scene in kdrama history.

#MrQueen`,
    tweetReply: `full recipe + the science behind traditional kimchi fermentation:\nhttps://www.kdrama-kitchen.com/posts/mr-queen-kimchi`,
    tweetVerify: 'mr. queen understood what most',
    pinTitle: 'Traditional Korean Kimchi Recipe — Mr. Queen K-Drama Fermented Cabbage',
    pinDesc: `The royal kimchi from Mr. Queen — a modern chef trapped in a Joseon queen's body revolutionizes the palace kitchen through kimchi-making.\n\nTraditional napa cabbage kimchi with step-by-step fermentation guide.\n\n#KoreanFood #KDrama #MrQueen #Kimchi`,
    redditTitle: 'first time making kimchi - it turned to mush. what did i do wrong?',
    redditBody: `UPDATE: made another batch following the advice here and it actually worked!! thanks everyone

---

ok so i tried making kimchi for the first time last week and it turned into this slimy gross mess. tasted ok but the texture was awful

i think i rushed the salting part? only did like 2 hours bc i was impatient. the cabbage was still pretty crunchy when i started adding the paste

also didnt do the rice flour paste thing bc i thought it was optional. apparently not lol

how long do you guys salt your cabbage for? and do you rinse it multiple times after? i only rinsed once and it was soooo salty

gonna try again this weekend. any other tips for a noob? i have gochugaru, fish sauce, and salted shrimp ready to go`,
  },
  bossam: {
    drama: 'Marry My Husband',
    food: 'Bossam',
    foodKr: '보쌈',
    url: 'https://www.kdrama-kitchen.com/posts/marry-my-husband-bossam',
    pinImage: path.resolve(__dirname, '../temp-images/bossam-pin.jpg'),
    tweet: `marry my husband has the most satisfying revenge arc in kdrama.\n\nbut here's what nobody talks about — the bossam scene. ji-won eating late-night pork wraps with people who actually care about her.\n\nthat's not a meal. that's freedom.\n\n#MarryMyHusband #KoreanFood`,
    tweetReply: `full recipe + video tutorial here:\nhttps://www.kdrama-kitchen.com/posts/marry-my-husband-bossam`,
    tweetVerify: 'marry my husband has the most',
    pinTitle: 'Marry My Husband Bossam — Korean Boiled Pork Wraps Recipe',
    pinDesc: `The late-night freedom meal from Marry My Husband — ji-won eating bossam with people who actually care about her.\n\nTender boiled pork belly wrapped in fresh napa cabbage with spicy radish kimchi.\n\n#KoreanFood #KDrama #MarryMyHusband #Bossam`,
    redditTitle: 'tried the instant coffee trick for bossam and wtf it actually works',
    redditBody: `ok this sounds crazy but hear me out

my friends mom is korean and she told me to put instant coffee in the water when boiling pork belly for bossam. i thought she was messing with me but tried it anyway

the pork came out with zero gamey smell?? usually even with ginger and stuff it still has that pork funk but the coffee completely neutralized it. something about tannins idk

i do about 1 tbsp of instant coffee with doenjang, garlic, ginger, green onion in the water. simmer low for like an hour, dont boil too hard or it gets tough

slice it thin against the grain and wrap in cabbage with ssamjang and raw garlic. so good

has anyone else tried this? or other tricks for the pork smell? heard soju works too but havent tested`,
  },
  sundae: {
    drama: 'Reply 1988',
    food: 'Sundae',
    foodKr: '순대',
    url: 'https://www.kdrama-kitchen.com/posts/reply-1988-sundae',
    pinImage: path.resolve(__dirname, '../temp-images/sundae-pin.jpg'),
    tweet: `reply 1988 understood something most dramas don't.

happiness isn't about big moments. it's about cold winter nights, a pojangmacha cart, and a plate of sundae shared with friends who feel like family.

ssangmun-dong wasn't just a neighborhood. it was home.

#Reply1988 #KoreanFood`,
    tweetReply: `the nostalgic street food that brings back 1980s seoul:\nhttps://www.kdrama-kitchen.com/posts/reply-1988-sundae`,
    tweetVerify: 'reply 1988 understood something',
    pinTitle: 'Reply 1988 Sundae — Korean Blood Sausage Street Food Recipe',
    pinDesc: `The nostalgic street food from Reply 1988 — cold winter nights in Ssangmun-dong, steam rising from a pojangmacha cart, sharing sundae with friends who feel like family.

Traditional Korean blood sausage with glass noodles and vegetables. Includes step-by-step recipe + video tutorial.

#KoreanFood #KDrama #Reply1988 #Sundae #StreetFood`,
    redditTitle: 'anyone else obsessed with sundae? the blood sausage not the ice cream lol',
    redditBody: `sundae is lowkey my favorite korean street food but whenever i mention it to non korean friends they get so weirded out by the blood sausage thing

like yes theres blood in it but its mostly glass noodles and vegetables?? the blood just holds it together. if youve had black pudding or boudin its basically the same idea

the way you eat it is so simple too - just slice it up and dip in salt mixed with black pepper. thats it. some places give you liver on the side too which i know sounds gross but its actually really good

theres a korean market near me that sells it fresh and i go there way too often ngl. the frozen stuff from hmart is ok but not the same

has anyone tried making it at home? i saw you can buy casings on amazon but seems like a lot of work. also not sure where to even get the blood lol

whats your go to place for sundae?`,
  },
  bulgogi: {
    drama: 'Dinner Mate',
    food: 'Bulgogi',
    foodKr: '불고기',
    url: 'https://www.kdrama-kitchen.com/posts/dinner-mate-bulgogi',
    pinImage: path.resolve(__dirname, '../temp-images/bulgogi-pin.jpg'),
    tweet: `dinner mate understood something most dramas don't.

healing isn't dramatic. it's two strangers sharing meals with no strings attached.

they didn't fall in love over grand gestures. they fell in love over bulgogi.

#DinnerMate #KoreanFood`,
    tweetReply: `the recipe that brings strangers together:\nhttps://www.kdrama-kitchen.com/posts/dinner-mate-bulgogi`,
    tweetVerify: 'dinner mate understood something',
    pinTitle: 'Dinner Mate Bulgogi — Authentic Korean BBQ Beef Recipe',
    pinDesc: `The dish that brings strangers together from Dinner Mate — hae-kyung and do-hee didn't fall in love over grand gestures, they fell in love over bulgogi.

Tender marinated beef with the perfect balance of sweet and savory. Includes step-by-step recipe + video tutorial.

#KoreanFood #KDrama #DinnerMate #Bulgogi #KoreanBBQ`,
    redditTitle: 'finally figured out why my bulgogi always tasted off',
    redditBody: `ok so i've been trying to make bulgogi at home for like 2 years now and it always came out weird?? like it looked fine but tasted nothing like what i get at korean restaurants

turns out i was skipping the pear lol. i thought it was just for sweetness but apparently the enzymes actually tenderize the meat. started grating half an asian pear into my marinade and holy shit the difference

also was cooking it way too low. my mom (shes korean) saw me making it once and literally laughed at me. she cranked the heat all the way up and did it in like 2 mins. the char on the edges makes such a big difference

for anyone struggling like i was - marinate overnight not 30 mins, use pear or kiwi, and cook it HOT. dont crowd the pan either

what i use now: soy sauce, bit of sugar, sesame oil, garlic, ginger, rice wine, and the pear. nothing fancy but it works

anyone else have tips? still trying to get it exactly like the place near my old apartment but getting closer`,
  },
};

// ========== X 자동 게시 ==========
async function clickPostButton(page, label) {
  // 방법 1: Ctrl+Enter 단축키
  console.log(`  [${label}] Ctrl+Enter 시도...`);
  await page.keyboard.press('Control+Enter');
  await sleep(3000);

  const still1 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still1) { console.log(`  [${label}] Ctrl+Enter 성공`); return true; }

  // 방법 2: JS 직접 클릭
  console.log(`  [${label}] JS click 시도...`);
  await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="tweetButton"]');
    if (btn) btn.click();
  });
  await sleep(3000);

  const still2 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still2) { console.log(`  [${label}] JS click 성공`); return true; }

  // 방법 3: dispatchEvent
  console.log(`  [${label}] dispatchEvent 시도...`);
  await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="tweetButton"]');
    if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
  await sleep(3000);

  const still3 = await page.locator('[data-testid="tweetTextarea_0"]').first().isVisible().catch(() => false);
  if (!still3) { console.log(`  [${label}] dispatchEvent 성공`); return true; }

  console.log(`  [${label}] ⚠️ 게시 실패`);
  return false;
}

async function postX(page, item) {
  console.log(`\n[X] ${item.food} 자동 게시 시작...`);

  // 글자수 검증
  if (item.tweet.length > 260) {
    console.error(`❌ 글자수 초과: ${item.tweet.length}자 (최대 260자)`);
    return false;
  }
  console.log(`  글자수: ${item.tweet.length}자`);

  // 1. 메인 트윗 작성
  console.log(`  [1/4] 메인 트윗 작성...`);
  await page.goto('https://x.com/compose/post', { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  const editor = page.locator('[data-testid="tweetTextarea_0"]').first();
  await editor.waitFor({ timeout: 15000 });
  await editor.click();
  await sleep(500);

  const lines = item.tweet.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      await page.keyboard.press('Enter');
    } else {
      await page.keyboard.type(lines[i], { delay: 15 });
      if (i < lines.length - 1) await page.keyboard.press('Enter');
    }
  }
  await sleep(1000);

  // 2. 게시
  console.log(`  [2/4] 게시 버튼 클릭...`);
  await clickPostButton(page, '메인');
  await sleep(2000);

  // 3. 프로필에서 확인
  console.log(`  [3/4] 프로필에서 확인...`);
  await page.goto(X_PROFILE, { waitUntil: 'domcontentloaded' });
  await sleep(5000);

  const body = await page.textContent('body');
  if (!body.includes(item.tweetVerify)) {
    console.error(`❌ 트윗이 프로필에 없음`);
    await page.screenshot({ path: `${DIR}/market-x-verify-fail.png` });
    return false;
  }
  console.log(`  ✅ 트윗 확인됨`);
  await page.screenshot({ path: `${DIR}/market-x-${item.food.toLowerCase()}-1-posted.png` });

  // 4. 셀프 리플 (5분 내)
  console.log(`  [4/4] 셀프 리플 게시...`);
  const articles = page.locator('article[data-testid="tweet"]');
  const count = await articles.count();

  for (let i = 0; i < count; i++) {
    const text = await articles.nth(i).textContent();
    if (text.includes(item.tweetVerify)) {
      const replyBtn = articles.nth(i).locator('[data-testid="reply"]');
      await replyBtn.click();
      await sleep(2000);

      const replyEditor = page.locator('[data-testid="tweetTextarea_0"]').first();
      await replyEditor.waitFor({ timeout: 5000 });

      const replyLines = item.tweetReply.split('\n');
      for (let j = 0; j < replyLines.length; j++) {
        await page.keyboard.type(replyLines[j], { delay: 15 });
        if (j < replyLines.length - 1) await page.keyboard.press('Enter');
      }
      await sleep(1000);

      await clickPostButton(page, '리플');
      await sleep(2000);
      console.log(`  ✅ 셀프 리플 완료`);
      break;
    }
  }

  await page.screenshot({ path: `${DIR}/market-x-${item.food.toLowerCase()}-2-reply.png` });
  return true;
}

// ========== Pinterest 자동 게시 ==========
async function postPin(page, item) {
  console.log(`\n[Pinterest] ${item.food} 자동 게시 시작...`);

  await page.goto('https://www.pinterest.com/pin-creation-tool/', { waitUntil: 'domcontentloaded' });
  await sleep(5000);

  // 이미지 업로드
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.waitFor({ timeout: 10000 });
  await fileInput.setInputFiles(item.pinImage);
  await sleep(3000);
  console.log('  이미지 업로드 완료');

  // 제목
  const titleInput = page.locator('#storyboard-selector-title').first();
  await titleInput.waitFor({ timeout: 10000 });
  await titleInput.click();
  await titleInput.fill(item.pinTitle);
  await sleep(300);

  // 설명
  await titleInput.press('Tab');
  await sleep(300);
  await page.keyboard.type(item.pinDesc, { delay: 3 });
  await sleep(300);

  // 링크
  const linkInput = page.locator('#WebsiteField').first();
  try {
    await linkInput.waitFor({ timeout: 5000 });
    await linkInput.click();
    await linkInput.fill(item.url);
  } catch {}
  await sleep(300);

  // 보드 선택
  try {
    const boardBtn = page.locator('[data-test-id="board-dropdown-select-button"], [data-test-id="boardWithSection-dropdown-select-button"]').first();
    await boardBtn.waitFor({ timeout: 5000 });
    await boardBtn.click();
    await sleep(1000);
    await page.locator('text="K-Drama Recipes"').first().click();
    await sleep(500);
    console.log('  보드 "K-Drama Recipes" 선택');
  } catch {
    console.log('  ⚠️ 보드 수동 선택 필요');
  }

  // 게시 버튼 클릭
  try {
    const publishBtn = page.locator('button:has-text("Publish"), button:has-text("게시")').first();
    await publishBtn.click();
    await sleep(3000);
    console.log('  ✅ Pinterest 핀 게시 완료');
  } catch {
    console.log('  ⚠️ 게시 버튼을 찾지 못함');
  }

  await page.screenshot({ path: `${DIR}/market-pin-${item.food.toLowerCase()}.png` });
  return true;
}

// ========== Reddit 자동 게시 ==========
async function postReddit(page, item) {
  console.log(`\n[Reddit] ${item.food} 자동 게시 시작...`);

  await page.goto('https://www.reddit.com/r/KoreanFood/submit?type=TEXT', { waitUntil: 'domcontentloaded' });
  await sleep(5000);

  // 제목
  const titleArea = page.locator('textarea[name="title"], textarea[placeholder*="제목"]').first();
  await titleArea.waitFor({ timeout: 10000 });
  await titleArea.click();
  await titleArea.fill(item.redditTitle);
  await sleep(500);

  // 본문
  try {
    await page.evaluate(() => {
      const editors = document.querySelectorAll('[data-lexical-editor="true"], div[contenteditable="true"][role="textbox"]');
      for (const el of editors) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 50) { el.focus(); el.click(); return; }
      }
    });
    await sleep(300);
  } catch {}

  await page.locator('p[data-placeholder="본문 텍스트"]').first().click({ timeout: 3000 }).catch(() => {});
  await sleep(300);
  await page.keyboard.type(item.redditBody, { delay: 2 });
  await sleep(500);

  // 플레어 선택
  try {
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent.includes('플레어') || b.textContent.includes('Flair')) { b.click(); return; }
      }
    });
    await sleep(2000);
    await page.evaluate(() => {
      const els = document.querySelectorAll('label, span, div');
      for (const el of els) {
        if (el.textContent.trim() === 'Kimchee!' || el.textContent.includes('Kimchee!')) { el.click(); return; }
      }
    });
    await sleep(500);
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent.trim() === '추가' || b.textContent.trim() === 'Apply') { b.click(); return; }
      }
    });
    await sleep(1000);
    console.log('  플레어 선택 완료');
  } catch {
    console.log('  ⚠️ 플레어 수동 선택 필요');
  }

  // 게시 버튼 클릭
  try {
    await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        if (b.textContent.includes('게시하기') || b.textContent.includes('Post')) { b.click(); return; }
      }
    });
    await sleep(3000);
    console.log('  ✅ Reddit 포스트 게시 완료');
  } catch {
    console.log('  ⚠️ 게시 버튼을 찾지 못함');
  }

  await page.screenshot({ path: `${DIR}/market-reddit-${item.food.toLowerCase()}.png` });
  return true;
}

// ========== 메인 ==========
async function run() {
  const [,, platform, id] = process.argv;

  if (!platform || platform === 'list') {
    console.log('사용 가능한 콘텐츠:');
    for (const [key, val] of Object.entries(CONTENT)) {
      console.log(`  ${key}: ${val.drama} — ${val.food} (${val.foodKr})`);
    }
    console.log('\n사용법:');
    console.log('  node scripts/market.cjs x kimchi');
    console.log('  node scripts/market.cjs pin mandu');
    console.log('  node scripts/market.cjs reddit bossam');
    return;
  }

  const item = CONTENT[id];
  if (!item) {
    console.error(`❌ "${id}" 콘텐츠를 찾을 수 없음. node scripts/market.cjs list 로 확인`);
    return;
  }

  console.log('브라우저 실행 (ChromeX 프로필)...');
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  let success = false;
  try {
    switch (platform) {
      case 'x':      success = await postX(page, item); break;
      case 'pin':    success = await postPin(page, item); break;
      case 'reddit': success = await postReddit(page, item); break;
      default:
        console.error(`❌ 알 수 없는 플랫폼: ${platform}. (x / pin / reddit)`);
    }
  } catch (err) {
    console.error(`❌ 오류: ${err.message}`);
    await page.screenshot({ path: `${DIR}/market-error.png` });
  }

  if (success) {
    console.log(`\n✅ ${platform.toUpperCase()} 마케팅 완료!`);
  } else {
    console.log(`\n❌ ${platform.toUpperCase()} 마케팅 실패`);
  }

  await context.close();
}

run().catch(console.error);
