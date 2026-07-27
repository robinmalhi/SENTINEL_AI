import React, { useState } from 'react';
import { 
  Landmark, 
  FileCheck, 
  Users, 
  AlertOctagon, 
  ShieldAlert, 
  MessageSquare, 
  UserCheck, 
  Globe2, 
  Settings, 
  LogOut, 
  Building2,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Trip } from '../../../types';
import { MOCK_PASSPORTS, MOCK_CITIZENS_ABROAD } from '../../../data/portalMockData';
import { InteractiveMap } from '../../InteractiveMap';

interface EmbassyPortalProps {
  trips: Trip[];
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const EmbassyPortal: React.FC<EmbassyPortalProps> = ({
  trips,
  onOpenEmergencyModal
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'cases' | 'citizens' | 'passports' | 'casemgmt' | 'comms' | 'staff' | 'risk_intel' | 'settings'
  >('dashboard');

  const emergencyTrips = trips.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Critical' || t.status === 'critical_emergency');
  const [selectedMapTripId, setSelectedMapTripId] = useState<string>(emergencyTrips[0]?.id || trips[0]?.id || '');

  const navItems = [
    { id: 'dashboard', label: 'Consular Dashboard', icon: Landmark },
    { id: 'cases', label: 'Active Emergency Cases', icon: AlertOctagon },
    { id: 'citizens', label: 'Citizens Abroad Registry', icon: Users },
    { id: 'passports', label: 'Passport Verification', icon: FileCheck },
    { id: 'casemgmt', label: 'Case Management', icon: ShieldAlert },
    { id: 'comms', label: 'Secure Comms Channel', icon: MessageSquare },
    { id: 'staff', label: 'Embassy Staff Directory', icon: UserCheck },
    { id: 'risk_intel', label: 'AI Risk Intelligence', icon: Globe2 },
    { id: 'settings', label: 'Embassy Config', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Government Embassy Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 font-sans tracking-tight">EMBASSY PORTAL</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Diplomatic Mission</p>
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
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
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
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'} 
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-xs" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Officer Marcus Vance'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.organization || 'US Embassy ACS'}</p>
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
          <div className="space-y-6">
            {/* Top Consular Metric Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Consular Emergency Division • New Delhi Mission</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Diplomatic Incident Command Center</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Autonomous satellite surveillance and emergency alert dispatcher for foreign passport holders in India.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold">
                  HIGH_RISK_WATCH: ACTIVE
                </span>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Citizens Abroad Registered</span>
                <p className="text-3xl font-black text-slate-900 font-mono mt-2">{MOCK_CITIZENS_ABROAD.length}</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Active Consular Registry</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Active Emergency Cases</span>
                <p className="text-3xl font-black text-rose-600 font-mono mt-2">{emergencyTrips.length}</p>
                <p className="text-[10px] text-rose-600 font-bold mt-1">🚨 Direct Intervention Required</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Verified Passport Vaults</span>
                <p className="text-3xl font-black text-indigo-600 font-mono mt-2">{MOCK_PASSPORTS.length}</p>
                <p className="text-[10px] text-slate-500 font-medium mt-1">AES-256 Authenticated</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-bold uppercase">Host Country Police Channel</span>
                <p className="text-3xl font-black text-emerald-600 font-mono mt-2">CONNECTED</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">State SDRF & Police Command</p>
              </div>
            </div>

            {/* High Risk Travelers Live Satellite Google Maps Section */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                    <MapPin className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 font-sans">
                      <span>High-Risk Citizens Live Satellite Tracking</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
                        {emergencyTrips.length} WATCHLIST
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time satellite GPS telemetry and location intelligence for flagged travelers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selector and Live Interactive Map */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* High Risk Travelers Selector List */}
                <div className="space-y-3 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                      Watchlist Citizens ({emergencyTrips.length})
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">LIVE FEED</span>
                  </div>
                  {emergencyTrips.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs border border-slate-200">
                      No citizens currently flagged at elevated risk.
                    </div>
                  ) : (
                    emergencyTrips.map((t) => {
                      const isSelected = (selectedMapTripId || emergencyTrips[0]?.id) === t.id;
                      const lastChk = t.checkpoints[t.checkpoints.length - 1];
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedMapTripId(t.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900/10'
                              : 'bg-slate-50/80 hover:bg-slate-100/80 text-slate-800 border-slate-200/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-extrabold text-xs tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {t.travelerName}
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              isSelected
                                ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                                : t.riskLevel === 'Critical' 
                                  ? 'bg-rose-50 text-rose-700 border-rose-200' 
                                  : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                              {t.riskLevel} Risk
                            </span>
                          </div>
                          <div className={`text-[11px] font-mono space-y-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                            <p className="font-sans text-[11.5px] font-medium opacity-90">Passport: {t.passportNumber} ({t.nationality})</p>
                            <p className="truncate opacity-80">Location: {lastChk?.locationName || t.destination}</p>
                            <p className={`font-bold pt-0.5 ${isSelected ? 'text-cyan-300' : 'text-slate-900'}`}>
                              GPS: {lastChk?.lat.toFixed(4)}°N, {lastChk?.lng.toFixed(4)}°E
                            </p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Map Display Viewport */}
                <div className="lg:col-span-2 space-y-3">
                  {(() => {
                    const activeTrip = emergencyTrips.find(t => t.id === selectedMapTripId) || emergencyTrips[0] || trips[0];
                    if (!activeTrip) return null;
                    const lastChk = activeTrip.checkpoints[activeTrip.checkpoints.length - 1] || {
                      lat: 30.7346,
                      lng: 79.0669,
                      locationName: activeTrip.destination
                    };

                    return (
                      <>
                        <InteractiveMap
                          checkpoints={activeTrip.checkpoints}
                          destinationName={activeTrip.destination}
                          riskLevel={activeTrip.riskLevel}
                          travelerName={activeTrip.travelerName}
                          isEmergency={true}
                        />

                        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
                          <div className="space-y-0.5 font-mono">
                            <p className="font-extrabold text-slate-900 font-sans text-xs">{activeTrip.travelerName} ({activeTrip.nationality})</p>
                            <p className="text-slate-600 text-[11px]">
                              Passport: <span className="font-bold">{activeTrip.passportNumber}</span> • Last Sync Coordinates: <span className="font-bold text-slate-900">{lastChk.lat.toFixed(4)}°N, {lastChk.lng.toFixed(4)}°E</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://www.google.com/maps?q=${lastChk.lat},${lastChk.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <span>Google Maps</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                            </a>
                            <button
                              onClick={() => onOpenEmergencyModal(activeTrip)}
                              className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                            >
                              Inspect Brief
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Active Emergency Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                  <span>Consular Active Emergency Incidents</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Case ID</th>
                      <th className="p-3">Citizen Name</th>
                      <th className="p-3">Passport No</th>
                      <th className="p-3">Destination / Sector</th>
                      <th className="p-3">Risk Level</th>
                      <th className="p-3">Consular Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trips.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono text-indigo-600 font-bold">{t.id}</td>
                        <td className="p-3 font-bold text-slate-900">{t.travelerName}</td>
                        <td className="p-3 font-mono text-slate-500">{t.passportNumber}</td>
                        <td className="p-3 font-medium">{t.destination}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                            t.riskLevel === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {t.riskLevel}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onOpenEmergencyModal(t)}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[11px] transition-colors shadow-xs"
                          >
                            Open Brief
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Active Emergency Cases Management</h2>
            <p className="text-xs text-slate-500">Review real-time satellite telemetry and dispatch consular diplomatic requests to local authorities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map(t => (
                <div key={t.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">{t.travelerName} ({t.nationality})</span>
                    <span className="font-mono text-rose-600 font-bold">{t.riskLevel} Risk</span>
                  </div>
                  <p className="text-slate-600">Passport: {t.passportNumber}</p>
                  <p className="text-slate-600">Destination: {t.destination}</p>
                  <button onClick={() => onOpenEmergencyModal(t)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-xs">
                    Inspect Consular Brief
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'citizens' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Citizens Abroad Consular Registry</h2>
            <div className="space-y-2">
              {MOCK_CITIZENS_ABROAD.map((cit) => (
                <div key={cit.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{cit.name} ({cit.nationality})</span>
                    <p className="text-slate-500">Passport: {cit.passportNumber} • Region: {cit.destinationRegion}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                    {cit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'passports' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Passport Verification & Visa Vault Lookup</h2>
            <div className="space-y-2">
              {MOCK_PASSPORTS.map(p => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{p.fullName} — {p.passportNumber}</p>
                    <p className="text-slate-500">{p.visaType} (Expires: {p.visaExpiry})</p>
                  </div>
                  <span className="text-emerald-700 font-bold">{p.verifiedStatus}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'casemgmt' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Diplomatic Assistance Dispatch</h2>
            <p className="text-slate-600">Request host country military, police, or emergency medical helicopter intervention for foreign citizens.</p>
            <button onClick={() => alert('Diplomatic request for assistance dispatched to Ministry of External Affairs & Police HQ.')} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs">
              Dispatch Diplomatic Assistance Request
            </button>
          </div>
        )}

        {activeTab === 'comms' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Encrypted Consular Hotlines</h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">U.S. Embassy ACS Hotline: +91-11-2419-8000</p>
              <p className="text-slate-600">Direct Webhook Integration with India Ministry of External Affairs (MEA)</p>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Embassy Staff Roster</h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-900">Duty Officer: Consular Officer Marcus Vance</p>
              <p className="text-slate-600">Email: m.vance@state.gov</p>
            </div>
          </div>
        )}

        {activeTab === 'risk_intel' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">AI Regional Risk Intelligence</h2>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-900 font-medium">
              [MACRO_ADVISORY]: Monsoonal landslide alerts active for Uttarakhand (Rudraprayag) & Himachal (Spiti). Consular travel warning elevated to Grade 2.
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Embassy Portal Configuration</h2>
            <p className="text-slate-600">Configure diplomatic webhooks and consular notification preferences.</p>
          </div>
        )}
      </main>
    </div>
  );
};
