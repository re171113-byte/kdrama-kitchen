# K-Drama Kitchen — X/Twitter 마케팅 표준 가이드

> **최종 확정일:** 2026-02-02
> **계정:** @re171113 (Non-Premium)
> **변경 금지:** 사용자 요청 또는 X 노출 로직 변경 시에만 수정

---

## 1. X 알고리즘 핵심 (2026년 기준)

### 인게이지먼트 점수 (가중치)

```
리트윗     × 20
답글       × 13.5
프로필 클릭 × 12
링크 클릭   × 11
북마크     × 10
좋아요     × 1
```

### 노출 결정 요인

| 요인 | 설명 |
|------|------|
| **첫 30분** | 이 시간대 인게이지먼트가 전체 배포를 결정 |
| **리트윗** | 1 리트윗 = 좋아요 20개 가치 |
| **셀프 리플** | 5분 내 자기 트윗에 답글 → 노출 부스트 |
| **답글 답변** | 내 트윗에 달린 답글에 응답 → 최대 150x 증폭 |
| **비디오** | 텍스트 대비 2~4x 도달 |
| **쓰레드** | 개별 트윗 대비 40~60% 더 많은 총 노출 |
| **Tweepcred** | 0.65 이하 → 트윗 3개만 배포 대상 |

### 노출을 죽이는 것

| 요인 | 영향 |
|------|------|
| **본문에 외부 링크 (Non-Premium)** | 노출 사실상 0 (2026.03~) |
| **본문에 외부 링크 (Premium)** | 30~50% 감소 |
| **가짜 팔로워** | 알고리즘 감지 → 페널티 |
| **Community Notes** | 몇 주간 도달 사망 |
| **해시태그 3개 이상** | 스팸 판정 |

---

## 2. 글자수 규칙

| 항목 | 카운트 |
|------|--------|
| 일반 문자 | 1자 |
| URL (길이 무관) | 23자 |
| 이모지 | 2자 |
| **최대** | **280자** |

**실용 기준:** 텍스트 280자 이내. URL 포함 시 텍스트 257자 + URL 23자 = 280자.

---

## 3. 포스팅 전략

### 절대 규칙

```
1. 메인 트윗 본문에 외부 링크 절대 넣지 않는다
2. 링크는 반드시 셀프 리플에 넣는다 (5분 이내)
3. 답글이 달리면 반드시 답변한다
4. 하루 3~5회, 2~3시간 간격으로 포스팅한다
5. 해시태그는 1~2개만 사용한다
```

### 포스트 1개당 트윗 구조

새 레시피 포스트가 발행되면 아래 순서로 실행:

```
[즉시] 메인 감성 트윗 — 텍스트만, 링크 X
  └→ [5분 내] 셀프 리플에 사이트 링크

[2~3시간 후] 실용 팁 트윗 — 텍스트만, 링크 X

[2~3시간 후] 논쟁 트윗 — 텍스트만, 링크 X
```

### 트윗 유형별 심리 레버

**1. 메인 감성 (패턴 깨기 + 감정 트리거)**
- 예상을 뒤집는 오프닝
- 드라마 장면과 음식의 감정적 연결
- 정체성 신호 (한국 문화 insider 지식)

**2. 실용 팁 (구체적 숫자 + 권위)**
- "3 mistakes", "15 seconds" 등 구체적 숫자로 앵커링
- 기술적 정확성으로 권위 확보
- 부정성 편향 활용 (실수 → "내가 이거 하고 있나?")

**3. 논쟁 (뜨거운 의견 + 도전)**
- 한쪽 편을 확실히 들기
- 감각 디테일로 설득
- 마지막 줄에 도전/유머 ("i will not be taking questions")

### 트윗 텍스트 작성 규칙

```
- 전부 소문자 (영어)
- 짧은 문장, 여백 많이
- 이모지 사용하지 않음
- 280자 이내 (URL 제외)
- 첫 줄이 가장 중요 (스크롤 멈추게)
```

### 노출 극대화 체크리스트

```
□ 본문에 외부 링크 없음
□ 5분 내 셀프 리플에 링크 추가
□ 해시태그 1~2개 (관련성 높은 것만)
□ 답글에 답변 (인게이지먼트 증폭)
□ 평일 9AM~12PM (한국시간) 게시
□ 이전 트윗과 2~3시간 간격
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
- 프로필에 X 로그인 상태 유지
- `--disable-blink-features=AutomationControlled`로 봇 감지 우회

### 스크립트 실행 흐름

```
1. ChromeX 프로필로 브라우저 실행
2. 글자수 검증 (260자 초과 → 중단)
3. 메인 트윗 게시 (텍스트만)
4. 게시 성공 확인 (프로필에서 트윗 존재 확인)
5. 해당 트윗 찾기 → 셀프 리플에 링크 게시
6. 프로필 스크린샷으로 최종 확인
```

### 성공 판정 기준

```
- URL이 compose에서 벗어남 (1차 확인)
- 프로필 페이지에서 트윗 텍스트 검색 (2차 확인)
- 스크린샷 저장 (증거)
```

---

## 5. 향후 업그레이드 가능 항목

Premium 구독 시:
- 본문에 링크 가능 (30~50% 감소지만 0은 아님)
- 4x 노출 부스트
- 긴 텍스트 (25,000자)

비디오 콘텐츠 추가 시:
- 15~60초 세로 영상
- 텍스트 대비 2~4x 도달
- 자막 포함 권장

---

## 6. 참고 소스

- [Tweet Archivist - How the Twitter Algorithm Works 2026](https://www.tweetarchivist.com/how-twitter-algorithm-works-2025)
- [SocialBee - X Algorithm 2026](https://socialbee.com/blog/twitter-algorithm/)
- [Mark Morphew - X Algorithm Decoded](https://www.markmorphew.com/strategies-to-grow-your-twitter-x-followers/)
- [SocialWick - Decoding the New X Algorithm 2026](https://www.socialwick.com/decoding-the-new-x-algorithm-to-stay-visible-in-2026)
- [RecurPost - Twitter Algorithm 2026](https://recurpost.com/blog/twitter-algorithm/)

---

*이 문서는 X 마케팅의 유일한 기준입니다. 사용자 요청 또는 X 알고리즘 변경 시에만 수정합니다.*
