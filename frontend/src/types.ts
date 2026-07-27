export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type TripStatus = 'active' | 'safe' | 'grace_period' | 'risk_warning' | 'critical_emergency' | 'safe_completed';

export type PortalRole = 'traveler' | 'family' | 'embassy' | 'police';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: PortalRole;
  organization?: string;
  avatarUrl?: string;
  token?: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  email: string;
  phone: string;
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

export interface Checkpoint {
  id: string;
  tripId: string;
  timestamp: string;
  lat: number;
  lng: number;
  altitudeMeters: number;
  locationName: string;
  batteryLevel: number;
  signalType: '5G/4G' | 'Satellite L-Band' | 'Offline Encrypted Queue';
  signalStrength: number; // 0-100
  speedKmh: number;
  deviceStatus: string;
  heartRate?: number;
  aiNote?: string;
}

export interface SmartwatchTelemetry {
  paired: boolean;
  battery: number;
  heartRate: number;
  pulseO2: number;
  fallDetected: boolean;
  lastSync: string;
}

export interface RiskReport {
  id: string;
  tripId: string;
  timestamp: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  keyFactors: string[];
  summary: string;
  aiRecommendation: string;
  policeActionRequired: boolean;
  embassyAlertTriggered: boolean;
  lastKnownLocationName: string;
  coordinatesStr: string;
  googleMapsUrl: string;
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
  status: TripStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  pinCode: string;
  emergencyContacts: EmergencyContact[];
  embassyInfo: EmbassyInfo;
  policeDept: PoliceDepartment;
  telemetry: SmartwatchTelemetry;
  checkpoints: Checkpoint[];
  latestRiskReport?: RiskReport;
  emergencyTriggeredAt?: string;
  shareCode: string;
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

export interface PassportDocument {
  id: string;
  passportNumber: string;
  fullName: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  visaType: string;
  visaExpiry: string;
  innerLinePermitNo?: string;
  encryptedVaultHash: string;
  verifiedStatus: 'Verified' | 'Pending' | 'Flagged';
}

export interface CitizenAbroadRecord {
  id: string;
  passportNumber: string;
  name: string;
  nationality: string;
  destinationRegion: string;
  arrivalDate: string;
  expectedDeparture: string;
  status: 'Registered' | 'Active Trek' | 'Overdue' | 'Safe Checkin' | 'Emergency SOS';
  emergencyContact: string;
  riskRating: RiskLevel;
}

export interface PoliceRescueUnit {
  id: string;
  name: string;
  type: 'Helicopter SAR' | 'Ground Alpine Unit' | 'K9 Search Team' | 'Medical First Response';
  callsign: string;
  baseLocation: string;
  currentLat: number;
  currentLng: number;
  status: 'Ready' | 'Deployed' | 'En Route' | 'Maintenance';
  personnelCount: number;
  etaMinutes?: number;
}

export interface EmergencyCase {
  caseId: string;
  tripId: string;
  travelerName: string;
  passportNumber: string;
  nationality: string;
  riskLevel: RiskLevel;
  status: 'Open' | 'Dispatched' | 'Rescued' | 'Closed';
  assignedOfficer: string;
  lastLocation: string;
  lastCoordinates: string;
  timestamp: string;
  priorityScore: number;
  summary: string;
}

export interface SearchMission {
  missionId: string;
  caseId: string;
  targetName: string;
  unitsAssigned: string[];
  sector: string;
  status: 'Planning' | 'Active Search' | 'Contact Made' | 'Extraction Complete';
  priority: 'High' | 'Critical' | 'Urgent';
  leadCommander: string;
  startTime: string;
}
