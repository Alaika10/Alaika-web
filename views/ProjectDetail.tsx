
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Project } from '../types';
import { ArrowLeft, Github, Globe, Code2 } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (data) setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="max-w-5xl mx-auto py-24 animate-pulse"><div className="h-12 bg-zinc-900 w-1/2 rounded mb-12"></div><div className="h-[500px] bg-zinc-900 rounded"></div></div>;
  if (!project) return <div className="text-center py-24">Project not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <Link to="/projects" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft size={18} /> Back to projects
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-primary-500 font-mono text-lg font-semibold tracking-widest uppercase">
              Full Stack Development
            </p>
          </div>
          <p className="text-xl text-zinc-400 leading-relaxed">
            {project.description}
          </p>
          <div className="flex gap-6 pt-4">
            {project.repo_url && (
              <a href={project.repo_url} className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-zinc-800 font-bold transition-all">
                <Github size={20} /> Repository
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url} className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all">
                <Globe size={20} /> Live Demo
              </a>
            )}
          </div>
        </div>
        <div className="glass p-2 rounded-3xl">
          <img src={project.thumbnail || "https://picsum.photos/seed/project/1000"} className="w-full h-auto rounded-2xl shadow-2xl" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-12">
        <div className="glass p-8 rounded-2xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="text-primary-500" /> Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-zinc-900 text-zinc-300 text-sm rounded-lg border border-zinc-800">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 glass p-8 rounded-2xl space-y-4">
          <h3 className="text-xl font-bold text-white">Challenges & Solutions</h3>
          <p className="text-zinc-400 leading-relaxed">
            The project required high-performance rendering and a robust state management system. We implemented a hybrid caching strategy using Redis and utilized serverless functions for image processing. The result was a 40% improvement in load times compared to the previous version.
          </p>
        </div>
      </div>
    </div>
  );
};
