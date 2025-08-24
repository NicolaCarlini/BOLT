/*
  # Update Jobs table RLS policies for anonymous access

  1. Security Changes
    - Drop existing authenticated-only policies
    - Create new policies that allow anonymous access
    - Enable anonymous users to perform all CRUD operations on Jobs table

  2. Policies Created
    - Anonymous users can read all Jobs data
    - Anonymous users can insert new Jobs
    - Anonymous users can update Jobs
    - Anonymous users can delete Jobs

  Note: This removes authentication requirements from the Jobs table.
  All operations will be allowed for anonymous users.
*/

-- Drop existing policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can read Jobs" ON "Jobs";
DROP POLICY IF EXISTS "Authenticated users can insert Jobs" ON "Jobs";
DROP POLICY IF EXISTS "Authenticated users can update Jobs" ON "Jobs";
DROP POLICY IF EXISTS "Authenticated users can delete Jobs" ON "Jobs";

-- Create new policies for anonymous access
CREATE POLICY "Anonymous users can read Jobs"
  ON "Jobs"
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can insert Jobs"
  ON "Jobs"
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anonymous users can update Jobs"
  ON "Jobs"
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anonymous users can delete Jobs"
  ON "Jobs"
  FOR DELETE
  TO anon
  USING (true);