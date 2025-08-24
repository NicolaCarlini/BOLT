/*
  # Remove authentication tables and functions

  This migration removes all authentication-related database objects:

  1. Tables Removed
    - `user_profiles` table and all its dependencies

  2. Enums Removed  
    - `user_role` enum type

  3. Functions Removed
    - `handle_new_user` trigger function
    - `update_updated_at_column` trigger function (if only used by user_profiles)

  4. Policies Removed
    - All RLS policies on user_profiles table

  5. Triggers Removed
    - All triggers on user_profiles table
*/

-- Drop the user_profiles table (this will cascade and remove all related policies, triggers, etc.)
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Drop the user_role enum type
DROP TYPE IF EXISTS user_role CASCADE;

-- Drop the handle_new_user function
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Drop the update_updated_at_column function if it exists and is no longer needed
-- (keeping it commented out in case other tables use it)
-- DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;