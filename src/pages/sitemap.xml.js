import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const allTags = [...new Set(posts.flatMap(post => post.data.tags))];
  const site = 'https://kdrama-kitchen.pages.dev';
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

  urls += '\n' + allTags.map(tag =>
    `  <url>
    <loc>${site}/tag/${encodeURIComponent(tag)}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
