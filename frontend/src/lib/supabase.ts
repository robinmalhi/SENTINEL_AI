import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};
const SUPABASE_URL = metaEnv.VITE_SUPABASE_URL || 'https://aygjujyyswmiukguoakn.supabase.co';
const SUPABASE_ANON_KEY = metaEnv.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kve0Kzvfc1O-W-7KvbdJlQ_s1KTimWt';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to save trip activation/registration details
export async function saveTripActivationToSupabase(tripData: Record<string, any>) {
  try {
    const firstContact = Array.isArray(tripData.emergencyContacts) && tripData.emergencyContacts.length > 0 
      ? tripData.emergencyContacts[0] 
      : null;

    const { data, error } = await supabase
      .from('trips')
      .insert([
        {
          traveler_name: tripData.travelerName || tripData.name,
          passport_number: tripData.passportNumber || tripData.passportAadhaar || tripData.governmentId,
          nationality: tripData.nationality || 'United States',
          destination: tripData.destination || tripData.destinationName,
          state_district: tripData.region || tripData.stateDistrict || 'Himachal Pradesh, India',
          start_date: tripData.startDate || new Date().toISOString(),
          expected_return_date: tripData.expectedReturnDate || tripData.endDate,
          grace_period_hours: tripData.gracePeriodHours || 4,
          family_email: firstContact?.email || tripData.familyEmail || tripData.email,
          emergency_contact_name: firstContact?.name || tripData.emergencyContact,
          emergency_contact_relation: firstContact?.relation || 'Family',
          emergency_contacts: tripData.emergencyContacts || [],
          pin_code: tripData.pinCode || '4921',
          risk_level: tripData.riskLevel || 'Low',
          satellite_band: tripData.satelliteBand || 'L-Band (Primary)',
          status: 'Active',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert to "trips" table failed, attempting fallback table "submissions"...', error);
      const fallback = await supabase
        .from('submissions')
        .insert([{ form_type: 'trip_activation', data: tripData, created_at: new Date().toISOString() }]);
      if (fallback.error) {
        console.warn('Supabase fallback insert warning:', fallback.error.message);
      }
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Error saving trip to Supabase:', err);
    return { success: false, error: err.message || 'Failed to submit' };
  }
}

// Helper function to save SOS Emergency / Incident alerts
export async function saveEmergencyAlertToSupabase(alertData: Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('emergency_alerts')
      .insert([
        {
          traveler_name: alertData.travelerName || 'Unknown Traveler',
          destination: alertData.destination || alertData.location || 'Himalayan High Altitude Pass',
          location: alertData.location || alertData.destination || 'Kedarnath / Spiti Valley',
          latitude: alertData.lat || alertData.latitude || 30.7346,
          longitude: alertData.lng || alertData.longitude || 79.0669,
          altitude: alertData.altitude || alertData.altitudeMeters || 3580,
          sos_alert_by_ai: alertData.sosAlertByAi ?? true,
          sos_timestamp: alertData.time || alertData.timestamp || new Date().toISOString(),
          alert_type: alertData.alertType || 'SOS Emergency (AI Satellite Auto-Triggered)',
          status: 'Active',
          details: alertData.details || alertData.message || 'AI Satellite telemetry detected abnormal signal blackout / prolonged movement cessation.',
          battery_level: alertData.batteryLevel || alertData.battery || 88,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert to "emergency_alerts" table failed, attempting fallback table "submissions"...', error);
      await supabase
        .from('submissions')
        .insert([{ form_type: 'emergency_alert', data: alertData, created_at: new Date().toISOString() }]);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Error saving emergency alert to Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Helper function to save AI Advisor queries / feedback
export async function saveAdvisorQueryToSupabase(queryData: Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('advisor_queries')
      .insert([
        {
          query_text: queryData.query,
          ai_response: queryData.response,
          category: queryData.category || 'General',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      await supabase
        .from('submissions')
        .insert([{ form_type: 'advisor_query', data: queryData, created_at: new Date().toISOString() }]);
    }
    return { success: !error };
  } catch (err) {
    console.error('Error saving advisor query:', err);
    return { success: false };
  }
}

// Fetch trips from Supabase
export async function getTripsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Could not fetch trips from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error fetching trips from Supabase:', err);
    return [];
  }
}
