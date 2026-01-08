
import React from 'react';
import { Skill } from '../types';

export const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="p-10 liquid-glass rounded-[2.5rem] flex flex-col gap-6 hover:border-blue-500/40 transition-all duration-500 group">
      <div className="flex justify-between items-end">
        <span className="font-black text-2xl tracking-tighter group-hover:text-blue-500 transition-colors">{skill.name}</span>
        <span className="text-sm font-black text-blue-500 uppercase tracking-widest">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-blue-700 to-blue-400 rounded-full transition-all duration-1000"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};
