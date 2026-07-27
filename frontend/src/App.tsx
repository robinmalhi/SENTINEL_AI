import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingPage } from './components/landing/LandingPage';
import { PortalSelectionPage } from './components/landing/PortalSelectionPage';
import { PortalLogin } from './components/auth/PortalLogin';
import { TravelerPortal } from './components/portals/traveler/TravelerPortal';
import { FamilyPortal } from './components/portals/family/FamilyPortal';
import { EmbassyPortal } from './components/portals/embassy/EmbassyPortal';
import { PolicePortal } from './components/portals/police/PolicePortal';
import { EmergencyReportModal } from './components/EmergencyReportModal';
import { INITIAL_TRIPS } from './data/mockTrips';
import { Trip, PortalRole } from './types';
import { saveEmergencyAlertToSupabase } from './lib/supabase';

const API_BASE = import.meta.env.VITE_API_URL || '';

function AppContent() {
  const { 
    activePortalRole, 
    selectedPortalForLogin, 
    setSelectedPortalForLogin, 
    landingTab, 
    setLandingTab 
  } = useAuth();

  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTripId, setSelectedTripId] = useState<string>(INITIAL_TRIPS[0]?.id || '');
  const [modalTrip, setModalTrip] = useState<Trip | null>(null);
  const [showPortalSelectionPage, setShowPortalSelectionPage] = useState(false);

  // Fetch initial trips from server API with graceful fallback
  useEffect(() => {
    fetch(`${API_BASE}/api/trips`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTrips(data);
          if (!selectedTripId) setSelectedTripId(data[0].id);
        }
      })
      .catch(err => {
        console.warn('Backend API endpoint notice (using local initial trips state):', err.message);
      });
  }, []);

  const activeTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const handleCreateTrip = async (data: any) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const newTrip = await res.json();
        setTrips(prev => [newTrip, ...prev]);
        setSelectedTripId(newTrip.id);
        return;
      }
    } catch (err) {
      console.warn('Using client-side creation fallback for new trip:', err);
    }

    const newId = `TRIP-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const shareCode = `${(data.travelerName || 'TOURIST').split(' ')[0].toUpperCase()}-${(data.destination || 'INDIA').substring(0, 5).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const localNewTrip: Trip = {
      id: newId,
      travelerName: data.travelerName || 'Anonymous Traveler',
      passportNumber: data.passportNumber || 'N/A',
      nationality: data.nationality || 'Foreign National',
      destination: data.destination || 'Unspecified Region',
      region: data.region || 'India',
      startDate: data.startDate || new Date().toISOString(),
      expectedReturnDate: data.expectedReturnDate || new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      gracePeriodHours: Number(data.gracePeriodHours) || 4,
      status: 'active',
      riskLevel: 'Low',
      riskScore: 5,
      pinCode: data.pinCode || '1234',
      shareCode: shareCode,
      emergencyContacts: data.emergencyContacts || [],
      embassyInfo: {
        country: data.nationality || 'International Mission',
        embassyName: `Embassy of ${data.nationality || 'Foreign Country'} in New Delhi`,
        email: 'consular@embassy-mission.gov',
        hotline: '+91-11-2000-0000',
        city: 'New Delhi'
      },
      policeDept: {
        state: 'Uttarakhand',
        district: 'State Police Emergency HQ',
        controlRoomEmail: 'police-emergency@state.gov.in',
        helpline: '112'
      },
      telemetry: {
        paired: Boolean(data.smartwatchPaired),
        battery: 95,
        heartRate: 72,
        pulseO2: 98,
        fallDetected: false,
        lastSync: new Date().toISOString()
      },
      checkpoints: [
        {
          id: `chk-start-${Date.now()}`,
          tripId: newId,
          timestamp: new Date().toISOString(),
          lat: data.initialLat || 30.3165,
          lng: data.initialLng || 78.0322,
          altitudeMeters: data.initialAltitude || 1200,
          locationName: `${data.destination} Entry Checkpoint`,
          batteryLevel: 95,
          signalType: '5G/4G',
          signalStrength: 95,
          speedKmh: 4.2,
          deviceStatus: 'Active Signal',
          aiNote: 'Initial journey checkpoint logged.'
        }
      ]
    };
    setTrips(prev => [localNewTrip, ...prev]);
    setSelectedTripId(localNewTrip.id);
  };

  const handleAddCheckpoint = async (tripId: string, data: any) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips/${tripId}/checkpoint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.trip) {
          setTrips(prev => prev.map(t => t.id === tripId ? result.trip : t));
          return;
        }
      }
    } catch (err) {
      console.warn('Using client-side checkpoint fallback:', err);
    }

    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const newChk = {
        id: `chk-local-${Date.now()}`,
        tripId,
        timestamp: new Date().toISOString(),
        lat: data.lat || 30.7346,
        lng: data.lng || 79.0669,
        altitudeMeters: data.altitudeMeters || 3200,
        locationName: data.locationName || 'GPS Waypoint',
        batteryLevel: data.batteryLevel || trip.telemetry.battery,
        signalType: data.signalType || 'Satellite L-Band',
        signalStrength: 85,
        speedKmh: data.speedKmh || 3.5,
        deviceStatus: 'Active',
        aiNote: data.aiNote || 'Waypoint logged by traveler.'
      };
      return { ...trip, checkpoints: [...trip.checkpoints, newChk] };
    }));
  };

  const handleSimulateAction = async (tripId: string, action: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips/${tripId}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        const result = await res.json();
        if (result.trip) {
          setTrips(prev => prev.map(t => t.id === tripId ? result.trip : t));
          return;
        }
      }
    } catch (err) {
      console.warn('Using client-side simulation fallback:', err);
    }

    setTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      let updated = { ...t };
      if (action === 'drop_battery') {
        updated.telemetry = { ...updated.telemetry, battery: 8 };
      } else if (action === 'trigger_fall') {
        updated.telemetry = { ...updated.telemetry, fallDetected: true };
        updated.riskLevel = 'High';
      } else if (action === 'extend_delay') {
        updated.riskLevel = 'High';
      }
      return updated;
    }));
  };

  const handleRunAiRiskAnalysis = async (tripId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips/${tripId}/risk-analysis`, {
        method: 'POST'
      });
      if (res.ok) {
        const result = await res.json();
        if (result.trip) {
          setTrips(prev => prev.map(t => t.id === tripId ? result.trip : t));
          const updatedTrip = result.trip;
          if (updatedTrip.riskLevel === 'Critical' || updatedTrip.status === 'critical_emergency') {
            const lastChk = updatedTrip.checkpoints?.[updatedTrip.checkpoints.length - 1];
            saveEmergencyAlertToSupabase({
              travelerName: updatedTrip.travelerName,
              destination: updatedTrip.destination,
              location: lastChk?.locationName || updatedTrip.destination,
              lat: lastChk?.lat || 30.7346,
              lng: lastChk?.lng || 79.0669,
              altitude: lastChk?.altitudeMeters || 3580,
              sosAlertByAi: true,
              time: new Date().toISOString(),
              alertType: 'AI SATELLITE AUTOMATIC SOS ALERT',
              details: updatedTrip.latestRiskReport?.summary || 'AI Satellite telemetry detected severe prolonged non-movement in harsh terrain.',
              batteryLevel: updatedTrip.telemetry?.battery || 88
            });
          }
          return;
        }
      }
    } catch (err) {
      console.warn('Using client-side AI analysis fallback:', err);
    }
  };

  const handleCheckinSafe = async (tripId: string, pinCode: string, extendHours?: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips/${tripId}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinCode, extendHours })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.trip) {
          setTrips(prev => prev.map(t => t.id === tripId ? result.trip : t));
          return;
        }
      }
    } catch (err) {
      console.warn('Using client-side safe checkin fallback:', err);
    }

    setTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      return {
        ...t,
        status: 'safe_completed',
        riskLevel: 'Low',
        riskScore: 0
      };
    }));
  };

  const handleTriggerEmergency = async (tripId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/trips/${tripId}/trigger-emergency`, {
        method: 'POST'
      });
      if (res.ok) {
        const result = await res.json();
        if (result.trip) {
          const updatedTrip = result.trip;
          setTrips(prev => prev.map(t => t.id === tripId ? updatedTrip : t));
          setModalTrip(updatedTrip);

          const lastChk = updatedTrip.checkpoints?.[updatedTrip.checkpoints.length - 1];
          saveEmergencyAlertToSupabase({
            travelerName: updatedTrip.travelerName,
            destination: updatedTrip.destination,
            location: lastChk?.locationName || updatedTrip.destination,
            lat: lastChk?.lat || 30.7346,
            lng: lastChk?.lng || 79.0669,
            altitude: lastChk?.altitudeMeters || 3580,
            sosAlertByAi: true,
            time: new Date().toISOString(),
            alertType: 'CRITICAL EMERGENCY DISPATCH TRIGGERED',
            details: `Autonomous emergency dispatch triggered for ${updatedTrip.travelerName} (${updatedTrip.passportNumber})`,
            batteryLevel: updatedTrip.telemetry?.battery || 88
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Using client-side emergency trigger fallback:', err);
    }

    setTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      const emergencyTrip = { ...t, status: 'critical_emergency' as const, riskLevel: 'Critical' as const, riskScore: 100 };
      setModalTrip(emergencyTrip);
      return emergencyTrip;
    }));
  };

  // Render Portal Based on Authenticated User Role
  if (activePortalRole === 'traveler') {
    return (
      <>
        <TravelerPortal
          trips={trips}
          activeTrip={activeTrip}
          onAddCheckpoint={handleAddCheckpoint}
          onSimulateAction={handleSimulateAction}
          onRunAiRiskAnalysis={handleRunAiRiskAnalysis}
          onCheckinSafe={handleCheckinSafe}
          onTriggerEmergency={handleTriggerEmergency}
          onCreateTrip={handleCreateTrip}
          onOpenEmergencyModal={(t) => setModalTrip(t)}
        />
        {modalTrip && <EmergencyReportModal trip={modalTrip} onClose={() => setModalTrip(null)} />}
      </>
    );
  }

  if (activePortalRole === 'family') {
    return (
      <>
        <FamilyPortal
          trips={trips}
          onTriggerEmergency={handleTriggerEmergency}
          onOpenEmergencyModal={(t) => setModalTrip(t)}
        />
        {modalTrip && <EmergencyReportModal trip={modalTrip} onClose={() => setModalTrip(null)} />}
      </>
    );
  }

  if (activePortalRole === 'embassy') {
    return (
      <>
        <EmbassyPortal
          trips={trips}
          onOpenEmergencyModal={(t) => setModalTrip(t)}
        />
        {modalTrip && <EmergencyReportModal trip={modalTrip} onClose={() => setModalTrip(null)} />}
      </>
    );
  }

  if (activePortalRole === 'police') {
    return (
      <>
        <PolicePortal
          trips={trips}
          onOpenEmergencyModal={(t) => setModalTrip(t)}
        />
        {modalTrip && <EmergencyReportModal trip={modalTrip} onClose={() => setModalTrip(null)} />}
      </>
    );
  }

  // Not Logged In: Show Login Page or Landing / Selection Page
  if (selectedPortalForLogin) {
    return (
      <PortalLogin
        role={selectedPortalForLogin}
        onBack={() => setSelectedPortalForLogin(null)}
      />
    );
  }

  if (showPortalSelectionPage) {
    return (
      <PortalSelectionPage
        onSelectPortal={(role) => setSelectedPortalForLogin(role)}
        onBackToHome={() => setShowPortalSelectionPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      <LandingNavbar
        activeTab={landingTab}
        setActiveTab={setLandingTab}
        onOpenPortalSelection={() => setShowPortalSelectionPage(true)}
      />
      <main>
        <LandingPage
          activeTab={landingTab}
          setActiveTab={setLandingTab}
          onOpenPortalSelection={() => setShowPortalSelectionPage(true)}
          sampleTrips={trips}
        />
      </main>
      {modalTrip && <EmergencyReportModal trip={modalTrip} onClose={() => setModalTrip(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
