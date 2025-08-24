/*
  # Add job management columns to Jobs table

  1. New Columns
    - `job_id` (integer, unique identifier for jobs)
    - `client` (text, client name)
    - `job_name` (text, name/type of job)
    - `comune` (text, municipality)
    - `provincia` (text, province)
    - `date` (timestamptz, appointment date and time)
    - `status` (enum, job status: open, in progress, done)

  2. Changes
    - Add custom enum type for job status
    - Add all new columns with appropriate constraints
    - Add indexes for better query performance

  3. Security
    - Maintain existing RLS settings
    - No changes to existing policies
*/

-- Create enum type for job status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
    CREATE TYPE job_status AS ENUM ('open', 'in progress', 'done');
  END IF;
END $$;

-- Add new columns to Jobs table
DO $$
BEGIN
  -- Add job_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'job_id'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN job_id integer;
  END IF;

  -- Add client column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'client'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN client text;
  END IF;

  -- Add job_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'job_name'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN job_name text;
  END IF;

  -- Add comune column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'comune'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN comune text;
  END IF;

  -- Add provincia column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'provincia'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN provincia text;
  END IF;

  -- Add date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'date'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN date timestamptz;
  END IF;

  -- Add status column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Jobs' AND column_name = 'status'
  ) THEN
    ALTER TABLE "Jobs" ADD COLUMN status job_status DEFAULT 'open';
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_job_id ON "Jobs" (job_id);
CREATE INDEX IF NOT EXISTS idx_jobs_client ON "Jobs" (client);
CREATE INDEX IF NOT EXISTS idx_jobs_comune ON "Jobs" (comune);
CREATE INDEX IF NOT EXISTS idx_jobs_provincia ON "Jobs" (provincia);
CREATE INDEX IF NOT EXISTS idx_jobs_date ON "Jobs" (date);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON "Jobs" (status);