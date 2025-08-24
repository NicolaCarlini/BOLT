/*
  # Add Priorita column to Jobs table

  1. New Column
    - `priorita` (enum: 'Urgente', 'Non urgente')
      - Optional field for job priority classification
      - Not mandatory on creation

  2. Changes
    - Add new enum type `priorita_status`
    - Add `priorita` column to Jobs table
*/

-- Create enum type for priorita
CREATE TYPE priorita_status AS ENUM ('Urgente', 'Non urgente');

-- Add priorita column to Jobs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'priorita'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN priorita priorita_status;
  END IF;
END $$;