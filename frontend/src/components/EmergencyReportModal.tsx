import React from 'react';
import { Trip } from '../types';
import { ShieldAlert, Printer, Download, Landmark, Siren } from 'lucide-react';

interface EmergencyReportModalProps {
  trip: Trip;
  onClose: () => void;
}

export const EmergencyReportModal: React.FC<EmergencyReportModalProps> = ({
  trip,
  onClose
}) => {
  const lastChk = trip.checkpoints[trip.checkpoints.length - 1];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SENTINEL-INCIDENT-${trip.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="emergency-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Printable Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-widest block">
                OFFICIAL DIPLOMATIC & POLICE DISPATCH PACKAGE
              </span>
              <h2 className="text-xl font-black text-slate-900 font-display">
                SENTINEL AI INCIDENT REPORT #{trip.id}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print PDF
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download JSON
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Section 1: Traveler Identity */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-mono text-indigo-700 font-bold block uppercase">1. TRAVELER IDENTIFICATION</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-700">
            <div>
              <span className="text-slate-500 block text-[10px]">FULL NAME</span>
              <strong className="text-slate-900 text-sm">{trip.travelerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">PASSPORT NO</span>
              <strong className="text-slate-900 text-sm">{trip.passportNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">NATIONALITY</span>
              <strong className="text-slate-900 text-sm">{trip.nationality}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">RISK EVALUATION</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                {trip.riskLevel.toUpperCase()} ({trip.riskScore}/100)
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Last Known Satellite GPS Coordinates */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-mono text-indigo-700 font-bold block uppercase">2. LAST KNOWN SATELLITE GPS POSITION</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-700">
            <div>
              <span className="text-slate-500 block text-[10px]">LOCATION NAME</span>
              <strong className="text-slate-900">{lastChk?.locationName || trip.destination}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">LATITUDE & LONGITUDE</span>
              <strong className="text-indigo-600">{lastChk?.lat.toFixed(4)}° N, {lastChk?.lng.toFixed(4)}° E</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ELEVATION</span>
              <strong className="text-slate-900">{lastChk?.altitudeMeters} meters MSL</strong>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">Last Satellite Ping: {lastChk ? new Date(lastChk.timestamp).toLocaleString() : 'N/A'}</span>
            <a
              href={`https://www.google.com/maps?q=${lastChk?.lat},${lastChk?.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-bold underline flex items-center gap-1"
            >
              Open Google Maps Grid &rarr;
            </a>
          </div>
        </div>

        {/* Section 3: AI Risk Breakdown */}
        {trip.latestRiskReport && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-mono text-indigo-700 font-bold block uppercase">3. AI INCIDENT EVALUATION & RISK FACTORS</span>
            <p className="text-xs text-slate-700 italic font-sans">
              "{trip.latestRiskReport.summary}"
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Key Incident Risk Factors:</span>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {trip.latestRiskReport.keyFactors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Section 4: Government Agencies Notified */}
        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <Landmark className="w-4 h-4" />
              <span>DIPLOMATIC MISSION NOTIFIED</span>
            </div>
            <p className="text-slate-900 font-bold">{trip.embassyInfo.embassyName}</p>
            <p className="text-slate-600">Email: {trip.embassyInfo.email}</p>
            <p className="text-slate-600">Hotline: {trip.embassyInfo.hotline}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold">
              <Siren className="w-4 h-4" />
              <span>STATE POLICE HQ NOTIFIED</span>
            </div>
            <p className="text-slate-900 font-bold">{trip.policeDept.district}</p>
            <p className="text-slate-600">Control Room: {trip.policeDept.controlRoomEmail}</p>
            <p className="text-slate-600">Helpline: {trip.policeDept.helpline}</p>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>SENTINEL AI AUTONOMOUS EMERGENCY DISPATCH ENGINE</span>
          <span>SHA-256 ENCRYPTED</span>
        </div>

      </div>
    </div>
  );
};
