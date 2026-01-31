
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Blog } from '../types';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (data) setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="max-w-3xl mx-auto py-24 animate-pulse"><div className="h-12 bg-zinc-900 w-3/4 rounded mb-8"></div><div className="h-96 bg-zinc-900 rounded"></div></div>;
  if (!blog) return <div className="text-center py-24"><h1 className="text-white text-2xl">Article not found.</h1><Link to="/blog" className="text-primary-500">Back to Blog</Link></div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Link to="/blog" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft size={18} /> Back to articles
      </Link>

      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-between border-y border-zinc-900 py-4">
          <div className="flex items-center gap-4">
            <img src="https://picsum.photos/seed/author/100" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-zinc-200 text-sm font-bold">Admin Developer</p>
              <p className="text-zinc-500 text-xs flex items-center gap-1">
                <Calendar size={12}/> {new Date(blog.published_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </header>

      {blog.cover_image && (
        <img src={blog.cover_image} className="w-full h-80 object-cover rounded-2xl shadow-xl" />
      )}

      <div className="prose prose-invert max-w-none">
        {blog.content.split('\n').map((para, i) => (
          <p key={i} className="text-zinc-300 text-lg leading-relaxed mb-6">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
};
