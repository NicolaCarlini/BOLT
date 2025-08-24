/*
  # Add Previsione Fine Lavori column

  1. New Enum Type
    - `previsione_fine_lavori_status` with values:
      - `Urgente`
      - `Non urgente`

  2. New Column
    - Add `previsione_fine_lavori` column to Jobs table
    - Type: previsione_fine_lavori_status (nullable)

  3. Security
    - Column inherits existing RLS policies from Jobs table
*/

-- Create the enum type for previsione fine lavori status
CREATE TYPE IF NOT EXISTS previsione_fine_lavori_status AS ENUM (
  'Urgente',
  'Non urgente'
);

-- Add the column to the Jobs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'previsione_fine_lavori'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN previsione_fine_lavori previsione_fine_lavori_status;
  END IF;
END $$;