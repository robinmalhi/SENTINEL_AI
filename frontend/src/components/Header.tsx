import React from 'react';
import { Shield, Plus } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  activeTripsCount: number;
  criticalAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  criticalAlertsCount
}) => {
  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'dashboard', label: 'Traveler Dashboard' },
    { id: 'family', label: 'Family Portal' },
    { id: 'embassy', label: 'Embassy Portal', badge: criticalAlertsCount > 0 ? criticalAlertsCount : null },
    { id: 'police', label: 'Police Rescue HQ' },
    { id: 'assistant', label: 'AI Advisor' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 border border-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-600/35 transition-all duration-300 overflow-hidden shrink-0">
              <Shield className="w-5 h-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-300 border border-indigo-800 shadow-xs animate-pulse z-20" />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight font-display whitespace-nowrap">
                  SENTINEL <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">AI</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-normal hidden xl:inline whitespace-nowrap">
                Autonomous Tourist Protection
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 overflow-x-auto max-w-[50vw] lg:max-w-none">
            {navItems.map((item) => {
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`relative px-2.5 lg:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-rose-600 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Live Status */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Live Sync Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-[9px] font-mono text-slate-600 whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-600">Satellite Sync</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setCurrentView('activation')}
              className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-1.5 hover:scale-[1.02] shrink-0 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Start Trip</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center space-x-1 px-3 py-2 bg-slate-50 border-t border-slate-200 text-xs overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium text-xs transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-rose-600 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
