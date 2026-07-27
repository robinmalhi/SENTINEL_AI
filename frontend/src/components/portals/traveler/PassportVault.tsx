import React, { useState } from 'react';
import { 
  Lock, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Eye, 
  EyeOff, 
  Download, 
  Key, 
  QrCode,
  Sparkles
} from 'lucide-react';
import { MOCK_PASSPORTS } from '../../../data/portalMockData';
import { PassportDocument } from '../../../types';

export const PassportVault: React.FC = () => {
  const [passports, setPassports] = useState<PassportDocument[]>(MOCK_PASSPORTS);
  const [showVaultKey, setShowVaultKey] = useState(false);
  const [activePassport, setActivePassport] = useState<PassportDocument>(MOCK_PASSPORTS[0]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-slate-800 p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4" />
            <span>AES-256 Encrypted Vault</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Passport & Travel Vault</h2>
          <p className="text-xs text-slate-300 mt-1">
            Secure digital storage for foreign passports, Indian e-Visas, and Inner Line Permits (ILP).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVaultKey(!showVaultKey)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-2"
          >
            {showVaultKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showVaultKey ? 'Hide Encryption Hash' : 'View Master Key'}</span>
          </button>
        </div>
      </div>

      {showVaultKey && (
        <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-300 flex items-center justify-between">
          <span>MASTER_VAULT_HASH: {activePassport.encryptedVaultHash}</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 text-[10px]">VERIFIED</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Selector Column */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">
            Stored Identity Documents
          </h3>
          {passports.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActivePassport(doc)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                activePassport.id === doc.id
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm">{doc.fullName}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  doc.verifiedStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {doc.verifiedStatus}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{doc.passportNumber}</span>
                <span>{doc.nationality}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Document View */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">{activePassport.fullName}</h4>
                <p className="text-xs text-slate-400 font-mono">{activePassport.passportNumber} • {activePassport.nationality}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
              <span className="text-xs font-bold text-emerald-400">Authenticated</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-medium block mb-1">Visa Category</span>
              <span className="font-bold text-white">{activePassport.visaType}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-medium block mb-1">Visa Expiry</span>
              <span className="font-bold text-white">{activePassport.visaExpiry}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-medium block mb-1">Inner Line Permit (ILP)</span>
              <span className="font-mono font-bold text-indigo-300">{activePassport.innerLinePermitNo || 'N/A'}</span>
            </div>
          </div>

          {/* QR Code Validation Box */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode className="w-12 h-12 text-slate-300 p-1 bg-white rounded-lg" />
              <div>
                <p className="text-xs font-bold text-white">Digital Border Pass Code</p>
                <p className="text-[11px] text-slate-400">Scan at police checkposts in high-altitude restricted border zones.</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors">
              Export Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
