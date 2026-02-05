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
    redditTitle: 'Mandu (만두) — the 3 filling mistakes that ruin korean dumplings every time',
    redditBody: `i've made hundreds of mandu at this point and the first 50 were honestly terrible. here's what i kept getting wrong.\n\nmistake 1: too wet filling. if you don't squeeze the moisture out of your tofu and vegetables, the wrappers get soggy and tear. i press my tofu for at least 20 min now.\n\nmistake 2: overfilling. i know it's tempting but if you can't seal them properly they'll burst open when cooking. about 1 tablespoon per wrapper.\n\nmistake 3: not seasoning enough. the filling needs to be seasoned more than you think — sesame oil, soy sauce, garlic, ginger, and a pinch of sugar. taste the raw filling (yes, raw) to check the salt level.\n\nmy go-to filling ratio:\n- 300g ground pork\n- 200g firm tofu (pressed and crumbled)\n- 150g napa cabbage (salted, squeezed dry)\n- 4 green onions, finely chopped\n- 2 tbsp soy sauce\n- 1 tbsp sesame oil\n- 3 cloves garlic, minced\n- 1 tsp ginger\n\nfor cooking i usually pan-fry them: oil in a hot pan, place mandu flat side down, add a splash of water and cover for 3-4 min until the bottom is crispy golden.\n\nwhat filling combo do you prefer? i've seen people add glass noodles and kimchi — worth trying?`,
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
    redditTitle: 'Kimchi (김치) — the 3 beginner mistakes that turn your first batch into mush',
    redditBody: `made my first batch of kimchi about two years ago. it turned into a slimy, mushy disaster. since then i've made probably 40+ batches and finally figured out what i was doing wrong.\n\nmistake 1: not enough salt during brining. the cabbage needs to sit in salt for 6-8 hours minimum. i used to rush it to 2-3 hours and the leaves never wilted properly. properly brined cabbage should bend without snapping. if it still cracks, it needs more time.\n\nmistake 2: skipping the rice flour porridge. i thought it was optional. it's not. the porridge (just 2 tbsp sweet rice flour + 1 cup water, cooked until thick) feeds the lactobacillus bacteria during fermentation. without it, fermentation is slower and the flavor is flatter.\n\nmistake 3: not rinsing enough after salting. you need THREE full rinses under cold running water. i used to rinse once and my kimchi was way too salty. taste a piece of the rinsed cabbage before applying paste — it should taste like a well-seasoned salad, not the ocean.\n\nmy current go-to ratio for 1 napa cabbage:\n- 1/2 cup coarse sea salt (for brining)\n- 1 cup gochugaru\n- 3 tbsp fish sauce (myulchi aekjeot)\n- 3 tbsp salted shrimp (saeujeot), chopped\n- 8 cloves garlic, minced\n- 1 tsp ginger\n- 1 medium korean radish, julienned\n- 4-5 green onions\n\nfor fermentation: 1-2 days at room temperature until you see small bubbles, then move to fridge. the flavor keeps developing for weeks.\n\nwhat's your preferred fermentation time? i like mine after about 5-7 days in the fridge — slightly tangy but still crunchy.`,
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
    redditTitle: 'Bossam (보쌈) — why adding instant coffee to the boiling water actually works',
    redditBody: `i've been obsessed with making bossam at home for months now, and the biggest game changer was something my korean friend's mom told me — throw a spoonful of instant coffee into the boiling water with the pork belly.\n\nsounds insane, right? but the tannins in the coffee neutralize the gamey pork smell way better than just using ginger and scallions alone. the meat comes out incredibly clean-tasting.\n\nmy method that finally worked:\n\n- use pork belly with skin on (about 1kg / 2.2 lbs)\n- bring water to a boil with doenjang, garlic, ginger, scallion, whole peppercorns, and 1 tbsp instant coffee\n- simmer on LOW for about 60-70 minutes (don't boil hard or it gets tough)\n- rest for 10 min before slicing against the grain\n\nthe wrapping setup matters just as much — fresh napa cabbage leaves, salted shrimp (saeujeot), sliced garlic, ssamjang, and if you want to be proper about it, some radish kimchi (musaengchae) on the side.\n\nbossam is one of those dishes that looks simple but the details make all the difference. the coffee trick, the low simmer, slicing against the grain — skip any of these and it's just boiled pork.\n\nwhat's your go-to trick for removing pork smell? i've heard some people use soju in the water too.`,
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
    redditTitle: 'Sundae (순대) — why most people outside korea have never tried real korean blood sausage',
    redditBody: `sundae is probably the most underrated korean street food. everyone knows about tteokbokki and korean fried chicken, but mention blood sausage and people get nervous.

here's the thing — it's not as weird as it sounds. the filling is mostly glass noodles (dangmyeon), vegetables, and rice. the blood just binds everything together and adds a subtle earthiness. if you've ever had european black pudding or boudin noir, it's a similar concept.

the traditional way to eat it:
- sliced into rounds
- dipped in salt mixed with black pepper
- sometimes with a side of liver and lung (the full pojangmacha experience)

my simplified home version (no intestine cleaning required):
- use natural sausage casings from amazon
- filling: soaked glass noodles, firm tofu (instead of blood), bean sprouts, green onions, garlic
- season with sesame oil, soy sauce, salt, pepper
- stuff loosely (they expand when steaming)
- steam for 40-50 minutes

the tofu substitution works surprisingly well if you're not ready for the real thing. still get that savory, chewy texture.

pro tip: the dipping salt is essential. plain salt + black pepper, maybe 3:1 ratio. some people add a tiny bit of sugar.

has anyone here tried making sundae at home? or found a good korean market that sells it fresh?`,
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
    redditTitle: 'Bulgogi (불고기) — the 3 marinade mistakes that make your beef taste like sad stir-fry',
    redditBody: `i've been making bulgogi for years and the first dozen attempts were honestly disappointing. looked right, tasted... flat. here's what i was doing wrong.

mistake 1: skipping the asian pear. i thought it was optional or just for sweetness. it's not. the enzymes in asian pear (or kiwi) break down the meat proteins and create that melt-in-your-mouth texture. no pear = chewy beef. grate half a pear for 500g of meat.

mistake 2: not marinating long enough. 30 minutes is the minimum, but overnight is where the magic happens. the meat needs time to absorb all that flavor. i prep mine the night before now.

mistake 3: cooking on low heat. bulgogi needs HIGH heat for a short time. you want caramelization on the edges, not steamed gray meat. don't overcrowd the pan — work in batches if needed.

my go-to marinade for 500g beef:
- 5 tbsp soy sauce
- 2 tbsp sugar
- 2 tbsp sesame oil
- 1/2 asian pear, grated
- 4 cloves garlic, minced
- 1 tbsp ginger
- 2 tbsp rice wine
- black pepper

slice the beef thin (3mm) against the grain. marinate overnight. cook on screaming hot pan for 1-2 minutes per side.

wrap in lettuce with rice, garlic, and ssamjang. that's the proper way.

what cut do you prefer? i usually go ribeye but sirloin works on a budget.`,
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
