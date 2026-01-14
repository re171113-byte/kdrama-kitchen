import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
  
  return rss({
    title: 'K-Drama Kitchen',
    description: 'Cook what you watch. Recreate iconic dishes from your favorite Korean dramas.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-US</language>`,
  });
}
