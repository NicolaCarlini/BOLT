/*
  # Remove ActivityLogs table

  1. Changes
    - Drop the ActivityLogs table and all its dependencies
    - Remove all associated indexes, policies, and constraints
  
  2. Notes
    - This will permanently delete all activity log data
    - Foreign key constraints will be automatically dropped
*/

-- Drop the ActivityLogs table (this will also drop all associated indexes, policies, and constraints)
DROP TABLE IF EXISTS "ActivityLogs" CASCADE;