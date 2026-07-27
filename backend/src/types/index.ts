export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Checkpoint {
  id: string;
  tripId: string;
  timestamp: string;
  lat: number;
  lng: number;
  altitudeMeters: number;
  locationName: string;
  batteryLevel: number;
  signalType: string;
  signalStrength: number;
  speedKmh: number;
  deviceStatus: string;
  heartRate?: number;
  aiNote?: string;
}

export interface RiskReport {
  id: string;
  tripId: string;
  timestamp: string;
  riskLevel: RiskLevel;
  riskScore: number;
  keyFactors: string[];
  summary: string;
  aiRecommendation: string;
  policeActionRequired: boolean;
  embassyAlertTriggered: boolean;
  lastKnownLocationName: string;
  coordinatesStr: string;
  googleMapsUrl: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  email?: string;
}

export interface EmbassyInfo {
  country: string;
  embassyName: string;
  email: string;
  hotline: string;
  city: string;
}

export interface PoliceDepartment {
  state: string;
  district: string;
  controlRoomEmail: string;
  helpline: string;
}

export interface SmartwatchTelemetry {
  paired: boolean;
  battery: number;
  heartRate: number;
  pulseO2: number;
  fallDetected: boolean;
  lastSync: string;
}

export interface Trip {
  id: string;
  travelerName: string;
  passportNumber: string;
  nationality: string;
  destination: string;
  region: string;
  startDate: string;
  expectedReturnDate: string;
  gracePeriodHours: number;
  status: 'active' | 'grace_period' | 'risk_warning' | 'critical_emergency' | 'safe' | 'safe_completed';
  riskLevel: RiskLevel;
  riskScore: number;
  pinCode: string;
  shareCode: string;
  emergencyContacts: EmergencyContact[];
  embassyInfo: EmbassyInfo;
  policeDept: PoliceDepartment;
  telemetry: SmartwatchTelemetry;
  checkpoints: Checkpoint[];
  latestRiskReport?: RiskReport;
  emergencyTriggeredAt?: string;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  safetyRating?: string;
  weatherAdvisory?: string;
  suggestedGear?: string[];
}
