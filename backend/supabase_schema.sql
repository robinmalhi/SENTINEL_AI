-- ====================================================================
-- SENTINEL AI - COMPLETE SUPABASE SQL SCHEMA FOR PROTECTED JOURNEY
-- ====================================================================

-- 1. Create 'trips' Table (Stores "Start Trip" & "Protected Journey" Activations)
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    traveler_name TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    nationality TEXT DEFAULT 'United States',
    destination TEXT NOT NULL,
    state_district TEXT DEFAULT 'Himachal Pradesh, India',
    start_date TIMESTAMPTZ DEFAULT NOW(),
    expected_return_date TIMESTAMPTZ NOT NULL,
    grace_period_hours INT DEFAULT 4,
    emergency_contact_name TEXT,
    emergency_contact_relation TEXT,
    family_email TEXT NOT NULL,
    emergency_contacts JSONB DEFAULT '[]'::jsonb,
    pin_code TEXT DEFAULT '4921',
    risk_level TEXT DEFAULT 'Low',
    satellite_band TEXT DEFAULT 'L-Band (Primary)',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'emergency_alerts' Table (Police Rescue HQ & Emergency Dispatch)
CREATE TABLE IF NOT EXISTS public.emergency_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    traveler_name TEXT NOT NULL,
    destination TEXT,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    altitude DOUBLE PRECISION DEFAULT 3580,
    sos_alert_by_ai BOOLEAN DEFAULT TRUE,
    sos_timestamp TIMESTAMPTZ DEFAULT NOW(),
    alert_type TEXT DEFAULT 'SOS Emergency',
    status TEXT DEFAULT 'Active',
    details TEXT,
    battery_level INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'advisor_queries' Table (AI Travel Advisor Conversations)
CREATE TABLE IF NOT EXISTS public.advisor_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT NOT NULL,
    ai_response TEXT,
    category TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create 'submissions' Fallback Table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL,
    data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON public.trips(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trips_family_email ON public.trips(family_email);
CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON public.emergency_alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON public.emergency_alerts(created_at DESC);

-- RLS POLICIES
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts to trips" ON public.trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous selects from trips" ON public.trips FOR SELECT USING (true);
CREATE POLICY "Allow anonymous inserts to emergency_alerts" ON public.emergency_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous selects from emergency_alerts" ON public.emergency_alerts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous inserts to advisor_queries" ON public.advisor_queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous selects from advisor_queries" ON public.advisor_queries FOR SELECT USING (true);
CREATE POLICY "Allow anonymous inserts to submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous selects from submissions" ON public.submissions FOR SELECT USING (true);
