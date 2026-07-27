import {
  PassportDocument,
  CitizenAbroadRecord,
  PoliceRescueUnit,
  EmergencyCase,
  SearchMission
} from '../types';

export const MOCK_PASSPORTS: PassportDocument[] = [
  {
    id: 'pass-01',
    passportNumber: 'US-88392104-A',
    fullName: 'Sarah Jenkins',
    nationality: 'United States',
    issueDate: '2021-03-15',
    expiryDate: '2031-03-14',
    visaType: 'e-Tourist Visa (1 Year)',
    visaExpiry: '2027-02-28',
    innerLinePermitNo: 'ILP-UTT-2026-9041',
    encryptedVaultHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    verifiedStatus: 'Verified'
  },
  {
    id: 'pass-02',
    passportNumber: 'IT-99201488-C',
    fullName: 'Marco Bellini',
    nationality: 'Italy',
    issueDate: '2022-06-10',
    expiryDate: '2032-06-09',
    visaType: 'Tourist Multi-Entry',
    visaExpiry: '2026-11-30',
    innerLinePermitNo: 'ILP-HP-2026-4410',
    encryptedVaultHash: 'f4c1c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b811',
    verifiedStatus: 'Verified'
  },
  {
    id: 'pass-03',
    passportNumber: 'JP-7710293-K',
    fullName: 'Akira Tanaka',
    nationality: 'Japan',
    issueDate: '2020-09-01',
    expiryDate: '2030-08-31',
    visaType: 'Conference/Travel Visa',
    visaExpiry: '2026-12-15',
    innerLinePermitNo: 'ILP-KER-2026-7782',
    encryptedVaultHash: 'a1b2c34298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b999',
    verifiedStatus: 'Flagged'
  },
  {
    id: 'pass-04',
    passportNumber: 'GB-44102938-X',
    fullName: 'Oliver Smith',
    nationality: 'United Kingdom',
    issueDate: '2023-01-20',
    expiryDate: '2033-01-19',
    visaType: 'e-Tourist Visa (5 Year)',
    visaExpiry: '2028-01-19',
    innerLinePermitNo: 'ILP-Sikkim-2026-1022',
    encryptedVaultHash: '9981c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b333',
    verifiedStatus: 'Verified'
  }
];

export const MOCK_CITIZENS_ABROAD: CitizenAbroadRecord[] = [
  {
    id: 'cit-01',
    passportNumber: 'US-88392104-A',
    name: 'Sarah Jenkins',
    nationality: 'United States',
    destinationRegion: 'Rudraprayag, Uttarakhand (Kedarnath Trek)',
    arrivalDate: '2026-07-24',
    expectedDeparture: '2026-07-25',
    status: 'Emergency SOS',
    emergencyContact: 'David Jenkins (Father): +1-555-019-2834',
    riskRating: 'High'
  },
  {
    id: 'cit-02',
    passportNumber: 'IT-99201488-C',
    name: 'Marco Bellini',
    nationality: 'Italy',
    destinationRegion: 'Lahaul & Spiti, Himachal Pradesh',
    arrivalDate: '2026-07-25',
    expectedDeparture: '2026-07-27',
    status: 'Active Trek',
    emergencyContact: 'Sofia Bellini (Sister): +39-06-6987-1234',
    riskRating: 'Low'
  },
  {
    id: 'cit-03',
    passportNumber: 'JP-7710293-K',
    name: 'Akira Tanaka',
    nationality: 'Japan',
    destinationRegion: 'Silent Valley National Park, Kerala',
    arrivalDate: '2026-07-24',
    expectedDeparture: '2026-07-25',
    status: 'Emergency SOS',
    emergencyContact: 'Keiko Tanaka (Spouse): +81-3-5555-0143',
    riskRating: 'Critical'
  },
  {
    id: 'cit-04',
    passportNumber: 'US-55192801-B',
    name: 'Elena Rostova',
    nationality: 'United States',
    destinationRegion: 'Leh Ladakh Highway Sector 4',
    arrivalDate: '2026-07-20',
    expectedDeparture: '2026-07-28',
    status: 'Safe Checkin',
    emergencyContact: 'Michael Rostova: +1-555-901-2211',
    riskRating: 'Low'
  }
];

export const MOCK_RESCUE_UNITS: PoliceRescueUnit[] = [
  {
    id: 'unit-alpha-1',
    name: 'Uttarakhand State Disaster Response Force (SDRF) Alpha',
    type: 'Helicopter SAR',
    callsign: 'AIR-GUARDIAN-1',
    baseLocation: 'Gauchar Air Force Heliport',
    currentLat: 30.2861,
    currentLng: 79.1584,
    status: 'En Route',
    personnelCount: 6,
    etaMinutes: 24
  },
  {
    id: 'unit-bravo-2',
    name: 'High Altitude Mountain Rescue Squad (HAMRS)',
    type: 'Ground Alpine Unit',
    callsign: 'ALPINE-PATROL-4',
    baseLocation: 'Gaurikund Police Outpost',
    currentLat: 30.5012,
    currentLng: 79.0234,
    status: 'Deployed',
    personnelCount: 8,
    etaMinutes: 45
  },
  {
    id: 'unit-charlie-3',
    name: 'Kerala Forest & Police Quick Response Team',
    type: 'K9 Search Team',
    callsign: 'JUNGLE-RESCUE-2',
    baseLocation: 'Mukkali Ranger Base',
    currentLat: 11.0821,
    currentLng: 76.4312,
    status: 'Deployed',
    personnelCount: 12,
    etaMinutes: 35
  },
  {
    id: 'unit-delta-4',
    name: 'Himachal Pradesh Police Tactical SAR',
    type: 'Medical First Response',
    callsign: 'SPITI-COMMAND-1',
    baseLocation: 'Kaza Station',
    currentLat: 32.2462,
    currentLng: 77.1892,
    status: 'Ready',
    personnelCount: 5
  }
];

export const MOCK_SEARCH_MISSIONS: SearchMission[] = [
  {
    missionId: 'MIS-2026-KEDAR-01',
    caseId: 'CASE-IN-9041',
    targetName: 'Sarah Jenkins (US National)',
    unitsAssigned: ['AIR-GUARDIAN-1', 'ALPINE-PATROL-4'],
    sector: 'Kedarnath High Plateau Gorge (Sector 4-North)',
    status: 'Active Search',
    priority: 'High',
    leadCommander: 'DSP V.S. Rawat',
    startTime: '2026-07-25T11:45:00Z'
  },
  {
    missionId: 'MIS-2026-SILENT-02',
    caseId: 'CASE-IN-7782',
    targetName: 'Akira Tanaka (Japan National)',
    unitsAssigned: ['JUNGLE-RESCUE-2'],
    sector: 'Kuntipuzha River Basin Canopy Zone',
    status: 'Active Search',
    priority: 'Critical',
    leadCommander: 'Inspector Thomas Kurien',
    startTime: '2026-07-25T07:00:00Z'
  }
];
