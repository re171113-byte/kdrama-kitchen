# K-Drama Kitchen - Project Guide

> **Last Updated**: 2026-01-15
> **Goal**: Premium K-Drama food magazine with SEO optimization + monetization

---

## Project Overview

| Item | Details |
|------|---------|
| **Site Name** | K-Drama Kitchen |
| **Domain** | kdrama-kitchen.pages.dev |
| **Concept** | Korean drama food recipes & culture magazine |
| **Tech Stack** | Astro 4.x + TypeScript |
| **Revenue** | Google AdSense + Affiliate links |
| **Target** | International K-Drama fans who love Korean food |
| **Language** | English |

---

## Brand Identity

### Tagline
**"Cook What You Watch"**

### Voice & Tone
- **Editorial**: Magazine-style storytelling, not blog-style info dumps
- **Cinematic**: Describe scenes vividly, make readers feel the drama
- **Cultural**: Explain Korean food culture with depth and respect
- **Inviting**: Warm but sophisticated, like a trusted friend who knows food

### What We Are NOT
- ❌ Diet/health blog (no calorie counting, no "healthy alternatives")
- ❌ Simple recipe aggregator (no "5 easy steps" clickbait)
- ❌ Korean language content (English only)
- ❌ Generic food blog (every recipe connects to a K-Drama)

---

## Content Structure

### Categories (Drama Genres)
| Category | Slug | Description |
|----------|------|-------------|
| Romance | `/category/romance` | Love stories, heart-fluttering food moments |
| Thriller | `/category/thriller` | Suspenseful dramas, comfort food contrasts |
| Comedy | `/category/comedy` | Light-hearted shows, fun and quirky dishes |
| Historical | `/category/historical` | Sageuk dramas, traditional Korean cuisine |
| Action | `/category/action` | Fast-paced shows, bold flavors |
| Comfort Food | `/category/comfort-food` | Emotional eating scenes |
| Street Food | `/category/street-food` | Pojangmacha scenes, casual eats |

### Content Pillars
1. **Drama Recipe Posts** - Main content (80%)
2. **Culture Deep Dives** - Korean food culture articles (15%)
3. **Guides** - "Best K-Drama Foods" compilations (5%)

---

## Article Writing Guidelines

### Magazine Style Rules

#### 1. Opening Hook (The Scene)
Never start with "Today we'll learn about..."

**DO THIS:**
```
It's late. The clock reads 2:47 AM, and you're four episodes deep
into Crash Landing on You. Your eyes are tired, but you can't stop.

Then it happens.

Captain Ri stands in his modest kitchen, steam rising from a
battered aluminum pot. He cracks an egg into bubbling broth...
```

**NOT THIS:**
```
Today we're going to learn how to make ramyeon from the popular
Korean drama Crash Landing on You. This recipe is simple and
delicious...
```

#### 2. Cultural Context Section
After the hook, explain WHY this food matters:
- What does it mean in Korean culture?
- Why did the drama use this food in this scene?
- What emotions does it evoke?

#### 3. Recipe Section
Clear, practical instructions:
- Ingredient list (Essential + Optional)
- Equipment list
- Step-by-step instructions
- YouTube video tutorial (백종원 등)

#### 4. Make It Tonight
Short emotional closing (1-2 paragraphs):
- Call to action
- Korean sentence at the end

### Article Structure Template

```markdown
---
title: "[Drama Name] [Food Name] - [Catchy Subtitle]"
description: "150 characters meta description with drama name + food"
pubDate: "YYYY-MM-DD"
category: "Romance|Thriller|Comedy|Historical|Action|Comfort Food|Street Food"
tags: ["Drama Name", "Food Name", "Korean Food", "K-Drama Recipe"]
image: "https://upload.wikimedia.org/wikipedia/commons/..."
---

## The Drama: [Drama Name] and [Context]
[2-3 paragraphs: Drama introduction, food scene context, why this food matters]

---

## The History of [Food Name]

### What Is [Food Name]?
[Etymology, basic explanation]

### [Historical Context]
[Origin story, cultural significance - 3-4 paragraphs]

| Feature | Detail |
|---------|--------|
| [Aspect] | [Explanation] |

---

## The Recipe: [Food Name]

### Ingredients

<ul class="recipe-list">
  <li class="recipe-item">
    <span>
      <span class="item-name">[Korean specialty item]</span>
      <span class="item-note">(brand recommendation)</span>
    </span>
    <a href="https://www.amazon.com/s?k=search+keywords&tag=kdramacitchen-20" class="buy-btn" target="_blank" rel="nofollow noopener">Amazon →</a>
  </li>
  <li class="recipe-item">
    <span class="item-name">[General item - no link needed]</span>
  </li>
</ul>

### Equipment

<ul class="recipe-list">
  <li class="recipe-item">
    <span>
      <span class="item-name">[Korean cookware]</span>
      <span class="item-note">(Korean name)</span>
    </span>
    <a href="https://www.amazon.com/s?k=search+keywords&tag=kdramacitchen-20" class="buy-btn" target="_blank" rel="nofollow noopener">Amazon →</a>
  </li>
  <li class="recipe-item">
    <span class="item-name">[General item - no link needed]</span>
  </li>
</ul>

### Video Tutorial

<iframe
  src="https://www.youtube-nocookie.com/embed/[VIDEO_ID]"
  title="[Video Title]"
  loading="lazy"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="width: 100%; aspect-ratio: 16/9;">
</iframe>

*Video by [Channel Name](URL)*

### Instructions

**Step 1: [Action]**
[Instructions]

**Step 2: [Action]**
[Continue...]

---

## FAQ

### [Question]?
[Answer - conversational tone]

### [Question]?
[Answer]

[5-7 FAQs total]

---

## Make It Tonight

[1-2 paragraphs: Short emotional closing + call to action]

오늘 밤, *[Drama Korean Title]* 정주행하면서 직접 만든 [food]과 함께하는 건 어떨까요?

---

*Hero image: "[Image Title]" by [Author], [License], via [Source]*

*Part of our K-Drama Kitchen series—cooking the dishes that made us hungry while watching.*
```

### Markdown Formatting Rules

#### Italic Text (Emphasis)
Use `*text*` for:
- **Drama titles**: *Crash Landing on You*, *Goblin*, *Vincenzo*
- **Korean words**: *ramyeon*, *ttukbaegi*, *meokgo gallae*
- **Foreign terms**: *al dente*, *mise en place*

```markdown
You're four episodes deep into *Crash Landing on You*.
Use a traditional Korean *ttukbaegi* (earthenware pot).
```

#### Image Captions
Place caption **immediately after** the image on the same line or next line:

```markdown
![Korean Ramyeon in Traditional Pot](https://images.unsplash.com/photo-xxx?w=800)
*A steaming bowl of Korean ramyeon - where comfort meets culture*
```

This renders as a centered, gray caption below the image.

#### Character Notes
For in-character tips, use italics in a separate paragraph:

```markdown
*Captain Ri's Note: In North Korea, resources are scarce. Every drop of water matters.*
```

---

### Article Layout: PC vs Mobile

PC와 모바일에서 아티클 레이아웃이 다릅니다. 글 작성 및 스타일 수정 시 참고하세요.

#### PC Version (768px+)
- **Header Style**: Editorial Left (좌측 정렬)
  - Category text (색상) + divider line + reading time
  - Title (Playfair Display font, 2.4rem)
  - Description
  - Byline: "By K-Drama Kitchen · January 14, 2026"
- **Hero Image**: 헤더 아래에 별도 표시
- **Footer**: 가로 정렬 (Back link 좌측, Disclaimer 우측)

#### Mobile Version (< 768px)
- **Header Style**: Hero Image Overlay
  - 전체 화면 이미지 위에 그라데이션 오버레이
  - Category badge (배경색 있는 배지)
  - Date + reading time
  - Title (이미지 위에 흰색 텍스트)
- **Hero Image**: 헤더와 통합 (오버레이)
- **Footer**: 세로 정렬 + 가운데 정렬

#### Category Colors (PC & Mobile)
| Category | Color | Usage |
|----------|-------|-------|
| Romance | `#C62828` | PC: text color, Mobile: badge bg |
| Thriller | `#4A148C` | Purple |
| Comedy | `#EF6C00` | Orange |
| Historical | `#5D4037` | Brown |
| Action | `#D84315` | Deep Orange |
| Comfort Food | `#8D6E63` | Warm Brown |
| Street Food | `#00897B` | Teal |

---

### Word Count & Quality Standards

| Element | Requirement |
|---------|-------------|
| Total length | 1,500 - 2,500 words |
| Hero image | Wikimedia Commons (CC license) |
| Video | YouTube embed (백종원 등) |
| FAQ | 5-7 questions |
| Reading time | 6-10 minutes |

### SEO Checklist
- [ ] Drama name in title
- [ ] Food name in title
- [ ] Meta description under 160 chars
- [ ] H2/H3 hierarchy correct
- [ ] Alt text on all images
- [ ] FAQ section for featured snippets
- [ ] Video tutorial included

### 발행 프로세스
1. **1개씩 발행** - 한 번에 하나의 포스트만 작성
2. **브라우저에서 직접 확인** - 발행 후 실제 페이지 확인
3. **문제점 체크** - 오류, 버그, 레이아웃, 이미지 깨짐 등
4. **수정 작업** - 발견된 문제 즉시 수정
5. **완료 확인 후 다음 포스트** - 문제없을 때만 다음 진행

### YouTube 영상 규칙
1. **한국어로 검색** - 음식명은 한국어로 검색 (예: "dalgona" ❌ → "달고나 만들기" ✅)
2. **고품질 영상 선택** - 조회수 높고, 채널 신뢰도 있는 영상 우선
3. **업로드 후 확인 필수** - 포스트 발행 후 영상이 정상 재생되는지 브라우저에서 직접 확인
4. **추천 채널** - 백종원, 우리의식탁, 쿠킹트리 등 검증된 요리 채널 우선

### Amazon 제휴 링크 규칙

**Affiliate Tag:** `kdramacitchen-20`

**링크 형식:**
```
https://www.amazon.com/s?k=검색어+검색어&tag=kdramacitchen-20
```

**Amazon 링크 추가 기준:**

| 카테고리 | 링크 필요 | 예시 |
|----------|----------|------|
| 한국 식품 | ✅ | 라면, 김치, 고추장, 된장, 떡 |
| 한국 조리도구 | ✅ | 양은냄비, 뚝배기, 한국 젓가락, 돌솥 |
| 일반 식재료 | ❌ | 계란, 파, 마늘, 소금, 물 |
| 일반 조리도구 | ❌ | 뚜껑, 냄비받침, 일반 프라이팬 |

**이유:** 외국인은 한국 특산품만 온라인 주문, 일반 재료는 동네 마트에서 구매

**HTML 템플릿:**
```html
<!-- Amazon 링크 있는 아이템 -->
<li class="recipe-item">
  <span>
    <span class="item-name">Korean ramyeon</span>
    <span class="item-note">(Shin Ramyun recommended)</span>
  </span>
  <a href="https://www.amazon.com/s?k=shin+ramyun&tag=kdramacitchen-20" class="buy-btn" target="_blank" rel="nofollow noopener">Amazon →</a>
</li>

<!-- Amazon 링크 없는 아이템 -->
<li class="recipe-item">
  <span class="item-name">2 eggs</span>
</li>
```

**필수 Disclosure (글 하단에 추가):**
```markdown
*This post contains affiliate links. As an Amazon Associate, I earn from qualifying purchases at no extra cost to you.*
```

---

## Technical Setup

### File Structure
```
kdrama-kitchen/
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── ads.txt
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   └── posts/
│   │       └── [slug].md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── posts/
│       │   ├── index.astro
│       │   └── [...slug].astro
│       ├── category/[slug].astro
│       ├── tag/[tag].astro
│       ├── about.astro
│       ├── contact.astro
│       ├── privacy.astro
│       ├── terms.astro
│       ├── sitemap.xml.js
│       └── rss.xml.js
└── astro.config.mjs
```

### Content Schema
```typescript
// src/content/config.ts
{
  title: string,           // SEO title
  description: string,     // Meta description
  pubDate: string,         // YYYY-MM-DD
  updatedDate?: string,    // Last modified
  category: string,        // Drama genre
  tags: string[],          // Keywords
  image: string,           // Hero image URL
  author?: string          // Default: "K-Drama Kitchen"
}
```

---

## Current Status

### Completed ✅
- [x] Site structure (all pages)
- [x] SEO basics (sitemap, robots.txt, meta tags)
- [x] JSON-LD Schema
- [x] Search functionality (Fuse.js)
- [x] Responsive design
- [x] English UI conversion
- [x] Domain configuration

### In Progress 🔄
- [ ] Content creation (drama recipes)

### Pending ⏳
- [ ] AdSense integration (after approval)
- [ ] Social media accounts
- [ ] More content (target: 30 posts)

---

## Quick Commands

### Create New Post
```
Write a new K-Drama Kitchen article about [DRAMA NAME] [FOOD NAME]
```

### Review Content
```
Review [URL] for SEO and magazine style quality
```

### Check Issues
```
Check for bugs and issues across the site
```

---

## Important Notes

### Image Sources

**사용 가능한 소스:**
| Source | License | Credit 필요 |
|--------|---------|-------------|
| Wikimedia Commons | CC BY, CC BY-SA 등 | ✅ 필수 |
| Wikimedia Commons | CC0 (Public Domain) | ⚪ 권장 |
| Pexels | Pexels License | ❌ 불필요 |
| Unsplash | Unsplash License | ❌ 불필요 |
| Pixabay | Pixabay License | ❌ 불필요 |

**규칙:**
- 글에 맞는 이미지를 위 소스에서 자유롭게 선택
- **고화질 유지 필수** (최소 1280px 이상, 원본 해상도 사용 권장)
- **출처 기재가 필요한 이미지는 반드시 글 하단에 크레딧 추가**
- 크레딧 포맷: `*Hero image: "[Title]" by [Author], [License], via [Source]*`
- 상업적 사용 가능 여부 확인 필수

### Monetization (Future)
- Google AdSense: Pending approval
- Affiliate links: Amazon, Korean grocery stores
- No intrusive ads in content area

---

## Brand Assets

### Logo Text
```
K-DRAMA
KITCHEN
Cook What You Watch
```

### Social Profiles (To Create)
- Pinterest: @kdramakitchen
- Instagram: @kdramakitchen
- X/Twitter: @kdramakitchen

---

*This guide defines the K-Drama Kitchen brand and content standards. All content should follow these guidelines to maintain consistency and quality.*
