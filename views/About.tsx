
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profile').select('*').single();
      if (data) setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-8">
    <div className="h-64 bg-zinc-900 rounded-2xl"></div>
    <div className="h-8 w-1/3 bg-zinc-900 rounded"></div>
    <div className="h-32 bg-zinc-900 rounded"></div>
  </div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-extrabold text-white">About Me</h1>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <img 
            src={profile?.photo || "https://picsum.photos/seed/profile/600"} 
            className="w-full md:w-64 aspect-square object-cover rounded-2xl border-4 border-zinc-800 shadow-xl"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-400">{profile?.name || "Developer Name"}</h2>
            <div className="flex items-center gap-4 text-zinc-500 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14}/> Jakarta, Indonesia</span>
              <span className="flex items-center gap-1"><Briefcase size={14}/> Senior Engineer</span>
            </div>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {profile?.bio || "Highly motivated software engineer with over 7 years of experience in full-stack web development. Passionate about creating clean, scalable code and delivering exceptional user experiences."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <Briefcase className="text-primary-500" /> Experience
          </h3>
          <div className="space-y-8 border-l border-zinc-800 ml-3 pl-8">
            {(profile?.experience || [
              { company: "Tech Unicorn", role: "Senior Full Stack", period: "2021 - Present", description: "Leading the core product team developing microservices." },
              { company: "Digital Agency", role: "Web Developer", period: "2018 - 2021", description: "Built over 50 client websites using React and Next.js." }
            ]).map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-primary-600 rounded-full border-4 border-zinc-950"></div>
                <h4 className="text-lg font-bold text-zinc-100">{exp.role}</h4>
                <p className="text-primary-400 font-medium">{exp.company}</p>
                <p className="text-sm text-zinc-500 mb-2">{exp.period}</p>
                <p className="text-zinc-400 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Skills & Toolkit</h3>
          <div className="grid grid-cols-2 gap-4">
            {(profile?.skills || ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "AWS", "Docker"]).map(skill => (
              <div key={skill} className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg text-zinc-300 font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
