import React, { useState } from 'react';
import { Trip } from '../types';
import { Siren, ShieldAlert, Navigation } from 'lucide-react';

interface PolicePortalProps {
  trips: Trip[];
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const PolicePortal: React.FC<PolicePortalProps> = ({
  trips,
  onOpenEmergencyModal
}) => {
  const [sarDispatched, setSarDispatched] = useState<Record<string, boolean>>({
    'TRIP-IN-2026-7782': true
  });

  const highPriorityCases = trips.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Critical' || t.status === 'critical_emergency');

  const handleToggleSar = (tripId: string) => {
    setSarDispatched(prev => ({
      ...prev,
      [tripId]: !prev[tripId]
    }));
  };

  return (
    <div id="police-portal-root" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Siren className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                State Police Search & Rescue Control Room
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                112 EMERGENCY POLICE
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Automated high-altitude GPS coordinates & missing foreign national search & rescue dispatch center.
            </p>
          </div>
        </div>

        {/* Tactical Overview Counters */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
            <span className="block text-xl font-bold text-rose-600">{highPriorityCases.length}</span>
            <span className="text-[10px] text-slate-500">High Priority Incidents</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[110px]">
            <span className="block text-xl font-bold text-emerald-600">
              {Object.values(sarDispatched).filter(Boolean).length}
            </span>
            <span className="text-[10px] text-slate-500">SAR Teams Deployed</span>
          </div>
        </div>
      </div>

      {/* Missing Foreign Tourist Emergency Dispatch Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          Active Foreign Tourist Missing Persons & Casualty Cases
        </h2>

        <div className="space-y-4">
          {highPriorityCases.map(trip => {
            const lastChk = trip.checkpoints[trip.checkpoints.length - 1];
            const isSarActive = sarDispatched[trip.id];

            return (
              <div
                key={trip.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                        POLICE CASE #{trip.id}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900">{trip.travelerName}</h3>
                      <span className="font-mono text-xs text-slate-500">({trip.passportNumber})</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>Jurisdiction: <strong className="text-slate-800">{trip.policeDept.district}</strong></span>
                      <span>•</span>
                      <span>Helpline: <strong className="text-indigo-600">{trip.policeDept.helpline}</strong></span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleToggleSar(trip.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isSarActive
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-rose-600 hover:bg-rose-700 text-white'
                      }`}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{isSarActive ? '✓ SAR TEAM DEPLOYED ON GROUND' : 'DISPATCH POLICE SAR TEAM'}</span>
                    </button>

                    <button
                      onClick={() => onOpenEmergencyModal(trip)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold cursor-pointer"
                    >
                      Print Official Police Incident PDF
                    </button>
                  </div>
                </div>

                {/* Satellite Tactical Coordinates */}
                <div className="grid md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">LAST RECORDED GPS LATITUDE</span>
                    <span className="text-indigo-600 font-bold text-sm">{lastChk?.lat.toFixed(4)}° N</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">LAST RECORDED GPS LONGITUDE</span>
                    <span className="text-indigo-600 font-bold text-sm">{lastChk?.lng.toFixed(4)}° E</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ALTITUDE / TERRAIN</span>
                    <span className="text-slate-900 font-bold text-sm">{lastChk?.altitudeMeters}m MSL</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">BATTERY & HEART RATE</span>
                    <span className={trip.telemetry.battery < 10 ? 'text-rose-600 font-bold text-sm' : 'text-slate-900 text-sm'}>
                      {trip.telemetry.battery}% • {trip.telemetry.heartRate} BPM
                    </span>
                  </div>
                </div>

                {trip.latestRiskReport && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-rose-700 block">AI Incident Briefing:</span>
                    <p className="italic font-sans text-slate-700">"{trip.latestRiskReport.summary}"</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600 font-mono">
                  <span>Assigned Embassy Liaison: <strong className="text-slate-900">{trip.embassyInfo.embassyName}</strong></span>
                  <a
                    href={`https://www.google.com/maps?q=${lastChk?.lat},${lastChk?.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline flex items-center gap-1 font-bold"
                  >
                    Direct Google Maps Grid Link &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
