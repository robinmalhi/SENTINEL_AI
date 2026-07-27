import React, { useState, useEffect } from 'react';
import { Trip } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { Radio, Shield, Battery, Heart, MapPin, AlertTriangle, CheckCircle, RefreshCw, Siren, Key, Cpu, Clock, BatteryCharging, CloudSnow } from 'lucide-react';
import { saveEmergencyAlertToSupabase } from '../lib/supabase';

interface TravelerDashboardProps {
  trip: Trip;
  onAddCheckpoint: (tripId: string, data: any) => Promise<void>;
  onSimulateAction: (tripId: string, action: string) => Promise<void>;
  onRunAiRiskAnalysis: (tripId: string) => Promise<void>;
  onCheckinSafe: (tripId: string, pinCode: string, extendHours?: number) => Promise<void>;
  onTriggerEmergency: (tripId: string) => Promise<void>;
  onOpenEmergencyModal: (trip: Trip) => void;
}

export const TravelerDashboard: React.FC<TravelerDashboardProps> = ({
  trip,
  onAddCheckpoint,
  onSimulateAction,
  onRunAiRiskAnalysis,
  onCheckinSafe,
  onTriggerEmergency,
  onOpenEmergencyModal
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [extendBuffer, setExtendBuffer] = useState(4);
  const [pinError, setPinError] = useState('');
  const [checkinSuccessMsg, setCheckinSuccessMsg] = useState('');

  const [manualLocation, setManualLocation] = useState('');
  const [showAddChk, setShowAddChk] = useState(false);

  const [timeLeftStr, setTimeLeftStr] = useState('');
  const [transmittingSuretySignal, setTransmittingSuretySignal] = useState(false);
  const [suretySignalSent, setSuretySignalSent] = useState(false);

  // 15-Minute Autonomous Satellite Ping Engine State
  const [pingCountdownSec, setPingCountdownSec] = useState(885); // 14m 45s default
  const [isPhoneDead, setIsPhoneDead] = useState(false);
  const [aiEvaluationRunning, setAiEvaluationRunning] = useState(false);
  const [aiEvaluatorLog, setAiEvaluatorLog] = useState<{
    weather: string;
    travelTime: string;
    routeSafetyPct: number;
    dispatched: boolean;
  } | null>(null);

  // Ticker for 15-Minute Satellite Ping Daemon
  useEffect(() => {
    const timer = setInterval(() => {
      setPingCountdownSec(prev => {
        if (prev <= 1) {
          // Auto-trigger 15-min satellite location ping
          const last = trip.checkpoints[trip.checkpoints.length - 1];
          onAddCheckpoint(trip.id, {
            lat: (last?.lat || 30.7346) + (Math.random() * 0.002 - 0.001),
            lng: (last?.lng || 79.0669) + (Math.random() * 0.002 - 0.001),
            altitudeMeters: (last?.altitudeMeters || 3420) + Math.floor(Math.random() * 20 - 10),
            locationName: `${trip.destination} Satellite Waypoint`,
            batteryLevel: isPhoneDead ? 0 : Math.max(5, (last?.batteryLevel || 85) - 1),
            speedKmh: 3.8,
            signalType: 'Satellite L-Band',
            aiNote: '15-Minute Automated Satellite Heartbeat Ping Logged to Database.'
          });
          return 900; // Reset to 15 mins (900 seconds)
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [trip, isPhoneDead, onAddCheckpoint]);

  const handleManual15MinPing = async () => {
    const last = trip.checkpoints[trip.checkpoints.length - 1];
    await onAddCheckpoint(trip.id, {
      lat: (last?.lat || 30.7346) + 0.0012,
      lng: (last?.lng || 79.0669) + 0.0008,
      altitudeMeters: (last?.altitudeMeters || 3420) + 15,
      locationName: `${trip.destination} 15-Min Ping Marker`,
      batteryLevel: isPhoneDead ? 0 : Math.max(5, (last?.batteryLevel || 80) - 2),
      speedKmh: 4.1,
      signalType: 'Satellite L-Band',
      aiNote: 'Manual 15-Minute Satellite Ping Triggered & Saved to Vault.'
    });
    setPingCountdownSec(900);
  };

  const handleSimulateDeadPhone = async () => {
    setIsPhoneDead(true);
    await onSimulateAction(trip.id, 'drop_battery');
  };

  const handleRunAiMissedCheckinEvaluator = async () => {
    setAiEvaluationRunning(true);
    try {
      // 1. Simulate Gemini AI Analysis of Weather + Time of Travel + Route Safety %
      const weather = 'BLIZZARD ADVISORY: Heavy High-Altitude Snowfall & Sub-Zero Drop (-14°C)';
      const travelTime = 'NIGHTTIME TRAVERSAL: 23:45 UTC (Zero Daylight Visibility)';
      const routeSafetyPct = 38; // 38% safe route score

      const lastChk = trip.checkpoints[trip.checkpoints.length - 1];

      // 2. Automatically dispatch distress signal to Embassy & Police HQ
      saveEmergencyAlertToSupabase({
        travelerName: trip.travelerName,
        destination: trip.destination,
        location: lastChk?.locationName || trip.destination,
        lat: lastChk?.lat || 30.3165,
        lng: lastChk?.lng || 78.0322,
        altitude: lastChk?.altitudeMeters || 3580,
        sosAlertByAi: true,
        time: new Date().toISOString(),
        alertType: 'AUTOMATIC AI DISTRESS DISPATCH (Weather + Night + Route Risk)',
        details: `MISSED CHECK-IN DETECTED. AI Evaluation: Weather: ${weather} | Time: ${travelTime} | Route Safety Score: ${routeSafetyPct}%. Autonomous Distress Signal dispatched to Embassy ACS and Police Rescue HQ.`,
        batteryLevel: isPhoneDead ? 0 : trip.telemetry.battery
      });

      await onTriggerEmergency(trip.id);

      setAiEvaluatorLog({
        weather,
        travelTime,
        routeSafetyPct,
        dispatched: true
      });
      setSuretySignalSent(true);
    } finally {
      setAiEvaluationRunning(false);
    }
  };

  const handleTrigger100PercentSuretySignal = async () => {
    setTransmittingSuretySignal(true);
    try {
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1];
      saveEmergencyAlertToSupabase({
        travelerName: trip.travelerName,
        destination: trip.destination,
        location: lastChk?.locationName || trip.destination,
        lat: lastChk?.lat || 30.3165,
        lng: lastChk?.lng || 78.0322,
        altitude: lastChk?.altitudeMeters || 3580,
        sosAlertByAi: false,
        time: new Date().toISOString(),
        alertType: '100% SURETY EMERGENCY DISPATCH (Embassy + Police HQ)',
        details: `100% SURETY DISTRESS SIGNAL DISPATCHED: Direct encrypted satellite payload dispatched to ${trip.embassyInfo?.embassyName || 'Embassy Consular Mission'} and ${trip.policeDept?.district || 'State Police Rescue Command HQ'}. Full GPS, biometrics, and passport vault attached.`,
        batteryLevel: trip.telemetry.battery
      });
      await onTriggerEmergency(trip.id);
      setSuretySignalSent(true);
    } finally {
      setTransmittingSuretySignal(false);
    }
  };

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const returnTime = new Date(trip.expectedReturnDate).getTime();
      const diff = returnTime - now;

      if (diff <= 0) {
        setTimeLeftStr('RETURN TIME EXPIRED - IN GRACE PERIOD');
      } else {
        const hours = Math.floor(diff / (1000 * 3600));
        const mins = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeftStr(`${hours}h ${mins}m ${secs}s Remaining`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [trip.expectedReturnDate]);

  const handleRunAi = async () => {
    setLoadingAi(true);
    try {
      await onRunAiRiskAnalysis(trip.id);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleVerifyCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    try {
      await onCheckinSafe(trip.id, inputPin, extendBuffer);
      setCheckinSuccessMsg('Safety Check-in Verified! Risk level reset to Low.');
      setShowPinModal(false);
      setInputPin('');
      setTimeout(() => setCheckinSuccessMsg(''), 4000);
    } catch (err: any) {
      setPinError('Invalid Safety PIN. Please check your 4-digit code.');
    }
  };

  const handleAddCheckpointSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLocation) return;
    const lastChk = trip.checkpoints[trip.checkpoints.length - 1] || { lat: 30.3165, lng: 78.0322 };
    await onAddCheckpoint(trip.id, {
      locationName: manualLocation,
      lat: lastChk.lat + (Math.random() - 0.5) * 0.01,
      lng: lastChk.lng + (Math.random() - 0.5) * 0.01,
      batteryLevel: trip.telemetry.battery,
      signalType: 'Satellite L-Band',
      deviceStatus: 'Manual Checkpoint Uploaded',
      aiNote: `Manual traveler update: ${manualLocation}`
    });
    setManualLocation('');
    setShowAddChk(false);
  };

  const lastChk = trip.checkpoints[trip.checkpoints.length - 1];

  return (
    <div id="traveler-dashboard-root" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner Status Bar */}
      <div className={`p-6 rounded-3xl border shadow-lg flex flex-wrap items-center justify-between gap-4 ${
        trip.riskLevel === 'Critical' ? 'bg-rose-50 border-rose-300 text-rose-950 animate-pulse' :
        trip.riskLevel === 'High' ? 'bg-orange-50 border-orange-300 text-orange-950' :
        trip.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-300 text-amber-950' :
        'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${
            trip.riskLevel === 'Critical' ? 'bg-rose-600 text-white' :
            trip.riskLevel === 'High' ? 'bg-orange-600 text-white' :
            trip.riskLevel === 'Medium' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-slate-900">{trip.travelerName}</h1>
              <span className="text-xs font-mono text-slate-500">({trip.passportNumber})</span>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              {trip.destination} • <span className="font-mono text-slate-700">{trip.region}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPinModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I'm Safe Check-In</span>
          </button>

          <button
            onClick={handleRunAi}
            disabled={loadingAi}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loadingAi ? 'animate-spin' : ''}`} />
            <span>{loadingAi ? 'Calculating AI Risk...' : 'Run Gemini AI Risk Check'}</span>
          </button>

          <button
            onClick={async () => {
              saveEmergencyAlertToSupabase({
                travelerName: trip.travelerName,
                destination: trip.destination,
                location: lastChk?.locationName || trip.destination,
                lat: lastChk?.lat || 30.3165,
                lng: lastChk?.lng || 78.0322,
                altitude: lastChk?.altitudeMeters || 3580,
                sosAlertByAi: false,
                time: new Date().toISOString(),
                alertType: 'FORCE EMERGENCY DISPATCH (Manual SOS)',
                details: `Manual distress SOS button triggered for ${trip.travelerName} (${trip.passportNumber}) at ${lastChk?.locationName || trip.destination}`,
                batteryLevel: trip.telemetry.battery
              });
              await onTriggerEmergency(trip.id);
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Siren className="w-4 h-4 animate-bounce" />
            <span>Force Emergency Dispatch</span>
          </button>

          {trip.latestRiskReport && (
            <button
              onClick={() => onOpenEmergencyModal(trip)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold cursor-pointer"
            >
              Export Consular PDF Report
            </button>
          )}
        </div>
      </div>

      {checkinSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          {checkinSuccessMsg}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Telemetry & Countdown Cards */}
        <div className="space-y-6">
          
          {/* Countdown & Grace Period Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider">JOURNEY COUNTDOWN</span>
            <div className="text-2xl font-black font-mono text-indigo-600">
              {timeLeftStr}
            </div>
            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100 font-mono">
              <p>Expected Return: {new Date(trip.expectedReturnDate).toLocaleString()}</p>
              <p>Grace Buffer: +{trip.gracePeriodHours} Hours</p>
            </div>
          </div>

          {/* Biometrics & Telemetry Gauge */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider">LIVE TELEMETRY & SENSORS</span>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">BATTERY</span>
                <span className={`text-lg font-bold flex items-center gap-1 ${trip.telemetry.battery < 15 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  <Battery className="w-4 h-4" />
                  {trip.telemetry.battery}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[10px]">PULSE / HEART RATE</span>
                <span className={`text-lg font-bold flex items-center gap-1 ${trip.telemetry.heartRate === 0 ? 'text-rose-600 font-extrabold' : 'text-indigo-600'}`}>
                  <Heart className="w-4 h-4" />
                  {trip.telemetry.heartRate} BPM
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 col-span-2">
                <span className="text-slate-500 block text-[10px]">SATELLITE / NETWORK LINK</span>
                <span className="text-sm font-bold text-cyan-700 flex items-center gap-1.5 mt-0.5">
                  <Radio className="w-4 h-4 text-cyan-600 animate-pulse" />
                  {lastChk?.signalType || 'Satellite L-Band'} ({lastChk?.signalStrength}% Signal)
                </span>
              </div>
            </div>

            {trip.telemetry.fallDetected && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
                SMARTWATCH FALL IMPACT DETECTED
              </div>
            )}
          </div>

          {/* AI Risk Score Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 block uppercase">AI RISK CALCULATOR</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                trip.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                trip.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                trip.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {trip.riskLevel} ({trip.riskScore}/100)
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  trip.riskScore > 80 ? 'bg-rose-600' :
                  trip.riskScore > 50 ? 'bg-orange-600' :
                  trip.riskScore > 20 ? 'bg-amber-600' : 'bg-emerald-600'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, trip.riskScore))}%` }}
              />
            </div>

            {trip.latestRiskReport && (
              <div className="text-xs text-slate-700 space-y-2 pt-2">
                <p className="italic text-slate-600">"{trip.latestRiskReport.summary}"</p>
                <div className="space-y-1">
                  <span className="font-semibold text-slate-900 block text-[11px]">KEY FACTORS:</span>
                  <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                    {trip.latestRiskReport.keyFactors.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Live Demo Controls Box - Executive Command Interface */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-2xs">
                  <Cpu className="w-4 h-4 text-slate-100" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">15-Min Autonomous Guardian Engine</h3>
                  <p className="text-[10px] text-slate-500">Live Satellite Telemetry & Dispatch Control</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ACTIVE
              </span>
            </div>

            {/* Feature 1: 15-Minute Satellite Ping Daemon */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  15-Minute Satellite Ping Interval
                </span>
                <span className="text-slate-700 font-mono text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                  {Math.floor(pingCountdownSec / 60)}m {pingCountdownSec % 60}s
                </span>
              </div>
              <button
                onClick={handleManual15MinPing}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Radio className="w-3.5 h-3.5 text-slate-300" />
                <span>Trigger Instant Satellite Location Ping</span>
              </button>
            </div>

            {/* Feature 2: Dead Phone / Device Off-Grid Simulation */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-slate-500" />
                  Off-Grid Device Status
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isPhoneDead ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
                  {isPhoneDead ? 'Powered Off (0%)' : 'Device Online'}
                </span>
              </div>
              <button
                onClick={handleSimulateDeadPhone}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Battery className="w-3.5 h-3.5 text-slate-500" />
                <span>Simulate Phone Power Depletion (0%)</span>
              </button>

              {isPhoneDead && (
                <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-900 text-[11px] font-mono leading-tight space-y-1">
                  <p className="font-semibold flex items-center gap-1 text-amber-950">
                    <Key className="w-3 h-3 text-amber-700" /> Sentinel Vault Locked Last Location:
                  </p>
                  <p className="text-[10.5px] text-amber-800">
                    {trip.checkpoints[trip.checkpoints.length - 1]?.lat || 30.7352}° N, {trip.checkpoints[trip.checkpoints.length - 1]?.lng || 79.0669}° E ({trip.checkpoints[trip.checkpoints.length - 1]?.locationName || trip.destination})
                  </p>
                </div>
              )}
            </div>

            {/* Feature 3: Missed Check-In AI Multi-Factor Evaluator */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <CloudSnow className="w-3.5 h-3.5 text-slate-500" />
                  Missed Check-In Risk Evaluator
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  WEATHER + ROUTE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Evaluates real-time weather conditions, nighttime visibility, and route hazard percentages on missed check-in.
              </p>
              <button
                onClick={handleRunAiMissedCheckinEvaluator}
                disabled={aiEvaluationRunning}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
              >
                <Cpu className={`w-3.5 h-3.5 text-slate-500 ${aiEvaluationRunning ? 'animate-spin' : ''}`} />
                <span>{aiEvaluationRunning ? 'Evaluating Multi-Factor Risk...' : 'Simulate Missed Check-In (AI Analysis)'}</span>
              </button>

              {aiEvaluatorLog && (
                <div className="p-3 rounded-lg bg-slate-900 text-white text-[11px] font-mono space-y-1.5 shadow-xs">
                  <div className="font-semibold flex items-center justify-between text-xs text-rose-400">
                    <span>AI RISK EVALUATION REPORT</span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded">HIGH HAZARD</span>
                  </div>
                  <div className="space-y-1 text-[10.5px] text-slate-300 leading-snug">
                    <p><strong className="text-white">Weather:</strong> {aiEvaluatorLog.weather}</p>
                    <p><strong className="text-white">Time:</strong> {aiEvaluatorLog.travelTime}</p>
                    <p><strong className="text-white">Route Safety:</strong> {aiEvaluatorLog.routeSafetyPct}% (High Hazard Terrain)</p>
                    <p className="pt-1 text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      Distress Payloads Sent to Embassy & Police HQ
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Featured Direct 100% Surety Dispatch Action Button */}
            <div className="pt-1">
              <button
                onClick={handleTrigger100PercentSuretySignal}
                disabled={transmittingSuretySignal}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-rose-800"
              >
                <Siren className={`w-4 h-4 text-white ${transmittingSuretySignal ? 'animate-spin' : ''}`} />
                <span>{transmittingSuretySignal ? 'Transmitting High-Precision Signal...' : 'Dispatch 100% Surety Signal (Embassy & Police HQ)'}</span>
              </button>
            </div>

            {/* Signal Transmission Confirmation Alert */}
            {suretySignalSent && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    100% Surety Signal Confirmed
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">VERIFIED</span>
                </div>
                <div className="space-y-0.5 text-[11px] text-emerald-800 leading-snug">
                  <p>
                    <strong>Embassy Mission:</strong> Encrypted payload sent to {trip.embassyInfo?.embassyName || 'U.S. Embassy ACS'}.
                  </p>
                  <p>
                    <strong>Police HQ:</strong> Priority SAR dispatch order sent to {trip.policeDept?.district || 'State Police Control Room (112)'}.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <button
                onClick={() => onSimulateAction(trip.id, 'loss_signal')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium text-left cursor-pointer transition-colors"
              >
                Signal Loss
              </button>
              <button
                onClick={() => onSimulateAction(trip.id, 'low_battery')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium text-left cursor-pointer transition-colors"
              >
                Low Battery
              </button>
              <button
                onClick={() => onSimulateAction(trip.id, 'fall_detected')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium text-left cursor-pointer transition-colors"
              >
                Fall Impact
              </button>
              <button
                onClick={() => onSimulateAction(trip.id, 'overdue')}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium text-left cursor-pointer transition-colors"
              >
                Simulate Overdue
              </button>
            </div>

            <button
              onClick={() => {
                setSuretySignalSent(false);
                setIsPhoneDead(false);
                setAiEvaluatorLog(null);
                onSimulateAction(trip.id, 'safe_reset');
              }}
              className="w-full py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Trip State
            </button>
          </div>

        </div>

        {/* Center & Right Column: Interactive Map & Checkpoint Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                Live Satellite GPS Checkpoint Map
              </h2>
              <button
                onClick={() => setShowAddChk(!showAddChk)}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold border border-slate-200 cursor-pointer"
              >
                + Add Manual Location
              </button>
            </div>

            {showAddChk && (
              <form onSubmit={handleAddCheckpointSubmit} className="mb-4 p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-xs">
                <input
                  type="text"
                  required
                  placeholder="e.g. Arrived at High Mountain Shelter"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer">
                  Save Checkpoint
                </button>
              </form>
            )}

            <InteractiveMap
              checkpoints={trip.checkpoints}
              destinationName={trip.destination}
              riskLevel={trip.riskLevel}
              travelerName={trip.travelerName}
              isEmergency={trip.status === 'critical_emergency'}
            />
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-600" />
                15-Minute Cloud Checkpoint History ({trip.checkpoints.length})
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                Encrypted Cloud Sync
              </span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {[...trip.checkpoints].reverse().map((chk) => (
                <div key={chk.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{chk.locationName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700 font-mono">
                        {chk.signalType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 font-mono">
                      Lat: {chk.lat.toFixed(4)}° • Lng: {chk.lng.toFixed(4)}° • Alt: {chk.altitudeMeters}m
                    </p>
                    {chk.aiNote && <p className="text-[11px] text-slate-500 italic mt-0.5">"{chk.aiNote}"</p>}
                  </div>

                  <div className="text-right sm:text-right text-[11px] font-mono text-slate-500 shrink-0">
                    <div>{new Date(chk.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div className={chk.batteryLevel < 15 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                      Battery {chk.batteryLevel}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-600" />
                "I'm Safe" PIN Verification
              </h3>
              <button onClick={() => setShowPinModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-slate-600">
              Enter your 4-digit Safety PIN code to confirm your arrival or extend your journey buffer.
            </p>

            <form onSubmit={handleVerifyCheckin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enter 4-Digit PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono text-2xl text-indigo-600 tracking-widest focus:outline-none focus:bg-white"
                  placeholder="••••"
                />
              </div>

              {pinError && <p className="text-xs text-rose-600 font-semibold">{pinError}</p>}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Extend Journey Buffer (Hours)</label>
                <select
                  value={extendBuffer}
                  onChange={(e) => setExtendBuffer(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                >
                  <option value={0}>Complete Journey (I have returned safely)</option>
                  <option value={2}>+2 Hours Extension</option>
                  <option value={4}>+4 Hours Extension</option>
                  <option value={8}>+8 Hours Extension</option>
                  <option value={24}>+24 Hours Extension</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs cursor-pointer"
              >
                VERIFY SAFETY CHECK-IN
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
