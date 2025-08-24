/*
  # Add RLS policy for Jobs table

  1. Security
    - Add policy to allow anonymous users to insert jobs
    - Add policy to allow anonymous users to read all jobs
    - Add policy to allow anonymous users to update jobs
    - Add policy to allow anonymous users to delete jobs

  This enables the application to work with anonymous users while maintaining RLS.
*/

-- Allow anonymous users to insert jobs
CREATE POLICY "Allow anonymous insert on Jobs"
  ON "Jobs"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read all jobs
CREATE POLICY "Allow anonymous select on Jobs"
  ON "Jobs"
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to update jobs
CREATE POLICY "Allow anonymous update on Jobs"
  ON "Jobs"
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete jobs
CREATE POLICY "Allow anonymous delete on Jobs"
  ON "Jobs"
  FOR DELETE
  TO anon
  USING (true);