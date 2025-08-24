/*
  # Add Non previsto to autorizzazione_invio_status enum

  1. Enum Updates
    - Add 'Non previsto' as a new possible value to the `autorizzazione_invio_status` enum
    - This allows the autorizzazione_invio field to accept 'Non previsto' as a valid option

  2. Changes
    - Extends the existing enum without affecting current data
    - Maintains backward compatibility with existing records
*/

ALTER TYPE public.autorizzazione_invio_status ADD VALUE 'Non previsto';