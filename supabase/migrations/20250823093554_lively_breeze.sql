/*
  # Add new values to Progetto Preliminare enum

  1. Enum Updates
    - Add 'Mancante' to urgente_attendere_fatto_non_previsto enum
    - Add 'Fatto ABACO E.V.' to urgente_attendere_fatto_non_previsto enum  
    - Add 'Fatto altro progettista' to urgente_attendere_fatto_non_previsto enum

  2. Notes
    - Existing values ('Urgente', 'Attendere', 'Fatto', 'Non previsto') are preserved
    - UI will only show the new values but database maintains backward compatibility
*/

-- Add new values to the existing enum type
ALTER TYPE urgente_attendere_fatto_non_previsto ADD VALUE IF NOT EXISTS 'Mancante';
ALTER TYPE urgente_attendere_fatto_non_previsto ADD VALUE IF NOT EXISTS 'Fatto ABACO E.V.';
ALTER TYPE urgente_attendere_fatto_non_previsto ADD VALUE IF NOT EXISTS 'Fatto altro progettista';