
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Project } from '../types';
import { Code2, ExternalLink, Github } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Portfolio</h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">A collection of open source tools, SaaS projects, and technical experiments I've built over the years.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? [1,2,3,4].map(i => (
          <div key={i} className="h-[450px] bg-zinc-900 rounded-2xl animate-pulse"></div>
        )) : projects.map(project => (
          <div key={project.id} className="group glass rounded-2xl overflow-hidden flex flex-col hover:border-zinc-700 transition-all">
            <div className="h-64 overflow-hidden relative">
              <img 
                src={project.thumbnail || "https://picsum.photos/seed/project/800"} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
            </div>
            
            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h2>
                  <div className="flex gap-4">
                    {project.repo_url && <a href={project.repo_url} className="text-zinc-500 hover:text-white"><Github size={20}/></a>}
                    {project.demo_url && <a href={project.demo_url} className="text-zinc-500 hover:text-white"><ExternalLink size={20}/></a>}
                  </div>
                </div>
                <p className="text-zinc-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech_stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs rounded-full font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link to={`/projects/${project.slug}`} className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-center rounded-xl font-bold text-zinc-200 transition-colors mt-6">
                Case Study Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
