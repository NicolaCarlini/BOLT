/*
  # Delete previsione_fine_lavori column

  1. Changes
    - Remove `previsione_fine_lavori` column from `Jobs` table
*/

ALTER TABLE "Jobs" DROP COLUMN IF EXISTS previsione_fine_lavori;