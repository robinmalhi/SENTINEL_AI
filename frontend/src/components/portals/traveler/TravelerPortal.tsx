import React, { useState } from 'react';
import { 
  Compass, 
  Shield, 
  Lock, 
  FileText, 
  Siren, 
  Bot, 
  Activity, 
  History, 
  Cloud, 
  User, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Trip } from '../../../types';
import { TravelerDashboard } from '../../TravelerDashboard';
import { TripActivationWizard } from '../../TripActivationWizard';
import { AiAssistant } from '../../AiAssistant';
import { PassportVault } from './PassportVault';

interface TravelerPortalProps {
  trips: Trip[];
  activeTrip: Trip;
  onAddCheckpoint: (tripId: string, data: any) => Promise<void>;
  onSimulateAction: (tripId: string, action: string) => Promise<void>;
  onRunAiRiskAnalysis: (tripId: string) => Promise<void>;
  onCheckinSafe: (tripId: string, pinCode: string, extendHours?: number) => Promise<void>;
  onTriggerEmergency: (tripId: string) => Promise<void>;
  onCreateTrip: (data: any) => Promise<void>;
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const TravelerPortal: React.FC<TravelerPortalProps> = ({
  trips,
  activeTrip,
  onAddCheckpoint,
  onSimulateAction,
  onRunAiRiskAnalysis,
  onCheckinSafe,
  onTriggerEmergency,
  onCreateTrip,
  onOpenEmergencyModal
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'activation' | 'passport' | 'sos' | 'ai_advisor' | 'risk' | 'history' | 'cloud' | 'settings'
  >('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'activation', label: 'Journey Protection', icon: Shield },
    { id: 'passport', label: 'Passport Vault', icon: Lock },
    { id: 'sos', label: 'Emergency SOS', icon: Siren },
    { id: 'ai_advisor', label: 'AI Advisor', icon: Bot },
    { id: 'risk', label: 'Risk Prediction', icon: Activity },
    { id: 'history', label: 'Journey History', icon: History },
    { id: 'cloud', label: 'Cloud Backup', icon: Cloud },
    { id: 'settings', label: 'Profile & Settings', icon: User }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Traveler Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 font-sans tracking-tight">TRAVELER PORTAL</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Personal Safeguard</p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'} 
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-xs" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Sarah Jenkins'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.organization || 'Trekker'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Sign Out Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'dashboard' && activeTrip && (
          <TravelerDashboard
            trip={activeTrip}
            onAddCheckpoint={onAddCheckpoint}
            onSimulateAction={onSimulateAction}
            onRunAiRiskAnalysis={onRunAiRiskAnalysis}
            onCheckinSafe={onCheckinSafe}
            onTriggerEmergency={onTriggerEmergency}
            onOpenEmergencyModal={onOpenEmergencyModal}
          />
        )}

        {activeTab === 'activation' && (
          <TripActivationWizard
            onSubmitTrip={onCreateTrip}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'passport' && (
          <PassportVault />
        )}

        {activeTab === 'sos' && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 max-w-2xl mx-auto text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <Siren className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Emergency Panic SOS Transmitter</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Activating emergency SOS dispatches an encrypted satellite distress packet directly to the local Police Control Room ({activeTrip.policeDept.district}) and foreign embassy ({activeTrip.embassyInfo.embassyName}).
            </p>

            <button
              onClick={() => onTriggerEmergency(activeTrip.id)}
              className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              TRANSMIT EMERGENCY SOS NOW
            </button>
          </div>
        )}

        {activeTab === 'ai_advisor' && (
          <AiAssistant />
        )}

        {activeTab === 'risk' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>AI Risk Prediction Engine Matrix</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Current Risk Level</span>
                <span className="text-lg font-black text-amber-600">{activeTrip.riskLevel} ({activeTrip.riskScore}/100)</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Elevation Advisory</span>
                <span className="text-sm font-bold text-slate-900">High Altitude Altitude Sickness Caution (&gt;3,000m)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Journey History & Checkpoints</h2>
            <div className="space-y-2">
              {activeTrip.checkpoints.map((chk, i) => (
                <div key={chk.id || i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{chk.locationName}</span>
                    <p className="text-[10px] text-slate-500 font-mono">{chk.timestamp} • {chk.signalType}</p>
                  </div>
                  <span className="font-mono text-emerald-600 font-bold">{chk.batteryLevel}% Battery</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Cloud Backup & Encryption Queue</h2>
            <p className="text-slate-600">All offline checkins are encrypted and queued locally, automatically syncing to Supabase when satellite connection restores.</p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 font-mono">
              [SUPABASE_SYNC_STATUS]: 100% Synced • Zero Pending Packets
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Profile & Safety PIN Settings</h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">Emergency Check-In PIN: <span className="font-mono text-blue-600">{activeTrip.pinCode}</span></p>
              <p className="text-slate-600">This PIN is required when marking yourself safe after a grace period warning.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
