
import React, { useState } from 'react';
import { Mail, Send, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // In a real app, send this to a server action or email service
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Let's Connect</h1>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">Have a project in mind or just want to say hi? I'm always open to new opportunities.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Email me at</p>
                  <a href="mailto:hello@example.com" className="text-white font-bold hover:text-primary-400">hello@example.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Based in</p>
                  <p className="text-white font-bold">Jakarta, Indonesia (GMT+7)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Social Channels</h3>
            <div className="flex gap-4">
              {[
                { icon: <Linkedin />, label: 'LinkedIn', url: '#' },
                { icon: <Github />, label: 'GitHub', url: '#' },
                { icon: <Twitter />, label: 'Twitter', url: '#' }
              ].map(social => (
                <a 
                  key={social.label}
                  href={social.url}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-zinc-400 hover:text-primary-400 hover:border-primary-400 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl space-y-6 relative overflow-hidden">
          {sent && (
            <div className="absolute inset-0 bg-zinc-950/90 flex items-center justify-center z-10 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-zinc-400">I'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}
          
          <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Message</label>
              <textarea 
                rows={5}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-900/20 transition-all flex items-center justify-center gap-2"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
