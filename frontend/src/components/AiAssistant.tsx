import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AssistantMessage } from '../types';
import { saveAdvisorQueryToSupabase } from '../lib/supabase';

export const AiAssistant: React.FC = () => {
  const [destinationContext, setDestinationContext] = useState('Kedarnath & Spiti Valley, Himalayas');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      text: 'Namaste! I am Sentinel Guard AI, your intelligent travel safety advisor for India. Ask me about route safety, high altitude weather hazards, satellite connectivity, or essential survival equipment.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      safetyRating: '8.2/10 (Requires Precaution)',
      weatherAdvisory: 'Monsoon landslides reported on Kedarnath trek path after 3:00 PM.',
      suggestedGear: ['Thermal Base Layer', 'Offline GPS Communicator', '20000mAh Solar Power Bank', 'Medical Trauma Kit']
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          destination: destinationContext
        })
      });

      const data = await res.json();

      const aiMsg: AssistantMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'Keep your satellite location beacon enabled and carry warm gear.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        safetyRating: data.safetyRating,
        weatherAdvisory: data.weatherAdvisory,
        suggestedGear: data.suggestedGear
      };

      setMessages(prev => [...prev, aiMsg]);

      saveAdvisorQueryToSupabase({
        query: userMsg.text,
        response: aiMsg.text,
        category: destinationContext
      });
    } catch (err) {
      console.error('AI Assistant Error:', err);
      setMessages(prev => [...prev, {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        text: 'Sentinel Guard AI recommendation: For remote regions in India, always inform local police checkpoints, carry a power bank, and save emergency helpline 112.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    "Is Kedarnath trek safe during monsoon rainfall?",
    "Will I get network on Rohtang Pass and Spiti route?",
    "What emergency gear should I carry for Silent Valley forest?",
    "What are the police helpline numbers in Uttarakhand & HP?"
  ];

  return (
    <div id="ai-assistant-root" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Sentinel Guard AI – Route & Safety Advisor
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Powered by Gemini AI. Instant route risk analysis, weather warnings, and survival checklists for India.
            </p>
          </div>
        </div>

        {/* Destination Context Field */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-[11px] font-mono text-slate-500 pl-2">Destination:</span>
          <input
            type="text"
            value={destinationContext}
            onChange={(e) => setDestinationContext(e.target.value)}
            className="bg-transparent text-xs text-indigo-700 font-bold focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-500 whitespace-nowrap">Sample Questions:</span>
        {sampleQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(q)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 whitespace-nowrap transition-all shadow-2xs cursor-pointer"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg space-y-6 min-h-[450px] flex flex-col justify-between">
        
        {/* Message Stream */}
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-75 font-mono mb-1">
                  <span>{m.role === 'user' ? 'You' : 'Sentinel Guard AI'}</span>
                  <span>{m.timestamp}</span>
                </div>

                <p className="text-sm font-sans whitespace-pre-wrap">{m.text}</p>

                {m.role === 'assistant' && (m.safetyRating || m.weatherAdvisory || m.suggestedGear) && (
                  <div className="pt-3 border-t border-slate-200 space-y-2 text-[11px] font-mono">
                    {m.safetyRating && (
                      <div className="flex items-center gap-1.5 text-indigo-700">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>Safety Rating: <strong>{m.safetyRating}</strong></span>
                      </div>
                    )}

                    {m.weatherAdvisory && (
                      <div className="flex items-center gap-1.5 text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Weather Advisory: <strong>{m.weatherAdvisory}</strong></span>
                      </div>
                    )}

                    {m.suggestedGear && m.suggestedGear.length > 0 && (
                      <div className="pt-1">
                        <span className="text-slate-500 block mb-1">Recommended Gear & Equipment:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.suggestedGear.map((gear, gIdx) => (
                            <span key={gIdx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                              ✓ {gear}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-600 italic">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Sentinel Guard AI analyzing weather, route elevation & safety advisories...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            required
            placeholder="Ask about route safety, weather hazards, or local emergency numbers..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-md disabled:opacity-50 shrink-0 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>

      </div>

    </div>
  );
};
