
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Mail, 
  Cpu, 
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Globe,
  Sun,
  Moon,
  CloudSnow,
  Lock,
  ChevronLeft,
  LayoutGrid
} from 'lucide-react';
import { PROJECTS, SKILLS, INTERESTS, TIMELINE } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { SkillBadge } from './components/SkillBadge';
import { AIAssistant } from './components/AIAssistant';
import { MouseFace } from './components/MouseFace';
import { ContactForm } from './components/ContactForm';

type Theme = 'dark' | 'light' | 'snow';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.remove('light-mode', 'snow-mode');
    if (theme === 'light') document.body.classList.add('light-mode');
    if (theme === 'snow') document.body.classList.add('snow-mode');
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('snow');
    else setTheme('dark');
  };

  const openSecretWindow = () => {
    setIsSecretOpen(true);
    // Smooth scroll to top when opening secret window to reset focus
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-700 ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#020617] text-white'}`}>
      
      {/* Secret Window Portal - Buddy AI Dashboard */}
      {isSecretOpen && (
        <div className="secret-overlay backdrop-blur-[60px] animate-in fade-in zoom-in-95 duration-700">
          <div className="relative w-full h-screen liquid-glass border-none shadow-none flex flex-col bg-slate-950/20">
            {/* Minimal Dashboard Header */}
            <div className="px-12 py-8 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setIsSecretOpen(false)}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-xs font-black uppercase tracking-[0.2em] group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                  Exit Dashboard
                </button>
                <div className="hidden lg:flex items-center gap-3">
                  <LayoutGrid className="w-5 h-5 text-slate-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">System Dashboard</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Buddy Core Online</span>
                </div>
              </div>
            </div>

            {/* Full-size Assistant Interface */}
            <div className="flex-1 overflow-hidden relative">
              <AIAssistant forceOpen={true} isSecret={true} />
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience Elements */}
      <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[180px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-800/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className={isSecretOpen ? 'hidden' : ''}>
        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'liquid-glass py-4 shadow-2xl' : 'py-8'}`}>
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-black text-xl transition-transform group-hover:rotate-12">S</div>
              <span className="font-extrabold text-2xl tracking-tighter hidden sm:block uppercase">SAI MAHANTH</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="#timeline" className="hover:text-blue-500 transition-colors">Timeline</a>
              <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
              <button 
                onClick={toggleTheme}
                className="p-3 bg-white/5 rounded-full hover:scale-110 active:scale-95 transition-all text-blue-500 border border-white/10"
              >
                {theme === 'dark' && <Moon className="w-4 h-4" />}
                {theme === 'light' && <Sun className="w-4 h-4" />}
                {theme === 'snow' && <CloudSnow className="w-4 h-4" />}
              </button>
              <a href="#contact" className="bg-blue-700 text-white px-7 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 font-black">Contact</a>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-8 z-10 pt-20 overflow-hidden">
          <div className="text-center max-w-5xl mx-auto space-y-8 flex flex-col items-center relative">
            
            {/* 3D Character - The Interactive Gatekeeper */}
            <div className="mb-10 hover:cursor-crosshair group">
              <MouseFace 
                isHero={true} 
                onSecretActivate={openSecretWindow} 
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-inner">
              <Sparkles className="w-4 h-4" />
              9th Grade Student @ Westwood High
            </div>
            
            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter">
              Hello <span className="animate-wave">👋</span> <br />
              I am <span className="gradient-text">Sai Mahanth.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Architecting the next era of digital existence through Artificial Intelligence. 
              Based in Westwood, rooted in Hyderabad.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <a href="#timeline" className="w-full sm:w-auto bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-900/40">
                Discovery <ArrowRight className="w-6 h-6" />
              </a>
              <a href="#projects" className="w-full sm:w-auto liquid-glass px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-4 border-white/20">
                Showcase
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <ChevronDown className="w-10 h-10" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-52 px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-24">
            <div className="space-y-6">
              <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter">About <span className="text-blue-600">Me.</span></h2>
              <div className="w-32 h-2 bg-blue-700 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-3xl sm:text-5xl leading-[1.1] font-black opacity-90 tracking-tight">
              A confluence of machine intelligence and relentless human curiosity. 
              Forging excellence at <span className="text-blue-500">Westwood High.</span>
            </p>
            
            <div className="grid sm:grid-cols-3 gap-8">
              {INTERESTS.map((interest, i) => (
                <div key={i} className="flex flex-col items-center p-12 liquid-glass rounded-[4rem] hover:scale-[1.05] active:scale-95 transition-all border-white/5 shadow-2xl">
                  <div className="p-6 bg-blue-700 text-white rounded-[2rem] mb-8 shadow-2xl shadow-blue-900/50">
                    {interest.icon}
                  </div>
                  <h4 className="font-black text-2xl mb-2 tracking-tighter uppercase">{interest.name}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-52 px-8 relative overflow-hidden z-10">
          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-40 space-y-6">
              <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter">My <span className="text-blue-600">Story.</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">A Worldwide Odyssey of Achievement</p>
            </div>

            <div className="relative space-y-32">
              <div className="timeline-track bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
              
              {TIMELINE.map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-16 relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-700 border-[6px] border-[#020617] shadow-[0_0_30px_rgba(59,130,246,0.6)] z-10 hidden md:block group-hover:scale-125 transition-transform"></div>
                  
                  <div className={`w-full md:w-[45%] group ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                     <div className={`liquid-glass p-10 sm:p-14 rounded-[4rem] transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] hover:-translate-y-4 ${item.highlight ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/5'}`}>
                      <div className={`flex items-center gap-4 mb-8 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <div className="px-6 py-2 bg-blue-600/20 rounded-full text-blue-500 font-black text-xs uppercase tracking-[0.2em] border border-blue-500/30">
                            {item.year}
                          </div>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-6 group-hover:text-blue-500 transition-colors uppercase leading-none">{item.title}</h3>
                      <p className="text-lg text-slate-500 leading-relaxed font-semibold mb-8">
                        {item.description}
                      </p>
                      <div className={`flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-[0.25em] ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <MapPin className="w-4 h-4 text-blue-600" /> {item.location}
                      </div>
                     </div>
                  </div>
                  <div className="hidden md:block md:w-[45%]"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-52 px-8 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter mb-6">Core <span className="text-blue-600">Stats.</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs">High-Fidelity Competency Profile</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SKILLS.map((skill, i) => (
                <SkillBadge key={i} skill={skill} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-52 px-8 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter mb-6">Built <span className="text-blue-600">Reality.</span></h2>
              <div className="w-32 h-2 bg-blue-700 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Footer Section */}
        <footer id="contact" className="py-52 px-8 relative z-20 text-center">
          <div className="max-w-5xl mx-auto space-y-40">
            <div className="space-y-8">
              <h2 className="text-8xl sm:text-[12rem] font-black tracking-tighter leading-none">Let's <span className="gradient-text">Chat.</span></h2>
              <p className="text-xl sm:text-2xl text-slate-500 font-black uppercase tracking-[0.5em] opacity-60">Initiate Direct Dialogue</p>
            </div>

            <ContactForm />

            <div className="pt-32 space-y-16 border-t border-slate-500/10">
              <div className="flex flex-col items-center gap-8">
                <span className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-600">Global Communication Hub</span>
                <a 
                  href="mailto:saimahanthchenagoni1@gmail.com" 
                  className="text-2xl sm:text-5xl font-black hover:text-blue-500 transition-all underline decoration-blue-900/30 underline-offset-[20px] decoration-[3px]"
                >
                  saimahanthchenagoni1@gmail.com
                </a>
              </div>
              
              <div className="flex justify-center gap-8">
                <a href="#" className="p-7 liquid-glass rounded-[2rem] hover:text-blue-500 hover:scale-110 active:scale-95 transition-all shadow-xl"><Github className="w-8 h-8" /></a>
                <a href="#" className="p-7 liquid-glass rounded-[2rem] hover:text-blue-500 hover:scale-110 active:scale-95 transition-all shadow-xl"><Globe className="w-8 h-8" /></a>
                <a href="#" className="p-7 liquid-glass rounded-[2rem] hover:text-blue-500 hover:scale-110 active:scale-95 transition-all shadow-xl"><Cpu className="w-8 h-8" /></a>
              </div>

              <div className="pt-20 opacity-30 flex flex-col items-center gap-4">
                <p className="text-slate-700 font-black text-xs uppercase tracking-[0.6em]">
                  © {new Date().getFullYear()} Sai Mahanth Chenagoni • Hyderabad x Westwood
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Persistent Assistant only if not in secret mode */}
        {!isSecretOpen && <AIAssistant />}
      </div>
    </div>
  );
};

export default App;
