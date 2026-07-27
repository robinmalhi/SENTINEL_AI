import React from 'react';
import { Shield, Lock, Radio, ChevronRight, UserCheck, Users, Landmark, Siren } from 'lucide-react';

interface LandingNavbarProps {
  activeTab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact';
  setActiveTab: (tab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact') => void;
  onOpenPortalSelection: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPortalSelection
}) => {
  const navItems: { id: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'technology', label: 'Technology' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">SENTINEL</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-widest">AI OS</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Emergency Protection Ecosystem</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Portal Login Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPortalSelection}
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4" />
            <span>Portal Login</span>
            <ChevronRight className="w-4 h-4 opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
};
