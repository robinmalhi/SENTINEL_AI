import React, { useState } from 'react';
import { Trip } from '../types';
import { Landmark, ShieldAlert, FileText, Search, ExternalLink } from 'lucide-react';

interface EmbassyPortalProps {
  trips: Trip[];
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const EmbassyPortal: React.FC<EmbassyPortalProps> = ({
  trips,
  onOpenEmergencyModal
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const distressAlerts = trips.filter(t => t.riskLevel === 'High' || t.riskLevel === 'Critical' || t.status === 'critical_emergency');

  const filteredTrips = trips.filter(t => {
    const matchCountry = selectedCountry === 'All' || t.nationality.toLowerCase().includes(selectedCountry.toLowerCase());
    const matchQuery = t.travelerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.passportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       t.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchQuery;
  });

  return (
    <div id="embassy-portal-root" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Embassy Portal Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Diplomatic Consular Protection Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                EMBASSY LIAISON
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Automated distress feeds and passport cross-referencing for foreign diplomatic missions in New Delhi.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
            <span className="block text-xl font-bold text-slate-900">{trips.length}</span>
            <span className="text-[10px] text-slate-500">Citizens Tracked</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[100px]">
            <span className="block text-xl font-bold text-rose-600">{distressAlerts.length}</span>
            <span className="text-[10px] text-slate-500">Distress Alerts</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          <span className="text-slate-500 whitespace-nowrap">Filter Embassy:</span>
          {['All', 'United States', 'Italy', 'Japan', 'United Kingdom', 'Germany'].map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap border transition-all cursor-pointer ${
                selectedCountry === country
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Name or Passport..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Active Consular Distress Incident Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          High-Priority Consular Emergency Incidents
        </h2>

        {filteredTrips.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm bg-white rounded-3xl border border-slate-200 shadow-xs">
            No active distress alerts recorded for selected filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map(trip => {
              const lastChk = trip.checkpoints[trip.checkpoints.length - 1];

              return (
                <div
                  key={trip.id}
                  className={`p-6 rounded-3xl border transition-all space-y-4 shadow-xs ${
                    trip.riskLevel === 'Critical'
                      ? 'bg-rose-50/60 border-rose-300'
                      : trip.riskLevel === 'High'
                      ? 'bg-orange-50/60 border-orange-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-xs">
                        {trip.nationality.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-bold text-slate-900">{trip.travelerName}</h3>
                          <span className="font-mono text-xs text-slate-500">({trip.passportNumber})</span>
                        </div>
                        <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                          {trip.embassyInfo.embassyName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                        trip.riskLevel === 'Critical' ? 'bg-rose-600 text-white animate-pulse' :
                        trip.riskLevel === 'High' ? 'bg-orange-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {trip.riskLevel} Risk
                      </span>

                      <button
                        onClick={() => onOpenEmergencyModal(trip)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Export Consular Package</span>
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 block">DESTINATION & REGION</span>
                      <p className="font-bold text-slate-900">{trip.destination}</p>
                      <p className="text-slate-600">{trip.region}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 block">LAST RECORDED SATELLITE PING</span>
                      <p className="font-bold text-indigo-600">{lastChk?.locationName || 'Unknown'}</p>
                      <p className="text-slate-600">{lastChk?.lat.toFixed(4)}°N, {lastChk?.lng.toFixed(4)}°E ({lastChk?.altitudeMeters}m)</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 block">TELEMETRY & SENSORS</span>
                      <p className={trip.telemetry.battery < 15 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                        Battery: {trip.telemetry.battery}%
                      </p>
                      <p className="text-slate-600">Heart Rate: {trip.telemetry.heartRate} BPM</p>
                    </div>
                  </div>

                  {trip.latestRiskReport && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-amber-800 block mb-1">AI Executive Risk Assessment:</span>
                      <p className="italic font-sans">"{trip.latestRiskReport.summary}"</p>
                      <p className="text-[11px] text-indigo-700 mt-2 font-semibold">
                        Suggested Consular Protocol: {trip.latestRiskReport.aiRecommendation}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200 gap-2">
                    <span className="flex items-center gap-1 font-mono">
                      Assigned Police Control Room: <strong className="text-slate-900">{trip.policeDept.district}</strong> ({trip.policeDept.helpline})
                    </span>

                    <a
                      href={`https://www.google.com/maps?q=${lastChk?.lat},${lastChk?.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 underline"
                    >
                      <span>Open Satellite Coordinates in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
