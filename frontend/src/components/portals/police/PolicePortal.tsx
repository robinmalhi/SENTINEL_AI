import React, { useState } from 'react';
import { 
  Siren, 
  MapPin, 
  Crosshair, 
  ListOrdered, 
  Zap, 
  Users, 
  LogOut, 
  ShieldAlert, 
  Navigation
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Trip } from '../../../types';
import { MOCK_RESCUE_UNITS, MOCK_SEARCH_MISSIONS } from '../../../data/portalMockData';
import { InteractiveMap } from '../../InteractiveMap';

interface PolicePortalProps {
  trips: Trip[];
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const PolicePortal: React.FC<PolicePortalProps> = ({
  trips,
  onOpenEmergencyModal
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'command' | 'ops' | 'dispatch' | 'map' | 'queue' | 'ai_priority' | 'units'
  >('command');

  const [units, setUnits] = useState(MOCK_RESCUE_UNITS);
  const [selectedTrip, setSelectedTrip] = useState<Trip>(trips[0]);

  const criticalTrips = trips.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Critical' || t.status === 'critical_emergency');

  const navItems = [
    { id: 'command', label: 'Command Center', icon: Siren },
    { id: 'ops', label: 'Live Rescue Operations', icon: Crosshair },
    { id: 'dispatch', label: 'Emergency Dispatch', icon: Navigation },
    { id: 'map', label: 'GPS Satellite Map', icon: MapPin },
    { id: 'queue', label: 'Incident Queue', icon: ListOrdered },
    { id: 'ai_priority', label: 'AI Priority Engine', icon: Zap },
    { id: 'units', label: 'Nearby Rescue Units', icon: Users }
  ];

  const handleDispatchUnit = (unitId: string) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: 'En Route', etaMinutes: 18 } : u));
    alert(`Rescue Unit ${unitId} dispatched to target GPS coordinates.`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Tactical Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <Siren className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 font-sans tracking-tight">POLICE RESCUE HQ</h1>
              <p className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">Tactical Emergency Command</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
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

        {/* User Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'} 
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-xs" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Inspector R.S. Negi'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.organization || 'State Police HQ'}</p>
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
        {activeTab === 'command' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>State Emergency Control Room • Alpine SAR HQ</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tactical Rescue Command Dashboard</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Real-time GPS satellite tracking, helicopter SAR dispatch, and automated incident triage.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-bold animate-pulse">
                  RESCUE_CHANNEL: LIVE
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Active Critical Emergencies</span>
                <p className="text-3xl font-black text-rose-600 font-mono mt-2">{criticalTrips.length}</p>
                <p className="text-[10px] text-rose-600 font-bold mt-1">Immediate Rescue Needed</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Deployed Rescue Squads</span>
                <p className="text-3xl font-black text-amber-700 font-mono mt-2">
                  {units.filter(u => u.status === 'Deployed' || u.status === 'En Route').length}
                </p>
                <p className="text-[10px] text-amber-700 font-bold mt-1">Helicopters &amp; Ground Units</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Average Response Time</span>
                <p className="text-3xl font-black text-emerald-600 font-mono mt-2">14.2 Min</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">High Altitude Record</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Satellite Comms Status</span>
                <p className="text-3xl font-black text-sky-600 font-mono mt-2">100% L-BAND</p>
                <p className="text-[10px] text-sky-600 font-bold mt-1">Encrypted Payload Transceivers</p>
              </div>
            </div>

            {/* Incident Map & Squad Status */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 h-[420px] shadow-sm">
                <InteractiveMap checkpoints={selectedTrip.checkpoints} riskLevel={selectedTrip.riskLevel} />
              </div>

              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Rescue Squad Readiness</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">READY</span>
                </h3>

                <div className="space-y-3 max-h-[330px] overflow-y-auto pr-1">
                  {units.map((unit) => (
                    <div key={unit.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{unit.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          unit.status === 'Ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {unit.status}
                        </span>
                      </div>
                      <p className="text-slate-500 font-mono">{unit.callsign} • {unit.baseLocation}</p>

                      {unit.status === 'Ready' && (
                        <button
                          onClick={() => handleDispatchUnit(unit.id)}
                          className="w-full mt-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] transition-colors shadow-xs"
                        >
                          Dispatch Unit
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ops' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Live Search & Rescue Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {MOCK_SEARCH_MISSIONS.map(m => (
                <div key={m.missionId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">{m.missionId}</span>
                    <span className="text-rose-600 font-bold">{m.priority} PRIORITY</span>
                  </div>
                  <p className="text-slate-700">Target: {m.targetName}</p>
                  <p className="text-slate-600">Sector: {m.sector}</p>
                  <p className="text-slate-600">Lead Officer: {m.leadCommander}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dispatch' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Emergency Aerial & Ground Dispatch Controller</h2>
            <p className="text-slate-600">Select target traveler GPS coordinates and issue immediate SAR vector orders.</p>
            <button onClick={() => alert('Aerial SAR Air-Guardian-1 vector orders issued.')} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs">
              Issue Emergency Vector Orders
            </button>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="h-[550px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <InteractiveMap checkpoints={selectedTrip.checkpoints} riskLevel={selectedTrip.riskLevel} />
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Incident Priority Queue</h2>
            {trips.map(t => (
              <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900">{t.travelerName} ({t.destination})</span>
                  <p className="text-slate-500">Risk Score: {t.riskScore}/100</p>
                </div>
                <button onClick={() => onOpenEmergencyModal(t)} className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-xs">
                  Inspect Report
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai_priority' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">AI Automated Priority Engine</h2>
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 font-mono font-medium">
              [PRIORITY_WEIGHTING]: Fall Impact (40%) + Zero Heart Rate (35%) + Battery &lt;10% (15%) + Grace Period Expired (10%)
            </div>
          </div>
        )}

        {activeTab === 'units' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Nearby SAR Units Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {units.map(u => (
                <div key={u.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                  <p className="text-slate-500">{u.type} • Callsign: {u.callsign}</p>
                  <p className="text-emerald-700 font-bold mt-1">{u.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
