import { Trip } from '../types';

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'TRIP-IN-2026-9041',
    travelerName: 'Sarah Jenkins',
    passportNumber: 'US-88392104-A',
    nationality: 'United States',
    destination: 'Kedarnath Temple Trek',
    region: 'Rudraprayag, Uttarakhand',
    startDate: '2026-07-24T06:00:00Z',
    expectedReturnDate: '2026-07-25T10:00:00Z',
    gracePeriodHours: 4,
    status: 'risk_warning',
    riskLevel: 'High',
    riskScore: 78,
    pinCode: '4921',
    shareCode: 'SARAH-KEDAR-90',
    emergencyContacts: [
      { name: 'David Jenkins (Father)', relation: 'Father', email: 'd.jenkins@example.com', phone: '+1-555-019-2834' },
      { name: 'Emily Ross (Partner)', relation: 'Partner', email: 'emily.ross@example.com', phone: '+1-555-012-9981' }
    ],
    embassyInfo: {
      country: 'United States',
      embassyName: 'U.S. Embassy New Delhi - American Citizen Services',
      email: 'acsbadd@state.gov',
      hotline: '+91-11-2419-8000',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Uttarakhand',
      district: 'Rudraprayag Police HQ',
      controlRoomEmail: 'controlroom-rudraprayag@uttarakhandpolice.gov.in',
      helpline: '+91-1364-233221'
    },
    telemetry: {
      paired: true,
      battery: 12,
      heartRate: 112,
      pulseO2: 91,
      fallDetected: false,
      lastSync: '2026-07-25T08:15:00Z'
    },
    checkpoints: [
      {
        id: 'chk-1',
        tripId: 'TRIP-IN-2026-9041',
        timestamp: '2026-07-24T06:30:00Z',
        lat: 30.5012,
        lng: 79.0234,
        altitudeMeters: 1980,
        locationName: 'Gaurikund Base Camp',
        batteryLevel: 98,
        signalType: '5G/4G',
        signalStrength: 92,
        speedKmh: 4.2,
        deviceStatus: 'Normal Movement',
        heartRate: 88,
        aiNote: 'Safe departure checkpoint recorded.'
      },
      {
        id: 'chk-2',
        tripId: 'TRIP-IN-2026-9041',
        timestamp: '2026-07-24T11:00:00Z',
        lat: 30.6120,
        lng: 79.0410,
        altitudeMeters: 2750,
        locationName: 'Bhimbali Shelter Zone',
        batteryLevel: 74,
        signalType: '5G/4G',
        signalStrength: 45,
        speedKmh: 3.1,
        deviceStatus: 'Ascending trail',
        heartRate: 105,
        aiNote: 'Signal weakening as elevation increases.'
      },
      {
        id: 'chk-3',
        tripId: 'TRIP-IN-2026-9041',
        timestamp: '2026-07-24T16:30:00Z',
        lat: 30.7180,
        lng: 79.0620,
        altitudeMeters: 3320,
        locationName: 'Lincholi Ridge',
        batteryLevel: 42,
        signalType: 'Satellite L-Band',
        signalStrength: 80,
        speedKmh: 2.4,
        deviceStatus: 'Switched to Satellite Backup',
        heartRate: 110,
        aiNote: 'Cell towers unreachable. Satellite telemetry activated.'
      },
      {
        id: 'chk-4',
        tripId: 'TRIP-IN-2026-9041',
        timestamp: '2026-07-25T08:15:00Z',
        lat: 30.7352,
        lng: 79.0669,
        altitudeMeters: 3583,
        locationName: 'Kedarnath Valley High Plateau (Last Ping)',
        batteryLevel: 12,
        signalType: 'Satellite L-Band',
        signalStrength: 25,
        speedKmh: 0.2,
        deviceStatus: 'Stationary / Low Battery Warning',
        heartRate: 112,
        aiNote: 'Stationary for 4+ hours. Battery critically low at 12%.'
      }
    ],
    latestRiskReport: {
      id: 'rr-9041',
      tripId: 'TRIP-IN-2026-9041',
      timestamp: '2026-07-25T11:30:00Z',
      riskLevel: 'High',
      riskScore: 78,
      keyFactors: [
        'Expected return time exceeded by 1.5 hours',
        'No satellite pulse received in 3 hours 15 minutes',
        'Last reported battery level was 12% at high altitude (3,583m)',
        'Freezing nighttime temperature advisory in Kedarnath range (-2°C)'
      ],
      summary: 'Traveler Sarah Jenkins was expected back at 10:00 AM UTC. Device has been stationary near Kedarnath Valley High Plateau since 08:15 UTC with battery at 12%. Satellite signal lost.',
      aiRecommendation: 'Initiate automated consular alert to US Embassy New Delhi and alert Rudraprayag District Police Search & Rescue unit.',
      policeActionRequired: true,
      embassyAlertTriggered: true,
      lastKnownLocationName: 'Kedarnath Valley High Plateau (Lat: 30.7352, Lng: 79.0669)',
      coordinatesStr: '30.7352° N, 79.0669° E',
      googleMapsUrl: 'https://www.google.com/maps?q=30.7352,79.0669'
    }
  },
  {
    id: 'TRIP-IN-2026-4410',
    travelerName: 'Marco Bellini',
    passportNumber: 'IT-99201488-C',
    nationality: 'Italy',
    destination: 'Spiti Valley Solo Bike Expedition',
    region: 'Lahaul & Spiti, Himachal Pradesh',
    startDate: '2026-07-25T04:00:00Z',
    expectedReturnDate: '2026-07-27T18:00:00Z',
    gracePeriodHours: 6,
    status: 'active',
    riskLevel: 'Low',
    riskScore: 18,
    pinCode: '1102',
    shareCode: 'MARCO-SPITI-44',
    emergencyContacts: [
      { name: 'Sofia Bellini (Sister)', relation: 'Sister', email: 'sofia.bellini@example.it', phone: '+39-06-6987-1234' }
    ],
    embassyInfo: {
      country: 'Italy',
      embassyName: 'Embassy of Italy in New Delhi',
      email: 'ambnewdelhi.emergenza@esteri.it',
      hotline: '+91-11-2611-4037',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Himachal Pradesh',
      district: 'Kaza Police Station, Spiti',
      controlRoomEmail: 'police-spiti@hp.gov.in',
      helpline: '+91-1906-222223'
    },
    telemetry: {
      paired: true,
      battery: 84,
      heartRate: 76,
      pulseO2: 96,
      fallDetected: false,
      lastSync: '2026-07-25T12:45:00Z'
    },
    checkpoints: [
      {
        id: 'spiti-chk-1',
        tripId: 'TRIP-IN-2026-4410',
        timestamp: '2026-07-25T04:30:00Z',
        lat: 32.2462,
        lng: 77.1892,
        altitudeMeters: 2050,
        locationName: 'Manali Highway Checkpoint',
        batteryLevel: 100,
        signalType: '5G/4G',
        signalStrength: 95,
        speedKmh: 42.0,
        deviceStatus: 'Riding Motorbike',
        heartRate: 82,
        aiNote: 'Journey initiated smoothly.'
      },
      {
        id: 'spiti-chk-2',
        tripId: 'TRIP-IN-2026-4410',
        timestamp: '2026-07-25T09:00:00Z',
        lat: 32.3711,
        lng: 77.3789,
        altitudeMeters: 3978,
        locationName: 'Rohtang Pass Summit',
        batteryLevel: 91,
        signalType: 'Satellite L-Band',
        signalStrength: 88,
        speedKmh: 28.5,
        deviceStatus: 'High altitude pass crossing',
        heartRate: 89,
        aiNote: 'Cell towers dark. Satellite sync verified.'
      },
      {
        id: 'spiti-chk-3',
        tripId: 'TRIP-IN-2026-4410',
        timestamp: '2026-07-25T12:45:00Z',
        lat: 32.4180,
        lng: 77.6105,
        altitudeMeters: 4590,
        locationName: 'Kunzum Pass Refuge',
        batteryLevel: 84,
        signalType: 'Satellite L-Band',
        signalStrength: 85,
        speedKmh: 15.0,
        deviceStatus: 'Safe Progress',
        heartRate: 76,
        aiNote: 'Regular checkpoint recorded on schedule.'
      }
    ]
  },
  {
    id: 'TRIP-IN-2026-7782',
    travelerName: 'Akira Tanaka',
    passportNumber: 'JP-7710293-K',
    nationality: 'Japan',
    destination: 'Silent Valley Rainforest Exploration',
    region: 'Palakkad, Kerala',
    startDate: '2026-07-24T08:00:00Z',
    expectedReturnDate: '2026-07-25T08:00:00Z',
    gracePeriodHours: 3,
    status: 'critical_emergency',
    riskLevel: 'Critical',
    riskScore: 96,
    pinCode: '7721',
    shareCode: 'AKIRA-SILENT-77',
    emergencyContacts: [
      { name: 'Keiko Tanaka (Wife)', relation: 'Spouse', email: 'keiko.tanaka@example.jp', phone: '+81-3-5555-0143' }
    ],
    embassyInfo: {
      country: 'Japan',
      embassyName: 'Embassy of Japan in India',
      email: 'jpemb-consular@nd.mofa.go.jp',
      hotline: '+91-11-4651-5100',
      city: 'New Delhi'
    },
    policeDept: {
      state: 'Kerala',
      district: 'Palakkad Police Control Room',
      controlRoomEmail: 'controlroom-palakkad@keralapolice.gov.in',
      helpline: '+91-491-2534011'
    },
    telemetry: {
      paired: true,
      battery: 4,
      heartRate: 0,
      pulseO2: 0,
      fallDetected: true,
      lastSync: '2026-07-25T06:10:00Z'
    },
    checkpoints: [
      {
        id: 'jp-chk-1',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: '2026-07-24T08:30:00Z',
        lat: 11.0821,
        lng: 76.4312,
        altitudeMeters: 890,
        locationName: 'Mukkali Ranger Station Gate',
        batteryLevel: 96,
        signalType: '5G/4G',
        signalStrength: 90,
        speedKmh: 3.5,
        deviceStatus: 'Entering forest zone',
        heartRate: 72,
        aiNote: 'Permit verified. Normal start.'
      },
      {
        id: 'jp-chk-2',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: '2026-07-24T14:00:00Z',
        lat: 11.1210,
        lng: 76.4589,
        altitudeMeters: 1150,
        locationName: 'Sairandhri Watchtower',
        batteryLevel: 68,
        signalType: 'Satellite L-Band',
        signalStrength: 70,
        speedKmh: 2.1,
        deviceStatus: 'Trekking thick foliage',
        heartRate: 98,
        aiNote: 'Dense canopy. Switched to satellite pulse.'
      },
      {
        id: 'jp-chk-3',
        tripId: 'TRIP-IN-2026-7782',
        timestamp: '2026-07-25T06:10:00Z',
        lat: 11.1405,
        lng: 76.4710,
        altitudeMeters: 1210,
        locationName: 'Kuntipuzha River Basin - Deep Jungle',
        batteryLevel: 4,
        signalType: 'Satellite L-Band',
        signalStrength: 15,
        speedKmh: 0.0,
        deviceStatus: 'CRITICAL: Smartwatch Fall Impact Detected',
        heartRate: 0,
        aiNote: 'Severe deceleration impact + zero heart rate registered by smartwatch telemetry.'
      }
    ],
    latestRiskReport: {
      id: 'rr-7782',
      tripId: 'TRIP-IN-2026-7782',
      timestamp: '2026-07-25T11:00:00Z',
      riskLevel: 'Critical',
      riskScore: 96,
      keyFactors: [
        'Smartwatch fall detection impact event triggered at 06:10 UTC',
        'Pulse/Heartbeat telemetry registered 0 BPM or disconnected',
        'Traveler return window + 3 hour grace period expired',
        'Last location is deep inside Silent Valley dense forest gorge',
        'Battery level depleted to 4%'
      ],
      summary: 'CRITICAL EMERGENCY: Akira Tanaka (Japan Passport JP-7710293-K) registered a high-G impact fall event followed by heartbeat loss at 06:10 UTC in Kuntipuzha River Basin, Silent Valley National Park. Automatic distress package dispatched to Embassy of Japan and Kerala Police Control Room.',
      aiRecommendation: 'Dispatch Forest Dept Search & Rescue and Emergency Medical Helicopter unit to coordinates 11.1405° N, 76.4710° E immediately.',
      policeActionRequired: true,
      embassyAlertTriggered: true,
      lastKnownLocationName: 'Kuntipuzha River Basin Gorge, Silent Valley NP',
      coordinatesStr: '11.1405° N, 76.4710° E',
      googleMapsUrl: 'https://www.google.com/maps?q=11.1405,76.4710'
    }
  }
];
