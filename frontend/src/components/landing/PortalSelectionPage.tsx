import React from 'react';
import { 
  Compass, 
  Users, 
  Landmark, 
  Siren, 
  ArrowRight, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  Lock,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { PortalRole } from '../../types';

interface PortalSelectionPageProps {
  onSelectPortal: (role: PortalRole) => void;
  onBackToHome: () => void;
}

export const PortalSelectionPage: React.FC<PortalSelectionPageProps> = ({
  onSelectPortal,
  onBackToHome
}) => {
  const portals: {
    role: PortalRole;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    badgeColor: string;
    icon: React.ElementType;
    gradient: string;
    bgPattern: string;
    features: string[];
  }[] = [
    {
      role: 'traveler',
      title: 'Traveler Portal',
      subtitle: 'Personal Safeguard',
      description: 'Personal AI travel protection, passport vault, offline satellite heartbeat, and continuous risk monitoring.',
      badge: 'Individual & Trekker',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Compass,
      gradient: 'from-blue-50/50 via-sky-50/30 to-transparent',
      bgPattern: 'border-slate-200 hover:border-blue-400 hover:shadow-lg',
      features: ['Journey Protection Wizard', 'Passport & Document Vault', 'Emergency SOS Signal', 'Gemini AI Advisor']
    },
    {
      role: 'family',
      title: 'Family Portal',
      subtitle: 'Real-Time Guardian',
      description: 'Monitor loved ones in real time with live satellite location tracking, battery telemetry, and grace-period alerts.',
      badge: 'Family & Guardians',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Users,
      gradient: 'from-sky-50/50 via-blue-50/30 to-transparent',
      bgPattern: 'border-slate-200 hover:border-sky-400 hover:shadow-lg',
      features: ['Live Satellite Map', 'Health & Heart Rate Telemetry', 'Check-in Timeline', 'Overdue Escalation Alert']
    },
    {
      role: 'embassy',
      title: 'Embassy Portal',
      subtitle: 'Diplomatic Mission',
      description: 'Government emergency management for overseas diplomatic missions, consular citizen registries, and visa verification.',
      badge: 'Consular & Diplomatic',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Landmark,
      gradient: 'from-indigo-50/50 via-blue-50/30 to-transparent',
      bgPattern: 'border-slate-200 hover:border-indigo-400 hover:shadow-lg',
      features: ['Citizens Abroad Registry', 'Active Emergency Cases', 'Passport Authentication', 'Diplomatic Briefings']
    },
    {
      role: 'police',
      title: 'Police Rescue HQ',
      subtitle: 'Command Center',
      description: 'National emergency response center for search and rescue operations, aerial units, and real-time tactical dispatch.',
      badge: 'Tactical SAR Command',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Siren,
      gradient: 'from-rose-50/50 via-amber-50/30 to-transparent',
      bgPattern: 'border-slate-200 hover:border-rose-400 hover:shadow-lg',
      features: ['Live Rescue Operations', 'AI Priority Engine', 'GPS Dispatch Tracking', 'Search Mission Units']
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-sky-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm transition-all duration-200 text-sm font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Landing Website</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Role-Based Portal Access</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Select Your Emergency Portal
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Sentinel AI operates isolated security environments for travelers, family guardians, diplomatic embassies, and law enforcement rescue teams.
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <div
                key={portal.role}
                className={`group relative bg-white rounded-2xl border ${portal.bgPattern} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl backdrop-blur-sm overflow-hidden`}
              >
                {/* Decorative background glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${portal.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${portal.badgeColor}`}>
                      {portal.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {portal.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {portal.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                    {portal.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enter Portal Action Button */}
                <button
                  onClick={() => onSelectPortal(portal.role)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md shadow-blue-500/20"
                >
                  <span>Enter Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="mt-16 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All portal communication is protected with AES-256 end-to-end encryption and strict role isolation.</span>
        </div>
      </div>
    </div>
  );
};
