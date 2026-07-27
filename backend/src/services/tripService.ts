import { Trip, Checkpoint, RiskReport, RiskLevel } from '../types';
import { INITIAL_TRIPS } from '../lib/data';
import { ai } from '../lib/gemini';
import { Type } from '@google/genai';

let tripsStore: Trip[] = JSON.parse(JSON.stringify(INITIAL_TRIPS));

export class TripService {
  static getAllTrips(): Trip[] {
    return tripsStore;
  }

  static getTripById(id: string): Trip | undefined {
    return tripsStore.find(t => t.id === id || t.shareCode === id);
  }

  static createTrip(data: any): Trip {
    const newId = `TRIP-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const shareCode = `${(data.travelerName || 'TOURIST').split(' ')[0].toUpperCase()}-${(data.destination || 'INDIA').substring(0, 5).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

    const newTrip: Trip = {
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
      embassyInfo: data.embassyInfo || {
        country: data.nationality || 'International Mission',
        embassyName: `Embassy of ${data.nationality || 'Foreign Country'} in New Delhi`,
        email: 'consular@embassy-mission.gov',
        hotline: '+91-11-2000-0000',
        city: 'New Delhi'
      },
      policeDept: data.policeDept || {
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
          speedKmh: 0,
          deviceStatus: 'Journey Protection Activated',
          heartRate: 72,
          aiNote: 'Initial encrypted location checkpoint synced to Sentinel Cloud.'
        }
      ]
    };

    tripsStore.unshift(newTrip);
    return newTrip;
  }

  static addCheckpoint(tripId: string, data: any): { checkpoint: Checkpoint; trip: Trip } | null {
    const trip = this.getTripById(tripId);
    if (!trip) return null;

    const newCheckpoint: Checkpoint = {
      id: `chk-${Date.now()}`,
      tripId: trip.id,
      timestamp: new Date().toISOString(),
      lat: Number(data.lat) || (trip.checkpoints[trip.checkpoints.length - 1]?.lat || 30.3165) + (Math.random() - 0.5) * 0.02,
      lng: Number(data.lng) || (trip.checkpoints[trip.checkpoints.length - 1]?.lng || 78.0322) + (Math.random() - 0.5) * 0.02,
      altitudeMeters: Number(data.altitudeMeters) || 1500,
      locationName: data.locationName || `${trip.destination} Route Checkpoint`,
      batteryLevel: Math.max(0, Number(data.batteryLevel) ?? (trip.checkpoints[trip.checkpoints.length - 1]?.batteryLevel - 2)),
      signalType: data.signalType || (Math.random() > 0.3 ? 'Satellite L-Band' : '5G/4G'),
      signalStrength: Number(data.signalStrength) ?? Math.floor(40 + Math.random() * 50),
      speedKmh: Number(data.speedKmh) ?? Number((2 + Math.random() * 5).toFixed(1)),
      deviceStatus: data.deviceStatus || 'Routine Cloud Sync',
      heartRate: Number(data.heartRate) || 78,
      aiNote: data.aiNote || 'Routine 15-minute location heartbeat uploaded securely.'
    };

    trip.checkpoints.push(newCheckpoint);
    trip.telemetry.lastSync = newCheckpoint.timestamp;
    trip.telemetry.battery = newCheckpoint.batteryLevel;
    if (newCheckpoint.heartRate) trip.telemetry.heartRate = newCheckpoint.heartRate;

    return { checkpoint: newCheckpoint, trip };
  }

  static simulateAction(tripId: string, action: string): Trip | null {
    const trip = this.getTripById(tripId);
    if (!trip) return null;

    const now = new Date();

    if (action === 'loss_signal') {
      trip.riskLevel = 'Medium';
      trip.riskScore = 55;
      trip.status = 'grace_period';
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1];
      if (lastChk) {
        lastChk.signalType = 'Offline Encrypted Queue';
        lastChk.signalStrength = 0;
        lastChk.aiNote = 'Simulated Satellite Signal Drop. Network unreachable.';
      }
    } else if (action === 'low_battery') {
      trip.riskLevel = 'High';
      trip.riskScore = 80;
      trip.status = 'risk_warning';
      trip.telemetry.battery = 5;
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1];
      if (lastChk) {
        lastChk.batteryLevel = 5;
        lastChk.deviceStatus = 'CRITICAL: Device Battery 5%';
        lastChk.aiNote = 'Battery critically low in high elevation area.';
      }
    } else if (action === 'fall_detected') {
      trip.riskLevel = 'Critical';
      trip.riskScore = 98;
      trip.status = 'critical_emergency';
      trip.telemetry.fallDetected = true;
      trip.telemetry.heartRate = 0;
      trip.telemetry.pulseO2 = 0;
      trip.emergencyTriggeredAt = now.toISOString();
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1];
      if (lastChk) {
        lastChk.deviceStatus = 'CRITICAL IMPACT: Fall Detected / Heartbeat Disconnected';
        lastChk.aiNote = 'Smartwatch acceleration sensors triggered high-G fall alert. Zero pulse returned.';
      }
    } else if (action === 'overdue') {
      trip.riskLevel = 'High';
      trip.riskScore = 75;
      trip.status = 'grace_period';
      trip.expectedReturnDate = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
    } else if (action === 'safe_reset') {
      trip.riskLevel = 'Low';
      trip.riskScore = 5;
      trip.status = 'active';
      trip.telemetry.fallDetected = false;
      trip.telemetry.battery = 90;
      trip.telemetry.heartRate = 72;
      trip.telemetry.pulseO2 = 98;
      trip.expectedReturnDate = new Date(Date.now() + 24 * 3600 * 1000).toISOString();
    }

    return trip;
  }

  static async analyzeRisk(tripId: string): Promise<{ riskReport: RiskReport; trip: Trip } | null> {
    const trip = this.getTripById(tripId);
    if (!trip) return null;

    try {
      const prompt = `
You are the Sentinel AI Emergency Protection System AI Risk Engine.
Analyze the following international traveler telemetry in India and calculate risk assessment:

Traveler Name: ${trip.travelerName}
Passport: ${trip.passportNumber} (${trip.nationality})
Destination: ${trip.destination} (${trip.region})
Expected Return: ${trip.expectedReturnDate}
Current Time: ${new Date().toISOString()}
Grace Period: ${trip.gracePeriodHours} Hours
Smartwatch Telemetry: Battery ${trip.telemetry.battery}%, Heart Rate ${trip.telemetry.heartRate} BPM, Fall Detected: ${trip.telemetry.fallDetected}
Checkpoints Recorded: ${trip.checkpoints.length}
Last Known Location: ${trip.checkpoints[trip.checkpoints.length - 1]?.locationName || 'Unknown'} (Lat: ${trip.checkpoints[trip.checkpoints.length - 1]?.lat}, Lng: ${trip.checkpoints[trip.checkpoints.length - 1]?.lng})
Last Signal Type: ${trip.checkpoints[trip.checkpoints.length - 1]?.signalType}

Assess risk level (Low, Medium, High, or Critical), provide a numerical risk score (0-100), extract key risk factors, generate a clear 2-3 sentence natural language executive summary for family/embassy/police, and suggest immediate action steps.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskLevel: { type: Type.STRING, description: 'Low, Medium, High, or Critical' },
              riskScore: { type: Type.NUMBER, description: 'Score between 0 and 100' },
              keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING },
              aiRecommendation: { type: Type.STRING },
              policeActionRequired: { type: Type.BOOLEAN },
              embassyAlertTriggered: { type: Type.BOOLEAN }
            },
            required: ['riskLevel', 'riskScore', 'keyFactors', 'summary', 'aiRecommendation', 'policeActionRequired', 'embassyAlertTriggered']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1] || { lat: 30.3165, lng: 78.0322, locationName: trip.destination };

      const riskReport: RiskReport = {
        id: `rr-${Date.now()}`,
        tripId: trip.id,
        timestamp: new Date().toISOString(),
        riskLevel: (parsed.riskLevel as RiskLevel) || trip.riskLevel,
        riskScore: parsed.riskScore ?? trip.riskScore,
        keyFactors: parsed.keyFactors || ['Checkpoints delayed', 'Remote mountain terrain'],
        summary: parsed.summary || 'Traveler risk evaluation computed by Sentinel AI Engine.',
        aiRecommendation: parsed.aiRecommendation || 'Continue satellite monitoring.',
        policeActionRequired: Boolean(parsed.policeActionRequired),
        embassyAlertTriggered: Boolean(parsed.embassyAlertTriggered),
        lastKnownLocationName: lastChk.locationName,
        coordinatesStr: `${lastChk.lat.toFixed(4)}° N, ${lastChk.lng.toFixed(4)}° E`,
        googleMapsUrl: `https://www.google.com/maps?q=${lastChk.lat},${lastChk.lng}`
      };

      trip.riskLevel = riskReport.riskLevel;
      trip.riskScore = riskReport.riskScore;
      trip.latestRiskReport = riskReport;

      if (riskReport.riskLevel === 'Critical') {
        trip.status = 'critical_emergency';
        trip.emergencyTriggeredAt = new Date().toISOString();
      } else if (riskReport.riskLevel === 'High') {
        trip.status = 'risk_warning';
      }

      return { riskReport, trip };
    } catch (err: any) {
      console.error('Gemini Risk Analysis Error:', err);
      const lastChk = trip.checkpoints[trip.checkpoints.length - 1] || { lat: 30.3165, lng: 78.0322, locationName: trip.destination };
      const fallbackReport: RiskReport = {
        id: `rr-fb-${Date.now()}`,
        tripId: trip.id,
        timestamp: new Date().toISOString(),
        riskLevel: trip.riskLevel,
        riskScore: trip.riskScore,
        keyFactors: [
          `Last ping received at ${lastChk.locationName}`,
          `Battery level currently at ${trip.telemetry.battery}%`,
          `Smartwatch heartbeat: ${trip.telemetry.heartRate} BPM`
        ],
        summary: `Sentinel AI monitored trip for ${trip.travelerName}. Current risk score is ${trip.riskScore}/100.`,
        aiRecommendation: 'Keep monitoring satellite checkpoints and confirm safety PIN upon return.',
        policeActionRequired: trip.riskLevel === 'Critical' || trip.riskLevel === 'High',
        embassyAlertTriggered: trip.riskLevel === 'Critical',
        lastKnownLocationName: lastChk.locationName,
        coordinatesStr: `${lastChk.lat.toFixed(4)}° N, ${lastChk.lng.toFixed(4)}° E`,
        googleMapsUrl: `https://www.google.com/maps?q=${lastChk.lat},${lastChk.lng}`
      };
      trip.latestRiskReport = fallbackReport;
      return { riskReport: fallbackReport, trip };
    }
  }

  static checkin(tripId: string, pinCode: string, extendHours?: number): { message: string; trip: Trip } | { error: string; status: number } {
    const trip = this.getTripById(tripId);
    if (!trip) return { error: 'Trip not found', status: 404 };

    if (pinCode && pinCode !== trip.pinCode) {
      return { error: 'Invalid Safety PIN Code', status: 401 };
    }

    if (extendHours) {
      const currentExpected = new Date(trip.expectedReturnDate);
      currentExpected.setHours(currentExpected.getHours() + Number(extendHours));
      trip.expectedReturnDate = currentExpected.toISOString();
    } else {
      trip.status = 'safe';
    }

    trip.riskLevel = 'Low';
    trip.riskScore = 2;
    trip.telemetry.fallDetected = false;

    return { message: 'Safety check-in verified successfully!', trip };
  }

  static triggerEmergency(tripId: string): Trip | null {
    const trip = this.getTripById(tripId);
    if (!trip) return null;

    trip.status = 'critical_emergency';
    trip.riskLevel = 'Critical';
    trip.riskScore = 99;
    trip.emergencyTriggeredAt = new Date().toISOString();

    const lastChk = trip.checkpoints[trip.checkpoints.length - 1] || { lat: 30.3165, lng: 78.0322, locationName: trip.destination };

    trip.latestRiskReport = {
      id: `rr-emg-${Date.now()}`,
      tripId: trip.id,
      timestamp: new Date().toISOString(),
      riskLevel: 'Critical',
      riskScore: 99,
      keyFactors: [
        'MANUAL / AUTOMATED CRITICAL DISPATCH TRIGGERED',
        `No safe check-in response from ${trip.travelerName}`,
        `Last ping at ${lastChk.locationName} (${lastChk.lat.toFixed(4)}, ${lastChk.lng.toFixed(4)})`,
        `Battery level at ${trip.telemetry.battery}%`
      ],
      summary: `CRITICAL ALERT: Emergency dispatch activated for ${trip.travelerName} (${trip.nationality} Passport ${trip.passportNumber}). Satellite location details and AI report sent to ${trip.embassyInfo.embassyName} and ${trip.policeDept.district}.`,
      aiRecommendation: 'Deploy immediate Search & Rescue team to last recorded GPS satellite coordinates.',
      policeActionRequired: true,
      embassyAlertTriggered: true,
      lastKnownLocationName: lastChk.locationName,
      coordinatesStr: `${lastChk.lat.toFixed(4)}° N, ${lastChk.lng.toFixed(4)}° E`,
      googleMapsUrl: `https://www.google.com/maps?q=${lastChk.lat},${lastChk.lng}`
    };

    return trip;
  }
}
