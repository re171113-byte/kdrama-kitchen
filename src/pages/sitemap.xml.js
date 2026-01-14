import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const allTags = [...new Set(posts.flatMap(post => post.data.tags))];
  const site = 'https://slimhanki-blog.pages.dev';

  const staticPages = ['', '/about', '/contact', '/privacy', '/terms', '/posts'];

  let urls = staticPages.map(page =>
    '  <url><loc>' + site + page + '</loc></url>'
  ).join('\n');

  urls += '\n' + posts.map(post =>
    '  <url><loc>' + site + '/posts/' + post.slug + '/</loc><lastmod>' + post.data.pubDate + '</lastmod></url>'
  ).join('\n');

  urls += '\n' + allTags.map(tag =>
    '  <url><loc>' + site + '/tag/' + encodeURIComponent(tag) + '/</loc></url>'
  ).join('\n');

  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>';

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
