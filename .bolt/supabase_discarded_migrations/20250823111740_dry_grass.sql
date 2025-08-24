/*
  # Fix previsione_fine_lavori column type

  1. Changes
    - Drop existing previsione_fine_lavori column (currently date type)
    - Create new enum type previsione_fine_lavori_status with values 'Urgente', 'Non urgente'
    - Add previsione_fine_lavori column back as enum type

  2. Security
    - No RLS changes needed (column already exists in table with RLS enabled)
*/

-- Drop the existing column that has wrong type
ALTER TABLE "Jobs" DROP COLUMN IF EXISTS previsione_fine_lavori;

-- Create the enum type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'previsione_fine_lavori_status') THEN
    CREATE TYPE previsione_fine_lavori_status AS ENUM ('Urgente', 'Non urgente');
  END IF;
END $$;

-- Add the column back with correct enum type
ALTER TABLE "Jobs" ADD COLUMN previsione_fine_lavori previsione_fine_lavori_status;