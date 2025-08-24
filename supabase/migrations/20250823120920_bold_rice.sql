/*
  # Add 'Mancante' to relazione_calcolo_status enum

  1. Changes
    - Add 'Mancante' as a new value to the relazione_calcolo_status enum type
    - This allows users to mark relazione di calcolo as missing/lacking

  2. Security
    - No security changes needed as this only adds an enum value
*/

ALTER TYPE relazione_calcolo_status ADD VALUE IF NOT EXISTS 'Mancante';