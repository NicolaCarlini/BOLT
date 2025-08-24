/*
  # Rename date column to data_appuntamento

  1. Changes
    - Rename `date` column to `data_appuntamento` in Jobs table
    - Update existing indexes that reference the date column
    - Maintain all existing data and constraints

  2. Security
    - No changes to RLS policies needed
*/

-- Rename the date column to data_appuntamento
ALTER TABLE "Jobs" RENAME COLUMN "date" TO "data_appuntamento";

-- Update the index name to reflect the new column name
DROP INDEX IF EXISTS idx_jobs_date;
CREATE INDEX idx_jobs_data_appuntamento ON public."Jobs" USING btree (data_appuntamento);