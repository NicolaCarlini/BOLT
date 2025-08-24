/*
  # Add Giornate previste column

  1. New Columns
    - `giornate_previste` (numeric) - Expected working days, allows decimals
  
  2. Changes
    - Added nullable numeric column to Jobs table for tracking expected working days
*/

ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS giornate_previste numeric;