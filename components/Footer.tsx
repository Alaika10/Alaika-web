
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-xl font-bold text-white tracking-tighter">
              DEV<span className="text-primary-500">PORT</span>
            </span>
            <p className="text-zinc-500 mt-2 text-sm">
              © {new Date().getFullYear()} Senior Full-Stack Developer. Built with Passion.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-zinc-400 hover:text-primary-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-primary-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-primary-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@example.com" className="text-zinc-400 hover:text-primary-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
