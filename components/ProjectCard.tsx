
import React from 'react';
import { Project } from '../types';
import { ExternalLink, ArrowUpRight, Code } from 'lucide-react';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative liquid-glass rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-[0_0_80px_rgba(29,78,216,0.2)]">
      <div className="h-64 bg-gradient-to-br from-blue-900/10 to-transparent flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] opacity-50 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl flex items-center justify-center text-blue-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-blue-700 group-hover:rotate-12 z-10">
          <Code className="w-10 h-10" />
        </div>
        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
           <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 text-slate-950 font-black bg-white px-8 py-4 rounded-2xl shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 active:scale-95"
          >
            Launch Project <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="p-10 sm:p-12 text-left space-y-6">
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-black text-white group-hover:text-blue-500 transition-colors tracking-tighter">
            {project.title}
          </h3>
          <ArrowUpRight className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
        </div>
        <p className="text-lg text-slate-400 font-medium leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.tags.map(tag => (
            <span key={tag} className="px-5 py-2 bg-white/5 text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl border border-white/10 group-hover:border-blue-500/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
