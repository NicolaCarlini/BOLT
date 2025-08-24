/*
  # Add Attivita Column to Jobs Table

  1. New Enum Type
     - attivita_type enum with values: 'Servizio tecnico', 'Fornitura', 'Installazione', 'Ispezione'

  2. Table Changes
     - Add attivita column to Jobs table
     - Column type: attivita_type (enum)
     - Nullable: true (to allow existing records)

  3. Security
     - No RLS changes needed (inherits from existing table policies)
*/

CREATE TYPE public.attivita_type AS ENUM (
    'Servizio tecnico',
    'Fornitura',
    'Installazione',
    'Ispezione'
);

ALTER TABLE public."Jobs"
ADD COLUMN attivita public.attivita_type NULL;