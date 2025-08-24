/*
  # Add Mancante and Ordinato to Materiale enum

  1. Enum Updates
    - Add 'Mancante' to `urgente_attendere_fatto_non_previsto` enum
    - Add 'Ordinato' to `urgente_attendere_fatto_non_previsto` enum

  2. Changes
    - Extends the enum used by the `materiale` column to include new status options
    - Allows users to select Mancante (highlighted in red) and Ordinato options
*/

-- Add new values to the enum used by materiale column
ALTER TYPE public.urgente_attendere_fatto_non_previsto ADD VALUE 'Mancante';
ALTER TYPE public.urgente_attendere_fatto_non_previsto ADD VALUE 'Ordinato';