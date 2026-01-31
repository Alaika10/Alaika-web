
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Blog, Project } from '../types';
import { Plus, Edit2, Trash2, LayoutDashboard, FileText, Briefcase, LogOut, Check, X, Upload, Loader2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (activeTab === 'blogs') {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) setBlogs(data);
    } else {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
    }
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${activeTab}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      if (activeTab === 'blogs') {
        setCurrentBlog({ ...currentBlog, cover_image: publicUrl });
      } else {
        setCurrentProject({ ...currentProject, thumbnail: publicUrl });
      }
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    const table = activeTab === 'blogs' ? 'blogs' : 'projects';
    await supabase.from(table).delete().eq('id', id);
    fetchData();
  };

  const saveBlog = async () => {
    const slug = currentBlog.title?.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    const data = { ...currentBlog, slug };
    
    if (currentBlog.id) {
      await supabase.from('blogs').update(data).eq('id', currentBlog.id);
    } else {
      await supabase.from('blogs').insert([data]);
    }
    setIsEditing(false);
    fetchData();
  };

  const saveProject = async () => {
    const slug = currentProject.title?.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    const data = { ...currentProject, slug };

    if (currentProject.id) {
      await supabase.from('projects').update(data).eq('id', currentProject.id);
    } else {
      await supabase.from('projects').insert([data]);
    }
    setIsEditing(false);
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="p-4 bg-primary-600 rounded-xl mb-6 flex items-center gap-3 shadow-lg shadow-primary-900/20">
            <LayoutDashboard className="text-white" />
            <h1 className="font-bold text-white text-lg tracking-tight">Admin Area</h1>
          </div>
          
          <button 
            onClick={() => { setActiveTab('blogs'); setIsEditing(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'blogs' ? 'bg-zinc-800 text-primary-400 border border-zinc-700' : 'text-zinc-500 hover:bg-zinc-900'}`}
          >
            <FileText size={20} /> Blog Posts
          </button>
          
          <button 
            onClick={() => { setActiveTab('projects'); setIsEditing(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-zinc-800 text-primary-400 border border-zinc-700' : 'text-zinc-500 hover:bg-zinc-900'}`}
          >
            <Briefcase size={20} /> Project Portfolio
          </button>
          
          <div className="pt-8 mt-8 border-t border-zinc-900">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-950/20 transition-colors"
            >
              <LogOut size={20} /> Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {isEditing ? (
            <div className="glass p-8 rounded-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold text-white">
                  {activeTab === 'blogs' ? (currentBlog.id ? 'Edit Post' : 'New Blog Post') : (currentProject.id ? 'Edit Project' : 'New Project')}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-all"><X /></button>
              </div>

              <div className="grid gap-6">
                {/* Common Image Upload Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Featured Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center relative group">
                      {(activeTab === 'blogs' ? currentBlog.cover_image : currentProject.thumbnail) ? (
                        <img src={(activeTab === 'blogs' ? currentBlog.cover_image : currentProject.thumbnail) || ''} className="w-full h-full object-cover" />
                      ) : (
                        <Upload size={24} className="text-zinc-700" />
                      )}
                      {isUploading && <div className="absolute inset-0 bg-zinc-950/50 flex items-center justify-center"><Loader2 className="animate-spin text-primary-500" /></div>}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="hidden" 
                        id="image-upload" 
                      />
                      <label 
                        htmlFor="image-upload" 
                        className="cursor-pointer px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm inline-flex items-center gap-2 border border-zinc-700 transition-all"
                      >
                        <Upload size={16} /> Choose File
                      </label>
                      <p className="text-xs text-zinc-500 mt-2">Recommended size: 1200x630px. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                {activeTab === 'blogs' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Post Title</label>
                      <input 
                        placeholder="Mastering Next.js 15..."
                        value={currentBlog.title || ''}
                        onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary-600 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Content (Markdown Support)</label>
                      <textarea 
                        placeholder="Write your article here..."
                        rows={12}
                        value={currentBlog.content || ''}
                        onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white font-mono focus:ring-2 focus:ring-primary-600 outline-none resize-none"
                      />
                    </div>
                    <button 
                      onClick={saveBlog} 
                      className="w-full py-4 bg-primary-600 hover:bg-primary-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 transition-all"
                    >
                      <Check size={20} /> Save Article
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Project Name</label>
                      <input 
                        placeholder="AI Dashboard Pro"
                        value={currentProject.title || ''}
                        onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary-600 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Brief Description</label>
                      <textarea 
                        placeholder="A real-time data visualization tool..."
                        value={currentProject.description || ''}
                        onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary-600 outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Tech Stack (comma separated)</label>
                      <input 
                        placeholder="React, Tailwind, Supabase"
                        value={currentProject.tech_stack?.join(', ') || ''}
                        onChange={e => setCurrentProject({...currentProject, tech_stack: e.target.value.split(',').map(s => s.trim())})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary-600 outline-none"
                      />
                    </div>
                    <button 
                      onClick={saveProject} 
                      className="w-full py-4 bg-primary-600 hover:bg-primary-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20 transition-all"
                    >
                      <Check size={20} /> Save Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white capitalize">Manage {activeTab}</h2>
                  <p className="text-sm text-zinc-500">Edit or delete your existing content.</p>
                </div>
                <button 
                  onClick={() => { 
                    setIsEditing(true); 
                    if (activeTab === 'blogs') {
                      setCurrentBlog({ content: '' });
                    } else {
                      setCurrentProject({ tech_stack: [] });
                    }
                  }} 
                  className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-primary-900/20 transition-all active:scale-95"
                >
                  <Plus size={18} /> New {activeTab === 'blogs' ? 'Post' : 'Project'}
                </button>
              </div>

              <div className="grid gap-3">
                {(activeTab === 'blogs' ? blogs : projects).map((item: any) => (
                  <div key={item.id} className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                        <img src={(activeTab === 'blogs' ? item.cover_image : item.thumbnail) || 'https://picsum.photos/100'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100 group-hover:text-primary-400 transition-colors">{item.title}</h3>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">/{item.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setIsEditing(true);
                          activeTab === 'blogs' ? setCurrentBlog(item) : setCurrentProject(item);
                        }}
                        className="p-3 text-zinc-400 hover:text-primary-400 hover:bg-zinc-800 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-950/20 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {(activeTab === 'blogs' ? blogs : projects).length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
                    <p className="text-zinc-500">No content found. Start by creating something new!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
