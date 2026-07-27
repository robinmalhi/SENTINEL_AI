import React from 'react';
import { 
  Shield, 
  Radio, 
  MapPin, 
  Users, 
  Landmark, 
  Siren, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  CloudLightning, 
  Activity, 
  Globe2, 
  Zap, 
  Compass,
  PhoneCall,
  Mail,
  Building2,
  ChevronRight,
  Clock,
  BatteryCharging,
  CloudSnow,
  ShieldAlert,
  Cpu
} from 'lucide-react';
import mountainHeroImg from '../../assets/images/himalaya_trekker_1785166466949.jpg';
import { Trip } from '../../types';

interface LandingPageProps {
  activeTab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact';
  setActiveTab: (tab: 'home' | 'features' | 'technology' | 'about' | 'pricing' | 'contact') => void;
  onOpenPortalSelection: () => void;
  sampleTrips: Trip[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  activeTab,
  setActiveTab,
  onOpenPortalSelection,
  sampleTrips
}) => {
  return (
    <div id="landing-page-root" className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* ================= HERO / HOME SECTION ================= */}
      {activeTab === 'home' && (
        <>
          <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Lighting background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-sky-300/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                  <span>Autonomous Tourist Emergency Protection</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                  Travel Smarter. <br />
                  Stay Safer. <br />
                  <span className="text-blue-600">Powered by AI.</span>
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  Sentinel AI combines satellite telemetry, Gemini 3.6 predictive risk analysis, and direct government dispatch channels to ensure no traveler ever vanishes off the map.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={onOpenPortalSelection}
                    className="px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 text-base"
                  >
                    <Lock className="w-5 h-5 text-white" />
                    <span>Access Emergency Portals</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('features')}
                    className="px-6 py-4 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 hover:text-slate-900 shadow-sm transition-all duration-200 text-base"
                  >
                    Explore Features
                  </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">100%</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Satellite Fallback</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">&lt; 3 Sec</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">AI Risk Evaluation</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                    <p className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">4</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Isolated Portals</p>
                  </div>
                </div>
              </div>

              {/* Right Column Hero Banner Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden h-[380px] sm:h-[440px] shadow-xl border border-slate-200/80 bg-white">
                  <img 
                    src={mountainHeroImg} 
                    alt="Real Traveler Trekking in Snow-Covered Himalayan Mountain Range" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                  {/* Floating Widget 1: AI Status Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-lg flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-900">AI SATELLITE ACTIVE</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">98%</span>
                  </div>

                  {/* Floating Widget 2: Live Telemetry Pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Live L-Band Satellite Tracking</p>
                        <p className="text-[11px] text-slate-500 font-mono">30.7352° N, 79.0669° E • Kedarnath High Altitude</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Portal Switcher Banner */}
          <section className="py-12 bg-white/80 border-y border-slate-200/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                Four Dedicated Operating Environments
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={onOpenPortalSelection} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left group shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Traveler Portal</span>
                  </div>
                  <p className="text-xs text-slate-500">Personal protection & AI advisor</p>
                </button>

                <button onClick={onOpenPortalSelection} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all text-left group shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Family Portal</span>
                  </div>
                  <p className="text-xs text-slate-500">Real-time loved-one monitoring</p>
                </button>

                <button onClick={onOpenPortalSelection} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-left group shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:scale-110 transition-transform">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Embassy Portal</span>
                  </div>
                  <p className="text-xs text-slate-500">Government consular cases</p>
                </button>

                <button onClick={onOpenPortalSelection} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all text-left group shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 group-hover:scale-110 transition-transform">
                      <Siren className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Police Rescue HQ</span>
                  </div>
                  <p className="text-xs text-slate-500">Tactical search & rescue dispatch</p>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ================= FEATURES SECTION ================= */}
      {(activeTab === 'home' || activeTab === 'features') && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Core Ecosystem Pillars
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Comprehensive Safety Engine for High-Risk Destinations
            </p>
            <p className="text-slate-600 text-sm mt-3 font-medium">
              Built to operate autonomously even when cell towers fail, internet connections drop, or physical injuries occur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Offline Satellite Heartbeat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When 5G/4G coverage drops in remote mountain ranges, Sentinel switches to L-Band satellite pings to transmit dead-reckoning coordinates directly to cloud servers.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-6">
                <CloudLightning className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gemini 3.6 Risk Analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluates elevation, battery degradation curves, weather advisories, and prolonged immobility to calculate real-time threat scores before emergencies escalate.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-6">
                <Siren className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Direct Diplomatic & Police Dispatch</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically compiles formatted diplomatic briefs and police incident reports, triggering emergency webhooks directly to Embassy ACS offices and State SDRF units.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================= 15-MINUTE AI AUTONOMOUS GUARDIAN MVP SECTION ================= */}
      {(activeTab === 'home' || activeTab === 'features') && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl max-w-7xl mx-auto my-12 shadow-2xl relative overflow-hidden border border-indigo-500/30">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase tracking-widest">
                <Cpu className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>CORE MVP SYSTEM ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                15-Minute Autonomous AI Location Ping &amp; Emergency Dispatch Engine
              </h2>
              <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-2xl mx-auto">
                How Sentinel AI guarantees 100% location retention and autonomous diplomatic emergency dispatch even if the traveler's phone dies or shuts down in off-grid terrain.
              </p>
            </div>

            {/* 4-Step Interactive Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1: 15-Min Satellite Ping */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 space-y-4 relative flex flex-col justify-between hover:border-blue-500/50 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30 font-bold">INTERVAL: 15 MIN</span>
                  </div>
                  <h3 className="text-base font-bold text-white">15-Min Live GPS Ping</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every 15 minutes, Sentinel automatically transmits satellite dead-reckoning coordinates, altitude, battery level, and velocity directly into the secure cloud database.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 font-mono text-[11px] text-blue-300 flex items-center justify-between">
                  <span>GPS Vault Sync</span>
                  <span className="font-bold text-emerald-400">ACTIVE ✓</span>
                </div>
              </div>

              {/* Step 2: Dead Phone Vault */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 space-y-4 relative flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold">
                      <BatteryCharging className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30 font-bold">BATTERY: 0%</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Dead Phone Location Vault</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If the traveler's phone dies, turns off, or loses power completely, Sentinel AI locks and preserves the absolute last recorded live GPS location in the persistent vault.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 font-mono text-[11px] text-amber-300 flex items-center justify-between">
                  <span>Last Location Saved</span>
                  <span className="font-bold text-amber-400">LOCKED 🔒</span>
                </div>
              </div>

              {/* Step 3: AI Multi-Factor Evaluator */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 space-y-4 relative flex flex-col justify-between hover:border-indigo-500/50 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-bold">
                      <CloudSnow className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-400/30 font-bold">GEMINI 3.6</span>
                  </div>
                  <h3 className="text-base font-bold text-white">AI Multi-Factor Risk Analysis</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    On missed "I'm Safe" check-in, Gemini AI evaluates Weather conditions, Time of traveling (night/darkness), Route Safety %, and Immobility curves.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 font-mono text-[11px] text-indigo-300 flex items-center justify-between">
                  <span>Weather + Route %</span>
                  <span className="font-bold text-rose-400">ANALYZED 🧠</span>
                </div>
              </div>

              {/* Step 4: Autonomous Distress Dispatch */}
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 space-y-4 relative flex flex-col justify-between hover:border-rose-500/50 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-400 flex items-center justify-center font-bold">
                      <Siren className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-400/30 font-bold">DISPATCH: 100%</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Autonomous Distress Dispatch</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automatically fires full diplomatic distress payloads to Embassy Consular offices and dispatches SDRF helicopter rescue vectors to Police HQ.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 font-mono text-[11px] text-rose-300 flex items-center justify-between">
                  <span>Embassy &amp; Police HQ</span>
                  <span className="font-bold text-rose-400">DISPATCHED 🚨</span>
                </div>
              </div>

            </div>

            {/* Live Interactive Portal Launch Callout */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Test the Live 15-Minute Autonomous Guardian Engine</h4>
                  <p className="text-xs text-slate-300">
                    Open the Traveler Dashboard or Police Command HQ to experience real-time satellite pings, dead phone last-location vaulting, and AI distress dispatches.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenPortalSelection}
                className="px-6 py-3 rounded-xl font-extrabold text-xs text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= TECHNOLOGY SECTION ================= */}
      {(activeTab === 'home' || activeTab === 'technology') && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Enterprise Security & Mesh Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-6">
                  Engineered for Zero Data Loss and Instant Rescue Coordination
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <Activity className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Smartwatch Telemetry Sync</h4>
                      <p className="text-xs text-slate-500 mt-1">Continuous heart rate, SpO2, and fall-impact detection via Bluetooth Low Energy (BLE).</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <Globe2 className="w-6 h-6 text-sky-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Supabase & Cloud Relays</h4>
                      <p className="text-xs text-slate-500 mt-1">Persistent database synchronization with encrypted offline queue fallback for zero data loss.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <Lock className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Encrypted Passport Vault</h4>
                      <p className="text-xs text-slate-500 mt-1">AES-256 local and cloud storage for passport credentials, inner line permits, and emergency contacts.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Diagram Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-900">SYSTEM_PIPELINE_STATUS: ONLINE</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">LATENCY: 18ms</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    [1] SMARTWATCH_SENSOR &rarr; Fall Impact + Low Heart Rate Registered
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800">
                    [2] SATELLITE_PING &rarr; L-Band Transceiver Dispatch (Lat: 30.7352, Lng: 79.0669)
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-900">
                    [3] GEMINI_3.6_FLASH &rarr; Evaluating Risk Score (96/100) &amp; Generating Incident Brief
                  </div>
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                    [4] PORTAL_DISPATCH &rarr; Emergency Push Sent to Embassy Portal &amp; Police Rescue HQ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= ABOUT SECTION ================= */}
      {activeTab === 'about' && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">About Sentinel AI</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Protecting Global Explorers</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 text-slate-700 text-sm leading-relaxed shadow-sm">
            <p>
              Sentinel AI was founded to address a critical vulnerability in global tourism: foreign travelers trekking through extreme topography without local cellular coverage or emergency response integration.
            </p>
            <p>
              By combining satellite dead-reckoning technology, AI-driven risk modeling, and standardized consular workflows, Sentinel AI bridges the gap between individual travelers, their concerned families, foreign embassies, and local state search-and-rescue teams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">State Rescue Integration</h4>
                <p className="text-xs text-slate-600">Direct integration with Uttarakhand SDRF, Himachal Police, and Kerala Forest Rescue Units.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Consular Compliance</h4>
                <p className="text-xs text-slate-600">Formatted according to U.S. State Dept ACS and EU Diplomatic emergency dispatch standards.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= PRICING SECTION ================= */}
      {activeTab === 'pricing' && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Transparent Tiering</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Plans Built for Individuals & Agencies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Free Traveler</h3>
                <p className="text-xs text-slate-500 mt-1">Basic journey protection for casual tourists.</p>
                <p className="text-3xl font-black text-slate-900 mt-6">$0 <span className="text-xs font-normal text-slate-500">/ trip</span></p>
                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cellular Checkpoints</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Passport Vault</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Emergency SOS Button</li>
                </ul>
              </div>
              <button onClick={onOpenPortalSelection} className="mt-8 py-3 w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors">
                Enter Traveler Portal
              </button>
            </div>

            <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-full shadow-sm">
                Most Popular
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pro Safeguard & Family</h3>
                <p className="text-xs text-slate-500 mt-1">Satellite tracking + Family monitoring portal.</p>
                <p className="text-3xl font-black text-blue-600 mt-6">$12 <span className="text-xs font-normal text-slate-500">/ month</span></p>
                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> L-Band Satellite Failover</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dedicated Family Portal Access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Gemini AI Risk Intelligence</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Smartwatch Telemetry Sync</li>
                </ul>
              </div>
              <button onClick={onOpenPortalSelection} className="mt-8 py-3 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md shadow-blue-500/20">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Embassy & Rescue HQ</h3>
                <p className="text-xs text-slate-500 mt-1">Government and SAR command deployments.</p>
                <p className="text-3xl font-black text-slate-900 mt-6">Enterprise</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Unlimited Consular Citizen Registry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Direct Police Dispatch Webhooks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Custom Emergency API Hooks</li>
                </ul>
              </div>
              <button onClick={onOpenPortalSelection} className="mt-8 py-3 w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors">
                Access Government Portals
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= CONTACT SECTION ================= */}
      {activeTab === 'contact' && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-2">Contact Sentinel System Command</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Emergency Helplines</h3>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>India National Emergency: <strong className="text-slate-900">112</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>US Embassy New Delhi ACS: <strong className="text-slate-900">+91-11-2419-8000</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Sentinel Operations: <strong className="text-slate-900">ops@sentinel-ai.emergency</strong></span>
              </div>
            </div>

            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Message sent to Sentinel Command HQ.'); }}>
              <input type="text" placeholder="Your Name or Organization" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="email" placeholder="Official Email Address" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <textarea placeholder="Describe your inquiry or integration request..." rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20">
                Send Operational Inquiry
              </button>
            </form>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-8 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
        <p>&copy; 2026 Sentinel AI Emergency Protection Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
