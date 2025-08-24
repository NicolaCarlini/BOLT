/*
  # Add Mancante to cestello field enum

  1. Enum Updates
    - Add 'Mancante' value to urgente_attendere_fatto_non_previsto enum for cestello field

  2. Changes
    - Extends existing enum to support new Mancante option for cestello/attrezzature field
*/

ALTER TYPE public.urgente_attendere_fatto_non_previsto ADD VALUE IF NOT EXISTS 'Mancante';