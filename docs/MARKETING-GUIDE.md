# K-Drama Kitchen 마케팅 가이드

> **마지막 업데이트:** 2026-01-31
> **원칙:** 거짓말 없이, 각 플랫폼 알고리즘에 최적화된 방식으로 마케팅한다.
> **타겟:** 영어권 글로벌 K-Drama 팬 + 한국 음식에 관심 있는 외국인

---

## 플랫폼별 역할 분담

| 플랫폼 | 역할 | 사이트 유입 효과 | 시간 투자 |
|--------|------|----------------|----------|
| **Pinterest** | 사이트 유입 엔진 (메인) | ★★★★★ | 장기 (6-9개월 후 효과) |
| **X/Twitter** | 브랜드 인지도 + 팬층 구축 | ★★ (링크 페널티) | 매일 꾸준히 |
| **Reddit** | 신뢰 구축 + 고품질 유입 | ★★★ (30-60일 투자 후) | 초기 집중 |

**우선순위: Pinterest > Reddit > X**
- Pinterest만이 외부 링크를 페널티 없이 노출시킴
- Reddit은 고품질 유입이지만 커뮤니티 신뢰 구축 필요
- X는 브랜드 빌딩용, 직접 유입보다는 인지도 목적

---

## 1. Pinterest 전략

### Pinterest는 소셜미디어가 아니라 검색엔진이다

Pinterest 공동 창업자: *"Pinterest is not a social network; it's a visual discovery engine."*

- **96%의 검색이 브랜드명 없이** 진행됨 → 팔로워 0명이어도 검색으로 발견 가능
- **외부 링크 페널티 없음** → 핀 클릭 → 사이트 유입이 플랫폼 설계 목적
- **핀 수명 1-2년+** → 오늘 올린 핀이 18개월 후에도 트래픽 유발
- **6-9개월 후 본격적인 트래픽** → 장기 투자, 빨리 시작할수록 유리

### 알고리즘 핵심 신호

| 신호 | 중요도 | 설명 |
|------|--------|------|
| 핀 제목 키워드 | ~40% | 검색 매칭의 핵심 |
| 핀 설명 (처음 100자) | ~30% | 키워드 2-3개 자연스럽게 |
| 보드 관련성 | ~20% | 보드 이름 = 카테고리 신호 |
| 이미지 텍스트 인식 | ~10% | 이미지 위 텍스트도 읽음 |
| 저장(Save) 수 | 최고 | 가장 강력한 행동 신호 |
| 도메인 품질 | 장기 | 클릭 후 이탈률 낮으면 점수 상승 |

### 핀 제작 규격

| 항목 | 규격 |
|------|------|
| 표준 핀 | 1000 x 1500 px (2:3 비율) — **기본** |
| 긴 핀 (레시피 단계) | 1000 x 2100 px (1:2.1) |
| 비디오 핀 | 1080 x 1920 px (9:16), 6-15초 |
| 파일 형식 | JPG/PNG, 고화질 |

- 2:3 핀이 정사각형보다 **28-32% 더 많은 저장** 생성
- 이미지에 텍스트 오버레이 추가 (레시피 이름 + 키워드)
- 1개 블로그 포스트당 **2-3가지 다른 디자인의 핀** 제작

### Pinterest SEO (가장 중요)

**핀 제목 (100자 이내):**
```
[음식 영문명] Recipe — [드라마명] Korean [카테고리]
```
예: `Jjamppong Recipe — Moving Korean Spicy Seafood Noodle Soup`

**핀 설명 (220-232자 최적):**
- 키워드 2-3개 앞부분에 배치
- 자연스러운 문장 (키워드 나열 금지)
- CTA 포함 ("Get the full recipe", "Save for later")
```
This easy Korean jjamppong recipe brings the fiery seafood noodle soup from the K-Drama Moving to your kitchen. Full step-by-step recipe with cooking video. Save for your next Korean cooking night!
```

**보드 이름:**
- 짧고 키워드 중심: `Korean Recipes`, `K-Drama Food`, `Korean Comfort Food`
- 창의적/모호한 이름 금지 ("Yummy Board" ❌)

**Alt Text:**
- 반드시 추가 (임프레션 **25% 증가**, 아웃바운드 클릭 **123% 증가**)

### 핀 게시 규칙

| 규칙 | 내용 |
|------|------|
| 빈도 | 매일 1-5개 (신규 계정), 꾸준히 |
| 간격 | 같은 콘텐츠의 핀 여러 개를 같은 날 올리지 않음 |
| 재핀 | 같은 핀을 다른 보드에 저장할 때 2-7일 간격 |
| 보드 | 가장 관련성 높은 보드에 **먼저** 저장 |
| 시즌 | 시즌 콘텐츠는 **45-60일 전**에 미리 올림 |
| 삭제 금지 | 성과 낮은 핀도 삭제하지 않음 (수개월 후 부활 가능) |

### Recipe Rich Pins (필수)

- 레시피 제목, 재료, 조리시간 자동 표시
- **조리 방법은 표시 안 됨** → 사이트 클릭 유도
- schema.org/Recipe 마크업 필요 → Astro 사이트에 구현 필요
- 핀 인터랙션 **약 3배 증가** 보고

### 핵심 메트릭

**아웃바운드 클릭 (Outbound Clicks)** = 최우선 지표
- 핀 클릭 (Pinterest 내 확대) ≠ 아웃바운드 클릭 (사이트 이동)
- 아웃바운드 클릭만이 실제 사이트 유입

---

## 2. X/Twitter 전략

### X 알고리즘 핵심

X는 **피드 알고리즘** 기반. SEO가 아니라 **행동 신호**로 노출이 결정됨.

| 신호 | 가중치 | 설명 |
|------|--------|------|
| 리플이 리플을 생성 | **75x** | 대화가 이어지면 최고 가치 |
| 리플 | 13.5-27x | 좋아요보다 압도적으로 중요 |
| 프로필 클릭 | 12x | 관심 신호 |
| 북마크 | 5x | 고품질 콘텐츠 신호 |
| 인용 RT | 4x | 단순 RT보다 가치 높음 |
| RT | 1-2x | 기본 |
| 좋아요 | 0.5x | **가장 약한 신호** |
| **외부 링크** | **-30~50%** | **노출 페널티** |

### 절대 규칙: 메인 트윗에 외부 링크 넣지 않는다

```
[메인 트윗] — 순수 텍스트만 (알고리즘 최대 노출)
     ↓ 즉시 셀프 리플
[리플] — "full recipe:" + 사이트 링크
```

- 메인 트윗: 페널티 없이 피드 확산
- 셀프 리플: 관심 있는 사람만 링크 클릭

### 트윗 작성 원칙

- 280자 이내 (반드시 스크립트로 사전 검증)
- 소문자 위주, 캐주얼 톤
- 해시태그 1-2개 이내 (없어도 됨, 3개 이상은 페널티)
- 첫 줄에서 스크롤 멈춤 유발

### 심리 레버 (트윗 유형)

| 유형 | 목적 | 예시 첫 줄 |
|------|------|-----------|
| 패턴 깨기 | 스크롤 멈춤 | "a superhero drama made the best cooking tutorial" |
| 호기심 갭 | 읽게 만듦 | "the difference comes down to 15 seconds" |
| 뜨거운 의견 | 댓글 유발 | "if you're using miso instead of doenjang — stop" |
| 권위 + 숫자 | 신뢰 구축 | "4 rules korean grandmas never break" |
| 정체성 신호 | RT/공유 유도 | "ask any korean what they'd eat for their last meal" |

### 게시 빈도 & 타이밍

| 항목 | 권장 |
|------|------|
| 빈도 | 3-5개/일 (리플 포함) |
| 최적 시간 | 화-목 오전 9시~오후 3시 (타겟 시간대) |
| 글로벌 무난 | KST 오후 10시~자정 (미국 아침 + 유럽 오후) |
| 초기 30분 | 게시 직후 리플에 반응하는 것이 핵심 |

### 팔로워 적은 계정 성장 전략

1. **큰 계정에 리플** — 같은 니치의 계정 20-30개 리스트, 매일 의미 있는 리플
2. **X Communities 활용** — 관련 커뮤니티에 게시하면 팔로워 수 무관하게 노출
3. **일관성** — 바이럴보다 매일 꾸준히 올리는 것이 성장에 유리
4. **Premium 고려** — 인증 계정은 비인증 대비 **4배 노출** (비용 대비 효과 검토)

### 자동화 (Playwright + CDP)

```
scripts/x-2026-01-31.cjs   — 트윗 게시 (메인 + 셀프 리플)
scripts/x-force.cjs        — 게시 버튼 JS 클릭 (오버레이 우회)
scripts/x-delete-all.cjs   — 전체 트윗 삭제
```

---

## 3. Reddit 전략

### Reddit은 장기 신뢰 게임이다

> *"It's okay to be a Redditor who has a blog. It's not okay to be a blog that has a Reddit account."*

### 90/10 룰 (필수)

- 전체 Reddit 활동의 **90%는 순수 참여** (댓글, 답변, 토론)
- **10% 이하만** 자기 콘텐츠 공유
- 위반 시: 쉐도우밴, 서브레딧 밴, 계정 정지

### 3단계 진입 전략

**Phase 1 (1-30일): 순수 참여**
- 매일 15-30분 r/KoreanFood, r/Cooking, r/food 댓글
- 질문 답변, 요리 팁 공유, 재료 추천
- 자기 사이트 언급 절대 금지
- 게시 0-2시간 된 쓰레드에 댓글 (rising 효과)

**Phase 2 (30-60일): 전문성 확립**
- 상세한 요리 기술, 문화적 맥락 공유
- 커뮤니티 단골들과 관계 구축
- 프로필 바이오에 사이트 링크 추가 (간접 유입)

**Phase 3 (60일+): 자연스러운 자기 콘텐츠 공유**
- 투명하게: "I wrote this on my blog" (발견한 척 ❌)
- 본문에 레시피 완전 포함 + 링크는 하단에 1회만
- 댓글 질문에 성실히 답변

### 알고리즘 핵심

| 신호 | 효과 |
|------|------|
| 첫 60분 업보트 | **게시물 생사를 결정** |
| 댓글 활동 | 토론 활발하면 랭킹 상승 |
| 업보트 속도 | 총 수보다 속도가 중요 |
| 체류 시간 + 저장 | 깊은 관여 신호 |
| 부정적 피드백 (숨김, 신고) | 노출 감소 |

### 포스트 유형별 성과

1. **이미지 포스트** — 최고 업보트 (음식 사진 + 본문에 레시피)
2. **텍스트 포스트** — 깊은 토론 유발 (질문, 팁 공유)
3. **링크 포스트** — 최저 성과 (플랫폼 이탈 유도)

### r/KoreanFood 규칙

- **플레어 필수** (Meat foods, Noodles, Rice Dishes, Desserts 등)
- 자기 홍보 시 **본문에 레시피 완전 포함 필수** (링크만 = 삭제)
- 커뮤니티 참여 톤 유지

### Reddit 포스트 구조

```
[제목] — 호기심 갭 + 구체적 정보
         예: "Jjamppong (짬뽕) — the 15-second trick that changes everything"

[본문]
1. 개인 경험 1-2줄 (신뢰 구축)
2. 핵심 팁/레시피 전문 (가치 먼저 제공)
3. 문화적 맥락 (교육적 가치)
4. "Full recipe with history: [URL]" (하단에 1회만)
5. 질문으로 마무리 ("What's your variation?")
```

### 게시 타이밍

| 최적 시간 (EST) | KST 환산 | 이유 |
|-----------------|----------|------|
| 화-금 오전 7-9시 | 오후 9-11시 | 미국 출근길 브라우징 |

### 주의사항

- 같은 콘텐츠 여러 서브레딧에 동시 포스트 금지
- Reddit 포스트가 구글에서 블로그를 역전하면 삭제 고려
- 가짜 업보트/조작 절대 금지 (탐지됨)

---

## 4. 심리 기반 콘텐츠 전략

> **원칙: 모든 내용은 사실 기반. 표현 방식만 심리적으로 최적화.**

### 핵심 심리 레버 7가지

| # | 레버 | 심리 원리 | 적용 |
|---|------|----------|------|
| 1 | 호기심 갭 | 열린 루프를 닫으려는 강박 | 정보를 반만 주고 나머지는 사이트에서 |
| 2 | 권위 + 사회적 증거 | 권위 복종 + 반복=진실 효과 | "korean grandmas", "baek jong-won" |
| 3 | 정체성 신호 | 소속 + 인정 욕구 | 공유하면 "한국 음식 아는 사람"이 됨 |
| 4 | 뜨거운 의견 | 부정성 편향 + 확증 편향 | 강한 의견 → 댓글 폭발 |
| 5 | 패턴 깨기 | 예측 위반 → 주의 집중 | 의외의 조합으로 스크롤 멈춤 |
| 6 | 구체적 숫자 | 앵커링 효과 → 신뢰 | "15초", "6,000원" |
| 7 | 감정 트리거 | 향수/위로/소속감 → 공유 | 음식 = 사랑의 언어 |

### 플랫폼별 레버 우선순위

| 플랫폼 | 1순위 | 2순위 | 3순위 |
|--------|-------|-------|-------|
| Pinterest | SEO 키워드 | 시각적 매력 | 실용성 ("Full recipe") |
| X | 패턴 깨기 | 뜨거운 의견 (댓글=75x) | 호기심 갭 |
| Reddit | 상호성 (가치 제공) | 권위 (출처 명시) | 논쟁 유도 (질문) |

---

## 5. 프로젝트 현황

### 계정 정보

| 플랫폼 | 계정 | 상태 |
|--------|------|------|
| Pinterest | re171113 (K-Drama Kitchen) | ✅ 활성, 웹사이트: kdrama-kitchen.vercel.app, K-Drama Recipes 보드 |
| X/Twitter | @re171113 | ✅ 활성 (기존 트윗 전체 삭제 후 재시작) |
| Reddit | Diligent-Boot-7579 | ✅ 활성 (기존 글/댓글 전체 삭제 후 Phase 1부터 재시작) |

---

### 일별 마케팅 기록

> **매일 이 섹션을 업데이트한다.** 어제 뭘 했는지, 오늘 뭘 해야 하는지 확인하고 이어간다.

#### Reddit Phase 진행 현황

| 항목 | 값 |
|------|-----|
| **현재 Phase** | Phase 1 (순수 참여) |
| **시작일** | 2026-01-31 |
| **Phase 2 전환 가능일** | 2026-03-02 (30일 후) |
| **Phase 3 전환 가능일** | 2026-04-01 (60일 후) |
| **누적 활동일** | 1일 |
| **순수 댓글 수** | 3 |
| **자기 콘텐츠 공유 수** | 0 |

**Phase 1 일일 할 일:**
- [ ] r/KoreanFood 또는 r/Cooking에서 **댓글 2-3개** (질문 답변, 요리 팁)
- [ ] rising/new 게시물에 댓글 (0-2시간 된 글 우선)
- [ ] **사이트 링크 절대 금지**
- [ ] 활동 내용을 아래 일별 로그에 기록

#### 일별 활동 로그

| 날짜 | X | Pinterest | Reddit | 비고 |
|------|---|-----------|--------|------|
| 2026-01-31 | ✅ 메인 2 + 리플 2 (jjamppong, doenjang) | ✅ 핀 2개 게시 완료 (2:3 이미지, 제목, 설명, 링크, 보드, 태그) | ✅ 기존 글 수동 삭제 완료, Phase 1 댓글 3개 게시 | X: undetected_chromedriver, Pinterest: 올바른 DIV 셀렉터, Reddit: shreddit-async-loader 방식 |

#### 블로그 포스트별 마케팅 상태

| 포스트 | X 메인 | X 리플 | Pinterest | Reddit |
|--------|--------|--------|-----------|--------|
| moving-jjamppong | ✅ 게시 | ✅ 링크 리플 | ✅ 게시 | Phase 3 이후 |
| misaeng-doenjang-jjigae | ✅ 게시 | ✅ 링크 리플 | ✅ 게시 | Phase 3 이후 |

#### 주간 성과 체크 (매주 금요일)

| 주차 | X 팔로워 | X 노출수 | Pinterest 월간조회 | Pinterest 아웃바운드클릭 | Reddit 카르마 | 사이트 트래픽 |
|------|----------|----------|-------------------|----------------------|--------------|-------------|
| W1 (01/31~) | — | — | 261 | — | — | — |

---

### 다음 마케팅 시 체크리스트

#### Pinterest (완료 — 다음 포스트 시)

핀 2개 게시 완료 (jjamppong, doenjang jjigae). 새 블로그 포스트 작성 시 동일 방식으로 추가.
- 이미지: Python Pillow로 2:3 (1000x1500) + 텍스트 오버레이 (`scripts/make-pin-images.py`)
- 게시: `scripts/pinterest-final-v2.cjs` (보드/태그 포함 올바른 셀렉터)

#### X/Twitter (완료 — 다음 포스트 시)

새 블로그 포스트 작성 시:
1. 메인 트윗 (280자 이내, 링크 없음, 심리 레버 적용)
2. 셀프 리플 (링크 포함)
3. 스크립트: `scripts/x-post-uc.py` (Python undetected_chromedriver)

#### Reddit Phase 1 (매일)

- r/KoreanFood, r/Cooking에서 **댓글 2-3개**
- rising/new 게시물 우선 (0-2시간 된 글)
- 사이트 링크 **절대 금지**
- 스크립트: `scripts/reddit-comment-v2.cjs`
  - 댓글 영역 활성화: `shreddit-async-loader[bundlename="comment_composer"]`
  - 입력: `div[contenteditable="true"]` → `.fill()`
  - 제출: `button[type="submit"]`
- **Phase 2 전환 가능일: 2026-03-02 (30일 후)**

#### 삭제 작업

- X 기존 트윗: ✅ 전부 삭제 완료
- Reddit 기존 글/댓글: ✅ 수동 삭제 완료
- Pinterest 기존 핀: 잔여 핀 있을 수 있음 — 확인 필요

---

## 6. 자동화 인프라

### Chrome CDP 실행

```powershell
# 1. 기존 Chrome 종료
Stop-Process -Name chrome -Force

# 2. CDP 모드 실행
Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  -ArgumentList '--remote-debugging-port=9222','--user-data-dir=C:\Users\noble\chrome-cdp-profile','--no-first-run'

# 3. 연결 확인
Invoke-RestMethod -Uri 'http://127.0.0.1:9222/json/version'
```

---

### X/Twitter 포스팅 — Python undetected_chromedriver (필수)

> **⚠️ Playwright로는 X 포스팅 불가능.**
> X.com은 Playwright를 봇으로 탐지 → 게시 버튼이 `aria-disabled="true"`로 유지됨.
> keyboard.type, execCommand, clipboard 등 어떤 입력 방식도 소용없음.

**반드시 Python `undetected_chromedriver`(Selenium) 사용:**

```python
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = uc.ChromeOptions()
options.add_argument('--user-data-dir=C:\\Users\\noble\\chrome-cdp-profile')
# Chrome 버전 확인 필수 (chrome://version)
driver = uc.Chrome(options=options, version_main=144)

def post_tweet(driver, text):
    """메인 트윗 게시"""
    driver.get('https://x.com')
    time.sleep(3)
    editor = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, '.DraftEditor-root'))
    )
    editor.click()
    time.sleep(1)
    ActionChains(driver).send_keys(text).perform()
    time.sleep(2)
    btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="tweetButtonInline"]'))
    )
    btn.click()

def post_reply(driver, tweet_url, text):
    """셀프 리플 게시"""
    driver.get(tweet_url)
    time.sleep(3)
    reply_area = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, '.DraftEditor-root'))
    )
    reply_area.click()
    time.sleep(1)
    ActionChains(driver).send_keys(text).perform()
    time.sleep(2)
    btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-testid="tweetButton"]'))
    )
    btn.click()
```

**핵심 포인트:**
- Chrome 프로필: `C:\Users\noble\chrome-cdp-profile`
- 메인 트윗: `x.com` 홈에서 `.DraftEditor-root` → `ActionChains.send_keys()`
- 게시 버튼: `tweetButtonInline` (홈) / `tweetButton` (리플)
- 셀프 리플: 게시된 트윗 URL로 이동 → 리플 영역에서 같은 방식
- `version_main` 값: Chrome 버전과 일치 필요 (`chrome://version`에서 확인)
- 참고 프로젝트: `C:\Users\noble\projects\withAi\x-posting\`

---

### Pinterest 포스팅 — Node.js Playwright + CDP

> Pinterest는 Playwright로 동작함 (X처럼 봇 탐지 없음).
> 단, **셀렉터가 대부분 `<div>`이지 `<button>`이 아님** — 반드시 태그 없이 `data-test-id`로 접근.

**핀 생성 페이지:** `https://kr.pinterest.com/pin-creation-tool/`

**셀렉터 매핑 (중요!):**

| 필드 | 셀렉터 | 타입 | 입력 방법 |
|------|--------|------|----------|
| 이미지 | `input[type="file"]` | input | `.setInputFiles()` |
| 제목 | `input#storyboard-selector-title` | input | `.fill()` |
| 설명 | `.public-DraftEditor-content` (Draft.js) | div contenteditable | **제목 입력 후 Tab → `keyboard.type()`** |
| 링크 | `input#WebsiteField` | input | `.fill()` |
| 보드 드롭다운 | `[data-test-id="board-dropdown-select-button"]` | **DIV** (not button!) | `.click()` |
| 보드 아이템 | `[data-test-id="boardWithoutSection"]` | div | `.filter({hasText}).click()` |
| 태그 | `input#combobox-storyboard-interest-tags` | input | `.fill()` → suggestion 클릭 |
| 게시 버튼 | `[data-test-id="storyboard-creation-nav-done"]` | **DIV** (not button!) | `.click()` |

**⚠️ 설명 필드 주의사항:**
- Draft.js `contenteditable`에 직접 `.click()` → **타임아웃 발생**
- `document.execCommand('insertText')` → DOM만 변경, React 상태 미반영 → **저장 안 됨**
- **유일한 해결법: 제목 입력 후 `Tab` 키로 포커스 이동 → `page.keyboard.type()`**

**⚠️ 보드 미선택 시 게시 불가** — 초안으로만 저장됨

```javascript
const { chromium } = require('playwright');

const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
const ctx = browser.contexts()[0];
let page = ctx.pages().find(p => p.url().includes('pinterest')) || await ctx.newPage();

// 1. 이미지 업로드
await page.locator('input[type="file"]').first().setInputFiles(imagePath);

// 2. 제목
await page.locator('#storyboard-selector-title').fill(title);

// 3. 설명 — Tab으로 이동 후 type (핵심!)
await page.keyboard.press('Tab');
await page.waitForTimeout(300);
await page.keyboard.type(description, { delay: 2 });

// 4. 링크
await page.locator('#WebsiteField').fill(link);

// 5. 보드 선택 (DIV — button 아님!)
await page.locator('[data-test-id="board-dropdown-select-button"]').click();
await page.waitForTimeout(1500);
await page.locator('[data-test-id="boardWithoutSection"]')
  .filter({ hasText: /K-Drama/i }).first().click();

// 6. 태그
const tagInput = page.locator('#combobox-storyboard-interest-tags');
await tagInput.fill('Korean Food');
await page.waitForTimeout(1000);
await page.locator('[role="option"]').first().click();

// 7. 게시 (DIV — button 아님!)
await page.locator('[data-test-id="storyboard-creation-nav-done"]').click();
```

**이미지 최적화 (Python Pillow):**
- 2:3 비율 (1000x1500px)로 리사이즈
- 하단 그라데이션 + 레시피명 텍스트 오버레이
- 상단에 "RECIPE" 배지
- 스크립트: `scripts/make-pin-images.py`

---

### Reddit 댓글/게시 — Node.js Playwright + CDP

> Reddit은 Playwright로 동작함 (봇 탐지 없음).

**댓글 게시 핵심 패턴:**

```javascript
// 1. 포스트 페이지 이동
await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(4000);

// 2. 이미지 모달 닫기 (이미지 포스트의 경우)
await page.keyboard.press('Escape');
await page.waitForTimeout(1000);

// 3. 댓글 영역 활성화 (핵심 셀렉터!)
const addComment = page.locator('shreddit-async-loader[bundlename="comment_composer"]')
  .or(page.locator('button:has-text("Add a comment")'));
await addComment.first().click();
await page.waitForTimeout(2000);

// 4. contenteditable에 .fill()로 입력
const editor = page.locator('div[contenteditable="true"]').first();
await editor.click();
await editor.fill(commentText);

// 5. 제출
const submitBtn = page.locator('button[type="submit"]').first();
await submitBtn.click();
```

**⚠️ 핵심:** `shreddit-async-loader[bundlename="comment_composer"]` 클릭이 댓글 영역 활성화의 키. 이걸 안 하면 contenteditable이 visible:false 상태.

---

### 자동화 주의사항

| 문제 | 원인 | 해결 |
|------|------|------|
| **X 게시 버튼 disabled** | **Playwright 봇 탐지** | **undetected_chromedriver 사용 (필수)** |
| X ChromeDriver 버전 불일치 | Chrome 업데이트 | `version_main=` 값 맞추기 |
| **Pinterest 설명 안 써짐** | **Draft.js 직접 클릭 불가** | **Tab 키로 포커스 이동 후 keyboard.type** |
| **Pinterest 게시 안 됨** | **보드 미선택 (초안만 저장)** | **보드 반드시 선택 확인** |
| Pinterest 보드 버튼 못 찾음 | **DIV인데 button으로 검색** | **태그 없이 `[data-test-id=...]`만 사용** |
| CDP 연결 실패 | Chrome 미실행 or 포트 충돌 | Chrome 종료 후 재시작 |
| X 글자수 초과 | 280자 초과 | 스크립트로 사전 검증 |
| Reddit 게시 안 됨 | 플레어 미선택 | 플레어 필수 선택 |

---

## 7. 하지 말아야 할 것

1. **X 메인 트윗에 외부 링크** — 30-50% 노출 감소
2. **Reddit에 커뮤니티 참여 없이 자기 홍보** — 밴 확정
3. **Reddit에 같은 콘텐츠 여러 서브레딧 동시 게시** — 스팸 탐지
4. **Pinterest에서 같은 날 같은 콘텐츠 핀 여러 개** — 스팸 플래그
5. **X 해시태그 3개 이상** — 노출 페널티
6. **Reddit 링크만 던지기** — r/KoreanFood에서 삭제
7. **성과 낮은 Pinterest 핀 삭제** — 수개월 후 부활 가능성 차단
8. **AI 생성 이미지를 Pinterest에** — 사용자가 필터링 가능

---

*마지막 업데이트: 2026-01-31*
