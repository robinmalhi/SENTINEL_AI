import { Trip } from '../types';

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'TRIP-IN-2026-7782',
    travelerName: 'Sarah Jenkins',
    passportNumber: 'US-98214571',
    nationality: 'United States',
    destination: 'Kedarnath Shrine & Trek Path',
    region: 'Rudraprayag District, Uttarakhand, India',
    startDate: '2026-07-25T06:00:00Z',
    expectedReturnDate: '2026-07-26T18:00:00Z',
    gracePeriodHours: 4,
    status: 'grace_period',
    riskLevel: 'High',
    riskScore: 78,
    pinCode: '9921',
    shareCode: 'SARAH-KEDAR-90',
    emergencyContacts: [
      { name: 'Mark Jenkins', relation: 'Brother', phone: '+1-415-555-0192', email: 'mark.j@domain.com' },
      { name: 'Elena Jenkins', relation: 'Mother', phone: '+1-415-555-0144' }
    ],
    embassyInfo: {
      country: 'United States',
      embassyName: 'Embassy of the United States, New Delhi',
      email: 'ACSNewDelhi@state.gov',
      hotline: '+91-11-2419-8000',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Uttarakhand',
      district: 'Rudraprayag District Police Headquarters',
      controlRoomEmail: 'sp-rud-uk@nic.in',
      helpline: '112 / +91-1364-233210'
    },
    telemetry: {
      paired: true,
      battery: 12,
      heartRate: 118,
      pulseO2: 92,
      fallDetected: false,
      lastSync: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    checkpoints: [
      {
        id: 'chk-101',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
        lat: 30.5522,
        lng: 79.0655,
        altitudeMeters: 1980,
        locationName: 'Gaurikund Trek Base Checkpoint',
        batteryLevel: 98,
        signalType: '5G/4G',
        signalStrength: 92,
        speedKmh: 4.5,
        deviceStatus: 'Active',
        heartRate: 85,
        aiNote: 'Entered high-altitude trek zone. Mandatory 15-min satellite pings active.'
      },
      {
        id: 'chk-102',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
        lat: 30.6480,
        lng: 79.0688,
        altitudeMeters: 2750,
        locationName: 'Jungle Chatti Satellite Relay Station',
        batteryLevel: 64,
        signalType: 'Satellite L-Band',
        signalStrength: 78,
        speedKmh: 3.2,
        deviceStatus: 'Active',
        heartRate: 122,
        aiNote: 'Pace slowed due to incline & heavy monsoon showers.'
      },
      {
        id: 'chk-103',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        lat: 30.7346,
        lng: 79.0669,
        altitudeMeters: 3580,
        locationName: 'Kedarnath Temple Base High Camp',
        batteryLevel: 12,
        signalType: 'Satellite Emergency Mesh',
        signalStrength: 45,
        speedKmh: 0.2,
        deviceStatus: 'WARNING: Battery 12%',
        heartRate: 118,
        aiNote: 'Stationary for 45 mins. High altitude low battery warning.'
      }
    ]
  },
  {
    id: 'TRIP-IN-2026-4419',
    travelerName: 'Marco Rossi',
    passportNumber: 'IT-44912019',
    nationality: 'Italy',
    destination: 'Spiti Valley & Kaza High Pass',
    region: 'Lahaul & Spiti, Himachal Pradesh, India',
    startDate: '2026-07-24T08:00:00Z',
    expectedReturnDate: '2026-07-28T12:00:00Z',
    gracePeriodHours: 6,
    status: 'active',
    riskLevel: 'Low',
    riskScore: 18,
    pinCode: '1102',
    shareCode: 'MARCO-SPITI-44',
    emergencyContacts: [
      { name: 'Giulia Rossi', relation: 'Spouse', phone: '+39-06-6987-1234', email: 'giulia.rossi@email.it' }
    ],
    embassyInfo: {
      country: 'Italy',
      embassyName: 'Embassy of Italy in New Delhi',
      email: 'ambasciata.newdelhi@esteri.it',
      hotline: '+91-11-2611-4355',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Himachal Pradesh',
      district: 'Kaza Police Control Room',
      controlRoomEmail: 'police-spiti-hp@gov.in',
      helpline: '112 / +91-1906-222223'
    },
    telemetry: {
      paired: true,
      battery: 84,
      heartRate: 74,
      pulseO2: 96,
      fallDetected: false,
      lastSync: new Date().toISOString()
    },
    checkpoints: [
      {
        id: 'chk-201',
        tripId: 'TRIP-IN-2026-4419',
        timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
        lat: 32.2276,
        lng: 78.0710,
        altitudeMeters: 3800,
        locationName: 'Kaza Town Checkpoint',
        batteryLevel: 84,
        signalType: 'Satellite L-Band',
        signalStrength: 88,
        speedKmh: 24.0,
        deviceStatus: 'Active',
        heartRate: 74,
        aiNote: 'Route progress nominal along Spiti river basin.'
      }
    ]
  },
  {
    id: 'TRIP-IN-2026-8812',
    travelerName: 'Akira Tanaka',
    passportNumber: 'JP-77182903',
    nationality: 'Japan',
    destination: 'Silent Valley National Park Forest Trail',
    region: 'Palakkad District, Kerala, India',
    startDate: '2026-07-26T04:00:00Z',
    expectedReturnDate: '2026-07-26T16:00:00Z',
    gracePeriodHours: 3,
    status: 'critical_emergency',
    riskLevel: 'Critical',
    riskScore: 96,
    pinCode: '3341',
    shareCode: 'AKIRA-SILENT-88',
    emergencyContacts: [
      { name: 'Kenji Tanaka', relation: 'Father', phone: '+81-3-5555-0143', email: 'tanaka.k@corp.jp' }
    ],
    embassyInfo: {
      country: 'Japan',
      embassyName: 'Embassy of Japan in India',
      email: 'jpemb-delhi@nd.mofa.go.jp',
      hotline: '+91-11-4651-5100',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Kerala',
      district: 'Palakkad Forest Police Task Force',
      controlRoomEmail: 'sp-palakkad.pol@kerala.gov.in',
      helpline: '112 / +91-491-2534011'
    },
    telemetry: {
      paired: true,
      battery: 4,
      heartRate: 0,
      pulseO2: 0,
      fallDetected: true,
      lastSync: new Date(Date.now() - 90 * 60 * 1000).toISOString()
    },
    checkpoints: [
      {
        id: 'chk-301',
        tripId: 'TRIP-IN-2026-8812',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        lat: 11.0822,
        lng: 76.4310,
        altitudeMeters: 1150,
        locationName: 'Sairandhri Watchtower Core Forest Area',
        batteryLevel: 4,
        signalType: 'Satellite Emergency Beacon',
        signalStrength: 20,
        speedKmh: 0.0,
        deviceStatus: 'CRITICAL: Smartwatch Acceleration Impact / Pulse Loss',
        heartRate: 0,
        aiNote: 'High-G Fall impact detected by smartwatch accelerometer in dense jungle canopy.'
      }
    ]
  }
];
