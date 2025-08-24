/*
  # Add non-ABACO signature columns

  1. New Columns
    - `firma_progetto_non_abaco` (text) - For custom project signature text
    - `firma_relazione_non_abaco` (text) - For custom relation signature text
  
  2. Changes
    - Add two new text columns to Jobs table for storing custom signature names
    - These will be used when "Non ABACO E.V." is selected in the respective dropdowns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'firma_progetto_non_abaco'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN firma_progetto_non_abaco text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'firma_relazione_non_abaco'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN firma_relazione_non_abaco text;
  END IF;
END $$;