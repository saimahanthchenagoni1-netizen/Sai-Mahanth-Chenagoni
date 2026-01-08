
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  Sparkles, 
  Image as ImageIcon, 
  PenTool, 
  BookOpen, 
  Zap, 
  Mic,
  Plus,
  Paperclip,
  Settings
} from 'lucide-react';
import { chatWithSaiAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  forceOpen?: boolean;
  isSecret?: boolean;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ forceOpen = false, isSecret = false }) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithSaiAssistant(userMessage, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const chips = [
    { label: "Create image", icon: <ImageIcon className="w-4 h-4" />, query: "Can you describe a high-tech image representing Sai's projects?" },
    { label: "Write anything", icon: <PenTool className="w-4 h-4" />, query: "Write a short summary of Sai's goals for 9th grade." },
    { label: "Help me learn", icon: <BookOpen className="w-4 h-4" />, query: "Explain what Sai does at Westwood High." },
    { label: "Boost my day", icon: <Zap className="w-4 h-4" />, query: "Tell me an inspiring quote related to Sai's journey." },
  ];

  const ChatContent = (
    <div className={`
      ${isSecret ? 'w-full h-full flex flex-col bg-transparent' : 'mb-6 w-80 sm:w-[450px] max-h-[700px] liquid-glass rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col border border-white/10'}
    `}>
      {/* Mini Header for Non-Secret Mode */}
      {!isSecret && (
        <div className="bg-blue-700/40 backdrop-blur-xl p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black uppercase tracking-widest text-xs block">Buddy AI</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="bg-white/5 hover:bg-white/10 p-2.5 rounded-2xl transition-all">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
      
      {/* Main Content Area */}
      <div 
        ref={scrollRef} 
        className={`flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth scrollbar-hide flex flex-col ${isSecret ? 'max-w-5xl mx-auto w-full pt-20' : ''}`}
      >
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-start justify-center px-4 sm:px-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-4 mb-4">
               <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
               <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-400">
                 Hi, this is Buddy.
               </h2>
            </div>
            <h1 className="text-4xl sm:text-7xl font-black tracking-tight mb-12">
               How can I help you?
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
               {chips.map((chip, idx) => (
                 <button 
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/30 transition-all text-left group"
                 >
                   <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                     {chip.icon}
                   </div>
                   <span className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{chip.label}</span>
                 </button>
               ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4`}>
            {m.role === 'model' && <div className="flex items-center gap-2 mb-2 ml-4">
               <Bot className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Buddy</span>
            </div>}
            <div className={`max-w-[85%] p-6 rounded-[2.5rem] flex gap-4 shadow-xl border ${
              m.role === 'user' 
                ? 'bg-blue-700 text-white rounded-tr-none border-blue-600' 
                : 'bg-white/5 text-slate-200 border-white/10 rounded-tl-none'
            }`}>
              <div className="text-base leading-relaxed font-medium whitespace-pre-wrap">
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="flex items-center gap-2 mb-2 ml-4">
               <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Buddy is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Centered Bottom Input (Gemini Style) */}
      <div className={`p-8 pb-12 ${isSecret ? 'max-w-5xl mx-auto w-full' : ''}`}>
        <div className="relative">
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-3 flex items-center shadow-2xl focus-within:ring-2 focus-within:ring-blue-600 transition-all min-h-[80px]">
            <button className="p-4 text-slate-400 hover:text-white transition-colors">
              <Plus className="w-7 h-7" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Buddy..."
              className="flex-1 bg-transparent border-none px-6 text-xl font-medium focus:outline-none text-white placeholder:text-slate-700"
            />
            <div className="flex items-center gap-3 pr-4">
              <button className="hidden sm:block p-3 text-slate-400 hover:text-white transition-colors">
                <Paperclip className="w-6 h-6" />
              </button>
              <button className="p-3 text-slate-400 hover:text-white transition-colors">
                <Mic className="w-6 h-6" />
              </button>
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-blue-700 hover:bg-blue-600 text-white p-4 rounded-full disabled:opacity-30 transition-all active:scale-90 shadow-xl"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center px-8 mt-4">
             <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
               <span className="flex items-center gap-1"><Settings className="w-3 h-3" /> Tools</span>
               <span className="flex items-center gap-1 text-blue-500/50"><Sparkles className="w-3 h-3" /> Fast Mode</span>
             </div>
             <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.3em]">Sai Mahanth Edition v3.0</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isSecret) return ChatContent;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && ChatContent}
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-700 hover:bg-blue-600 text-white p-5 rounded-[2.5rem] shadow-2xl transform active:scale-90 transition-all group flex items-center gap-4 border border-blue-500/20"
        >
          <div className="flex items-center gap-4">
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black uppercase tracking-widest text-xs whitespace-nowrap">Open Buddy</span>
            <MessageSquare className="w-7 h-7" />
          </div>
        </button>
      )}
    </div>
  );
};
