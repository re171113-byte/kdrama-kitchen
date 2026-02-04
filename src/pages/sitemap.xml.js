import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const allTags = [...new Set(posts.flatMap(post => post.data.tags))];
  const site = 'https://www.kdrama-kitchen.com';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about/', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact/', priority: '0.5', changefreq: 'monthly' },
    { path: '/privacy/', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms/', priority: '0.3', changefreq: 'yearly' },
    { path: '/posts/', priority: '0.9', changefreq: 'daily' }
  ];
  const categories = ['romance', 'action', 'comedy', 'historical', 'thriller', 'comfort-food', 'street-food'];

  let urls = staticPages.map(page =>
    `  <url>
    <loc>${site}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');

  urls += '\n' + categories.map(cat =>
    `  <url>
    <loc>${site}/category/${cat}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('\n');

  urls += '\n' + posts.map(post =>
    `  <url>
    <loc>${site}/posts/${post.slug}/</loc>
    <lastmod>${post.data.pubDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('\n');

  // 태그 페이지는 sitemap에서 제외 (thin content 방지)
  // Google이 태그 페이지를 낮은 품질로 판단할 수 있음

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
