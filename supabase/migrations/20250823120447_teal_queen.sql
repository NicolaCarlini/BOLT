/*
  # Add 'Mancante' to disegno_definitivo_status enum

  1. Changes
    - Add 'Mancante' as a new enum value to disegno_definitivo_status type
    - This allows the disegno_definitivo field to have the 'Mancante' option

  2. Security
    - No changes to RLS policies needed
*/

-- Add 'Mancante' to the disegno_definitivo_status enum
ALTER TYPE disegno_definitivo_status ADD VALUE IF NOT EXISTS 'Mancante';