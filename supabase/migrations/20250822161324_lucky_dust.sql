/*
  # Remove status column and enum

  1. Changes
    - Drop the status column from Jobs table
    - Drop the job_status enum type
    - Remove related indexes and policies if any

  2. Notes
    - This will permanently remove all status-related functionality
    - Jobs will no longer be categorized by status
*/

-- Drop the status column
ALTER TABLE "Jobs" DROP COLUMN IF EXISTS "status";

-- Drop the job_status enum type
DROP TYPE IF EXISTS job_status;