const { chromium } = require('playwright');
const path = require('path');

// === 핀 데이터 ===
const PINS = [
  {
    id: 'mandu',
    image: path.resolve(__dirname, '../temp-images/mandu-pin.jpg'),
    title: 'Doctor Slump Mandu — Classic Korean Dumplings Recipe',
    description: `🥟 The healing dumplings from Doctor Slump — ha-neul and jeong-woo didn't fix each other, they just made mandu together.

Learn to fold classic Korean mandu with savory pork and vegetable filling. Includes step-by-step instructions + video tutorial.

✅ Crispy pan-fried or steamed
✅ Perfect K-Drama comfort food
✅ Full recipe on site

#KoreanFood #KDrama #KoreanRecipe #DoctorSlump #Mandu #KoreanDumplings #ComfortFood #KoreanCooking #AsianFood #DramaRecipe`,
    link: 'https://kdrama-kitchen.vercel.app/posts/doctor-slump-mandu',
    board: 'K-Drama Recipes',
  },
  {
    id: 'bossam',
    image: path.resolve(__dirname, '../temp-images/bossam-pin.jpg'),
    title: 'Marry My Husband Bossam — Korean Boiled Pork Wraps Recipe',
    description: `🥬 The late-night freedom meal from Marry My Husband — ji-won eating bossam with people who actually care about her.

Tender boiled pork belly wrapped in fresh napa cabbage with spicy radish kimchi. A classic Korean sharing dish.

✅ Melt-in-your-mouth pork
✅ Best revenge comfort food
✅ Full recipe + video tutorial

#KoreanFood #KDrama #KoreanRecipe #MarryMyHusband #Bossam #KoreanPork #ComfortFood #KoreanCooking #AsianFood #DramaRecipe`,
    link: 'https://kdrama-kitchen.vercel.app/posts/marry-my-husband-bossam',
    board: 'K-Drama Recipes',
  },
];

const DIR = 'C:/Users/noble/projects/withAi/kdrama-kitchen';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(page, name) {
  const p = `${DIR}/${name}.png`;
  await page.screenshot({ path: p });
  console.log(`    screenshot: ${name}.png`);
}

async function createPin(page, pin) {
  console.log(`\n====== ${pin.id.toUpperCase()} ======`);

  // 핀 생성 페이지 이동
  console.log('[1] 핀 생성 페이지 이동...');
  await page.goto('https://www.pinterest.com/pin-creation-tool/', {
    waitUntil: 'domcontentloaded',
  });
  await sleep(5000);
  await shot(page, `pin-${pin.id}-0-page`);

  // 이미지 업로드
  console.log('[2] 이미지 업로드...');
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.waitFor({ timeout: 10000 });
  await fileInput.setInputFiles(pin.image);
  await sleep(3000);
  console.log('    이미지 업로드 완료');

  // 제목 입력
  console.log('[3] 제목 입력...');
  const titleInput = page.locator('#storyboard-selector-title').first();
  await titleInput.waitFor({ timeout: 10000 });
  await titleInput.click();
  await titleInput.fill(pin.title);
  await sleep(500);

  // 설명 입력
  console.log('[4] 설명 입력...');
  const descArea = page.locator('[data-test-id="TextArea"]').first()
    || page.locator('div[role="textbox"]').nth(1);
  try {
    await descArea.waitFor({ timeout: 5000 });
    await descArea.click();
    await page.keyboard.type(pin.description, { delay: 5 });
  } catch {
    // fallback: Tab으로 이동
    console.log('    설명 필드 fallback: Tab');
    await titleInput.press('Tab');
    await sleep(500);
    await page.keyboard.type(pin.description, { delay: 5 });
  }
  await sleep(500);

  // 링크 입력
  console.log('[5] 링크 입력...');
  const linkInput = page.locator('#WebsiteField').first();
  try {
    await linkInput.waitFor({ timeout: 5000 });
    await linkInput.click();
    await linkInput.fill(pin.link);
  } catch {
    // fallback: 다른 selector
    console.log('    링크 필드 fallback');
    const altLink = page.locator('input[placeholder*="link"], input[placeholder*="URL"], input[name="website"]').first();
    await altLink.click();
    await altLink.fill(pin.link);
  }
  await sleep(500);

  // 보드 선택
  console.log('[6] 보드 선택...');
  const boardBtn = page.locator('[data-test-id="board-dropdown-select-button"], [data-test-id="boardWithSection-dropdown-select-button"]').first();
  try {
    await boardBtn.waitFor({ timeout: 5000 });
    await boardBtn.click();
    await sleep(1000);

    // 보드 목록에서 선택
    const boardOption = page.locator(`text="${pin.board}"`).first();
    await boardOption.waitFor({ timeout: 5000 });
    await boardOption.click();
    await sleep(500);
    console.log(`    보드 "${pin.board}" 선택 완료`);
  } catch {
    console.log('    ⚠️ 보드 선택 실패 — 수동 선택 필요할 수 있음');
  }

  await shot(page, `pin-${pin.id}-1-filled`);

  // 게시 버튼
  console.log('[7] 게시...');
  const publishBtn = page.locator('[data-test-id="storyboard-creation-nav-done"], button:has-text("게시"), button:has-text("Publish")').first();
  try {
    await publishBtn.waitFor({ timeout: 5000 });
    await publishBtn.click();
    await sleep(5000);
    console.log('    게시 버튼 클릭');
  } catch {
    // fallback
    console.log('    게시 버튼 fallback...');
    const altBtn = page.locator('button[type="submit"], [data-test-id="create-done-button"]').first();
    await altBtn.click();
    await sleep(5000);
  }

  await shot(page, `pin-${pin.id}-2-done`);
  console.log(`✅ ${pin.id} 핀 게시 완료!`);
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

  for (const pin of PINS) {
    await createPin(page, pin);
    await sleep(3000);
  }

  console.log('\n[완료] 모든 핀 게시 완료!');
  await page.close();
  await context.close();
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
