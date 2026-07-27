import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Radio, 
  Activity, 
  Clock, 
  BellRing, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Heart, 
  Battery, 
  AlertTriangle,
  Siren,
  ChevronRight,
  Send
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Trip } from '../../../types';
import { FamilyDashboard } from '../../FamilyDashboard';
import { InteractiveMap } from '../../InteractiveMap';

interface FamilyPortalProps {
  trips: Trip[];
  onTriggerEmergency: (tripId: string) => Promise<void>;
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const FamilyPortal: React.FC<FamilyPortalProps> = ({
  trips,
  onTriggerEmergency,
  onOpenEmergencyModal
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'location' | 'satellite' | 'health' | 'timeline' | 'alerts' | 'communication' | 'settings'
  >('dashboard');

  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.id || '');
  const [pingMessage, setPingMessage] = useState('');
  const [pingSent, setPingSent] = useState(false);

  const activeTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'location', label: 'Live Satellite Map', icon: MapPin },
    { id: 'satellite', label: 'Satellite Tracking', icon: Radio },
    { id: 'health', label: 'Health Telemetry', icon: Heart },
    { id: 'timeline', label: 'Journey Timeline', icon: Clock },
    { id: 'alerts', label: 'Alert History', icon: BellRing },
    { id: 'communication', label: 'Satellite Ping Comms', icon: MessageSquare },
    { id: 'settings', label: 'Guardian Settings', icon: Settings }
  ];

  const handleSendPing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pingMessage.trim()) return;
    setPingSent(true);
    setTimeout(() => {
      setPingSent(false);
      setPingMessage('');
      alert(`Satellite check-in ping sent to ${activeTrip.travelerName}'s terminal.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Family Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 font-sans tracking-tight">FAMILY PORTAL</h1>
              <p className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Real-Time Guardian</p>
            </div>
          </div>

          {/* Traveler Switcher Dropdown */}
          <div className="mb-4 px-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Monitored Loved One
            </label>
            <select
              value={selectedTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {trips.map(t => (
                <option key={t.id} value={t.id}>
                  {t.travelerName} ({t.destination})
                </option>
              ))}
            </select>
          </div>

          {/* Nav Links */}
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
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
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

        {/* Footer User */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} 
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-xs" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'David Jenkins'}</p>
              <p className="text-[10px] text-slate-500 truncate">Family Guardian</p>
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
        {activeTab === 'dashboard' && (
          <FamilyDashboard
            trips={trips}
            onTriggerEmergency={onTriggerEmergency}
            onOpenEmergencyModal={onOpenEmergencyModal}
          />
        )}

        {activeTab === 'location' && activeTrip && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-600" />
                  <span>Live Satellite Map: {activeTrip.travelerName}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Destination: {activeTrip.destination} ({activeTrip.region})
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  activeTrip.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  Risk Level: {activeTrip.riskLevel}
                </span>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="h-[480px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <InteractiveMap checkpoints={activeTrip.checkpoints} riskLevel={activeTrip.riskLevel} />
            </div>
          </div>
        )}

        {activeTab === 'satellite' && activeTrip && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-sky-600" />
              <span>Satellite L-Band Heartbeat Telemetry</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Last Satellite Pulse</span>
                <span className="font-mono text-emerald-700 font-bold">{activeTrip.checkpoints[activeTrip.checkpoints.length - 1]?.timestamp || 'Recent'}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Signal Type</span>
                <span className="font-bold text-slate-900">{activeTrip.checkpoints[activeTrip.checkpoints.length - 1]?.signalType || 'Satellite L-Band'}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Battery Level</span>
                <span className="font-bold text-amber-700">{activeTrip.telemetry.battery}% Remaining</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && activeTrip && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <span>Health & Smartwatch Telemetry</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Heart Rate (BPM)</span>
                <span className="text-2xl font-black text-rose-600">{activeTrip.telemetry.heartRate} BPM</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Blood Oxygen (SpO2)</span>
                <span className="text-2xl font-black text-sky-600">{activeTrip.telemetry.pulseO2}%</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Fall Impact Status</span>
                <span className={`text-sm font-bold ${activeTrip.telemetry.fallDetected ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {activeTrip.telemetry.fallDetected ? 'FALL IMPACT DETECTED' : 'Normal Movement'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && activeTrip && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Chronological Journey Timeline</h2>
            <div className="space-y-3">
              {activeTrip.checkpoints.map((chk) => (
                <div key={chk.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{chk.locationName}</span>
                    <span className="text-slate-500 font-mono">{chk.timestamp}</span>
                  </div>
                  <p className="text-slate-600">{chk.aiNote || 'Routine GPS position ping.'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Overdue & Grace Period Alert History</h2>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <span className="text-emerald-800 font-bold block">Guardian Alert Escrow Active</span>
              <p className="text-slate-700">If {activeTrip.travelerName} exceeds their grace period, an SMS and automated call will be dispatched to your phone (+1-555-019-2834).</p>
            </div>
          </div>
        )}

        {activeTab === 'communication' && activeTrip && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-xl mx-auto shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-600" />
              <span>Satellite Check-In Ping to {activeTrip.travelerName}</span>
            </h2>

            <form onSubmit={handleSendPing} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message (Max 120 Characters for Satellite L-Band)
                </label>
                <textarea
                  rows={3}
                  value={pingMessage}
                  onChange={(e) => setPingMessage(e.target.value)}
                  placeholder="Hi Sarah! Checking in from home. Stay safe near Kedarnath summit!"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Satellite Check-In Ping</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Family Guardian Settings</h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">Escalation Mobile: <span className="font-mono text-sky-600">+1-555-019-2834</span></p>
              <p className="text-slate-600">Escalation Email: <span className="font-mono text-slate-800">d.jenkins@example.com</span></p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
