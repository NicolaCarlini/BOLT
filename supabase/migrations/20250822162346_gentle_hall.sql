/*
  # Add new columns to Jobs table

  1. New Columns
    - `provenienza` (text) - Source/Origin
    - `telefono` (text) - Phone number
    - `email` (text) - Email address
    - `tipo_intervento` (text) - Type of intervention
    - `progetto_preliminare` (enum) - Preliminary project status
    - `documento_cantiere` (enum) - Site document status
    - `materiale` (enum) - Material status
    - `acconto` (enum) - Down payment status
    - `cestello` (enum) - Basket/lift status
    - `viaggi_hotel` (enum) - Travel and hotel status
    - `previsione_fine_lavori` (date) - Expected work completion date
    - `lavoro` (enum) - Work status
    - `disegno_definitivo` (enum) - Final drawing status
    - `firma_progetto` (enum) - Project signature
    - `relazione_calcolo` (enum) - Calculation report status
    - `firma_relazione` (enum) - Report signature
    - `dichiarazione_conf` (enum) - Conformity declaration status
    - `autorizzazione_invio` (enum) - Document sending authorization
    - `invio_documenti` (enum) - Document sending status
    - `note` (text) - Notes

  2. Enum Types
    - Created various enum types for different status fields
    - All columns are optional (nullable)
*/

-- Create enum types
CREATE TYPE urgente_attendere_fatto_non_previsto AS ENUM ('Urgente', 'Attendere', 'Fatto', 'Non previsto');
CREATE TYPE ok_non_previsto AS ENUM ('Ok', 'Non previsto');
CREATE TYPE lavoro_status AS ENUM ('Urgente', 'Attendere', 'Fatto', 'Non previsto', 'In corso', 'Programmato', 'Da programmare');
CREATE TYPE disegno_definitivo_status AS ENUM ('Urgente', 'Di altro progettista', 'Attendere', 'In attesa documenti cliente', 'Fatto', 'Non previsto');
CREATE TYPE firma_progetto_status AS ENUM ('Geom. Pasquale Iacolare', 'Ing. Francesco Profilato', 'Non previsto');
CREATE TYPE relazione_calcolo_status AS ENUM ('Urgente', 'Di altro progettista', 'Attendere', 'In attesa documenti cliente', 'Fatto', 'Non previsto');
CREATE TYPE firma_relazione_status AS ENUM ('Ing. Giuliano Wolf', 'Ing. Francesco Profilato', 'Non previsto');
CREATE TYPE autorizzazione_invio_status AS ENUM ('Non autorizzato', 'Autorizzato', 'Autorizzato e urgente');
CREATE TYPE invio_documenti_status AS ENUM ('Fatto', 'Non previsto', 'Urgente', 'Attendere');

-- Add new columns to Jobs table
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS provenienza text;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS telefono text;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS tipo_intervento text;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS progetto_preliminare urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS documento_cantiere urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS materiale urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS acconto ok_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS cestello urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS viaggi_hotel urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS previsione_fine_lavori date;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS lavoro lavoro_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS disegno_definitivo disegno_definitivo_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS firma_progetto firma_progetto_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS relazione_calcolo relazione_calcolo_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS firma_relazione firma_relazione_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS dichiarazione_conf urgente_attendere_fatto_non_previsto;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS autorizzazione_invio autorizzazione_invio_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS invio_documenti invio_documenti_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS note text;