/*
  # Add Coordinate column to Jobs table

  1. Schema Changes
    - Add `coordinate` column to `Jobs` table
      - `coordinate` (text, nullable) - For storing location coordinates

  2. Security
    - No RLS changes needed as existing policies cover new column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'coordinate'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN coordinate text;
  END IF;
END $$;