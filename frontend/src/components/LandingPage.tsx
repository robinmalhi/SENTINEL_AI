import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, AlertCircle, Sparkles, MapPin, 
  CheckCircle, ArrowRight, Heart, 
  FileText, Play, Compass, ChevronDown, 
  Radio, Landmark, Siren, CloudLightning
} from 'lucide-react';
import { Trip } from '../types';
import mountainHeroImg from '../assets/images/himalaya_trekker_1785166466949.jpg';

interface LandingPageProps {
  onStartJourney: () => void;
  onOpenDashboard: (tripId: string) => void;
  sampleTrips: Trip[];
  setCurrentView: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartJourney,
  onOpenDashboard,
  sampleTrips,
  setCurrentView
}) => {
  const [simState, setSimState] = useState<'normal' | 'signal_lost' | 'overdue' | 'fall_detected'>('normal');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Sentinel AI work in remote Himalayan regions without 5G/4G network?",
      a: "Sentinel AI utilizes an L-band satellite queue mechanism. When cellular data drops, location checkpoints are cached locally and transmitted in lightweight 128-byte encrypted bursts via satellite relays every 15 minutes."
    },
    {
      q: "Do I need to press a button if I get injured or drop my phone?",
      a: "No! Unlike legacy SOS panic buttons, Sentinel AI operates autonomously. If your movement drops unexpectedly, return grace periods expire, or smartwatch telemetry detects zero heartbeat after impact, the system automatically triggers alerts."
    },
    {
      q: "How are diplomatic embassies and state police notified?",
      a: "Sentinel AI generates standard diplomatic distress payloads containing passport info, encrypted satellite coordinates, and battery logs, instantly delivering them to home country embassies in New Delhi and local 112 Police Control Rooms."
    },
    {
      q: "Is my location tracking data kept private?",
      a: "Yes. All location checkpoints are encrypted using AES-256. Data is strictly accessible only by your designated family members and authorized emergency response liaisons during active distress events."
    }
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-slate-50/60 text-slate-900 selection:bg-indigo-500 selection:text-white overflow-hidden">

      {/* HERO SECTION WITH MOUNTAIN VISUAL & FLOATING WIDGETS */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-blue-400/10 via-indigo-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span>FORWARD-LOOKING AI RISK SYSTEM</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 font-display tracking-tight leading-[1.08]">
                Travel Smarter. <br />
                Stay Safer. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">
                  Powered by AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Autonomous safety monitoring & 15-minute satellite checkpoint uploads across India's high-altitude and remote regions. No manual SOS button required.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onStartJourney}
                  className="px-7 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 hover:bg-indigo-700 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2.5 group cursor-pointer"
                >
                  <Shield className="w-5 h-5 text-indigo-200" />
                  <span>Start Protected Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 hover:text-indigo-600 transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Explore Live Radar</span>
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center space-x-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>24/7 Diplomatic Liaison</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Offline L-Band Satellite Queue</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl shadow-2xl border border-slate-200/80 bg-white p-2">
                
                <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[390px] z-10">
                  <img 
                    src={mountainHeroImg} 
                    alt="Real Traveler Trekking in Snow-Covered Himalayan Mountain Range" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />

                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[10px] font-mono flex items-center gap-1.5 shadow-md z-10 whitespace-nowrap">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>Kedarnath Trail • 3,580m MSL</span>
                  </div>
                </div>

                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute -top-3 -left-2 sm:-top-4 sm:-left-3 z-20 bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200/90 shadow-xl max-w-[145px] hidden sm:block"
                >
                  <div className="flex items-center space-x-1 text-[8px] font-bold text-slate-500 font-mono uppercase mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>SATELLITE ACTIVE</span>
                  </div>
                  <div className="text-[10px] font-extrabold text-slate-900 font-mono">
                    99.8% Signal
                  </div>
                  <div className="text-[9px] text-indigo-600 font-mono mt-0.5">
                    31.1048°N, 77.1734°E
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200/90 shadow-xl text-center"
                >
                  <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">SAFETY</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border-2 border-emerald-500 flex flex-col items-center justify-center mx-auto my-0.5 shadow-xs">
                    <span className="text-[10px] font-black text-emerald-700 font-mono leading-none">98</span>
                  </div>
                  <span className="text-[8px] text-slate-600 font-mono block">Batt: 88%</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="absolute -bottom-3 right-3 sm:-bottom-4 sm:right-3 z-20 bg-slate-900/95 backdrop-blur-lg p-2.5 rounded-xl border border-slate-700/80 text-white shadow-2xl max-w-[240px]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-white">Sarah J. (Kedarnath)</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      OPTIMAL
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[9px] font-mono pt-1 border-t border-slate-800 text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[7.5px]">PULSE</span>
                      <span className="font-bold text-indigo-300">74 BPM</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[7.5px]">SYNC</span>
                      <span className="font-bold text-cyan-300">2m ago</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[7.5px]">ELEV</span>
                      <span className="font-bold text-emerald-300">3,580m</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRUST STRIP & KEY STATS */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-6">
            AUTONOMOUS PROTECTION ARCHITECTURE FOR HIGH-ALTITUDE & REMOTE TRAVEL
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="block text-2xl sm:text-3xl font-black text-indigo-600 font-mono">15 Min</span>
              <span className="text-xs text-slate-600 font-medium">Satellite Checkpoint Sync</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="block text-2xl sm:text-3xl font-black text-cyan-600 font-mono">0 SOS</span>
              <span className="text-xs text-slate-600 font-medium">Manual Action Needed</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 font-mono">100%</span>
              <span className="text-xs text-slate-600 font-medium">Embassy Direct Liaison</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="block text-2xl sm:text-3xl font-black text-rose-600 font-mono">112 HQ</span>
              <span className="text-xs text-slate-600 font-medium">State Police SAR Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM VS SENTINEL AI SOLUTION */}
      <section className="py-16 bg-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-rose-600 font-extrabold mb-2">
              WHY TRADITIONAL SAFETY APPS FAIL
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              When You Drop Off The Grid, Panic Buttons Stop Working
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-white border border-rose-200 shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Standard SOS Apps & Panic Buttons</h3>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-600 font-black">✕</span>
                  <span><strong>Requires Active User Action:</strong> Unusable if traveler is incapacitated, injured, or drops their phone down a cliff.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-600 font-black">✕</span>
                  <span><strong>No Location Trail History:</strong> Authorities have zero GPS logs showing where the trekker was heading.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-rose-600 font-black">✕</span>
                  <span><strong>Delayed International Response:</strong> Overseas families take days to realize a relative is missing.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-indigo-900 text-white border border-indigo-800 shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-800 border border-indigo-700 flex items-center justify-center text-cyan-300">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Sentinel AI Autonomous Protection</h3>
              <ul className="space-y-3.5 text-sm text-indigo-100">
                <li className="flex items-start space-x-2.5">
                  <span className="text-cyan-400 font-black">✓</span>
                  <span><strong>Passive 15-Minute Satellite Sync:</strong> Uploads location, battery, and altitude without touching your phone.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-cyan-400 font-black">✓</span>
                  <span><strong>Smart Risk AI Engine:</strong> Automatically detects overdue return deadlines, signal dark zones, and smartwatch fall impacts.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-cyan-400 font-black">✓</span>
                  <span><strong>Direct Embassy & Police Payloads:</strong> Transmits official distress documentation directly to consular liaisons and police control rooms.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-indigo-600 font-extrabold block mb-2">
            CORE SYSTEM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            End-to-End Diplomatic & Rescue Infrastructure
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Radio,
              title: "15-Min Satellite Checkpoints",
              desc: "Automated GPS latitude, longitude, elevation, and battery logs queued locally and uploaded in lightweight bursts.",
              color: "text-indigo-600 bg-indigo-50 border-indigo-200"
            },
            {
              icon: Sparkles,
              title: "Gemini AI Risk Engine",
              desc: "Evaluates grace periods, elevation hazards, battery drainage rates, and smartwatch biometrics to calculate risk.",
              color: "text-blue-600 bg-blue-50 border-blue-200"
            },
            {
              icon: Landmark,
              title: "Embassy Consular Portal",
              desc: "Generates structured passport & diplomatic distress packages for foreign embassies in New Delhi.",
              color: "text-cyan-600 bg-cyan-50 border-cyan-200"
            },
            {
              icon: Siren,
              title: "112 State Police Rescue",
              desc: "Direct integration with police control rooms in mountain states (Uttarakhand, Himachal, J&K) for immediate dispatch.",
              color: "text-rose-600 bg-rose-50 border-rose-200"
            },
            {
              icon: Heart,
              title: "Smartwatch Biometrics",
              desc: "Monitors heart rate drops, pulse fluctuations, and sudden fall deceleration from Apple Watch & WearOS.",
              color: "text-pink-600 bg-pink-50 border-pink-200"
            },
            {
              icon: CloudLightning,
              title: "Offline Satellite Queue",
              desc: "Ensures no checkpoint is lost when traveling through cellular dead zones in high Himalayan mountain passes.",
              color: "text-amber-600 bg-amber-50 border-amber-200"
            },
            {
              icon: FileText,
              title: "PDF Consular Incident Export",
              desc: "Instant creation of official incident reports complete with Google Maps grid coordinates and battery timeline.",
              color: "text-emerald-600 bg-emerald-50 border-emerald-200"
            },
            {
              icon: Compass,
              title: "Family Monitoring Portal",
              desc: "Allows family members overseas to monitor satellite coordinates, altitude, and device health in real time.",
              color: "text-violet-600 bg-violet-50 border-violet-200"
            }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-lg transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SAMPLE ACTIVE TRIPS CAROUSEL */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-bold text-slate-500 block">ACTIVE RADAR MONITORING</span>
            <h2 className="text-2xl font-bold text-slate-900">Monitored Expeditions Across India</h2>
          </div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            View Full Radar ({sampleTrips.length}) &rarr;
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleTrips.map((trip) => (
            <motion.div
              key={trip.id}
              whileHover={{ y: -4 }}
              onClick={() => onOpenDashboard(trip.id)}
              className="bg-white border border-slate-200 hover:border-indigo-400 p-6 rounded-3xl cursor-pointer transition-all shadow-xs group"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  trip.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                  trip.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                  trip.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-rose-100 text-rose-800 animate-pulse'
                }`}>
                  {trip.riskLevel} RISK ({trip.riskScore}/100)
                </span>
                <span className="text-[10px] font-mono text-slate-400">{trip.id}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                {trip.travelerName}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {trip.destination} ({trip.nationality})
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Battery: {trip.telemetry.battery}%</span>
                <span>Checkpoints: {trip.checkpoints.length}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-16 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-extrabold text-indigo-600 block mb-2">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Got Questions About Sentinel AI?</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cyan-200 border border-white/20">
              FREE ACTIVATION FOR INTERNATIONAL TOURISTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
              Activate Your Protected Journey Before Your Trek
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Takes less than 60 seconds. Set your return deadline, emergency contacts, and embassy liaison for 100% peace of mind across India.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onStartJourney}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-extrabold text-sm hover:bg-slate-100 transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-5 h-5 text-indigo-700" />
              <span>Get Protected Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-black text-slate-900 font-display">SENTINEL AI</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Autonomous Emergency Protection System for International Tourists in India. Protecting lives across high-altitude mountain passes and remote regions.
          </p>
          <div className="pt-4 text-[11px] text-slate-400 font-mono">
            © 2026 Sentinel AI Inc. Designed for Global Tourist Safety & Diplomatic Protection.
          </div>
        </div>
      </footer>

    </div>
  );
};
