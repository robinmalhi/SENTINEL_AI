import React, { useState } from 'react';
import { Checkpoint, RiskLevel } from '../types';
import { MapPin, Navigation, Radio, Compass, Layers, ExternalLink, Globe2, Map as MapIcon } from 'lucide-react';

interface InteractiveMapProps {
  checkpoints: Checkpoint[];
  destinationName: string;
  riskLevel: RiskLevel;
  travelerName: string;
  isEmergency?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  checkpoints,
  destinationName,
  riskLevel,
  travelerName,
  isEmergency = false
}) => {
  const [selectedChk, setSelectedChk] = useState<Checkpoint | null>(checkpoints[checkpoints.length - 1] || null);
  const [viewMode, setViewMode] = useState<'google_map' | 'tactical'>('google_map');
  const [mapType, setMapType] = useState<'k' | 'm' | 'p'>('k');
  const [zoomLevel] = useState<number>(14);

  const activeChk = selectedChk || checkpoints[checkpoints.length - 1] || {
    id: 'chk-default',
    locationName: destinationName || 'Kedarnath Shrine',
    lat: 30.7346,
    lng: 79.0669,
    timestamp: new Date().toISOString(),
    batteryLevel: 88,
    signalType: 'Satellite L-Band',
    altitudeMeters: 3580,
    deviceStatus: 'Active Signal',
    aiNote: 'Satellite GPS locked.'
  };

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'Low': return { border: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-700 border-emerald-300' };
      case 'Medium': return { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-800 border-amber-300' };
      case 'High': return { border: 'border-orange-500', bg: 'bg-orange-500', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-800 border-orange-300' };
      case 'Critical': return { border: 'border-rose-500', bg: 'bg-rose-500', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-800 border-rose-300' };
    }
  };

  const colors = getRiskColor(riskLevel);

  const minLat = Math.min(...checkpoints.map(c => c.lat), 10);
  const maxLat = Math.max(...checkpoints.map(c => c.lat), 35);
  const minLng = Math.min(...checkpoints.map(c => c.lng), 70);
  const maxLng = Math.max(...checkpoints.map(c => c.lng), 90);

  const getSvgCoords = (lat: number, lng: number) => {
    const latSpan = (maxLat - minLat) || 0.1;
    const lngSpan = (maxLng - minLng) || 0.1;
    const x = 80 + ((lng - minLng) / lngSpan) * 640;
    const y = 320 - ((lat - minLat) / latSpan) * 240;
    return { x: Math.max(60, Math.min(740, x)), y: Math.max(50, Math.min(350, y)) };
  };

  const points = checkpoints.map(c => getSvgCoords(c.lat, c.lng));
  const pathD = points.length > 0 ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') : '';

  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${activeChk.lat},${activeChk.lng}&t=${mapType}&z=${zoomLevel}&output=embed`;

  return (
    <div id="interactive-map-container" className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl">
      
      {/* Top Controls & View Mode Bar */}
      <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-100 uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            LIVE GOOGLE MAPS SATELLITE FEED
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold border ${colors.badge}`}>
            {riskLevel.toUpperCase()} RISK
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('google_map')}
              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'google_map' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Real Google Map</span>
            </button>
            <button
              onClick={() => setViewMode('tactical')}
              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'tactical' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tactical Grid</span>
            </button>
          </div>

          {viewMode === 'google_map' && (
            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setMapType('k')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  mapType === 'k' ? 'bg-slate-700 text-cyan-300 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapType('m')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  mapType === 'm' ? 'bg-slate-700 text-cyan-300 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setMapType('p')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                  mapType === 'p' ? 'bg-slate-700 text-cyan-300 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Terrain
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkpoint Navigation Strip */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center space-x-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono whitespace-nowrap">
          Jump to Location:
        </span>
        {checkpoints.map((chk, idx) => {
          const isSelected = activeChk.id === chk.id;
          return (
            <button
              key={chk.id || idx}
              onClick={() => setSelectedChk(chk)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
              <span>{chk.locationName}</span>
              <span className="text-[9px] opacity-80 font-mono">
                ({chk.lat.toFixed(2)}°, {chk.lng.toFixed(2)}°)
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Display Box */}
      <div className="relative w-full h-[450px] bg-slate-950 overflow-hidden">
        {viewMode === 'google_map' ? (
          <div className="relative w-full h-full">
            <iframe
              title={`Google Map - ${activeChk.locationName}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: mapType === 'k' ? 'brightness(0.95) contrast(1.05)' : 'none' }}
              loading="lazy"
              allowFullScreen
              src={googleMapEmbedUrl}
              className="w-full h-full"
            />

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-indigo-500/40 border border-indigo-400" />
                <div className="w-5 h-5 rounded-full bg-indigo-600/90 border-2 border-white shadow-xl flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-slate-900">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 Q200,50 400,120 T800,80" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M0,200 Q250,150 500,220 T800,180" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M0,300 Q300,280 600,320 T800,290" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            <svg className="absolute inset-0 w-full h-full pointer-events-auto" viewBox="0 0 800 400">
              {pathD && (
                <>
                  <path d={pathD} fill="none" stroke={riskLevel === 'Critical' ? '#f43f5e' : '#38bdf8'} strokeWidth="6" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={pathD} fill="none" stroke={riskLevel === 'Critical' ? '#f43f5e' : '#38bdf8'} strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}

              {checkpoints.map((chk, idx) => {
                const coord = points[idx];
                const isLast = idx === checkpoints.length - 1;
                const isSelected = activeChk.id === chk.id;

                return (
                  <g key={chk.id || idx} className="cursor-pointer" onClick={() => setSelectedChk(chk)}>
                    {isLast && (
                      <circle cx={coord.x} cy={coord.y} r="22" fill="none" stroke={isEmergency ? '#f43f5e' : '#38bdf8'} strokeWidth="2" opacity="0.6">
                        <animate attributeName="r" values="8;30" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isLast ? '9' : '6'}
                      fill={isLast ? (isEmergency ? '#f43f5e' : '#10b981') : (isSelected ? '#6366f1' : '#3b82f6')}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    <text
                      x={coord.x}
                      y={coord.y - 14}
                      fill="#f8fafc"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      className="drop-shadow-md select-none pointer-events-none"
                    >
                      {chk.locationName.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        <div className="absolute top-4 right-4 z-10 flex items-center justify-center p-2.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-cyan-300 shadow-lg">
          <Compass className="w-5 h-5 animate-spin-slow" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-20 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-2xl text-slate-800">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 font-display tracking-tight">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200/80 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="truncate">{activeChk.locationName}</span>
            </span>
            <span className="text-[10px] text-indigo-700 font-mono bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/80 font-bold shrink-0">
              {new Date(activeChk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-50/90 p-2 rounded-xl border border-slate-200/70">
              <span className="text-[9px] text-slate-500 font-sans font-bold block uppercase tracking-wider mb-0.5">COORDINATES</span>
              <span className="text-slate-900 font-extrabold text-[11px]">{activeChk.lat.toFixed(4)}°N, {activeChk.lng.toFixed(4)}°E</span>
            </div>
            <div className="bg-slate-50/90 p-2 rounded-xl border border-slate-200/70">
              <span className="text-[9px] text-slate-500 font-sans font-bold block uppercase tracking-wider mb-0.5">ELEVATION</span>
              <span className="text-indigo-700 font-extrabold text-[11px]">{activeChk.altitudeMeters}m MSL</span>
            </div>
            <div className="bg-slate-50/90 p-2 rounded-xl border border-slate-200/70">
              <span className="text-[9px] text-slate-500 font-sans font-bold block uppercase tracking-wider mb-0.5">SATELLITE SYNC</span>
              <span className="text-slate-800 flex items-center gap-1 font-extrabold text-[11px]">
                <Radio className="w-3 h-3 text-indigo-600" />
                {activeChk.signalType}
              </span>
            </div>
            <div className="bg-slate-50/90 p-2 rounded-xl border border-slate-200/70">
              <span className="text-[9px] text-slate-500 font-sans font-bold block uppercase tracking-wider mb-0.5">BATTERY</span>
              <span className={activeChk.batteryLevel < 15 ? 'text-rose-600 font-extrabold text-[11px]' : 'text-emerald-700 font-extrabold text-[11px]'}>
                {activeChk.batteryLevel}%
              </span>
            </div>
          </div>

          {activeChk.aiNote && (
            <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-start space-x-1.5 text-[11px] text-slate-600 italic">
              <span className="font-sans text-slate-500 font-normal leading-snug">"{activeChk.aiNote}"</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1 text-slate-800 font-semibold">
            <Navigation className="w-4 h-4 text-indigo-600" />
            Destination: <strong className="text-slate-900">{destinationName}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>Traveler: <strong className="text-slate-900">{travelerName}</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${activeChk.lat},${activeChk.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps App</span>
          </a>
        </div>
      </div>

    </div>
  );
};
