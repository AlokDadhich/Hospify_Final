/*
  # Simplified Hospital Authentication System

  1. New Tables
    - `hospital_auth` - Simple authentication table with hospital name, location, ID, and password
    - Keep existing tables for bed availability and other features

  2. Security
    - Enable RLS on new table
    - Add policies for hospital authentication

  3. Changes
    - Simplified registration and login process
    - Hospital ID as unique identifier
    - Location stored as simple text
*/

-- Create simplified hospital authentication table
CREATE TABLE IF NOT EXISTS public.hospital_auth (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id text UNIQUE NOT NULL,
    hospital_name text NOT NULL,
    location text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    is_active boolean DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_hospital_auth_hospital_id ON public.hospital_auth USING btree (hospital_id);
CREATE INDEX IF NOT EXISTS idx_hospital_auth_location ON public.hospital_auth USING btree (location);

-- Enable Row Level Security
ALTER TABLE public.hospital_auth ENABLE ROW LEVEL SECURITY;

-- Create policies for hospital_auth table
CREATE POLICY "Anyone can view active hospitals"
    ON public.hospital_auth
    FOR SELECT
    TO public
    USING (is_active = true);

CREATE POLICY "Hospitals can update their own data"
    ON public.hospital_auth
    FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = hospital_id);

CREATE POLICY "Anyone can register new hospital"
    ON public.hospital_auth
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_hospital_auth_updated_at ON public.hospital_auth;
CREATE TRIGGER update_hospital_auth_updated_at
    BEFORE UPDATE ON public.hospital_auth
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update bed_availability table to reference hospital_id instead of UUID
ALTER TABLE public.bed_availability 
DROP CONSTRAINT IF EXISTS bed_availability_hospital_id_fkey;

-- Add new foreign key constraint
ALTER TABLE public.bed_availability 
ADD CONSTRAINT bed_availability_hospital_id_fkey 
FOREIGN KEY (hospital_id) REFERENCES public.hospital_auth(id) ON DELETE CASCADE;

-- Update policies for bed_availability to work with new auth system
DROP POLICY IF EXISTS "Hospital admins can manage bed availability" ON public.bed_availability;
CREATE POLICY "Hospital admins can manage bed availability"
    ON public.bed_availability
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.hospital_auth 
            WHERE hospital_auth.id::text = bed_availability.hospital_id::text
            AND hospital_auth.hospital_id = auth.uid()::text
        )
    );