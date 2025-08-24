-- Create the enum type safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'previsione_fine_lavori_status') THEN
        CREATE TYPE public.previsione_fine_lavori_status AS ENUM ('Urgente', 'Non urgente');
    END IF;
END
$$;

-- Add the column to the Jobs table
ALTER TABLE "Jobs"
ADD COLUMN previsione_fine_lavori_enum public.previsione_fine_lavori_status;