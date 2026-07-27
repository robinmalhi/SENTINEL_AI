import React, { useState } from 'react';
import { Shield, Plus, Trash2, ArrowRight, Heart, Landmark, Siren } from 'lucide-react';
import { EmergencyContact } from '../types';
import { saveTripActivationToSupabase } from '../lib/supabase';

interface TripActivationWizardProps {
  onSubmitTrip: (data: any) => void;
  onCancel: () => void;
}

export const TripActivationWizard: React.FC<TripActivationWizardProps> = ({
  onSubmitTrip,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [travelerName, setTravelerName] = useState('Alex Rivera');
  const [passportNumber, setPassportNumber] = useState('US-991024-X');
  const [nationality, setNationality] = useState('United States');
  
  const [destination, setDestination] = useState('Rohtang Pass & Spiti Valley Trek');
  const [region, setRegion] = useState('Lahaul & Spiti, Himachal Pradesh');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
  
  const defaultReturn = new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16);
  const [expectedReturnDate, setExpectedReturnDate] = useState(defaultReturn);
  const [gracePeriodHours, setGracePeriodHours] = useState(4);
  const [pinCode, setPinCode] = useState('4921');

  const [smartwatchPaired, setSmartwatchPaired] = useState(true);

  // Contacts
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: 'Maria Rivera (Mother)', relation: 'Mother', email: 'm.rivera@example.com', phone: '+1-555-901-2244' },
    { name: 'Carlos Rivera (Brother)', relation: 'Brother', email: 'carlos.r@example.com', phone: '+1-555-901-8833' }
  ]);

  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: '',
    relation: 'Family',
    email: '',
    phone: ''
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) return;
    setContacts([...contacts, newContact]);
    setNewContact({ name: '', relation: 'Family', email: '', phone: '' });
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tripPayload = {
      travelerName,
      passportNumber,
      nationality,
      destination,
      region,
      startDate: new Date(startDate).toISOString(),
      expectedReturnDate: new Date(expectedReturnDate).toISOString(),
      gracePeriodHours,
      pinCode,
      emergencyContacts: contacts,
      smartwatchPaired,
      initialLat: 32.3711,
      initialLng: 77.3789,
      initialAltitude: 3978
    };

    try {
      await saveTripActivationToSupabase(tripPayload);
    } catch (err) {
      console.warn('Supabase sync notice:', err);
    }

    onSubmitTrip(tripPayload);
  };

  return (
    <div id="activation-wizard-root" className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl">
        
        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              PROTECTED TRIP ACTIVATION
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              Activate Sentinel AI Protection Shield
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Configure passport info, return grace periods, and emergency contacts before embarking on your journey in India.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 text-xs font-semibold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
            <span className="hidden sm:inline">Traveler Info</span>
          </div>
          <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            <span className="hidden sm:inline">Destination & Timeline</span>
          </div>
          <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
            <span className="hidden sm:inline">Emergency Contacts</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: TRAVELER & PASSPORT INFO */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                Step 1: Traveler Identity & Nationality
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name (As on Passport) *
                  </label>
                  <input
                    type="text"
                    required
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
                    placeholder="e.g. US-88392104"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nationality / Country *
                  </label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Set Safety PIN Code (For "I'm Safe" check-in) *
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-indigo-600 font-mono text-base font-bold tracking-widest text-center focus:border-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">Smartwatch Telemetry Pairing</span>
                    <span className="text-xs text-slate-600">Sync Apple Watch / WearOS fall detection and heart rate sensors.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={smartwatchPaired}
                  onChange={(e) => setSmartwatchPaired(e.target.checked)}
                  className="w-5 h-5 rounded bg-white border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>Next: Destination & Return Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DESTINATION & TIMELINE */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                Step 2: Destination & Return Schedule
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination / Route Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none"
                    placeholder="e.g. Kedarnath Temple Trek"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State / District in India *
                  </label>
                  <input
                    type="text"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none"
                    placeholder="e.g. Rudraprayag, Uttarakhand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Departure Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Safe Return Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={expectedReturnDate}
                    onChange={(e) => setExpectedReturnDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Grace Period Buffer (Before AI Emergency Mode Triggers):
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[2, 4, 6, 12].map((hours) => (
                    <button
                      type="button"
                      key={hours}
                      onClick={() => setGracePeriodHours(hours)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        gracePeriodHours === hours
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      +{hours} Hours Buffer
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  If you do not check in within expected return time + {gracePeriodHours} hours grace buffer, AI Risk Engine automatically initiates emergency mode.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>Next: Emergency Contacts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EMERGENCY CONTACTS & CONFIRM */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                Step 3: Family Emergency Contacts & Government Integrations
              </h3>

              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">Emergency Contacts Notified on Risk Event:</span>
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{c.name} ({c.relation})</span>
                      <span className="text-slate-500 font-mono">{c.email} • {c.phone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(i)}
                      className="text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Relation (e.g. Spouse)"
                    value={newContact.relation}
                    onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddContact}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Contact
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start space-x-3">
                  <Landmark className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">Automatic Embassy Dispatch Hook</span>
                    <span className="text-slate-600">Embassy of {nationality} in New Delhi configured to receive direct distress payloads.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-start space-x-3">
                  <Siren className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">State Police Emergency Hook</span>
                    <span className="text-slate-600">Connected to {region.split(',')[1] || 'State'} Police Control Room for search & rescue dispatch.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/20 flex items-center space-x-2 cursor-pointer"
                >
                  <Shield className="w-5 h-5" />
                  <span>START PROTECTED JOURNEY NOW</span>
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
