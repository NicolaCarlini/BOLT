/*
  # Add billing fields to Jobs table

  1. New Columns
    - `fatturazione_acconto` (enum) - Billing down payment status
    - `verifica_pagamento_acconto` (enum) - Down payment verification status
    - `fatturazione_saldo` (enum) - Final billing status
    - `verifica_pagamento_saldo` (enum) - Final payment verification status

  2. Enum Types
    - Create enum type for billing status fields
    - All columns are optional (nullable)

  3. Security
    - Maintain existing RLS settings
    - No changes to existing policies
*/

-- Create enum type for billing status
CREATE TYPE billing_status AS ENUM ('Fatto', 'Non previsto', 'Urgente', 'Attendere');

-- Add new billing columns to Jobs table
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS fatturazione_acconto billing_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS verifica_pagamento_acconto billing_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS fatturazione_saldo billing_status;
ALTER TABLE "Jobs" ADD COLUMN IF NOT EXISTS verifica_pagamento_saldo billing_status;