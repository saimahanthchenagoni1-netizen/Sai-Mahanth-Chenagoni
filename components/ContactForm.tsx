
import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const inappropriateWords = ['badword1', 'badword2']; // Simple demonstration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.message) {
      setErrorMsg("Please fill in all fields.");
      setStatus('error');
      return;
    }

    const lowerMessage = formData.message.toLowerCase();
    if (inappropriateWords.some(word => lowerMessage.includes(word))) {
      setErrorMsg("Inappropriate content is not allowed.");
      setStatus('error');
      return;
    }

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="liquid-glass rounded-[2rem] p-8 sm:p-12 w-full max-w-2xl mx-auto mt-20">
      <h3 className="text-3xl font-bold mb-8 text-center">Message <span className="text-blue-500">Me.</span></h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
            <input 
              type="text" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
            <input 
              type="text" 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
          <textarea 
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </div>
        )}

        <button 
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            status === 'success' 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-slate-950 hover:bg-blue-600 hover:text-white'
          }`}
        >
          {status === 'sending' ? 'Sending...' : status === 'success' ? <><CheckCircle2 className="w-5 h-5" /> Sent!</> : <><Send className="w-5 h-5" /> Send Message</>}
        </button>
      </form>
    </div>
  );
};
