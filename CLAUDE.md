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
- Ingredient list with alternatives
- Step-by-step with timing
- Pro tips from Korean home cooks
- Common mistakes to avoid

#### 4. The Epilogue
End with emotion, not "enjoy your meal":
```
It's now 3:15 AM. Your pot is empty, the broth drunk down to the
last drop. Tomorrow, you might try something elaborate. But tonight,
you made ramyeon. And that was exactly enough.
```

### Article Structure Template

```markdown
---
title: "[Drama Name] [Food Name] - [Catchy Subtitle]"
description: "150 characters meta description with drama name + food"
pubDate: "YYYY-MM-DD"
category: "Romance|Thriller|Comedy|Historical|Action"
tags: ["Drama Name", "Food Name", "Korean Food", "K-Drama Recipe"]
image: "https://images.unsplash.com/photo-xxx"
---

[HOOK: 2-3 paragraphs describing the drama scene cinematically]

---

## The Scene That Made Us Hungry
[Context about the specific episode/scene]

![Image with caption](url)
*Caption describing the image*

---

## Understanding [Food Name]: More Than Just [Simple Description]
[Cultural deep dive - 3-4 paragraphs]

| Aspect | Meaning |
|--------|---------|
| [Element] | [Cultural significance] |

---

## The Recipe: [Character]'s [Food Name]

### Ingredients

**Essential**
- Item 1
- Item 2

**Optional Upgrades**
- Item 1
- Item 2

### Equipment
- Item 1
- Item 2

---

## Step-by-Step Instructions

### Step 1: [Action Name]
[Instructions with cultural notes in italics]

*[Character] Note: [In-character tip]*

### Step 2: [Action Name]
[Continue...]

![Progress image](url)
*Caption*

---

## Pro Tips from Korean Home Cooks

### The [Tip Name]
[Explanation]

### The [Tip Name]
[Explanation]

---

## FAQ

### Q1. [Question about the drama/food]?
[Answer with personality]

### Q2. [Question]?
[Answer]

[Continue for 5-7 FAQs]

---

## The Last Word
[Emotional epilogue - 2-3 paragraphs bringing it back to the drama/feeling]

---

*This recipe is part of our K-Drama Kitchen series...*
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
| Images | 3-5 from Unsplash |
| Internal links | 3-5 to related posts |
| FAQ | 5-7 questions |
| Reading time | 6-10 minutes |

### SEO Checklist
- [ ] Drama name in title
- [ ] Food name in title
- [ ] Meta description under 160 chars
- [ ] H2/H3 hierarchy correct
- [ ] Alt text on all images
- [ ] FAQ section for featured snippets
- [ ] Internal links to related content

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
- Use Unsplash for all images
- Format: `https://images.unsplash.com/photo-xxx?w=800`
- Always verify images exist and match content

### Internal Linking Strategy
- Link to related drama recipes
- Link to same-category posts
- Link to culture/guide posts when relevant

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
