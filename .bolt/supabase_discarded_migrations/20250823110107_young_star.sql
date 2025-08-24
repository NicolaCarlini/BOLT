/*
  # Add Mancante and Fatto to Viaggi e Hotel enum

  1. Enum Updates
    - Add "Mancante" to urgente_attendere_fatto_non_previsto enum
    - Add "Fatto" to urgente_attendere_fatto_non_previsto enum (if not already present)

  2. Changes
    - Extends the enum to support the new values for viaggi_hotel field
*/

-- Add new values to the enum if they don't already exist
DO $$
BEGIN
  -- Add Mancante if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'Mancante' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'urgente_attendere_fatto_non_previsto')
  ) THEN
    ALTER TYPE urgente_attendere_fatto_non_previsto ADD VALUE 'Mancante';
  END IF;

  -- Add Fatto if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'Fatto' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'urgente_attendere_fatto_non_previsto')
  ) THEN
    ALTER TYPE urgente_attendere_fatto_non_previsto ADD VALUE 'Fatto';
  END IF;
END $$;