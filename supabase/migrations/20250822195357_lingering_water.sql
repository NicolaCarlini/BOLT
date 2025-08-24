/*
  # Disable Row Level Security for Jobs table

  This migration completely removes all authentication and authorization requirements from the Jobs table by:
  
  1. Disabling Row Level Security (RLS)
  2. Dropping all existing RLS policies
  
  After running this migration, the Jobs table will be fully public and accessible without any authentication.
*/

-- Disable Row Level Security for the Jobs table
ALTER TABLE public."Jobs" DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies for the Jobs table
DROP POLICY IF EXISTS "Anonymous users can delete Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Anonymous users can insert Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Anonymous users can read Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Anonymous users can update Jobs" ON public."Jobs";

-- Drop any other potential policies that might exist
DROP POLICY IF EXISTS "Users can read Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Users can insert Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Users can update Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Users can delete Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Authenticated users can read Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Authenticated users can insert Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Authenticated users can update Jobs" ON public."Jobs";
DROP POLICY IF EXISTS "Authenticated users can delete Jobs" ON public."Jobs";