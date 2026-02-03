/**
 * 반자동 마케팅 스크립트
 * Chrome CDP에 연결 → 내용 채우기 → 브라우저 열린 상태 유지
 *
 * 사용법:
 *   node scripts/market.cjs x      [id]    — X 트윗 채우기
 *   node scripts/market.cjs pin    [id]    — Pinterest 핀 채우기
 *   node scripts/market.cjs reddit [id]    — Reddit 포스트 채우기
 *   node scripts/market.cjs list           — 사용 가능한 콘텐츠 목록
 */

const { chromium } = require('playwright');
const path = require('path');

const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ========== 콘텐츠 데이터 ==========
const CONTENT = {
  mandu: {
    drama: 'Doctor Slump',
    food: 'Mandu',
    foodKr: '만두',
    url: 'https://kdrama-kitchen.vercel.app/posts/doctor-slump-mandu',
    pinImage: path.resolve(__dirname, '../temp-images/mandu-pin.jpg'),
    tweet: `doctor slump understood something most dramas don't.\n\nhealing isn't a montage. it's sitting on a kitchen floor, folding dumplings with someone who gets your silence.\n\nha-neul and jeong-woo didn't fix each other. they just made mandu.\n\n#DoctorSlump #KoreanFood`,
    tweetReply: `full recipe + video tutorial here:\nhttps://kdrama-kitchen.vercel.app/posts/doctor-slump-mandu`,
    pinTitle: 'Doctor Slump Mandu — Classic Korean Dumplings Recipe',
    pinDesc: `🥟 The healing dumplings from Doctor Slump — ha-neul and jeong-woo didn't fix each other, they just made mandu together.\n\nLearn to fold classic Korean mandu with savory pork and vegetable filling. Includes step-by-step instructions + video tutorial.\n\n✅ Crispy pan-fried or steamed\n✅ Perfect K-Drama comfort food\n✅ Full recipe on site\n\n#KoreanFood #KDrama #KoreanRecipe #DoctorSlump #Mandu #KoreanDumplings #ComfortFood #KoreanCooking #AsianFood #DramaRecipe`,
    redditTitle: 'Mandu (만두) — the 3 filling mistakes that ruin korean dumplings every time',
    redditBody: `i've made hundreds of mandu at this point and the first 50 were honestly terrible. here's what i kept getting wrong.\n\nmistake 1: too wet filling. if you don't squeeze the moisture out of your tofu and vegetables, the wrappers get soggy and tear. i press my tofu for at least 20 min now.\n\nmistake 2: overfilling. i know it's tempting but if you can't seal them properly they'll burst open when cooking. about 1 tablespoon per wrapper.\n\nmistake 3: not seasoning enough. the filling needs to be seasoned more than you think — sesame oil, soy sauce, garlic, ginger, and a pinch of sugar. taste the raw filling (yes, raw) to check the salt level.\n\nmy go-to filling ratio:\n- 300g ground pork\n- 200g firm tofu (pressed and crumbled)\n- 150g napa cabbage (salted, squeezed dry)\n- 4 green onions, finely chopped\n- 2 tbsp soy sauce\n- 1 tbsp sesame oil\n- 3 cloves garlic, minced\n- 1 tsp ginger\n\nfor cooking i usually pan-fry them: oil in a hot pan, place mandu flat side down, add a splash of water and cover for 3-4 min until the bottom is crispy golden.\n\nwhat filling combo do you prefer? i've seen people add glass noodles and kimchi — worth trying?`,
  },
  kimchi: {
    drama: 'Mr. Queen',
    food: 'Kimchi',
    foodKr: '김치',
    url: 'https://kdrama-kitchen.vercel.app/posts/mr-queen-kimchi',
    pinImage: path.resolve(__dirname, '../temp-images/kimchi-pin.jpg'),
    tweet: `mr. queen understood what most historical dramas don't.\n\na modern chef trapped in a joseon queen's body. no sword fights. no romance first. just kimchi.\n\nbong-hwan making kimchi in a royal kitchen is the most revolutionary scene in kdrama history.\n\n#MrQueen #KoreanFood`,
    tweetReply: `full recipe + the science behind traditional kimchi fermentation:\nhttps://kdrama-kitchen.vercel.app/posts/mr-queen-kimchi`,
    pinTitle: 'Traditional Korean Kimchi Recipe — Mr. Queen K-Drama Fermented Cabbage',
    pinDesc: `🥬 The royal kimchi from Mr. Queen — a modern chef trapped in a Joseon queen's body revolutionizes the palace kitchen through kimchi-making.\n\nTraditional napa cabbage kimchi with step-by-step fermentation guide. The same recipe Korean families have made for centuries.\n\n✅ Authentic tongbaechu-kimchi\n✅ 2,000 years of Korean tradition\n✅ Full recipe + video tutorial\n\n#KoreanFood #KDrama #KoreanRecipe #MrQueen #Kimchi #KoreanFermentation #TraditionalFood #KoreanCooking #AsianFood #DramaRecipe`,
    redditTitle: 'Kimchi (김치) — the 3 beginner mistakes that turn your first batch into mush',
    redditBody: `made my first batch of kimchi about two years ago. it turned into a slimy, mushy disaster. since then i've made probably 40+ batches and finally figured out what i was doing wrong.\n\nmistake 1: not enough salt during brining. the cabbage needs to sit in salt for 6-8 hours minimum. i used to rush it to 2-3 hours and the leaves never wilted properly. properly brined cabbage should bend without snapping. if it still cracks, it needs more time.\n\nmistake 2: skipping the rice flour porridge. i thought it was optional. it's not. the porridge (just 2 tbsp sweet rice flour + 1 cup water, cooked until thick) feeds the lactobacillus bacteria during fermentation. without it, fermentation is slower and the flavor is flatter.\n\nmistake 3: not rinsing enough after salting. you need THREE full rinses under cold running water. i used to rinse once and my kimchi was way too salty. taste a piece of the rinsed cabbage before applying paste — it should taste like a well-seasoned salad, not the ocean.\n\nmy current go-to ratio for 1 napa cabbage:\n- 1/2 cup coarse sea salt (for brining)\n- 1 cup gochugaru\n- 3 tbsp fish sauce (myulchi aekjeot)\n- 3 tbsp salted shrimp (saeujeot), chopped\n- 8 cloves garlic, minced\n- 1 tsp ginger\n- 1 medium korean radish, julienned\n- 4-5 green onions\n\nfor fermentation: 1-2 days at room temperature until you see small bubbles, then move to fridge. the flavor keeps developing for weeks.\n\nthe biggest lesson was patience. good kimchi needs time — both in the brining and in the fermentation. rushing either step ruins it.\n\nwhat's your preferred fermentation time? i like mine after about 5-7 days in the fridge — slightly tangy but still crunchy.`,
  },
  bossam: {
    drama: 'Marry My Husband',
    food: 'Bossam',
    foodKr: '보쌈',
    url: 'https://kdrama-kitchen.vercel.app/posts/marry-my-husband-bossam',
    pinImage: path.resolve(__dirname, '../temp-images/bossam-pin.jpg'),
    tweet: `marry my husband has the most satisfying revenge arc in kdrama.\n\nbut here's what nobody talks about — the bossam scene. ji-won eating late-night pork wraps with people who actually care about her.\n\nthat's not a meal. that's freedom.\n\n#MarryMyHusband #KoreanFood`,
    tweetReply: `full recipe + video tutorial here:\nhttps://kdrama-kitchen.vercel.app/posts/marry-my-husband-bossam`,
    pinTitle: 'Marry My Husband Bossam — Korean Boiled Pork Wraps Recipe',
    pinDesc: `🥬 The late-night freedom meal from Marry My Husband — ji-won eating bossam with people who actually care about her.\n\nTender boiled pork belly wrapped in fresh napa cabbage with spicy radish kimchi. A classic Korean sharing dish.\n\n✅ Melt-in-your-mouth pork\n✅ Best revenge comfort food\n✅ Full recipe + video tutorial\n\n#KoreanFood #KDrama #KoreanRecipe #MarryMyHusband #Bossam #KoreanPork #ComfortFood #KoreanCooking #AsianFood #DramaRecipe`,
    redditTitle: 'Bossam (보쌈) — why adding instant coffee to the boiling water actually works',
    redditBody: `i've been obsessed with making bossam at home for months now, and the biggest game changer was something my korean friend's mom told me — throw a spoonful of instant coffee into the boiling water with the pork belly.\n\nsounds insane, right? but the tannins in the coffee neutralize the gamey pork smell way better than just using ginger and scallions alone. the meat comes out incredibly clean-tasting.\n\nmy method that finally worked:\n\n- use pork belly with skin on (about 1kg / 2.2 lbs)\n- bring water to a boil with doenjang, garlic, ginger, scallion, whole peppercorns, and 1 tbsp instant coffee\n- simmer on LOW for about 60-70 minutes (don't boil hard or it gets tough)\n- rest for 10 min before slicing against the grain\n\nthe wrapping setup matters just as much — fresh napa cabbage leaves, salted shrimp (saeujeot), sliced garlic, ssamjang, and if you want to be proper about it, some radish kimchi (musaengchae) on the side.\n\nbossam is one of those dishes that looks simple but the details make all the difference. the coffee trick, the low simmer, slicing against the grain — skip any of these and it's just boiled pork.\n\nwhat's your go-to trick for removing pork smell? i've heard some people use soju in the water too.`,
  },
};

// ========== X 트윗 채우기 ==========
async function fillX(page, item) {
  console.log(`\n[X] ${item.food} 트윗 채우기...`);

  await page.goto('https://x.com/compose/post', { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  const editor = page.locator('[data-testid="tweetTextarea_0"]').first();
  await editor.waitFor({ timeout: 15000 });
  await editor.click();
  await sleep(300);

  // 줄 단위 입력
  const lines = item.tweet.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      await page.keyboard.press('Enter');
    } else {
      await page.keyboard.type(lines[i], { delay: 10 });
      if (i < lines.length - 1) await page.keyboard.press('Enter');
    }
  }
  await sleep(500);

  await page.screenshot({ path: `${DIR}/market-x-${item.food.toLowerCase()}.png` });
  console.log(`✅ X 트윗 입력 완료 — Ctrl+Enter 또는 게시 버튼을 눌러주세요`);
  console.log(`   게시 후 프로필에서 해당 트윗에 셀프 리플로 링크를 추가해주세요:`);
  console.log(`   "${item.tweetReply}"`);
}

// ========== Pinterest 핀 채우기 ==========
async function fillPin(page, item) {
  console.log(`\n[Pinterest] ${item.food} 핀 채우기...`);

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

  // 설명 (Tab으로 이동)
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

  await page.screenshot({ path: `${DIR}/market-pin-${item.food.toLowerCase()}.png` });
  console.log(`✅ Pinterest 핀 입력 완료 — 게시 버튼을 눌러주세요`);
}

// ========== Reddit 포스트 채우기 ==========
async function fillReddit(page, item) {
  console.log(`\n[Reddit] ${item.food} 포스트 채우기...`);

  await page.goto('https://www.reddit.com/r/KoreanFood/submit?type=TEXT', { waitUntil: 'domcontentloaded' });
  await sleep(5000);

  // 제목
  const titleArea = page.locator('textarea[name="title"], textarea[placeholder*="제목"]').first();
  await titleArea.waitFor({ timeout: 10000 });
  await titleArea.click();
  await titleArea.fill(item.redditTitle);
  await sleep(500);

  // 본문 — placeholder 클릭 후 타이핑
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

  // placeholder 클릭 fallback
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
    console.log('  플레어 "Kimchee!" 선택');
  } catch {
    console.log('  ⚠️ 플레어 수동 선택 필요');
  }

  await page.screenshot({ path: `${DIR}/market-reddit-${item.food.toLowerCase()}.png` });
  console.log(`✅ Reddit 포스트 입력 완료 — 게시하기 버튼을 눌러주세요`);
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
    console.log('  node scripts/market.cjs x bossam');
    console.log('  node scripts/market.cjs pin mandu');
    console.log('  node scripts/market.cjs reddit bossam');
    return;
  }

  const item = CONTENT[id];
  if (!item) {
    console.error(`❌ "${id}" 콘텐츠를 찾을 수 없음. node scripts/market.cjs list 로 확인`);
    return;
  }

  // CDP 연결
  console.log('CDP 연결...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();

  try {
    switch (platform) {
      case 'x':      await fillX(page, item); break;
      case 'pin':    await fillPin(page, item); break;
      case 'reddit': await fillReddit(page, item); break;
      default:
        console.error(`❌ 알 수 없는 플랫폼: ${platform}. (x / pin / reddit)`);
    }
  } catch (err) {
    console.error(`❌ 오류: ${err.message}`);
    await page.screenshot({ path: `${DIR}/market-error.png` });
  }

  // 브라우저는 닫지 않음 — 사용자가 직접 게시
  console.log('\n📌 브라우저가 열린 상태입니다. 확인 후 직접 게시해주세요.');
}

run().catch(console.error);
