/*
  # Add 'Mancanti' value to documento_cantiere enum

  1. Enum Updates
    - Add 'Mancanti' as a new possible value to the `urgente_attendere_fatto_non_previsto` enum
    - This enum is used by the `documento_cantiere` column in the Jobs table

  2. Changes
    - Extends the existing enum without affecting current data
    - Allows UI to use the new 'Mancanti' option for documento_cantiere field
*/

ALTER TYPE public.urgente_attendere_fatto_non_previsto ADD VALUE 'Mancanti';