/*
  # Add 'Non ABACO E.V.' to Firma Relazione enum

  1. Changes
    - Add 'Non ABACO E.V.' to the `firma_relazione_status` enum type
    - This allows users to specify when the signature is not handled by ABACO E.V.

  2. Security
    - No RLS changes needed as this only modifies enum values
*/

ALTER TYPE firma_relazione_status ADD VALUE IF NOT EXISTS 'Non ABACO E.V.';