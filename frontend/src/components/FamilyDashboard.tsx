import React, { useState } from 'react';
import { Trip } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { Shield, Radio, MapPin, Search } from 'lucide-react';

interface FamilyDashboardProps {
  trips: Trip[];
  onTriggerEmergency: (tripId: string) => Promise<void>;
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const FamilyDashboard: React.FC<FamilyDashboardProps> = ({
  trips,
  onTriggerEmergency,
  onOpenEmergencyModal
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [selectedTripId, setSelectedTripId] = useState<string>(trips[0]?.id || '');

  const selectedTrip = trips.find(t => t.id === selectedTripId || t.shareCode === searchCode) || trips[0];

  const lastChk = selectedTrip?.checkpoints[selectedTrip.checkpoints.length - 1];

  return (
    <div id="family-dashboard-root" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            FAMILY & LOVED ONES MONITORING PORTAL
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
            Track Loved Ones Overseas
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Real-time satellite coordinates, battery level, AI status log, and direct emergency liaison.
          </p>
        </div>

        {/* Share code search bar */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 w-full md:w-auto">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Enter Share Code (e.g. SARAH-KEDAR-90)"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
            className="bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-56 font-mono"
          />
        </div>
      </div>

      {/* Select active family member trip */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 text-xs font-semibold">
        <span className="text-slate-500 whitespace-nowrap">Select Monitored Relative:</span>
        {trips.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTripId(t.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border cursor-pointer ${
              selectedTrip?.id === t.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.travelerName} ({t.destination.split(' ')[0]})
          </button>
        ))}
      </div>

      {selectedTrip && (
        <div className="space-y-8">
          
          {/* Main Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Status Summary */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-mono text-slate-500 block uppercase">STATUS & PROTECTION LEVEL</span>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedTrip.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                  selectedTrip.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedTrip.travelerName}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                    selectedTrip.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                    selectedTrip.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedTrip.riskLevel} Risk Level
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-100 pt-3">
                Passport: <strong className="text-slate-900">{selectedTrip.passportNumber}</strong> ({selectedTrip.nationality})
              </p>
            </div>

            {/* Last Known Coordinates */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-mono text-slate-500 block uppercase">LAST KNOWN LOCATION</span>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {lastChk?.locationName || selectedTrip.destination}
              </div>
              <div className="text-xs text-slate-600 font-mono space-y-1 border-t border-slate-100 pt-2">
                <p>Coordinates: {lastChk?.lat.toFixed(4)}°N, {lastChk?.lng.toFixed(4)}°E</p>
                <p>Altitude: {lastChk?.altitudeMeters} meters</p>
                <p>Last Sync: {lastChk ? new Date(lastChk.timestamp).toLocaleTimeString() : 'N/A'}</p>
              </div>
            </div>

            {/* Battery & Biometrics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-mono text-slate-500 block uppercase">DEVICE & SATELLITE HEALTH</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">BATTERY</span>
                  <span className={`text-base font-bold ${selectedTrip.telemetry.battery < 15 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {selectedTrip.telemetry.battery}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">PULSE</span>
                  <span className="text-base font-bold text-indigo-600">
                    {selectedTrip.telemetry.heartRate} BPM
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 border-t border-slate-100 pt-2 font-mono">
                Signal: <span className="text-indigo-600 font-semibold">{lastChk?.signalType}</span>
              </div>
            </div>

          </div>

          {/* Interactive Map */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-600" />
              Live Family Satellite Map Tracker
            </h2>
            <InteractiveMap
              checkpoints={selectedTrip.checkpoints}
              destinationName={selectedTrip.destination}
              riskLevel={selectedTrip.riskLevel}
              travelerName={selectedTrip.travelerName}
              isEmergency={selectedTrip.status === 'critical_emergency'}
            />
          </div>

          {/* Emergency Contact & Action Center */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Family Emergency Direct Action Center</h3>
                <p className="text-xs text-slate-500">If you are unable to reach your relative, you can trigger a manual welfare check or alert their embassy.</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTriggerEmergency(selectedTrip.id)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Trigger Emergency Welfare Check
                </button>
                {selectedTrip.latestRiskReport && (
                  <button
                    onClick={() => onOpenEmergencyModal(selectedTrip)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    View Official Consular Report
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-indigo-900 block">Registered Emergency Contacts:</span>
                {selectedTrip.emergencyContacts.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-slate-200/60 last:border-none">
                    <span className="text-slate-800 font-semibold">{c.name} ({c.relation})</span>
                    <span className="text-slate-600 font-mono">{c.phone}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-indigo-900 block">Assigned Diplomatic Embassy Liaison:</span>
                <p className="text-slate-800 font-bold">{selectedTrip.embassyInfo.embassyName}</p>
                <p className="text-slate-600 font-mono">Hotline: {selectedTrip.embassyInfo.hotline}</p>
                <p className="text-slate-600 font-mono">Email: {selectedTrip.embassyInfo.email}</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
