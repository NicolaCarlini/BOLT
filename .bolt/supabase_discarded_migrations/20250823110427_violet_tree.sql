/*
  # Remove Previsione Fine Lavori column

  1. Changes
    - Drop `previsione_fine_lavori` column from `Jobs` table

  This removes the column that is no longer needed in the application.
*/

ALTER TABLE "Jobs" DROP COLUMN IF EXISTS previsione_fine_lavori;