# K-Drama Kitchen — Reddit 마케팅 표준 가이드

> **최종 확정일:** 2026-02-02
> **타겟:** r/KoreanFood (주력), r/KDRAMA (보조)
> **변경 금지:** 사용자 요청 또는 Reddit 정책 변경 시에만 수정

---

## 1. Reddit 알고리즘 핵심

### Hot Score (노출 결정 공식)

```
Hot Score = log(순추천수) + (게시시간 보정)
```

- 순추천수 = 추천 - 비추천
- 로그 적용 → 1,000추천이 10추천보다 "몇 단계" 높을 뿐, 100배가 아님
- 시간 감쇠 → 약 12시간마다 절반씩 점수 하락
- **새 콘텐츠가 지속적으로 경쟁**하는 구조

### 노출 결정 요인

| 요인 | 설명 |
|------|------|
| **인게이지먼트 속도** | 첫 15~30분 내 추천/댓글이 장기 노출을 결정 |
| **댓글 > 추천** | 댓글 2개가 추천 20개보다 더 강한 품질 신호 |
| **추천/비추천 비율** | 100추천+10비추천(90%) > 150추천+50비추천(75%) |
| **계정 신뢰도** | 오래된 계정의 초기 추천이 더 높은 가중치 |
| **서브레딧 적합성** | 커뮤니티 규범에 맞는 콘텐츠 우선 |

### 게시물이 올라가는 과정

```
1. New 피드에 등장
2. 첫 30분 내 추천/댓글 → 품질 신호
3. Hot 피드로 이동 → 노출 급증
4. 높은 속도 유지 → Rising → r/all 진입 가능
```

---

## 2. 자기홍보 규칙

### 90/10 룰 (Reddit 공식)

```
활동의 90% = 순수 참여 (댓글, 답변, 토론)
활동의 10% = 자기 콘텐츠 링크
```

### 절대 하지 말 것

```
- 첫 포스트에 링크 넣기
- "Check out my blog" 직접 홍보
- 같은 링크를 여러 서브레딧에 복붙
- 댓글 없이 링크만 드롭
- AI 생성 느낌의 글
- 추천 요청 또는 조작
```

### 반드시 할 것

```
- 포스트 본문에 충분한 가치 먼저 제공 (레시피 전체, 팁 전체)
- 링크는 본문 맨 마지막에 "더 보기" 형태로 1개만
- 댓글이 달리면 반드시 성실히 답변
- 다른 사람 포스트에도 유용한 댓글 남기기
- 서브레딧별 규칙 확인 후 플레어 설정
```

### 카르마 기반 링크 전략

```
마케팅 실행 전 반드시 카르마 확인 → 분기 처리

카르마 < 25:
  - 포스트 본문에 링크 절대 넣지 않음
  - 순수 가치 제공 포스트만 (레시피 전체 + 토론 유도)
  - 다른 사람 포스트에 유용한 댓글로 카르마 축적
  - 카르마 25 도달 후 링크 포함 포스트 시작

카르마 ≥ 25:
  - 본문 맨 마지막에 링크 1개 허용 ("Full recipe: URL")
  - 여전히 본문에 충분한 가치 먼저 제공
  - 90/10 룰 준수
```

**새 계정 + 링크 = 자동 필터링** → 포스트가 아예 안 보일 수 있음

---

## 3. 포스팅 전략

### 콘텐츠 구조 (r/KoreanFood 기준)

```
제목: [음식명 (한국어)] — [호기심 유발 hook]
  예: "Bossam (보쌈) — why korean cooks add instant coffee to the boiling water"

■ 카르마 < 25 (링크 없음):
  1. 개인 경험으로 시작 (겸손, 실패 공유)
  2. 핵심 팁/레시피 전체 제공 (가치 먼저)
  3. 문화적 맥락 (한국 음식 문화 설명)
  4. 토론 유도 질문 (마지막 줄)

■ 카르마 ≥ 25 (링크 포함):
  1. 개인 경험으로 시작 (겸손, 실패 공유)
  2. 핵심 팁/레시피 전체 제공 (가치 먼저)
  3. 문화적 맥락 (한국 음식 문화 설명)
  4. 사이트 링크 1개 (맨 마지막, "Full recipe: URL")
  5. 토론 유도 질문 (마지막 줄)

플레어: Recipe (r/KoreanFood 기준)
```

### 제목 심리 레버

| 레버 | 예시 |
|------|------|
| 호기심 갭 | "why korean cooks add instant coffee" |
| 구체적 숫자 | "the 3 filling mistakes that ruin" |
| 부정성 편향 | "mistakes", "ruin", "ignore" |
| 패턴 깨기 | "the science behind it" |
| 권위 | "Korean grandmas never break" |

### 배포 규칙

```
- 같은 서브레딧에 1개만 게시 (2개 동시 = 스팸)
- 2~3일 후 나머지 게시
- 댓글이 달리면 즉시 답변 (인게이지먼트 속도 중요)
- 게시 시간: 타겟 서브레딧이 가장 활발한 시간대
```

### 게시 후 행동

```
1. 첫 30분: 댓글 모니터링 + 즉시 답변
2. 24시간: 추가 댓글 확인 + 답변
3. 2~3일 후: 다음 포스트 게시
4. 주 1~2회 다른 사람 포스트에 유용한 댓글
```

---

## 4. 자동화 스크립트 구조

### 접속 방식

```javascript
const { chromium } = require('playwright');
const PROFILE_DIR = 'C:/Users/noble/ChromeX';

const context = await chromium.launchPersistentContext(PROFILE_DIR, {
  channel: 'chrome',
  headless: false,
  args: ['--disable-blink-features=AutomationControlled'],
  viewport: { width: 1280, height: 800 },
});
const page = await context.newPage();
```

- Playwright `launchPersistentContext` + ChromeX 프로필
- 프로필에 Reddit 로그인 상태 유지
- `--disable-blink-features=AutomationControlled`로 봇 감지 우회

### 스크립트 실행 흐름

```
1. ChromeX 프로필로 브라우저 실행
2. r/KoreanFood/submit?type=TEXT 이동
3. 제목 입력
4. 본문 입력 (현재 링크 없는 버전 사용)
5. 플레어 선택 (Kimchee! 또는 Recipe)
6. 게시 버튼 클릭
7. 스크린샷 저장 (확인용)
```

### 카르마 기반 링크 전략 (수동 확인)

```
현재 스크립트는 카르마 자동 체크 미구현.
본문에 링크 없는 버전으로 게시 중 (저카르마 대응).
카르마 25 이상 확인 후 수동으로 링크 포함 여부 결정.
```

### 주의사항

```
- Reddit UI가 자주 변경됨 → 셀렉터 확인 필수
- 게시 후 반드시 포스트 URL 확인
- 자동 게시 실패 시 수동 게시 가능하도록 스크린샷 저장
```

---

## 5. 참고 소스

- [OnlySocial - Reddit Algorithm](https://onlysocial.io/reddit-algorithm/)
- [UpvoteMax - How Reddit Upvotes Help](https://upvotemax.com/how-reddit-upvotes-help)
- [The Reddit Marketing Agency - How the Algorithm Works](https://www.theredditmarketingagency.com/post/how-the-reddit-algo-works-for-marketing)
- [SingleGrain - How to Hack Reddit's Algorithm](https://www.singlegrain.com/search-everywhere-optimization/how-to-hack-reddits-algorithm-for-maximum-visibility-2/)
- [ReplyAgent - Reddit Self-Promotion Rules](https://www.replyagent.ai/blog/reddit-self-promotion-rules-naturally-mention-product)
- [Reddit Help - Spam Policy](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam)

---

*이 문서는 Reddit 마케팅의 유일한 기준입니다. 사용자 요청 또는 Reddit 정책 변경 시에만 수정합니다.*
