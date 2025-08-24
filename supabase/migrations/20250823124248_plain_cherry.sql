/*
  # Add Referente column to Jobs table

  1. Changes
    - Add `referente` column to `Jobs` table
    - Column type: text (nullable)
    - Used to store contact person names for jobs

  2. Notes
    - Field is optional and can be null
    - No default value specified
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'referente'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN referente text;
  END IF;
END $$;