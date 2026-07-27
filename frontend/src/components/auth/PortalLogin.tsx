import React, { useState } from 'react';
import { 
  Compass, 
  Users, 
  Landmark, 
  Siren, 
  Lock, 
  KeyRound, 
  Mail, 
  Smartphone, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PortalRole } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface PortalLoginProps {
  role: PortalRole;
  onBack: () => void;
}

export const PortalLogin: React.FC<PortalLoginProps> = ({ role, onBack }) => {
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const portalConfigs: Record<PortalRole, {
    title: string;
    orgName: string;
    icon: React.ElementType;
    bgGradient: string;
    themeColor: string;
    accentBadge: string;
    demoUser: {
      name: string;
      email: string;
      id: string;
      org: string;
    };
  }> = {
    traveler: {
      title: 'Traveler Safeguard Login',
      orgName: 'Personal AI Travel Protection OS',
      icon: Compass,
      bgGradient: 'bg-[#f4f7fc]',
      themeColor: 'blue',
      accentBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      demoUser: {
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@example.com',
        id: 'US-88392104-A',
        org: 'US Citizen / Kedarnath Trekker'
      }
    },
    family: {
      title: 'Family Guardian Login',
      orgName: 'Loved One Real-Time Satellite Monitoring',
      icon: Users,
      bgGradient: 'bg-[#f4f7fc]',
      themeColor: 'sky',
      accentBadge: 'bg-sky-50 text-sky-700 border-sky-200',
      demoUser: {
        name: 'David Jenkins',
        email: 'd.jenkins@example.com',
        id: 'FAM-GUARD-9041',
        org: 'Jenkins Emergency Safeguard Circle'
      }
    },
    embassy: {
      title: 'Consular Embassy Portal',
      orgName: 'Diplomatic Mission & Overseas Citizens Bureau',
      icon: Landmark,
      bgGradient: 'bg-[#f4f7fc]',
      themeColor: 'indigo',
      accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      demoUser: {
        name: 'Consular Officer Marcus Vance',
        email: 'm.vance@state.gov',
        id: 'DIP-US-NEWDELHI-04',
        org: 'U.S. Embassy New Delhi (ACS Division)'
      }
    },
    police: {
      title: 'Police Rescue Command HQ',
      orgName: 'National Search & Tactical Emergency Operations',
      icon: Siren,
      bgGradient: 'bg-[#f4f7fc]',
      themeColor: 'rose',
      accentBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      demoUser: {
        name: 'Inspector R.S. Negi',
        email: 'controlroom@uttarakhandpolice.gov.in',
        id: 'POL-HP-SDRF-01',
        org: 'State Emergency Command & Alpine SAR'
      }
    }
  };

  const config = portalConfigs[role];
  const IconComponent = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, {
      name: email.split('@')[0] || config.demoUser.name,
      email: email || config.demoUser.email,
      organization: config.demoUser.org
    });
  };

  const handleDemoFill = () => {
    setEmail(config.demoUser.email);
    setPassword('••••••••••••');
    login(role, {
      name: config.demoUser.name,
      email: config.demoUser.email,
      organization: config.demoUser.org
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-300/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-6 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm text-xs font-semibold transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Select Different Portal</span>
        </button>

        {/* Header Branding */}
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 mb-3">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-2 ${config.accentBadge}`}>
              {config.orgName}
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            {config.title}
          </h2>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            Authorized Personnel & Account Holders Only
          </p>
        </div>

        {/* Demo Fast-Login Pill */}
        <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Instant Demo Session</span>
            </div>
            <p className="text-[11px] text-slate-600 truncate">
              Log in as <span className="font-semibold text-slate-900">{config.demoUser.name}</span>
            </p>
          </div>
          <button
            onClick={handleDemoFill}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1"
          >
            <span>Auto Login</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Main Card */}
        <div className="mt-6 bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200">
          {/* Auth Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              onClick={() => setAuthMode('password')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'password' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Password & ID
            </button>
            <button
              onClick={() => setAuthMode('otp')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'otp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OTP Verification
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {authMode === 'password' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    User Email or Official ID
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={config.demoUser.email}
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Security Key / Password
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo Mode: Click "Auto Login" to bypass!'); }} className="text-[11px] font-medium text-blue-600 hover:text-blue-700">
                      Forgot key?
                    </a>
                  </div>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registered Mobile / Satellite Terminal Number
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="+1-555-019-2834"
                      className="block w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      {otpSent ? 'Resend' : 'Send Code'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Enter 6-Digit One-Time Passcode
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="492108"
                      className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg tracking-widest text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate & Enter Portal</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Session guarded by Sentinel JWT & SSL standard</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
