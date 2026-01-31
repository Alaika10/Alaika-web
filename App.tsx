
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Home } from './views/Home';
import { BlogList } from './views/BlogList';
import { BlogDetail } from './views/BlogDetail';
import { ProjectList } from './views/ProjectList';
import { ProjectDetail } from './views/ProjectDetail';
import { About } from './views/About';
import { Contact } from './views/Contact';
import { Login } from './views/Login';
import { AdminDashboard } from './views/AdminDashboard';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Nav session={session} />
        <main className="flex-grow pt-20 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login session={session} />} />
            <Route 
              path="/admin/*" 
              element={session ? <AdminDashboard /> : <Login session={session} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
