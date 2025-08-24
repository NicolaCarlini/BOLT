/*
  # Add 'Non ABACO E.V.' to firma_progetto_status enum

  1. Changes
    - Add 'Non ABACO E.V.' as a new enum value to the firma_progetto_status type
    - This allows users to specify when the project signature is not handled by ABACO E.V.

  2. Security
    - No security changes needed as this only adds an enum value
*/

ALTER TYPE firma_progetto_status ADD VALUE IF NOT EXISTS 'Non ABACO E.V.';