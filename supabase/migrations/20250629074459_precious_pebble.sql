/*
  # Hospital Management System Database Schema

  1. New Tables
    - `hospitals`
      - `id` (uuid, primary key)
      - `name` (text, hospital name)
      - `address` (text, full address)
      - `city` (text, city name)
      - `state` (text, state name)
      - `pincode` (text, postal code)
      - `phone` (text, contact phone)
      - `email` (text, contact email)
      - `registration_number` (text, hospital registration)
      - `latitude` (double precision, location coordinate)
      - `longitude` (double precision, location coordinate)
      - `created_at` (timestamptz, creation time)
      - `updated_at` (timestamptz, last update time)
      - `is_verified` (boolean, verification status)
      - `admin_user_id` (uuid, reference to auth user)

    - `bed_availability`
      - `id` (uuid, primary key)
      - `hospital_id` (uuid, foreign key to hospitals)
      - `icu_beds` (jsonb, ICU bed data)
      - `general_beds` (jsonb, general bed data)
      - `oxygen_beds` (jsonb, oxygen bed data)
      - `ventilators` (jsonb, ventilator data)
      - `ambulances` (jsonb, ambulance data)
      - `last_updated` (timestamptz, last update time)
      - `updated_by` (text, user who updated)

    - `historical_logs`
      - `id` (uuid, primary key)
      - `hospital_id` (uuid, foreign key to hospitals)
      - `timestamp` (timestamptz, log timestamp)
      - `resource_type` (text, type of resource)
      - `previous_value` (integer, old value)
      - `new_value` (integer, new value)
      - `updated_by` (text, user who made change)
      - `action` (text, type of action)

    - `ambulances`
      - `id` (uuid, primary key)
      - `hospital_id` (uuid, foreign key to hospitals)
      - `vehicle_number` (text, ambulance number)
      - `driver_name` (text, driver name)
      - `driver_phone` (text, driver contact)
      - `status` (text, current status)
      - `current_location` (jsonb, GPS coordinates)
      - `last_updated` (timestamptz, last update time)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read hospital data
    - Add policies for hospital admins to manage their own data
    - Add policies for public read access to hospital listings

  3. Indexes
    - Add indexes for location-based queries
    - Add indexes for frequently searched fields
*/

-- Create hospitals table
CREATE TABLE IF NOT EXISTS public.hospitals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    pincode text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    registration_number text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    is_verified boolean DEFAULT false,
    admin_user_id uuid REFERENCES auth.users(id)
);

-- Create bed availability table
CREATE TABLE IF NOT EXISTS public.bed_availability (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id uuid NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    icu_beds jsonb NOT NULL DEFAULT '{"total": 0, "available": 0, "occupied": 0}',
    general_beds jsonb NOT NULL DEFAULT '{"total": 0, "available": 0, "occupied": 0}',
    oxygen_beds jsonb NOT NULL DEFAULT '{"total": 0, "available": 0, "occupied": 0}',
    ventilators jsonb NOT NULL DEFAULT '{"total": 0, "available": 0, "occupied": 0}',
    ambulances jsonb NOT NULL DEFAULT '{"total": 0, "available": 0, "onDuty": 0}',
    last_updated timestamptz DEFAULT now(),
    updated_by text NOT NULL DEFAULT '',
    UNIQUE(hospital_id)
);

-- Create historical logs table
CREATE TABLE IF NOT EXISTS public.historical_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id uuid NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    timestamp timestamptz DEFAULT now(),
    resource_type text NOT NULL CHECK (resource_type IN ('icuBeds', 'generalBeds', 'oxygenBeds', 'ventilators', 'ambulances')),
    previous_value integer NOT NULL DEFAULT 0,
    new_value integer NOT NULL DEFAULT 0,
    updated_by text NOT NULL DEFAULT '',
    action text NOT NULL CHECK (action IN ('increase', 'decrease', 'update')) DEFAULT 'update'
);

-- Create ambulances table
CREATE TABLE IF NOT EXISTS public.ambulances (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id uuid NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    vehicle_number text NOT NULL,
    driver_name text NOT NULL DEFAULT '',
    driver_phone text NOT NULL DEFAULT '',
    status text NOT NULL CHECK (status IN ('available', 'onDuty', 'maintenance')) DEFAULT 'available',
    current_location jsonb,
    last_updated timestamptz DEFAULT now(),
    UNIQUE(hospital_id, vehicle_number)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hospitals_location ON public.hospitals USING btree (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hospitals_city ON public.hospitals USING btree (city);
CREATE INDEX IF NOT EXISTS idx_hospitals_pincode ON public.hospitals USING btree (pincode);
CREATE INDEX IF NOT EXISTS idx_hospitals_verified ON public.hospitals USING btree (is_verified);
CREATE INDEX IF NOT EXISTS idx_bed_availability_hospital ON public.bed_availability USING btree (hospital_id);
CREATE INDEX IF NOT EXISTS idx_bed_availability_updated ON public.bed_availability USING btree (last_updated);
CREATE INDEX IF NOT EXISTS idx_historical_logs_hospital ON public.historical_logs USING btree (hospital_id);
CREATE INDEX IF NOT EXISTS idx_historical_logs_timestamp ON public.historical_logs USING btree (timestamp);
CREATE INDEX IF NOT EXISTS idx_ambulances_hospital ON public.ambulances USING btree (hospital_id);
CREATE INDEX IF NOT EXISTS idx_ambulances_status ON public.ambulances USING btree (status);

-- Enable Row Level Security
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bed_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historical_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;

-- Create policies for hospitals table
CREATE POLICY "Anyone can view hospitals"
    ON public.hospitals
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Hospital admins can update their own hospital"
    ON public.hospitals
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = admin_user_id);

CREATE POLICY "Authenticated users can create hospitals"
    ON public.hospitals
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = admin_user_id);

-- Create policies for bed_availability table
CREATE POLICY "Anyone can view bed availability"
    ON public.bed_availability
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Hospital admins can manage bed availability"
    ON public.bed_availability
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.hospitals 
            WHERE hospitals.id = bed_availability.hospital_id 
            AND hospitals.admin_user_id = auth.uid()
        )
    );

-- Create policies for historical_logs table
CREATE POLICY "Anyone can view historical logs"
    ON public.historical_logs
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Hospital admins can create logs for their hospital"
    ON public.historical_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.hospitals 
            WHERE hospitals.id = historical_logs.hospital_id 
            AND hospitals.admin_user_id = auth.uid()
        )
    );

-- Create policies for ambulances table
CREATE POLICY "Anyone can view ambulances"
    ON public.ambulances
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Hospital admins can manage their ambulances"
    ON public.ambulances
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.hospitals 
            WHERE hospitals.id = ambulances.hospital_id 
            AND hospitals.admin_user_id = auth.uid()
        )
    );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for hospitals table
DROP TRIGGER IF EXISTS update_hospitals_updated_at ON public.hospitals;
CREATE TRIGGER update_hospitals_updated_at
    BEFORE UPDATE ON public.hospitals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for bed_availability table
DROP TRIGGER IF EXISTS update_bed_availability_updated_at ON public.bed_availability;
CREATE TRIGGER update_bed_availability_updated_at
    BEFORE UPDATE ON public.bed_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();