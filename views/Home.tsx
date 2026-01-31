
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, BookOpen, User as UserIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Blog, Project } from '../types';

export const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [blogsRes, projectsRes] = await Promise.all([
        supabase.from('blogs').select('*').order('published_at', { ascending: false }).limit(3),
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(3)
      ]);
      if (blogsRes.data) setBlogs(blogsRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Hero Section */}
      <section className="py-12 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Building Digital <span className="text-primary-500">Experiences</span> with Code.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            I'm a Senior Full-Stack Engineer specializing in modern web ecosystems like Next.js, React, and Node.js.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <Link to="/projects" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold flex items-center gap-2 transition-all">
              View Work <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-zinc-700 hover:bg-zinc-900 text-zinc-200 rounded-lg font-semibold transition-all">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/dev/800" 
            alt="Dev Portrait" 
            className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10 border-2 border-zinc-800" 
          />
        </div>
      </section>

      {/* Latest Projects */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-white">Latest Projects</h2>
            <p className="text-zinc-500">Selected work from my portfolio</p>
          </div>
          <Link to="/projects" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium">
            Browse all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? [1,2,3].map(i => <SkeletonCard key={i} />) : 
            projects.map(project => (
              <div key={project.id} className="group glass rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <img src={project.thumbnail || 'https://picsum.photos/400/300'} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-sm line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded uppercase tracking-wider">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* Latest Blog */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-white">Recent Articles</h2>
            <p className="text-zinc-500">Sharing insights and tech knowledge</p>
          </div>
          <Link to="/blog" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium">
            Read all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {loading ? [1,2].map(i => <SkeletonBlog key={i} />) : 
            blogs.map(blog => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="block glass p-6 rounded-xl hover:bg-zinc-800/50 transition-all border border-transparent hover:border-zinc-700">
                <div className="flex flex-col md:flex-row gap-6">
                  <span className="text-sm font-mono text-zinc-500">
                    {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white hover:text-primary-400 mb-2">{blog.title}</h3>
                    <p className="text-zinc-400 line-clamp-2">Click to read more about this topic...</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="glass rounded-xl h-[400px] animate-pulse bg-zinc-900"></div>
);

const SkeletonBlog = () => (
  <div className="glass rounded-xl h-24 animate-pulse bg-zinc-900"></div>
);
