
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Blog } from '../types';
import { Calendar, Clock, Search } from 'lucide-react';

export const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });
      if (data) setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Articles & Insights</h1>
        <p className="text-zinc-500 text-lg">Thinking out loud about software architecture, UI design, and development.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        <input 
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all"
        />
      </div>

      <div className="grid gap-8">
        {loading ? [1,2,3].map(i => (
          <div key={i} className="h-32 bg-zinc-900 rounded-xl animate-pulse"></div>
        )) : filteredBlogs.map(blog => (
          <Link key={blog.id} to={`/blog/${blog.slug}`} className="group space-y-3 block">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.published_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-primary-400 transition-colors leading-tight">
              {blog.title}
            </h2>
            <p className="text-zinc-400 line-clamp-2">
              Deep dive into {blog.title}. Understanding the core concepts and implementation details for modern applications...
            </p>
            <div className="pt-2 text-primary-500 font-semibold group-hover:underline">Read article →</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
